import assert from 'node:assert/strict';
import {createNavigator} from '../assets/js/app.mjs';
import {createFavorites,matchesRecord} from '../assets/js/features.mjs';

const deferred=()=>{let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no;});return {promise,resolve,reject};};
const requests=new Map(),renders=[],busy=[],fallbacks=[];
const navigator=createNavigator({
  load(url,signal){const request=deferred();requests.set(url,{...request,signal});return request.promise;},
  render(page,url,{current}){if(current())renders.push(url);},
  busy(value,url){busy.push([value,url]);},
  fallback(url){fallbacks.push(url);}
});
const first=navigator.go('first'),second=navigator.go('second');
assert.equal(requests.get('first').signal.aborted,true);
requests.get('second').resolve('second page');assert.equal(await second,true);
requests.get('first').resolve('stale page');assert.equal(await first,false);
assert.deepEqual(renders,['second']);assert.deepEqual(busy.at(-1),[false,'second']);
const failed=navigator.go('failed');requests.get('failed').reject(new Error('offline'));
assert.equal(await failed,false);assert.deepEqual(fallbacks,['failed']);
const cancelled=navigator.go('cancelled');navigator.cancel();
requests.get('cancelled').reject(Object.assign(new Error('cancelled'),{name:'AbortError'}));
assert.equal(await cancelled,false);assert.deepEqual(fallbacks,['failed']);
assert.equal(busy.at(-1)[0],false);
console.log('PASS latest navigation wins, aborted/stale requests, load fallback and explicit cancellation');

let stored=null;
const favorites=createFavorites({getItem:()=> '["record-gol","invalid",4]',setItem:(key,value)=>{stored=value;}});
assert.deepEqual([...favorites.values],['record-gol']);
assert.equal(favorites.toggle('record-premi'),true);assert.deepEqual(JSON.parse(stored),['record-gol','record-premi']);
const snapshot=favorites.values;snapshot.clear();assert.equal(favorites.has('record-gol'),true);
assert.equal(favorites.toggle('invalid'),false);favorites.reload(null);assert.equal(favorites.values.size,0);
const session=createFavorites({getItem(){throw new Error('denied');},setItem(){throw new Error('quota');}});
assert.equal(session.toggle('record-gol'),false);assert.equal(session.has('record-gol'),true);
const record={id:'record-gol',category:'gol',title:'Più gol in una stagione',period:'2011/12',description:'Barcellona',number:'73'};
assert(matchesRecord(record,'piu 2012 73','gol'));assert(!matchesRecord(record,'73','premi'));
assert(!matchesRecord(record,'73','salvati'));assert(matchesRecord(record,'73','salvati',new Set(['record-gol'])));
console.log('PASS validated storage, safe snapshots, session fallback, clearing, accent/year search and saved/category filters');
