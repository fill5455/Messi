"use strict";
window.MESSI_SNAPSHOT = {
  schemaVersion: 1,
  source: "messi.com",
  sourceUrl: "https://messi.com/estadisticas-totales/",
  acquiredAt: "2026-10-09T10:42:07.298Z",
  status: "snapshot",
  teams: {
    barcelona: {
      label: "FC Barcelona",
      period: "2004-2021",
      goals: 672,
      assists: 269,
      appearances: 778,
      trophies: 35,
      doubles: 137,
      hatTricks: 42,
      fourGoals: 6,
      fiveGoals: 1,
    },
    argentina: {
      label: "Argentina",
      period: "2005-2026",
      goals: 126,
      assists: 71,
      appearances: 208,
      trophies: 6,
      doubles: 13,
      hatTricks: 9,
      fourGoals: 0,
      fiveGoals: 1,
    },
    psg: {
      label: "Paris Saint-Germain",
      period: "2021-2023",
      goals: 32,
      assists: 34,
      appearances: 75,
      trophies: 3,
      doubles: 4,
      hatTricks: 0,
      fourGoals: 0,
      fiveGoals: 0,
    },
    miami: {
      label: "Inter Miami",
      period: "Dal 2023",
      goals: 102,
      assists: 57,
      appearances: 117,
      trophies: 4,
      doubles: 23,
      hatTricks: 2,
      fourGoals: 1,
      fiveGoals: 0,
    },
    total: {
      label: "Tutta la carriera",
      period: "Partite ufficiali",
      goals: 932,
      assists: 431,
      appearances: 1178,
      trophies: 48,
      awards: 57,
      doubles: 177,
      hatTricks: 53,
      fourGoals: 7,
      fiveGoals: 2,
    },
  },
};
(() => {
  const $ = (s) => document.querySelector(s),
    fmt = new Intl.NumberFormat("it-IT");
  const CONFIG = {
    officialHome:
      "https://messi.com/wp-json/wp/v2/pages/73?_fields=content,modified",
    officialTotals:
      "https://messi.com/wp-json/wp/v2/pages/3313?_fields=content,modified",
    cacheTTL: 60000,
    refreshInterval: 60000,
    liveEndpoint: null,
  };
  // Shared motion: pointer gestures only; interrupted transitions resume from presentation state.
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  const motionByElement = new WeakMap();
  const runningMotion = new Set();
  let keyboardInput = false;
  document.addEventListener("keydown", () => {
    keyboardInput = true;
    document.body.dataset.input = "keyboard";
    runningMotion.forEach((animation) => animation.cancel());
  }, { capture: true });
  document.addEventListener("pointerdown", () => {
    keyboardInput = false;
    document.body.dataset.input = "pointer";
  }, { capture: true });
  motionPreference.addEventListener("change", (event) => {
    if (event.matches) runningMotion.forEach((animation) => animation.cancel());
  });
  function motion(element, frames, duration = 200, easing = "cubic-bezier(.23,1,.32,1)", delay = 0) {
    const previous = motionByElement.get(element);
    if (previous) {
      const style = getComputedStyle(element);
      frames = [{ ...frames[0], opacity: style.opacity, ...(frames[0].transform ? { transform: style.transform } : {}) }, frames[1]];
      previous.cancel();
    }
    if (!element?.animate || keyboardInput || motionPreference.matches) return Promise.resolve(true);
    const animation = element.animate(frames, { duration, easing, delay, fill: "both" });
    motionByElement.set(element, animation);
    runningMotion.add(animation);
    return animation.finished.then(() => true, () => false).finally(() => {
      runningMotion.delete(animation);
      if (motionByElement.get(element) === animation) motionByElement.delete(element);
      animation.cancel();
    });
  }

  /* Set liveEndpoint to your own HTTPS JSON gateway; never put API keys here. */
  const store = {
    read(k) {
      try {
        return JSON.parse(localStorage.getItem(k));
      } catch {
        return null;
      }
    },
    write(k, v) {
      try {
        localStorage.setItem(k, JSON.stringify(v));
      } catch {}
    },
  };
  const stamp = (v) => {
    const d = new Date(v);
    return Number.isNaN(d.getTime())
      ? "Data non disponibile"
      : new Intl.DateTimeFormat("it-IT", {
          timeZone: "Etc/GMT-2",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(d) + " UTC+2";
  };
  const safeURL = (url) => {
    try {
      const u = new URL(url);
      return u.protocol === "https:" ? u.href : null;
    } catch {
      return null;
    }
  };
  const media = window.MESSI_MEDIA || {};
  // Every photograph has a local JPEG and WebP variant; never hide a failed image.
  function protectImage(img) {
    if (img.dataset.protectedImage) return;
    img.dataset.protectedImage = "true";
    img.addEventListener("load", () => {
      img.dataset.mediaState = "ready";
      img.parentElement?.querySelector(".media-message")?.remove();
    });
    img.addEventListener("error", () => {
      const requested = img.getAttribute("src") || "";
      const alternate = requested.replace(/\.(jpg|webp)(?=\?|$)/, (_, type) => type === "jpg" ? ".webp" : ".jpg");
      if (alternate !== requested && img.dataset.mediaState !== "retrying") {
        img.dataset.preferredSrc = requested;
        img.dataset.mediaState = "retrying";
        img.src = alternate;
        return;
      }
      img.dataset.mediaState = "unavailable";
      if (!img.parentElement?.querySelector(".media-message")) {
        const message = document.createElement("span");
        message.className = "media-message";
        message.textContent = "Immagine non disponibile. Riprova quando la connessione torna stabile.";
        message.setAttribute("role", "status");
        img.after(message);
      }
    });
  }
  function hydrate(scope = document) {
    scope.querySelectorAll("img").forEach((img) => {
      protectImage(img);
      const value = media[img.dataset.media];
      if (value && img.getAttribute("src") !== value) img.src = value;
      if (img.complete && img.getAttribute("src") && img.naturalWidth === 0) {
        queueMicrotask(() => img.dispatchEvent(new Event("error")));
      }
    });
  }
  hydrate();
  window.addEventListener("online", () => {
    document.querySelectorAll('img[data-media-state="unavailable"]').forEach(img => {
      if (!img.dataset.preferredSrc) return;
      img.dataset.mediaState = "loading";
      img.src = img.dataset.preferredSrc;
    });
  });
  // Career chapters share the same acquired official statistics as the dashboard.
  const chapterData = {
    barcelona: {
      title: "La casa.\nLa storia.",
      period: "2004–2021",
      crest: "barcelona-logo",
      image: "barcelona-2011",
      alt: "Messi esulta con Abidal e Dani Alves al Camp Nou nel 2011",
      description:
        "Diciassette stagioni. Dal primo gol al Camp Nou a un’eredità che cambia il calcio d’attacco.",
      source: "https://www.fcbarcelona.com/en/card/2214377/leo-messi",
      link: "Esplora l’archivio del club",
      credit: "Composizione fotografica ufficiale · messi.com",
      position: "52% 28%",
    },
    psg: {
      title: "Parigi.\nUn altro mondo.",
      period: "2021–2023",
      crest: "psg-logo",
      image: "psg-crisp",
      alt: "Messi con il PSG contro il Nantes, nel 2021",
      description:
        "Un nuovo campionato, accanto a Neymar e Mbappé. Due Ligue 1 e una Supercoppa nel capitolo parigino.",
      source: "https://messi.com/palmares/",
      link: "Esplora il palmarès ufficiale",
      credit: "PSG–Nantes, 2021 · Galleria ufficiale messi.com",
      position: "52% 32%",
    },
    miami: {
      title: "Miami.\nNuovi orizzonti.",
      period: "Dal 2023",
      crest: "miami-logo",
      image: "miami-leagues-2023",
      alt: "Messi esulta nella finale di Leagues Cup contro Nashville nel 2023",
      description:
        "La Leagues Cup inaugura il capitolo americano. Il numero dieci porta il suo calcio negli Stati Uniti.",
      source: "https://messi.com/palmares/",
      link: "Esplora i titoli con Miami",
      credit:
        "New York City FC–Inter Miami, 24 settembre 2025 · Bryan Berlin, CC BY-SA 4.0",
      position: "42% 32%",
    },
    argentina: {
      title: "Argentina.\nIl cuore.",
      period: "2005–2026",
      crest: "argentina-logo",
      image: "messi-argentina",
      alt: "Messi con la maglia dell’Argentina a Qatar 2022",
      description:
        "L’attesa, le finali, la Coppa. Il legame con l’Albiceleste attraversa oltre vent’anni, fino all’ultimo saluto al Monumental.",
      source:
        "https://messi.com/emotivo-adios-de-leo-con-la-seleccion-con-un-gol-y-doble-asistencia/",
      link: "Leggi il saluto all’Argentina",
      credit: "Qatar 2022 · Composizione fotografica ufficiale messi.com",
      position: "55% 28%",
    },
  };
  let activeChapter = "barcelona";
  function renderChapter(animateSelection = false) {
    $(".chapter-stage").dataset.chapter = activeChapter;
    const chapter = chapterData[activeChapter],
      stats = data.teams[activeChapter];
    $("#chapter-selector").value = activeChapter;
    $("#chapter-title").textContent = chapter.title;
    $("#chapter-period").textContent = chapter.period;
    $("#chapter-description").textContent = chapter.description;
    const img = $("#chapter-image");
    img.dataset.mediaState = "loading";
    img.src = media[chapter.image];
    img.alt = chapter.alt;
    img.style.objectPosition = chapter.position;
    $("#chapter-crest").src = media[chapter.crest];
    $("#chapter-crest").alt = stats.label;

    $("#chapter-photo-credit").textContent =
      chapter.period + " · " + stats.label;
    $("#chapter-goals").textContent = fmt.format(stats.goals);
    $("#chapter-assists").textContent = fmt.format(stats.assists);
    $("#chapter-titles").textContent = fmt.format(stats.trophies);
    if (animateSelection) {
      motion(img, [{ opacity: .55 }, { opacity: 1 }], 220);
      motion($("#chapter-copy"), [{ opacity: .65 }, { opacity: 1 }], 200);
    }
    img.dataset.shownChapter = activeChapter;
    $("#chapter-update").textContent =
      "Ultima verifica automatica: " + stamp(data.acquiredAt);
    document
      .querySelectorAll("[data-chapter]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.chapter === activeChapter),
        ),
      );
  }
  document.querySelectorAll("[data-chapter]").forEach((button) =>
    button.addEventListener("click", () => {
      if (activeChapter === button.dataset.chapter) return;
      activeChapter = button.dataset.chapter;
      renderChapter(true);
    }),
  );

  // Move the touch popup outside the blurred header: filtered ancestors contain fixed elements.
  const touchLayout = matchMedia("(max-width:1024px)");
  function placeNavigation() {
    if (touchLayout.matches) document.body.append($("#main-nav"));
    else $(".header-tools").before($("#main-nav"));
  }
  placeNavigation();
  touchLayout.addEventListener("change", placeNavigation);
  // The archive intentionally uses one permanent dark theme.
  let menuRevision = 0;
  async function closeMenu(animateExit = false) {
    const revision = ++menuRevision;
    const nav = $("#main-nav");
    $("#menu").setAttribute("aria-expanded", "false");
    $("#menu").setAttribute("aria-label", "Apri menu");
    if (animateExit === true && nav.classList.contains("open") && !keyboardInput && !motionPreference.matches && nav.animate) {
      await motion(nav, [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.96)" }], 160);
    } else motionByElement.get(nav)?.cancel();
    if (revision === menuRevision) nav.classList.remove("open");
  }
  $("#menu").addEventListener("click", () => {
    if ($("#menu").getAttribute("aria-expanded") === "true") {
      closeMenu(true);
      return;
    }
    ++menuRevision;
    $("#main-nav").classList.add("open");
    $("#menu").setAttribute("aria-expanded", "true");
    $("#menu").setAttribute("aria-label", "Chiudi menu");
    motion($("#main-nav"), [{ opacity: 0, transform: "scale(.96)" }, { opacity: 1, transform: "scale(1)" }], 200, "cubic-bezier(.32,.72,0,1)");
    $("#main-nav a")?.focus();
  });
  document
    .querySelectorAll("#main-nav a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $("#main-nav").classList.contains("open")) {
      closeMenu();
      $("#menu").focus();
    }
  });
  matchMedia("(min-width:1025px)").addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            document.querySelectorAll("#main-nav a").forEach((a) => {
              if (a.hash === "#" + e.target.id)
                a.setAttribute("aria-current", "location");
              else a.removeAttribute("aria-current");
            });
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((s) => navObserver.observe(s));
  }
  const trophyData = {
    worldcup: {
      title: "Coppa del Mondo",
      count: "1 vittoria · Argentina",
      media: "trophy-worldcup",
      description:
        "Qatar 2022. Messi segna due gol nella finale contro la Francia e riceve la Golden Ball del torneo. Una vittoria che unisce generazioni di argentini.",
      years: "2022",
    },
    ballon: {
      title: "Pallone d’Oro",
      count: "8 riconoscimenti individuali",
      media: "trophy-ballon",
      description:
        "Otto premi distribuiti lungo una carriera. Il primo nel 2009; l’ottavo nel 2023, dopo il trionfo mondiale con l’Argentina.",
      years: "2009 · 2010 · 2011 · 2012 · 2015 · 2019 · 2021 · 2023",
    },
    champions: {
      title: "Champions League",
      count: "4 vittorie · FC Barcelona",
      media: "trophy-champions",
      description:
        "Quattro edizioni nella bacheca blaugrana. Messi segna nelle finali del 2009 e del 2011 contro il Manchester United.",
      years: "2005/06 · 2008/09 · 2010/11 · 2014/15",
    },
    copa: {
      title: "Copa América",
      count: "2 vittorie · Argentina",
      media: "copa-2021",
      description:
        "Il successo del 2021 in Brasile chiude una lunga attesa. Nel 2024 l’Argentina difende il titolo negli Stati Uniti.",
      years: "2021 · 2024",
    },
    liga: {
      title: "LaLiga",
      count: "10 vittorie · FC Barcelona",
      media: "trophy-liga",
      description:
        "Dieci campionati spagnoli attraversano la sua storia con il Barcellona. Nel 2011/12 firma 50 gol in una singola edizione.",
      years:
        "2004/05 · 2005/06 · 2008/09 · 2009/10 · 2010/11 · 2012/13 · 2014/15 · 2015/16 · 2017/18 · 2018/19",
    },
    boot: {
      title: "Scarpa d’Oro europea",
      count: "6 riconoscimenti individuali",
      media: "trophy-boot",
      description:
        "Il premio ai migliori marcatori dei campionati europei. Sei vittorie che accompagnano la sua prolificità con il Barcellona.",
      years: "2009/10 · 2011/12 · 2012/13 · 2016/17 · 2017/18 · 2018/19",
    },
  };
  let dialogOpener;
  const dialog = $("#trophy-dialog");
  document.querySelectorAll("[data-trophy]").forEach((b) =>
    b.addEventListener("click", () => {
      const d = trophyData[b.dataset.trophy];
      dialogOpener = b;
      $("#dialog-title").textContent = d.title;
      $("#dialog-count").textContent = d.count;
      $("#dialog-description").textContent = d.description;
      $("#dialog-years").textContent = d.years;
      $("#dialog-photo-note").textContent =
        d.media === "trophy-ballon"
          ? "Messi con il suo ottavo Pallone d’Oro, 2023. "
          : d.media === "trophy-worldcup"
            ? "Messi con la Coppa del Mondo a Qatar 2022. "
            : d.media === "trophy-champions"
              ? "Messi con la Champions League conquistata a Roma nel 2009."
              : d.media === "trophy-boot"
 ? "Messi con le sue sei Scarpe d’Oro europee, 2019."
 : d.media === "trophy-liga"
 ? "Messi solleva il trofeo LaLiga con il FC Barcelona."
 : "Messi bacia la Copa América conquistata nel 2021.";
      $("#dialog-image").src = media[d.media + "-detail"] || media[d.media];
      $("#dialog-image").dataset.mediaState = "loading";
      $("#dialog-image").alt =
        d.media === "trophy-ballon"
          ? "Messi con il suo ottavo Pallone d’Oro nel 2023"
          : d.media === "trophy-worldcup"
            ? "Messi con la Coppa del Mondo a Qatar 2022"
            : d.title;
      ++dialogRevision;
      dialogClosing = false;
      dialog.showModal();
      motion(dialog, [{ opacity: 0, transform: "scale(.97)" }, { opacity: 1, transform: "scale(1)" }], 250);
      document.body.style.overflow = "hidden";
      $("#dialog-close").focus();
    }),
  );
  let dialogClosing = false;
  let dialogRevision = 0;
  async function closeDialog() {
    if (!dialog.open || (dialogClosing && !keyboardInput)) return;
    dialogClosing = true;
    const revision = ++dialogRevision;
    if (!keyboardInput && !motionPreference.matches && dialog.animate) {
      await motion(dialog, [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.97)" }], 180);
    } else motionByElement.get(dialog)?.cancel();
    if (revision !== dialogRevision) return;
    dialog.close();
    dialogClosing = false;
  }
  dialog.addEventListener("cancel", (event) => { event.preventDefault(); closeDialog(); });
  $("#dialog-close").addEventListener("click", closeDialog);
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        closeDialog();
    }
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
    dialogOpener?.focus();
  });
  const track = $("#trophy-track"),
    reduced = matchMedia("(prefers-reduced-motion: reduce)");
  function shift(sign) {
    const item = track.querySelector(".trophy-card"),
      gap = Number.parseFloat(getComputedStyle(track).columnGap) || 16;
    track.scrollBy({
      left: sign * (item.getBoundingClientRect().width + gap),
      behavior: reduced.matches || keyboardInput ? "instant" : "smooth",
    });
  }
  $("#trophies-prev").addEventListener("click", () => shift(-1));
  $("#trophies-next").addEventListener("click", () => shift(1));
  const valid = (d) =>
    d?.schemaVersion === 1 &&
    !Number.isNaN(Date.parse(d.acquiredAt)) &&
    ["total", "barcelona", "argentina", "psg", "miami"].every(
      (k) =>
        d.teams?.[k] &&
        [
          "goals",
          "assists",
          "appearances",
          "trophies",
          "doubles",
          "hatTricks",
          "fourGoals",
          "fiveGoals",
        ].every((p) => Number.isInteger(d.teams[k][p]) && d.teams[k][p] >= 0),
    );
  let data = window.MESSI_SNAPSHOT,
    team = "total",
    busy = false;
  const cached = store.read("messi-premium-stats-v1");
  if (
    valid(cached) &&
    Date.parse(cached.acquiredAt) > Date.parse(data.acquiredAt)
  )
    data = { ...cached, status: "cached" };
  function render() {
    const d = data.teams[team];
    $("#team-selector").value = team;
    $("#team-name").textContent = d.label;
    $("#team-period").textContent = d.period;
    for (const k of [
      "goals",
      "assists",
      "appearances",
      "trophies",
      "doubles",
      "hatTricks",
      "fourGoals",
      "fiveGoals",
    ])
      $("#stat-" + k).textContent = fmt.format(d[k]);
    $("#stat-ratio").textContent = d.appearances
      ? fmt.format(Number((d.goals / d.appearances).toFixed(2)))
      : "N/D";
    $("#data-time").textContent = stamp(data.acquiredAt);
    $("#data-time").dateTime = data.acquiredAt;
    document
      .querySelectorAll(".data-date")
      .forEach((n) => (n.textContent = stamp(data.acquiredAt)));
    document
      .querySelectorAll("[data-team]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.team === team)),
      );
    renderChapter();
  }
  render();
  $("#team-selector").addEventListener("change", (event) => {
    document.querySelector('[data-team="' + event.target.value + '"]')?.click();
  });
  $("#chapter-selector").addEventListener("change", (event) => {
    document.querySelector('[data-chapter="' + event.target.value + '"]')?.click();
  });
  document.querySelectorAll("[data-team]").forEach((b) =>
    b.addEventListener("click", () => {
      if (team === b.dataset.team) return;
      team = b.dataset.team;
      render();
      document.querySelectorAll(".stat > strong, .stats-extra > div > strong").forEach((value) => {
        motion(value, [{ opacity: .6 }, { opacity: 1 }], 160);
      });
    }),
  );
  function counters(s) {
    return [...s.matchAll(/"maxperc"\s*:\s*"([\d.]+)"/g)].map((m) =>
      Math.floor(Number(m[1])),
    );
  }
  function parseOfficial(home, total) {
    const clean = (s) => s.replace(/<[^>]*>/g, " "),
      teams = {};
    for (const [key, id] of [
      ["barcelona", "barcelona"],
      ["argentina", "argentina"],
      ["psg", "psg"],
      ["miami", "inter"],
    ]) {
      const b = home.match(
        new RegExp(
          '<div class="grafico ' +
            id +
            '\\b([\\s\\S]*?)(?=<div class="tabs|<div class="grafico|<section|$)',
        ),
      )?.[0];
      if (!b) throw Error("changed");
      const v = counters(b).slice(0, 4);
      if (v.length !== 4) throw Error("changed");
      const count = (w) =>
        Number(clean(b).match(new RegExp("(\\d+)\\s+" + w + "\\b"))?.[1] ?? 0);
      teams[key] = {
        ...window.MESSI_SNAPSHOT.teams[key],
        goals: v[0],
        assists: v[1],
        appearances: v[2],
        trophies: v[3],
        doubles: count("DOBLETES"),
        hatTricks: count("HAT-TRICK"),
        fourGoals: count("POKER"),
        fiveGoals: count("REPOKER"),
      };
    }
    const v = counters(total);
    if (v.length < 5) throw Error("changed");
    const count = (w) => {
      const m = clean(total).match(new RegExp("(\\d+)\\s+" + w + "\\b"));
      if (!m) throw Error("changed");
      return Number(m[1]);
    };
    teams.total = {
      ...window.MESSI_SNAPSHOT.teams.total,
      goals: v[0],
      assists: v[1],
      appearances: v[2],
      trophies: v[3],
      awards: v[4],
      doubles: count("DOBLETES"),
      hatTricks: count("HAT-TRICK"),
      fourGoals: count("POKER"),
      fiveGoals: count("REPOKER"),
    };
    for (const k of ["goals", "assists", "appearances", "trophies"])
      if (
        ["barcelona", "argentina", "psg", "miami"].reduce(
          (n, t) => n + teams[t][k],
          0,
        ) !== teams.total[k]
      )
        throw Error("inconsistent");
    if (teams.total.goals < window.MESSI_SNAPSHOT.teams.total.goals)
      throw Error("regression");
    return {
      schemaVersion: 1,
      source: "messi.com",
      sourceUrl: "https://messi.com/estadisticas-totales/",
      acquiredAt: new Date().toISOString(),
      status: "fresh",
      teams,
    };
  }
  async function getJSON(url) {
    const c = new AbortController(),
      timer = setTimeout(() => c.abort(), 12000);
    try {
      const r = await fetch(url, {
        cache: "no-store",
        signal: c.signal,
        credentials: "omit",
        headers: { Accept: "application/json" },
      });
      if (!r.ok) throw Error("source");
      return await r.json();
    } finally {
      clearTimeout(timer);
    }
  }
  let statsTimer;
  let statsFailures = 0;
  function scheduleStats(delay = CONFIG.refreshInterval) {
    clearTimeout(statsTimer);
    if (!document.hidden && navigator.onLine !== false && location.protocol.startsWith("http")) {
      statsTimer = setTimeout(() => refresh(), delay);
    }
  }
  async function refresh(force = false) {
    if (busy || document.hidden) return;
    if (navigator.onLine === false) {
      $("#data-status").textContent = "Sei offline. Le ultime statistiche disponibili restano visibili.";
      return;
    }
    const age = Date.now() - Date.parse(data.acquiredAt);
    if (!force && age < CONFIG.cacheTTL && data.status !== "snapshot") {
      scheduleStats(CONFIG.cacheTTL - age);
      return;
    }
    busy = true;
    $(".stats-grid").setAttribute("aria-busy", "true");
    $("#data-status").textContent = "Verifica automatica delle statistiche…";
    try {
      const [home, total] = await Promise.all([getJSON(CONFIG.officialHome), getJSON(CONFIG.officialTotals)]);
      const next = parseOfficial(home.content.rendered, total.content.rendered);
      if (!valid(next)) throw Error("invalid");
      data = next;
      store.write("messi-premium-stats-v1", next);
      render();
      statsFailures = 0;
      $("#data-status").textContent = "Aggiornamento automatico attivo.";
    } catch {
      statsFailures++;
      $("#data-status").textContent = "Aggiornamento momentaneamente non disponibile. Mostriamo l’ultima lettura valida e riproviamo automaticamente.";
    } finally {
      busy = false;
      $(".stats-grid").setAttribute("aria-busy", "false");
      scheduleStats(Math.min(CONFIG.refreshInterval * 2 ** Math.min(statsFailures, 3), 300000));
    }
  }
  window.addEventListener("online", () => refresh(true));
  window.addEventListener("offline", () => {
    clearTimeout(statsTimer);
    $("#data-status").textContent = "Sei offline. Le ultime statistiche disponibili restano visibili.";
  });
  function node(tag, text, cls) {
    const n = document.createElement(tag);
    n.textContent = text;
    if (cls) n.className = cls;
    return n;
  }
  function link(url, text) {
    const a = node("a", text);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  const credits = window.MESSI_CREDITS || [];
  for (const c of credits) {
    const item = node("div", "", "asset-credit-item");
    item.append(node("h4", c.title || c.key));
    const body = node("div", "");
    body.append(node("p", c.author + " · " + c.license));
    if (c.note) body.append(node("p", c.note));
    const source = safeURL(c.sourceUrl),
      license = safeURL(c.licenseUrl);

    if (source && /^CC BY/.test(c.license)) body.append(link(source, "Fotografia originale"));
    if (license && license !== source) body.append(link(license, "Licenza"));
    item.append(body);
    $("#asset-credits").append(item);
  }
  $("#worldcup-credit").textContent = "Qatar 2022 · Il sogno diventato realtà.";
  let liveTimer,
    liveBusy = false;
  function showLive(d, stale = false) {
    $("#live-state").textContent = stale
      ? "Ultima lettura live valida"
      : d.fixtures.length
        ? "Partita in corso"
        : "Nessuna partita live";
    $("#live-title").textContent =
      "Inter Miami · " + (d.source || "Feed sportivo");
    const content = $("#live-content");
    content.replaceChildren();
    if (!d.fixtures.length)
      content.append(
        node("p", "Nessun incontro live rilevato nell’ultima lettura."),
      );
    for (const f of d.fixtures) {
      content.append(node("p", f.home + " · " + f.away));
      content.append(
        node(
          "strong",
          `${f.homeGoals ?? "N/D"} : ${f.awayGoals ?? "N/D"}`,
          "live-score",
        ),
      );
      content.append(
        node("p", f.status + " · " + (f.elapsed ?? "N/D") + " min"),
      );
    }
    $("#live-time").textContent =
      "Fonte: " +
      (d.source || "Feed sportivo") +
      " · Acquisito: " +
      stamp(d.acquiredAt) +
      (stale ? " · Fonte momentaneamente non disponibile" : "");
  }
  async function live() {
    if (document.hidden || liveBusy || !CONFIG.liveEndpoint) return;
    liveBusy = true;
    let active = false;
    try {
      const d = await getJSON(CONFIG.liveEndpoint);
      if (
        !Array.isArray(d.fixtures) ||
        d.fixtures.some(
          (f) =>
            !f ||
            typeof f.home !== "string" ||
            typeof f.away !== "string" ||
            typeof f.status !== "string",
        ) ||
        Number.isNaN(Date.parse(d.acquiredAt))
      )
        throw Error("invalid");
      showLive(d);
      store.write("messi-premium-live-v1", d);
      active = d.fixtures.length > 0;
    } catch {
      const old = store.read("messi-premium-live-v1");
      if (old?.acquiredAt && Array.isArray(old.fixtures)) showLive(old, true);
      else {
        $("#live-state").textContent = "Feed momentaneamente non disponibile";
        $("#live-time").textContent =
          "Puoi consultare il calendario ufficiale.";
      }
    } finally {
      liveBusy = false;
      clearTimeout(liveTimer);
      if (!document.hidden)
        liveTimer = setTimeout(live, active ? 15000 : 60000);
    }
  }
  document.addEventListener("visibilitychange", () => {
    clearTimeout(liveTimer);
    clearTimeout(statsTimer);
    if (!document.hidden) {
      live();
      refresh(true);
    }
  });
  // Keep one dominant action visible, and navigation in the phone thumb zone.
  if ("IntersectionObserver" in window) {
    const actionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting;
        $("#dock-action").hidden = Boolean(visible);
        $("#dock-context").hidden = !visible;
      },
      { threshold: 0.15 },
    );
    actionObserver.observe($("#hero-action"));
  }
  let progressPending = false;
  function updateProgress() {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    $("#reading-progress").style.transform =
      "scaleX(" +
      (range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0) +
      ")";
    progressPending = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!progressPending) {
        progressPending = true;
        requestAnimationFrame(updateProgress);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", updateProgress);
  // First-time narrative motion: distinct photographic and reading entrances, never hidden defaults.
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      let trophyOrder = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target;
        observer.unobserve(element);
        if (keyboardInput || motionPreference.matches || !element.animate) continue;
        let frames, duration = 640, delay = 0;
        if (element.matches(".world-cup-section > img")) {
          frames = [{opacity: .75, transform: "scale(1.035)", clipPath: "inset(0 0 8% 0)"}, {opacity: 1, transform: "scale(1)", clipPath: "inset(0)"}];
          duration = 880;
        } else if (element.matches(".trophy-card")) {
          frames = [{opacity: .55, transform: "translateY(24px) scale(.97)"}, {opacity: 1, transform: "translateY(0) scale(1)"}];
          duration = 720;
          delay = Math.min(trophyOrder++ * 50, 150);
        } else if (element.matches("img")) {
          frames = [{opacity: .65, clipPath: "inset(0 0 8% 0)"}, {opacity: 1, clipPath: "inset(0)"}];
          duration = 800;
        } else {
          frames = [{opacity: .65, transform: "translateY(16px)"}, {opacity: 1, transform: "translateY(0)"}];
        }
        // Wait for the actual photograph, so a lazy request cannot consume its entrance offscreen.
        const play = () => {
          if (element.getBoundingClientRect().bottom > 0 && element.getBoundingClientRect().top < window.innerHeight) motion(element, frames, duration, "cubic-bezier(.23,1,.32,1)", delay);
        };
        if (element.matches("img") && !element.complete) element.addEventListener("load", play, {once:true});
        else play();
      }
    }, {threshold: .12, rootMargin: "0px 0px -32px 0px"});
    document.querySelectorAll(".chapter-stage > img, .trophy-card, .world-cup-section > img, .world-cup-content, .story-image > img, .story-timeline article, .moment-context img, .bio-context img, .news-context-image").forEach(element => revealObserver.observe(element));
  }
  // Native disclosures keep their semantics and respond immediately before the content settles.
  document.querySelectorAll("details").forEach(disclosure => {
    disclosure.addEventListener("toggle", () => {
      if (!disclosure.open) return;
      [...disclosure.children].filter(child => child.tagName !== "SUMMARY").forEach(child => {
        motion(child, [{opacity:.5,transform:"translateY(-8px)"},{opacity:1,transform:"translateY(0)"}], 220);
      });
    });
  });
  if (location.protocol.startsWith("http")) {
    refresh(true);
    if (CONFIG.liveEndpoint) {
      $(".live-panel").hidden = false;
      live();
    }
  } else
    $("#data-status").textContent =
      "Archivio locale: ultima lettura valida inclusa.";
})();
