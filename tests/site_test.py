"""Dependency-free integrity checks for the six production pages."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib, re

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(); self.path=path; self.ids=[]; self.links=[]; self.assets=[]; self.h1=0; self.main=0; self.tabs=[]
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag=='html': assert a.get('lang')=='it', self.path
        if tag=='h1': self.h1+=1
        if tag=='main': self.main+=1; assert a.get('aria-labelledby')
        if tag=='a':
            self.links.append(a.get('href',''))
            if 'data-href' in a: self.tabs.append(a['data-href'])
            if a.get('target')=='_blank': assert {'noopener','noreferrer'}<=set(a.get('rel','').split()), self.path
        if tag in ('img','script') and 'src' in a: self.assets.append(a['src'])
        if tag=='use' and 'href' in a: self.assets.append(a['href'])
        if tag=='img': assert 'alt' in a and int(a.get('width',0))>0 and int(a.get('height',0))>0, self.path
        if tag=='link' and a.get('rel') in ('stylesheet','icon'): self.assets.append(a['href'])
        if tag=='input' and 'data-href' in a: self.tabs.append(a['data-href'])

pages={p.name:Page(p) for p in ROOT.glob('*.html')}
assert len(pages)==6
count=0
for name,p in pages.items():
    assert p.h1==p.main==1, name
    assert len(p.ids)==len(set(p.ids)), f'Duplicate ID: {name}'
    assert set(p.tabs)=={'index.html','carriera.html','trofei.html','record.html'} and len(p.tabs)==4
    for href in p.links+p.assets:
        url=urlsplit(href)
        if url.scheme or url.netloc: continue
        path=ROOT/unquote(url.path) if url.path else p.path
        assert path.is_file(), f'Missing {href} from {name}'
        if url.fragment and path.name in pages:
            assert unquote(url.fragment) in pages[path.name].ids, f'Missing anchor {href} from {name}'
        version=re.search(r'(?:^|&)v=([a-f0-9]+)',url.query)
        if version: assert hashlib.sha256(path.read_bytes()).hexdigest().startswith(version[1]), f'Stale version: {href}'
        count+=1
for p in (ROOT/'assets/js').glob('*.mjs'):
    for dep,version in re.findall(r"from ['\"]\./([^?'\"]+)\?v=([a-f0-9]+)['\"]",p.read_text()):
        assert hashlib.sha256((p.parent/dep).read_bytes()).hexdigest().startswith(version), f'Stale module version: {p.name} -> {dep}'
print(f'PASS {len(pages)} pages: {count} local references, anchors, IDs, headings, image attributes, navigation and cache versions')
