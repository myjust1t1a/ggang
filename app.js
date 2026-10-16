(() => {
  const P = window.PHONE, S = window.STORY;
  const WD = ["일", "월", "화", "수", "목", "금", "토"];
  const parseD = str => { const [y, m, d] = str.split("-").map(Number); return new Date(y, m - 1, d); };
  const TODAY = P.today ? parseD(P.today) : new Date();
  if (P.today || !P.day) { P.weekday = WD[TODAY.getDay()] + "요일"; P.day = TODAY.getDate(); }
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };

  /* ================= 본문 ================= */
  const story = $("#story");
  story.innerHTML = (S.title ? `<h1>${esc(S.title)}</h1>` : "") + S.paragraphs.map(p =>
    p.trim() === "" ? `<p class="gap"></p>` :
      `<p>${esc(p).replace(/\[\[(.+?)\]\]/g, '<a class="phone-link" href="#phone">$1</a>')}</p>`
  ).join("");

  /* ================= 아이콘 ================= */
  const I = {
    calendar: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/><text x="30" y="17.5" text-anchor="middle" font-size="9.5" font-weight="600" fill="#f23b30">${esc(P.weekday)}</text><text x="30" y="48" text-anchor="middle" font-size="31" font-weight="400" fill="#111" letter-spacing="-1.2">${P.day}</text></svg>`,
    photos: `<svg viewBox="0 0 60 60"><defs><linearGradient id="phs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc8ff"/><stop offset="1" stop-color="#ffd7a8"/></linearGradient></defs><rect width="60" height="60" fill="#fff"/><rect x="9" y="12" width="42" height="36" rx="7" fill="url(#phs)"/><circle cx="40" cy="22" r="4.5" fill="#fff6c9"/><path d="M9 42l12-13 9 9 6-6 15 13v3a7 7 0 0 1-7 7H16a7 7 0 0 1-7-7z" fill="#3fa36b"/><path d="M27 48l9-16 15 16z" fill="#2d7d52"/></svg>`,
    camera: `<svg viewBox="0 0 60 60"><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e9eb"/><stop offset="1" stop-color="#c8c8cc"/></linearGradient><radialGradient id="cl" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#8fa6d8"/><stop offset=".18" stop-color="#2a3560"/><stop offset=".6" stop-color="#0a0d18"/><stop offset="1" stop-color="#000"/></radialGradient><radialGradient id="cr" cx=".5" cy=".5" r=".5"><stop offset=".78" stop-color="#2b2b2e"/><stop offset=".9" stop-color="#5b5b60"/><stop offset="1" stop-color="#9a9aa0"/></radialGradient></defs><rect width="60" height="60" fill="url(#cg)"/><circle cx="30" cy="30" r="22" fill="url(#cr)"/><circle cx="30" cy="30" r="17" fill="url(#cl)"/><ellipse cx="25.5" cy="24.5" rx="4" ry="3" fill="#fff" opacity=".75"/><circle cx="34" cy="35" r="1.6" fill="#9fb4ff" opacity=".5"/></svg>`,
    clock: (() => { const [hh, mm] = (P.time || "10:10").split(":").map(Number); const ha = ((hh % 12) + mm / 60) * 30, ma = mm * 6;
      return `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/>${[...Array(60)].map((_, i) => i % 15 === 0 ? "" : `<line x1="30" y1="5" x2="30" y2="${i % 5 ? 7.5 : 9.5}" stroke="${i % 5 ? "#9a9a9e" : "#3a3a3c"}" stroke-width="${i % 5 ? .6 : 1.4}" transform="rotate(${i * 6} 30 30)"/>`).join("")}<g font-size="9" font-weight="600" fill="#3a3a3c" text-anchor="middle"><text x="30" y="14">12</text><text x="49" y="33.2">3</text><text x="30" y="52.5">6</text><text x="11" y="33.2">9</text></g><line x1="30" y1="30" x2="30" y2="17" stroke="#111" stroke-width="2.8" stroke-linecap="round" class="ic-h" transform="rotate(${ha} 30 30)"/><line x1="30" y1="30" x2="30" y2="10.5" stroke="#111" stroke-width="2.2" stroke-linecap="round" class="ic-m" transform="rotate(${ma} 30 30)"/><g class="ic-sec" transform="rotate(0 30 30)"><line x1="30" y1="35" x2="30" y2="8.5" stroke="#f5a623" stroke-width="1"/></g><circle cx="30" cy="30" r="2" fill="#111"/><circle cx="30" cy="30" r="1" fill="#f5a623"/></svg>`; })(),
    notes: `<svg viewBox="0 0 60 60"><defs><linearGradient id="nt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffdf5e"/><stop offset="1" stop-color="#f7c843"/></linearGradient><linearGradient id="nb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#f1f1f3"/></linearGradient></defs><rect width="60" height="60" fill="url(#nb)"/><rect width="60" height="20" fill="url(#nt)"/>${[...Array(15)].map((_, i) => `<circle cx="${4 + i * 3.7}" cy="23" r=".7" fill="#c7c7cc"/>`).join("")}<line x1="11" y1="34" x2="49" y2="34" stroke="#c7c7cc" stroke-width="1.6" stroke-linecap="round"/><line x1="11" y1="46" x2="49" y2="46" stroke="#c7c7cc" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    mail: `<svg viewBox="0 0 60 60"><defs><linearGradient id="ml" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e90ff"/><stop offset="1" stop-color="#0a5fd8"/></linearGradient></defs><rect width="60" height="60" fill="url(#ml)"/><rect x="11" y="18" width="38" height="25" rx="3.5" fill="#fff"/><path d="M12 20l18 13 18-13" fill="none" stroke="#9cc3f5" stroke-width="2.2" stroke-linejoin="round"/></svg>`,
    translate: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#f1f3f7"/><rect x="8" y="10" width="28" height="30" rx="4" fill="#4a86f0"/><text x="22" y="32" text-anchor="middle" font-size="17" font-weight="700" fill="#fff">가</text><rect x="25" y="22" width="27" height="28" rx="4" fill="#fff" stroke="#c9d3e6"/><text x="38.5" y="42" text-anchor="middle" font-size="15" fill="#555">文</text></svg>`,
    weather: `<svg viewBox="0 0 60 60"><defs><linearGradient id="wt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b8de8"/><stop offset="1" stop-color="#7fc3f7"/></linearGradient></defs><rect width="60" height="60" fill="url(#wt)"/><circle cx="24" cy="24" r="9" fill="#ffd34d"/><path d="M22 44h20a7 7 0 0 0 0-14 9 9 0 0 0-17-1 6.5 6.5 0 0 0-3 15z" fill="#fff"/></svg>`,
    phone: `<svg viewBox="0 0 60 60"><defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ef06b"/><stop offset="1" stop-color="#1fc23b"/></linearGradient></defs><rect width="60" height="60" fill="url(#pg)"/><path d="M21.5 14.5c1.4-.9 3.1-.5 4 .9l3 4.7c.8 1.3.5 3-.7 3.9l-2.2 1.7c1.5 3.8 4.6 7.2 8.4 9l1.8-2.1c1-1.1 2.7-1.4 3.9-.5l4.5 3.2c1.3 1 1.6 2.8.6 4.1l-1.6 2.1c-1.6 2-4.3 2.8-6.8 2C25.9 42.1 18.5 34.6 15.4 26c-.9-2.4-.2-5.1 1.8-6.8z" fill="#fff"/></svg>`,
    chrome: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/><circle cx="30" cy="30" r="21" fill="none" stroke="#1a73e8" stroke-width="3"/><ellipse cx="30" cy="30" rx="9" ry="21" fill="none" stroke="#1a73e8" stroke-width="2.4"/><path d="M10 30h40M13 20h34M13 40h34" stroke="#1a73e8" stroke-width="2.4"/></svg>`,
    messages: `<svg viewBox="0 0 60 60"><defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ef06b"/><stop offset="1" stop-color="#1fc23b"/></linearGradient></defs><rect width="60" height="60" fill="url(#mg)"/><path d="M30 13c-10.5 0-19 6.9-19 15.5 0 5 2.9 9.4 7.4 12.2-.4 2.4-1.7 4.6-3.6 6.2 3.6.2 7.1-1 9.6-3.2 1.8.4 3.6.6 5.6.6 10.5 0 19-6.9 19-15.5S40.5 13 30 13z" fill="#fff"/></svg>`,
    kakao: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fee500"/><path d="M30 14c-11 0-20 6.9-20 15.4 0 5.4 3.6 10.2 9.1 12.9l-2 7.2 8.2-5.4c1.5.2 3.1.3 4.7.3 11 0 20-6.9 20-15.4S41 14 30 14z" fill="#3c1e1e"/><circle cx="22" cy="29.5" r="2.4" fill="#fee500"/><circle cx="30" cy="29.5" r="2.4" fill="#fee500"/><circle cx="38" cy="29.5" r="2.4" fill="#fee500"/></svg>`
  };
  const PERSON = `<svg viewBox="0 0 40 40"><circle cx="20" cy="15" r="8"/><path d="M4 40c1-9 8-14 16-14s15 5 16 14z"/></svg>`;
  const ic = {
    back: `<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>`,
    menu: `<svg viewBox="0 0 24 24"><path d="M4 7h16M7 12h13M10 17h10"/></svg>`,
    search: `<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>`,
    mic: `<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>`,
    compose: `<svg viewBox="0 0 24 24"><path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M17.5 3.5l3 3L12 15H9v-3z"/></svg>`,
    more: `<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1" fill="#111"/><circle cx="12" cy="12" r="1" fill="#111"/><circle cx="19" cy="12" r="1" fill="#111"/></svg>`,
    video: `<svg viewBox="0 0 24 24"><rect x="3" y="7" width="12" height="10" rx="2"/><path d="M15 11l6-3v8l-6-3"/></svg>`,
    clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>`,
    undo: `<svg viewBox="0 0 24 24"><path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg>`,
    share: `<svg viewBox="0 0 24 24"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11v9h12v-9"/></svg>`,
    check: `<svg viewBox="0 0 24 24"><circle cx="5" cy="7" r="2"/><path d="M10 7h10M10 17h10"/><circle cx="5" cy="17" r="2"/></svg>`,
    clip: `<svg viewBox="0 0 24 24"><path d="M20 11l-8 8a5 5 0 0 1-7-7l8-8a3.5 3.5 0 0 1 5 5l-8 8a2 2 0 0 1-3-3l7-7"/></svg>`,
    pen: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 16l3-8 3 8M10 13h4"/></svg>`
  };
  const av = (name, cls = "") => {
    const src = (P.avatars || {})[name];
    if (src) return `<div class="av ${cls}"><img src="${esc(src)}" alt=""></div>`;
    if (name === "juju") return `<div class="av ph ${cls}" style="align-items:center"><span style="color:#f2e6dc;font-weight:700;font-size:40%">J</span></div>`;
    return `<div class="av ${cls}">${PERSON}</div>`;
  };
  const photoBox = (m, side) => `<div class="photo ${side}">${m.img ? `<img src="${esc(m.img)}" alt="">` : `📷 ${esc(m.caption || "사진")}`}</div>`;

  /* ================= 네비게이션 ================= */
  const screens = $("#screens"), layer = $("#phoneLayer"), statusbar = $("#statusbar"), homebar = $("#homebar");
  $("#sbTime").textContent = P.time;
  let stack = [];

  function setChrome(el) {
    const dark = el.dataset.dark === "1";
    statusbar.classList.toggle("light", dark);
    homebar.classList.toggle("light", dark);
  }
  /* 아이폰처럼 아이콘에서 커지고, 아이콘으로 줄어드는 앱 열기/닫기 */
  const EASE = "cubic-bezier(.32,.72,0,1)";
  const canAnimate = typeof Element !== "undefined" && "animate" in Element.prototype;
  function iconTransform(r) {
    const d = screens.getBoundingClientRect();
    const sx = r.width / d.width, sy = r.height / d.height;
    const tx = r.left - d.left + r.width / 2 - d.width / 2, ty = r.top - d.top + r.height / 2 - d.height / 2;
    return `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;
  }
  function withAnim(ms) { const dev = $("#device"); dev.classList.add("anim"); clearTimeout(withAnim.t); withAnim.t = setTimeout(() => dev.classList.remove("anim"), ms + 40); }
  function zoomOpen(el, iconEl, home) {
    const from = iconTransform(iconEl.getBoundingClientRect());
    withAnim(520);
    el.style.borderRadius = "48px";
    el.animate([{ transform: from }, { transform: "none" }], { duration: 520, easing: EASE });
    el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "linear" });
    if (home) home.animate([{ transform: "scale(1)", opacity: 1 }, { transform: "scale(.92)", opacity: .6 }], { duration: 520, easing: EASE });
    setTimeout(() => { el.style.borderRadius = ""; }, 520);
  }
  function zoomClose(el, iconEl, home) {
    const to = iconTransform(iconEl.getBoundingClientRect());
    withAnim(460);
    el.style.borderRadius = "48px";
    el.animate([{ transform: "none" }, { transform: to }], { duration: 460, easing: EASE, fill: "forwards" });
    el.animate([{ opacity: 1 }, { opacity: 1, offset: .45 }, { opacity: 0 }], { duration: 460, easing: "linear", fill: "forwards" });
    if (home) home.animate([{ transform: "scale(.92)", opacity: .6 }, { transform: "scale(1)", opacity: 1 }], { duration: 460, easing: EASE });
  }
  function homeIcon(appId) { return appId && stack[0] ? stack[0].querySelector(`.app[data-app="${appId}"] .ic`) : null; }
  function show(el, mode, originEl) {
    const prev = stack[stack.length - 1];
    screens.appendChild(el);
    const zoom = mode === "app" && originEl && canAnimate;
    if (zoom) { el.dataset.fromApp = (originEl.closest("[data-app]") || {}).dataset?.app || ""; zoomOpen(el, originEl, prev); }
    else el.classList.add(mode === "app" ? "app-enter" : "push-enter");
    stack.push(el); setChrome(el);
    if (mode !== "none") { try { history.pushState({ d: stack.length - 1 }, "", "#phone"); } catch (e) {} }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.classList.remove("app-enter", "push-enter");
      if (prev && mode !== "app") prev.classList.add("under");
    }));
    el.querySelectorAll("[data-autobottom]").forEach(s => s.scrollTop = s.scrollHeight);
    return el;
  }
  let ignorePops = 0;
  const syncHistory = n => { if (n > 0) { ignorePops++; try { history.go(-n); } catch (e) { ignorePops--; } } };
  function popTo(depth, animateHome) {
    if (stack.length - 1 <= depth) return;
    const removed = stack.splice(depth + 1), prev = stack[depth];
    prev.classList.remove("under"); setChrome(prev); hideBanner();
    const icon = animateHome && depth === 0 && canAnimate ? homeIcon(removed[0].dataset.fromApp) : null;
    removed.forEach((t, i) => {
      if (i === removed.length - 1) {
        if (icon) zoomClose(t, icon, prev);
        else t.classList.add(animateHome && depth === 0 ? "app-enter" : "push-enter");
      }
      else t.style.opacity = 0;
      if (t._cleanup) t._cleanup();
      setTimeout(() => t.remove(), icon ? 470 : 420);
    });
  }
  function back() { if (stack.length <= 1) return; popTo(stack.length - 2); syncHistory(1); }
  function goHome() {
    if (stack.length <= 1) { const hb = homebar.querySelector("i"); hb.animate([{ transform: "translateY(0)" }, { transform: "translateY(-6px)" }, { transform: "translateY(0)" }], 300); return; }
    const n = stack.length - 1; popTo(0, true); syncHistory(n);
  }
  homebar.addEventListener("click", () => { if (locked) { if (!lockEl.classList.contains("pin")) showPin(); return; } goHome(); });
  // 제스처: 아래에서 위로 쓸기 = 홈 / 왼쪽 끝에서 오른쪽으로 쓸기 = 뒤로
  let g = null;
  const dev = $("#device");
  dev.addEventListener("pointerdown", e => {
    const r = dev.getBoundingClientRect();
    g = { x: e.clientX, y: e.clientY, bottom: r.bottom - e.clientY < 60, left: e.clientX - r.left < 28 };
  });
  dev.addEventListener("pointerup", e => {
    if (!g || locked) { g = null; return; }
    const dx = e.clientX - g.x, dy = g.y - e.clientY;
    if (g.bottom && dy > 50) goHome();
    else if (g.left && dx > 60 && Math.abs(dy) < 60) back();
    g = null;
  });

  /* ================= 홈 화면 ================= */
  const apps = [
    ["mail", "메일"], ["calendar", "캘린더"], ["clock", "시계"], ["weather", "날씨"],
    ["notes", "메모"], ["photos", "사진"], ["camera", "카메라"]
  ];
  /* 홈 화면 위젯: 오늘 날짜 + 다음 일정 2개 */
  function nextEvents(n) {
    const evs = ((P.calendar && P.calendar.events) || []).filter(e => e.start).map(e => ({ ...e, d: parseD(e.date) }));
    const now = TODAY.getTime(), t = P.time || "00:00";
    return evs.filter(e => e.d.getTime() > now || (e.d.getTime() === now && e.start > t))
      .sort((a, b) => a.d - b.d || a.start.localeCompare(b.start)).slice(0, n);
  }
  function widgetHTML() {
    const list = nextEvents(2);
    const col = c => ((P.calendar && P.calendar.calendars) || {})[c] || "#8e8e93";
    return `<button class="widget" data-app="calendar"><div class="wg-date"><small>${WD[TODAY.getDay()]}요일</small><b>${TODAY.getDate()}</b><span>${TODAY.getMonth() + 1}월</span></div><div class="wg-list">${list.length ? list.map(e => `<div class="wg-ev"><i style="background:${col(e.cal)}"></i><div><b>${esc(e.title)}</b><small>${e.d.getMonth() + 1}/${e.d.getDate()} (${WD[e.d.getDay()]}) ${esc(e.start)}${e.place ? " · " + esc(e.place) : ""}</small></div></div>`).join("") : `<div class="wg-none">다가오는 일정 없음</div>`}</div></button>`;
  }
  const dock = [["phone", "전화"], ["chrome", "Chrome"], ["messages", "메시지"], ["kakao", "카카오톡"]];
  const appBtn = ([id, label]) => {
    const b = P.badges[id];
    return `<button class="app" data-app="${id}"><div class="ic">${(P.icons || {})[id] ? `<img src="${esc(P.icons[id])}" alt="">` : I[id]}</div>${b ? `<em class="badge" data-badge="${id}">${b}</em>` : ""}<span>${esc(label)}</span></button>`;
  };
  function homeScreen() {
    const el = h(`<section class="screen home" data-dark="1">
      <button class="back-to-book" data-close>‹ 본문으로</button>
      <div class="grid">${widgetHTML()}${apps.map(appBtn).join("")}</div>
      <div class="spot"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>검색</div>
      <div class="dock">${dock.map(appBtn).join("")}</div>
    </section>`);
    el.addEventListener("click", e => {
      const a = e.target.closest("[data-app]"); if (!a) return;
      const fn = OPEN[a.dataset.app];
      if (fn) show(fn(), "app", a.querySelector(".ic"));
      else { a.classList.remove("wiggle"); void a.offsetWidth; a.classList.add("wiggle"); }
    });
    return el;
  }

  /* ================= 전화 ================= */
  function callsHTML() {
    const arrow = d => d === "out" ? "↗" : "↙";
    return P.calls.map((c, i) => `<button class="call" data-dial="${esc(c.name)}">${av(c.name)}<div class="info"><div style="min-width:0"><div class="nm ${c.missed ? "red" : ""}">${esc(c.name)}${c.count ? ` (${c.count})` : ""}</div><div class="sub">${arrow(c.dir)} ${esc(c.kind)}</div></div><span class="when">${esc(c.when)}</span><span class="ibtn">i</span></div></button>`).join("");
  }
  function phoneApp() {
    const el = h(`<section class="screen white">
      <div class="navbar"><span class="pill">편집</span><span class="seg"><span class="on">모두</span><span>부재중 전화</span></span><span class="pill round">${ic.menu}</span></div>
      <div class="scroll">
        <div class="bigtitle">최근 통화</div>
        <div class="searchfield">${ic.search}<span>검색</span><span class="mic">${ic.mic}</span></div>
        <div data-calls>${callsHTML()}</div>
        <div style="height:20px"></div>
      </div>
      <nav class="tabbar">
        <div><svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z"/></svg>즐겨찾기</div>
        <div class="on"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 6v6l-3 2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>최근 통화</div>
        <div><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="9.5" r="3.5" fill="#fff"/><path d="M5.5 18.5c1.5-3 4-4 6.5-4s5 1 6.5 4" fill="#fff"/></svg>연락처</div>
        <div><svg viewBox="0 0 24 24">${[4, 12, 20].flatMap(y => [5, 12, 19].map(x => `<circle cx="${x}" cy="${y}" r="2.6"/>`)).join("")}</svg>키패드</div>
        <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="6.5" cy="12" r="4"/><circle cx="17.5" cy="12" r="4"/><path d="M6.5 16h11"/></svg>음성 사서함</div>
      </nav>
    </section>`);
    el.addEventListener("click", e => { const r = e.target.closest("[data-dial]"); if (r && !e.target.closest(".ibtn")) outgoingCall(r.dataset.dial); });
    return el;
  }

  /* ================= 크롬 ================= */
  function chromeApp() {
    const CR = P.chrome || { shortcuts: [], searches: [], feed: [], tabs: 1 };
    const card = (f, i) => f.type === "ad"
      ? `<div class="cr-card cr-ad" data-feed="${i}"><div class="cr-img" style="background:linear-gradient(135deg,${f.tone},${f.tone}cc)"><span>${esc(f.brand)}</span></div><div class="cr-txt"><b>${esc(f.title)}</b><p>${esc(f.sub)}</p><div class="cr-meta"><span class="cr-adtag">광고</span>${esc(f.brand)}<em class="cr-cta">${esc(f.cta || "자세히")}</em></div></div></div>`
      : `<div class="cr-card" data-feed="${i}"><div class="cr-img" style="background:linear-gradient(140deg,${f.tone},${f.tone}55),repeating-linear-gradient(45deg,rgba(255,255,255,.06) 0 8px,transparent 8px 16px)"></div><div class="cr-txt"><b>${esc(f.title)}</b><div class="cr-meta"><span class="cr-src" style="background:${f.tone}">${esc(f.source[0])}</span>${esc(f.source)} · ${esc(f.time)}<em>⋮</em></div></div></div>`;
    const el = h(`<section class="screen white chrome">
      <div class="cr-bar"><button class="cr-omni" data-search>${ic.search}<span>검색어 또는 URL 입력</span></button></div>
      <div class="scroll">
        <div class="cr-logo">검색</div>
        <button class="cr-box" data-search>${ic.search}<span>검색어 또는 URL 입력</span><span class="cr-mic">${ic.mic}</span></button>
        <div class="cr-short">${(CR.shortcuts || []).map(x => `<div><i style="background:${x.color}">${esc(x.letter)}</i><span>${esc(x.label)}</span></div>`).join("")}</div>
        <div class="cr-disc"><b>Discover</b><span>⚙︎</span></div>
        ${(CR.feed || []).map(card).join("")}
        <div style="height:20px"></div>
      </div>
      <div class="cr-tool"><span>‹</span><span class="dim">›</span><span class="plus">＋</span><span class="tabs">${CR.tabs || 1}</span><span>⋯</span></div>
    </section>`);
    el.addEventListener("click", e => {
      if (e.target.closest("[data-search]")) { show(searchHistory(), "push"); return; }
      const c = e.target.closest("[data-feed]");
      if (c) { const f = CR.feed[+c.dataset.feed]; show(f.type === "ad" ? adPage(f) : articlePage(f), "push"); }
    });
    return el;
  }
  function articlePage(f) {
    const el = h(`<section class="screen white chrome">
      <div class="cr-bar"><button class="pill round" data-back>${ic.back}</button><div class="cr-omni small"><span>🔒 ${esc(f.source.replace(/\s/g, "").toLowerCase())}.news</span></div></div>
      <div class="scroll cr-article">
        <div class="cr-src-line"><span class="cr-src" style="background:${f.tone}">${esc(f.source[0])}</span>${esc(f.source)}</div>
        <h1>${esc(f.title)}</h1>
        <div class="cr-when">2026.10.18 · ${esc(f.time)}</div>
        <div class="cr-hero" style="background:linear-gradient(140deg,${f.tone},${f.tone}55)"></div>
        ${(f.body || []).map(p => `<p>${esc(p)}</p>`).join("")}
        <div class="cr-inline-ad"><span class="cr-adtag">광고</span> 지금 가입하면 첫 달 무료 · 프리미엄 경제 뉴스레터</div>
        <div style="height:30px"></div>
      </div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    return el;
  }
  function adPage(f) {
    const el = h(`<section class="screen white chrome">
      <div class="cr-bar"><button class="pill round" data-back>${ic.back}</button><div class="cr-omni small"><span>🔒 ${esc(f.brand)}</span></div></div>
      <div class="scroll"><div class="cr-adhero" style="background:linear-gradient(135deg,${f.tone},${f.tone}aa)"><small>${esc(f.brand)}</small><h1>${esc(f.title)}</h1><p>${esc(f.sub)}</p><span>${esc(f.cta || "자세히")}</span></div></div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    return el;
  }
  function searchHistory() {
    const list = (P.chrome && P.chrome.searches) || P.searches || [];
    const el = h(`<section class="screen white chrome">
      <div class="cr-bar"><div class="cr-omni active">${ic.search}<span>검색어 또는 URL 입력</span></div><button class="cr-cancel" data-back>취소</button></div>
      <div class="scroll"><div class="cr-histttl">최근 검색</div>${list.map(s => `<div class="hist">${ic.clock}<span>${esc(s)}</span><button class="del">✕</button></div>`).join("")}</div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    el.addEventListener("click", e => { const d = e.target.closest(".del"); if (d) d.parentElement.remove(); });
    return el;
  }

  /* ================= 메시지 ================= */
  function messagesApp() {
    const M = P.messages;
    const el = h(`<section class="screen white">
      <div class="navbar"><span class="pill">편집</span><b style="font-size:17px">메시지</b><span class="pill round">${ic.menu}</span></div>
      <div class="scroll">
        ${M.pinned ? `<button class="pinned" style="width:100%" data-chat="${esc(M.pinned)}">${av(M.pinned)}<span>${esc(M.pinned)}</span></button>` : `<div style="height:8px"></div>`}
        <div data-threads>${threadsHTML()}</div>
        <div style="height:110px"></div>
      </div>
      <div class="bottomsearch" style="position:absolute;left:0;right:0;bottom:0"><div class="searchfield">${ic.search}<span>검색</span><span class="mic">${ic.mic}</span></div><span class="pill round">${ic.compose}</span></div>
    </section>`);
    el.addEventListener("click", e => {
      const c = e.target.closest("[data-chat]"), t = e.target.closest("[data-thread]");
      if (c) show(imChat(c.dataset.chat, M.chats[c.dataset.chat] || []), "push");
      if (t) { const th = M.threads[+t.dataset.thread]; th.unread = false; t.querySelector(".dot")?.remove(); if (!M.chats[th.name]) M.chats[th.name] = [{ text: th.preview }]; show(imChat(th.name, M.chats[th.name], th.sms), "push"); }
    });
    messagesListEl = el;
    return el;
  }
  let messagesListEl = null;
  function threadsHTML() {
    return P.messages.threads.map((t, i) => `<button class="thread" style="width:100%;text-align:left" data-thread="${i}">${t.unread ? '<i class="dot"></i>' : ""}${av(t.name)}<div class="body"><div class="row"><span class="nm">${esc(t.name)}</span><span class="when">${esc(t.when)}</span></div><div class="pv">${esc(t.preview)}</div></div></button>`).join("");
  }
  /* 입력창: 글자를 쓰면 보내기 버튼이 나오고, 보내면 onSend(text) */
  function wireComposer(el, onSend) {
    const input = el.querySelector("[data-input]"), btn = el.querySelector("[data-send]");
    const sync = () => btn.classList.toggle("on", input.value.trim().length > 0);
    const send = () => { const t = input.value.trim(); if (!t) return; input.value = ""; sync(); onSend(t); input.focus(); };
    input.addEventListener("input", sync);
    input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.isComposing) { e.preventDefault(); send(); } });
    btn.addEventListener("click", send);
    ["pointerdown", "pointerup"].forEach(t => el.querySelector(".composer, .kcomp").addEventListener(t, e => e.stopPropagation()));
  }
  function imChat(name, msgs, sms) {
    const body = msgs.map(m => {
      const side = m.me ? "me" : "them";
      if (m.date) return `<div class="date">${esc(m.date)}</div>`;
      if (m.img !== undefined) return photoBox(m, side);
      if (m.voice) return `<div class="bub voice me"><span class="play"><svg width="12" height="12" viewBox="0 0 10 10"><path d="M2 1l7 4-7 4z" fill="#3d97f5"/></svg></span><span class="wave"></span><small>${esc(m.voice)}</small></div>`;
      return `<div class="bub ${side}${sms ? " sms" : ""}">${esc(m.text)}</div>`;
    }).join("");
    const el = h(`<section class="screen white">
      <div class="chat-head"><button class="pill round" data-back>${ic.back}</button><div class="who">${av(name)}<b>${esc(name)} ›</b></div><span class="pill round">${ic.video}</span></div>
      <div class="scroll" data-autobottom><div class="imsg">${body}</div></div>
      <div class="composer${sms ? " is-sms" : ""}"><span class="plus">+</span><label class="field"><input data-input enterkeyhint="send" autocomplete="off" placeholder="${sms ? "문자 메시지" : "iMessage"}"><button class="send" data-send aria-label="보내기"><svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></label></div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    wireComposer(el, text => {
      msgs.push({ me: true, text });
      el.querySelector(".imsg").insertAdjacentHTML("beforeend", `<div class="bub me${sms ? " sms" : ""} sent">${esc(text)}</div>`);
      const sc = el.querySelector(".scroll"); sc.scrollTop = sc.scrollHeight;
      const M = P.messages; let th = M.threads.find(t => t.name === name);
      if (th) M.threads.splice(M.threads.indexOf(th), 1); else th = { name, sms };
      Object.assign(th, { preview: text, when: P.time, unread: false }); M.threads.unshift(th);
      if (messagesListEl && messagesListEl.isConnected) messagesListEl.querySelector("[data-threads]").innerHTML = threadsHTML();
    });
    return el;
  }

  /* ================= 카카오톡 ================= */
  let kakaoNotified = false;
  const kav = c => c && c.channel ? `<div class="av kch"><span>${esc(c.name[0])}</span></div>` : av(c ? c.name : "");
  function kakaoApp() {
    const K = P.kakao;
    const row = (c, extra = "") => `<button class="kk-row ${extra}" style="width:100%;text-align:left" data-room="${esc(c.name)}">${kav(c)}<div class="body"><div class="nm">${esc(c.name)}</div><div class="pv">${esc(c.preview)}</div></div><div class="meta"><span>${esc(c.when)}</span>${c.unread ? `<em>${c.unread}</em>` : ""}</div></button>`;
    const el = h(`<section class="screen kk">
      <div class="kk-top"><h2>채팅</h2><div class="icons">${ic.search}<svg viewBox="0 0 24 24"><path d="M12 4c-4.4 0-8 2.9-8 6.5 0 2.3 1.5 4.3 3.7 5.5L7 20l3.6-2.4c.5.1.9.1 1.4.1 4.4 0 8-2.9 8-6.5S16.4 4 12 4z"/></svg><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1.3z"/></svg></div></div>
      <div class="kk-chips"><span class="on">전체</span><span>💬 <em data-kbadge>${P.badges.kakao}</em></span><span>ChatGPT</span><span style="color:#2fbf4a">✆</span></div>
      <div class="scroll">
        ${K.ad ? `<div class="kk-ad"><div><small>${esc(K.ad.label)} ›</small><b>${esc(K.ad.title)}</b><span>${esc(K.ad.sub)}</span></div><div class="${K.ad.icon === "book" ? "kbook" : "bottle"}"></div></div>` : ""}
        <div data-list>${K.chats.map(c => row(c)).join("")}</div>
      </div>
      <nav class="kk-tab">
        <span><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.5"/><path d="M3 21c1-5 5-7 9-7s8 2 9 7z"/></svg></span>
        <span class="on c"><svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.8 5.3 4.6 6.7L5.5 22l4.6-3.1c.6.1 1.2.1 1.9.1 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg><em data-kbadge>${P.badges.kakao}</em></span>
        <span><svg viewBox="0 0 24 24"><circle cx="9" cy="12" r="7"/><circle cx="16" cy="12" r="6" opacity=".6"/></svg></span>
        <span><svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2" /></svg></span>
        <span><svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></span>
      </nav>
    </section>`);
    el.addEventListener("click", e => {
      const r = e.target.closest("[data-room]"); if (!r) return;
      const name = r.dataset.room, c = K.chats.find(x => x.name === name);
      if (c && c.unread) { P.badges.kakao -= c.unread; c.unread = 0; updKakaoBadges(); const em = r.querySelector(".meta em"); if (em) em.remove(); }
      const msgs = K.rooms[name] || [{ text: c ? c.preview : "", time: c?.when }];
      if (!K.rooms[name]) K.rooms[name] = msgs;
      show(kakaoRoom(name, K.rooms[name]), "push");
    });
    kakaoList = { el, row };
    return el;
  }
  let kakaoList = null;
  /* 카톡 한 통 도착: 데이터·목록·대화방·배지·알림 반영 */
  function deliverKakao(from, text) {
    const K = P.kakao;
    msgTone();
    const room = (K.rooms[from] = K.rooms[from] || []);
    const todayLabel = `${TODAY.getFullYear()}년 ${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일 ${WD[TODAY.getDay()]}요일`;
    const lastDate = [...room].reverse().find(m => m.date);
    const needDate = !lastDate || lastDate.date !== todayLabel;
    if (needDate) room.push({ date: todayLabel });
    room.push({ text, time: P.time });
    let c = K.chats.find(x => x.name === from);
    if (c) K.chats.splice(K.chats.indexOf(c), 1); else c = { name: from };
    const top = stack[stack.length - 1], viewing = top && top.dataset.room === from;
    Object.assign(c, { preview: text, when: P.time, unread: viewing ? 0 : (c.unread || 0) + 1 });
    K.chats.unshift(c);
    if (!viewing) { P.badges.kakao++; updKakaoBadges(); }
    if (kakaoList && kakaoList.el.isConnected) {
      const list = kakaoList.el.querySelector("[data-list]");
      list.querySelector(`[data-room="${CSS.escape(from)}"]`)?.remove();
      list.prepend(h(kakaoList.row(c, "new")));
    }
    if (viewing) {
      top.querySelector(".kmsgs").insertAdjacentHTML("beforeend", `${needDate ? `<div class="date">${todayLabel}</div>` : ""}<div class="kline them"><div class="kb">${esc(text)}</div><div class="kmeta"><span>${esc(P.time)}</span></div></div>`);
      const sc = top.querySelector(".scroll"); sc.scrollTop = sc.scrollHeight;
    } else {
      showBanner({ app: "카카오톡", from, text, onTap: () => openKakaoRoom(from) });
    }
  }
  /* 알림을 눌렀을 때: 카톡 앱 → 해당 대화방으로 바로 이동 */
  function openKakaoRoom(name) {
    if (callEl) return;   // 통화 중에는 알림만 닫힘
    const K = P.kakao;
    const top = stack[stack.length - 1];
    if (!(kakaoList && top === kakaoList.el) && !(top && top.dataset.room)) show(kakaoApp(), "push");
    const c = K.chats.find(x => x.name === name);
    if (c && c.unread) {
      P.badges.kakao -= c.unread; c.unread = 0; updKakaoBadges();
      kakaoList.el.querySelector(`[data-room="${CSS.escape(name)}"] .meta em`)?.remove();
    }
    show(kakaoRoom(name, (K.rooms[name] = K.rooms[name] || [])), "push");
  }
  /* 강민재 카톡 등 예약 알림: 캘린더 알림이 꺼지고 나서 시작 */
  let kakaoQueueStarted = false;
  function startKakaoQueue() {
    const N = P.kakao.notification;
    if (kakaoQueueStarted || !N || !N.from) return;
    kakaoQueueStarted = true;
    const queue = N.messages || [{ text: N.text, delay: N.delay }];
    let i = 0;
    const next = () => {
      if (i >= queue.length) return;
      setTimeout(function fire() {
        if (!layer.classList.contains("open") || locked) { setTimeout(fire, 1000); return; }   // 휴대폰이 닫혀 있으면 열릴 때까지 대기
        deliverKakao(N.from, queue[i++].text);
        next();
      }, queue[i].delay || 2000);
    };
    next();
  }
  function updKakaoBadges() {
    document.querySelectorAll('[data-badge="kakao"],[data-kbadge]').forEach(b => { b.textContent = P.badges.kakao; b.style.display = P.badges.kakao > 0 ? "" : "none"; });
  }
  function kakaoRoom(name, msgs) {
    const body = msgs.map(m => {
      if (m.date) return `<div class="date">${esc(m.date)}</div>`;
      const side = m.me ? "me" : "them";
      const inner = m.deleted ? `<div class="kb kdel">ⓘ 삭제된 메시지입니다.</div>` : m.img !== undefined ? photoBox(m, side) : `<div class="kb">${esc(m.text)}</div>`;
      const meta = (m.time || m.unread) ? `<div class="kmeta">${m.unread ? `<i>${m.unread}</i>` : ""}<span>${esc(m.time || "")}</span></div>` : "";
      return `<div class="kline ${side}">${inner}${meta}</div>`;
    }).join("");
    const el = h(`<section class="screen kroom">
      <div class="chat-head"><button class="pill round" data-back>${ic.back}</button><b style="font-size:17px;padding-top:10px">${esc(name)}</b><span class="pill round">${ic.search}</span></div>
      <div class="scroll" data-autobottom><div class="kmsgs">${body}</div></div>
      <div class="kcomp"><label class="field"><span class="plus">+</span><input data-input enterkeyhint="send" autocomplete="off" placeholder="메시지 입력"><span class="hash">#</span><button class="ksend" data-send aria-label="전송"><svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="#3c1e1e" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></label></div>
    </section>`);
    el.dataset.room = name;
    el.querySelector("[data-back]").onclick = back;
    wireComposer(el, text => {
      const todayLabel = `${TODAY.getFullYear()}년 ${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일 ${WD[TODAY.getDay()]}요일`;
      const lastDate = [...msgs].reverse().find(m => m.date);
      const needDate = !lastDate || lastDate.date !== todayLabel;
      if (needDate) msgs.push({ date: todayLabel });
      msgs.push({ me: true, text, time: P.time, unread: 1 });
      el.querySelector(".kmsgs").insertAdjacentHTML("beforeend", `${needDate ? `<div class="date">${todayLabel}</div>` : ""}<div class="kline me sent"><div class="kb">${esc(text)}</div><div class="kmeta"><i>1</i><span>${esc(P.time)}</span></div></div>`);
      const sc = el.querySelector(".scroll"); sc.scrollTop = sc.scrollHeight;
      const K = P.kakao; let c = K.chats.find(x => x.name === name);
      if (c) K.chats.splice(K.chats.indexOf(c), 1); else c = { name };
      Object.assign(c, { preview: text, when: P.time, unread: 0 }); K.chats.unshift(c);
      if (kakaoList && kakaoList.el.isConnected) { const list = kakaoList.el.querySelector("[data-list]"); list.querySelector(`[data-room="${CSS.escape(name)}"]`)?.remove(); list.prepend(h(kakaoList.row(c))); }
      // 자동 답장
      const norm = t => t.replace(/[\s.!?~…]+/g, "");
      const rule = ((K.autoReplies || {})[name] || []).find(r => r.match.some(m => norm(m) === norm(text)));
      if (rule) {
        let wait = 1400;
        setTimeout(() => {   // 읽음 표시(1) 없애기
          msgs.forEach(m => { if (m.me) delete m.unread; });
          el.querySelectorAll(".kline.me .kmeta i").forEach(x => x.remove());
        }, 900);
        rule.replies.forEach(r => { setTimeout(() => deliverKakao(name, r), wait); wait += 1300; });
      }
    });
    return el;
  }
  const banner = $("#banner"); let bannerTimer;
  function showBanner(N) {
    if (bannerCur && bannerCur !== N && bannerCur.onHide) { const prev = bannerCur; bannerCur = null; prev.onHide(); }
    bannerCur = N;
    banner.innerHTML = `<div class="bi${N.kind === "calendar" ? " cal" : ""}">${N.kind === "calendar" ? I.calendar : ""}</div><div class="bt"><small>${esc(N.app)}</small><b>${esc(N.from)}</b>${esc(N.text)}</div><time>지금</time>`;
    banner.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add("show")));
    clearTimeout(bannerTimer); bannerTimer = setTimeout(hideBanner, N.duration || 5000);
  }
  let bannerCur = null;
  function hideBanner() {
    banner.classList.remove("show");
    const cur = bannerCur; bannerCur = null;
    if (cur && cur.onHide) cur.onHide();
  }
  banner.onclick = () => { const cur = bannerCur; hideBanner(); if (cur && cur.onTap) cur.onTap(); };

  /* ================= 메모 ================= */
  function notesApp() {
    const groups = [];
    P.notes.forEach((n, i) => { let g = groups.find(x => x.name === n.group); if (!g) groups.push(g = { name: n.group, items: [] }); g.items.push([n, i]); });
    const el = h(`<section class="screen notes">
      <div class="navbar"><span class="pill round">${ic.back}</span><span class="pill round">${ic.more}</span></div>
      <div class="scroll">
        <div class="bigtitle" style="padding-bottom:4px">모든 iCloud</div>
        <div class="count">${P.notes.length}개의 메모</div>
        ${groups.map(g => `<h3>${esc(g.name)}</h3>${g.items.map(([n, i]) => {
          const first = n.body.split("\n").slice(1).filter(Boolean).join(" ");
          return `<button class="ncard" data-note="${i}"><b>${esc(n.title)}</b><div class="d"><em>${esc(n.date)}</em>${esc(first)}</div><div class="f">🗀 메모</div></button>`;
        }).join("")}`).join("")}
        <div style="height:20px"></div>
      </div>
      <div class="bottomsearch"><div class="searchfield">${ic.search}<span>검색</span><span class="mic">${ic.mic}</span></div><span class="pill round">${ic.compose}</span></div>
    </section>`);
    el.querySelector(".navbar .pill").onclick = goHome;
    el.addEventListener("click", e => { const c = e.target.closest("[data-note]"); if (c) show(noteDetail(P.notes[+c.dataset.note]), "push"); });
    return el;
  }
  function noteDetail(n) {
    const el = h(`<section class="screen white">
      <div class="navbar"><button class="pill round" data-back>${ic.back}</button><span class="pill" style="gap:6px;padding:0 6px">${ic.undo.replace("<svg", '<svg style="margin:0 6px"')}${ic.share.replace("<svg", '<svg style="margin:0 6px"')}${ic.more.replace("<svg", '<svg style="margin:0 6px"')}</span></div>
      <div class="scroll"><div class="note-body">${esc(n.body)}</div></div>
      <div class="note-tools"><span class="grp">${ic.check}${ic.clip}${ic.pen}</span><span class="grp">${ic.compose}</span></div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    return el;
  }

  /* ================= 번역 ================= */
  function translateApp() {
    const el = h(`<section class="screen white">
      <div class="tr-top"><button data-saved><svg viewBox="0 0 24 24"><path d="M7 3h10v18l-5-4-5 4z"/></svg></button><span class="brand"><b>번역</b></span><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18.5c1.5-2 3.5-3 5.5-3s4 1 5.5 3"/></svg></div>
      <div class="tr-input">텍스트 입력</div>
      <div class="tr-langs"><span>한국어</span>⇄<span>중국어(번체)</span></div>
      <div class="tr-actions"><span class="sm"><i></i>실시간 번역</span><span class="mic">${ic.mic}</span><span class="sm"><i></i>카메라</span></div>
    </section>`);
    el.querySelector("[data-saved]").onclick = () => show(savedTranslations(), "push");
    return el;
  }
  function savedTranslations() {
    const el = h(`<section class="screen white">
      <div class="tr-head"><button data-back>‹ 홈</button>저장된 번역</div>
      <div class="tr-tabs"><span class="on">표현 노트</span><span>스크립트</span></div>
      <div class="scroll">${P.translations.map(t => `<div class="tr-item"><div class="t"><div class="src">${esc(t.src)}</div><div class="ko">${esc(t.ko)}</div></div><i class="bm"></i></div>`).join("")}<div style="height:40px"></div></div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    return el;
  }

  /* ================= 사진 ================= */
  function photosApp() {
    const imgs = [...SHOTS, ...(P.photos.images || [])];
    const n = Math.max(imgs.length, 60);
    const tile = i => {
      if (imgs[i]) return `background-image:url('${esc(imgs[i])}')`;
      const hue = (i * 47) % 360, l = 55 + (i * 13) % 25;
      return `background:linear-gradient(${(i * 67) % 360}deg,hsl(${hue} 25% ${l}%),hsl(${(hue + 40) % 360} 30% ${l - 22}%))`;
    };
    const el = h(`<section class="screen photos">
      <div class="ph-head"><div><h2>보관함</h2><small>${esc(P.photos.count)}개의 항목</small></div><div class="btns"><span class="pill round">${ic.menu}</span><span class="pill">선택</span></div></div>
      <div class="scroll"><div class="ph-grid">${[...Array(n)].map((_, i) => `<div data-ph="${i}" style="${tile(i)}"></div>`).join("")}</div><div style="height:120px"></div></div>
      <div class="ph-tab"><span class="seg2"><span class="on"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="5" width="15" height="14" rx="2"/><rect x="6" y="2" width="15" height="14" rx="2" opacity=".5"/></svg>보관함</span><span><svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="6" width="16" height="14" rx="2"/><rect x="6" y="3" width="12" height="2" rx="1"/></svg>모음</span></span><span class="srch">${ic.search}</span></div>
    </section>`);
    el.addEventListener("click", e => {
      const t = e.target.closest("[data-ph]"); if (!t) return;
      const v = h(`<section class="screen viewer" data-dark="1"><div class="navbar"><button class="pill round" data-back style="background:rgba(255,255,255,.2)">${ic.back.replace('<svg', '<svg style="stroke:#fff"')}</button></div><div class="img" style="${t.getAttribute("style")};background-size:${imgs[+t.dataset.ph] ? "contain" : "cover"}"></div><div style="height:60px"></div></section>`);
      v.querySelector("[data-back]").onclick = back;
      show(v, "push");
    });
    el.querySelector(".scroll").scrollTop = 0;
    return el;
  }


  /* ================= 시계 ================= */
  function clockApp() {
    const C = P.clock || {};
    const tabs = [
      ["world", "세계 시계", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9.5"/><ellipse cx="12" cy="12" rx="4.2" ry="9.5"/><path d="M2.5 12h19M4 7h16M4 17h16M12 2.5v19"/></svg>`],
      ["alarm", "알람", `<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" fill="currentColor"/><path d="M12 9v4.5H9" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M3.5 6.5l3-3M20.5 6.5l-3-3" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M7 20l-1.5 2M17 20l1.5 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`],
      ["stopwatch", "스톱워치", `<svg viewBox="0 0 24 24"><circle cx="12" cy="13.5" r="8.5" fill="currentColor"/><path d="M12 9v5" stroke="#000" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="14" r="1.3" fill="#000"/><path d="M10 2.5h4M12 2.5V5M18.5 6l1.5-1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`],
      ["timer", "타이머", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 3a9 9 0 1 1-6.4 2.6"/><path d="M12 3v3M7.5 8.5L12 12"/></svg>`]
    ];
    const el = h(`<section class="screen clock" data-dark="1">
      <div class="ck-body"></div>
      <nav class="ck-tab">${tabs.map(([id, label, svg]) => `<button data-tab="${id}">${svg}<span>${label}</span></button>`).join("")}</nav>
    </section>`);
    const body = el.querySelector(".ck-body");
    const alive = () => el.isConnected;
    const pad = n => String(n).padStart(2, "0");

    /* --- 세계 시계 --- */
    const world = () => {
      const [hh, mm] = P.time.split(":").map(Number), home = C.home ?? 9;
      return `<div class="ck-nav"><span></span><span class="ck-btn">편집</span><span class="ck-btn round">＋</span></div>
      <div class="scroll"><h1 class="ck-title">세계 시계</h1>
      ${(C.world || []).map(w => {
        const diff = w.offset - home; let t = hh * 60 + mm + diff * 60, day = "오늘";
        if (t < 0) { t += 1440; day = "어제"; } else if (t >= 1440) { t -= 1440; day = "내일"; }
        const H = Math.floor(t / 60), M = t % 60;
        const ap = H < 12 ? "오전" : "오후", h12 = H % 12 === 0 ? 12 : H % 12;
        return `<div class="ck-row"><div><small>${day}, ${diff >= 0 ? "+" : ""}${diff}시간</small><b class="ck-city">${esc(w.city)}</b></div><div class="ck-wt"><span>${ap}</span>${h12}:${pad(M)}</div></div>`;
      }).join("")}</div>`;
    };

    /* --- 알람 --- */
    const alarm = () => `<div class="ck-nav"><span></span><span class="ck-btn">편집</span><span class="ck-btn round">＋</span></div>
      <div class="scroll"><h1 class="ck-title">알람</h1>
        <div class="ck-sec">🛏 수면 | 기상</div>
        <div class="ck-row"><span class="ck-none">${esc(C.sleep || "알람 없음")}</span><span class="ck-chg">변경</span></div>
        <div class="ck-sec" style="margin-top:44px">기타</div>
        ${(C.alarms || []).map((a, i) => `<div class="ck-row ${a.on ? "" : "off"}" data-alarm="${i}"><div><div class="ck-time">${esc(a.time)}</div><small>${esc(a.label)}${a.repeat ? " · " + esc(a.repeat) : ""}</small></div><button class="sw ${a.on ? "on" : ""}" aria-label="알람 켜기/끄기"><i></i></button></div>`).join("")}
      </div>`;

    /* --- 스톱워치 --- */
    const sw = C._sw || (C._sw = { run: false, start: 0, acc: 0, laps: [], lapStart: 0 });
    const swNow = () => sw.acc + (sw.run ? performance.now() - sw.start : 0);
    const fmt = ms => { const cs = Math.floor(ms / 10) % 100, s = Math.floor(ms / 1000) % 60, m = Math.floor(ms / 60000); return `${pad(m)}:${pad(s)}.${pad(cs)}`; };
    const stopwatch = () => `<div class="ck-nav"></div>
      <div class="ck-sw-time" data-swt>${fmt(swNow())}</div>
      <div class="ck-btns"><button class="cbtn gray" data-swl>${sw.run ? "랩" : (swNow() ? "재설정" : "랩")}</button><span class="ck-dots"><i class="on"></i><i></i></span><button class="cbtn ${sw.run ? "red" : "green"}" data-sws>${sw.run ? "중단" : "시작"}</button></div>
      <div class="scroll ck-laps" data-laps></div>`;
    const drawLaps = () => {
      const box = body.querySelector("[data-laps]"); if (!box) return;
      const cur = swNow() - sw.lapStart;
      const rows = (swNow() || sw.laps.length) ? [`<div class="lap"><span>랩 ${sw.laps.length + 1}</span><span>${fmt(cur)}</span></div>`] : [];
      sw.laps.slice().reverse().forEach((l, i) => rows.push(`<div class="lap"><span>랩 ${sw.laps.length - i}</span><span>${fmt(l)}</span></div>`));
      box.innerHTML = rows.join("");
    };
    const swLoop = () => {
      if (!alive() || !sw.run) return;
      const t = body.querySelector("[data-swt]"); if (t) { t.textContent = fmt(swNow()); drawLaps(); }
      requestAnimationFrame(swLoop);
    };

    /* --- 타이머 --- */
    const T = C._timer || (C._timer = { h: C.timer?.h ?? 0, m: C.timer?.m ?? 9, s: C.timer?.s ?? 0, running: false, paused: false, end: 0, left: 0, total: 0 });
    const wheel = (key, max, unit) => `<div class="wheel" data-wheel="${key}" data-max="${max}"><div class="wpad"></div>${[...Array(max + 1)].map((_, i) => `<div class="wi">${i}</div>`).join("")}<div class="wpad"></div></div><span class="wunit u-${key}">${unit}</span>`;
    const tLeft = () => T.running ? (T.paused ? T.left : Math.max(0, T.end - Date.now())) : 0;
    const tfmt = ms => { const t = Math.ceil(ms / 1000), H = Math.floor(t / 3600), M = Math.floor(t / 60) % 60, S = t % 60; return H ? `${H}:${pad(M)}:${pad(S)}` : `${pad(M)}:${pad(S)}`; };
    const timer = () => `<div class="ck-nav"><span></span><span></span><span class="ck-btn">편집</span></div>
      <div class="scroll"><h1 class="ck-title">타이머</h1>
        ${T.running ? `<div class="ck-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" class="bg"/><circle cx="50" cy="50" r="46" class="fg" data-ring/></svg><div class="ck-rt" data-tt>${tfmt(tLeft())}</div></div>`
          : `<div class="picker"><div class="pbar"></div>${wheel("h", 23, "시간")}${wheel("m", 59, "분")}${wheel("s", 59, "초")}</div>`}
        <div class="ck-btns"><button class="cbtn gray ${T.running ? "" : "x"}" data-tc ${T.running ? "" : "disabled"}>${T.running ? "취소" : "✕"}</button><button class="cbtn ${T.running && !T.paused ? "orange" : "green"}" data-ts>${T.running ? (T.paused ? "재개" : "일시 정지") : `<svg width="30" height="30" viewBox="0 0 24 24"><path d="M7 4l14 8-14 8z" fill="currentColor"/></svg>`}</button></div>
        <div class="ck-card"><div><span>레이블</span><span class="dim">타이머</span></div><div><span>사운드</span><span class="dim">${esc(C.timer?.sound || "공지음")} ›</span></div></div>
        ${(C.timerRecent || []).length ? `<div class="ck-sec" style="margin:34px 20px 0">최근 항목</div>${C.timerRecent.map(r => `<div class="ck-row" style="margin:0 20px"><div><div class="ck-time dim">${esc(r)}</div><small>${esc(r)}</small></div><span class="cbtn green sm"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M7 4l14 8-14 8z" fill="currentColor"/></svg></span></div>`).join("")}` : ""}
        <div style="height:30px"></div>
      </div>`;
    const tLoop = () => {
      if (!alive() || !T.running) return;
      const left = tLeft(), t = body.querySelector("[data-tt]"), ring = body.querySelector("[data-ring]");
      if (t) t.textContent = tfmt(left);
      if (ring) ring.style.strokeDashoffset = 289 * (1 - left / T.total);
      if (left <= 0 && !T.paused) { T.running = false; render("timer"); return; }
      requestAnimationFrame(tLoop);
    };
    const initWheels = () => body.querySelectorAll("[data-wheel]").forEach(w => {
      const k = w.dataset.wheel, ITEM = 40;
      w.scrollTop = T[k] * ITEM;
      const mark = () => { const v = Math.round(w.scrollTop / ITEM); T[k] = Math.min(+w.dataset.max, Math.max(0, v)); w.querySelectorAll(".wi").forEach((x, i) => x.classList.toggle("sel", i === T[k])); };
      mark(); let to; w.addEventListener("scroll", () => { mark(); clearTimeout(to); to = setTimeout(() => { w.scrollTo({ top: T[k] * ITEM, behavior: "smooth" }); }, 120); }, { passive: true });
    });

    let cur;
    function render(tab) {
      cur = tab;
      el.querySelectorAll("[data-tab]").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
      body.innerHTML = { world, alarm, stopwatch, timer }[tab]();
      if (tab === "stopwatch") { drawLaps(); if (sw.run) requestAnimationFrame(swLoop); }
      if (tab === "timer") { if (T.running) { const r = body.querySelector("[data-ring]"); r.style.strokeDashoffset = 289 * (1 - tLeft() / T.total); requestAnimationFrame(tLoop); } else requestAnimationFrame(initWheels); }
    }
    el.addEventListener("click", e => {
      const t = e.target.closest("[data-tab]"); if (t) { render(t.dataset.tab); return; }
      const a = e.target.closest("[data-alarm] .sw");
      if (a) { const row = a.closest("[data-alarm]"), al = C.alarms[+row.dataset.alarm]; al.on = !al.on; a.classList.toggle("on", al.on); row.classList.toggle("off", !al.on); return; }
      if (e.target.closest("[data-sws]")) {
        if (sw.run) { sw.acc = swNow(); sw.run = false; } else { sw.start = performance.now(); sw.run = true; }
        render("stopwatch"); return;
      }
      if (e.target.closest("[data-swl]")) {
        if (sw.run) { const n = swNow(); sw.laps.push(n - sw.lapStart); sw.lapStart = n; drawLaps(); }
        else { sw.acc = 0; sw.laps = []; sw.lapStart = 0; render("stopwatch"); }
        return;
      }
      if (e.target.closest("[data-ts]")) {
        if (!T.running) { const tot = (T.h * 3600 + T.m * 60 + T.s) * 1000; if (!tot) return; T.total = tot; T.end = Date.now() + tot; T.running = true; T.paused = false; }
        else if (T.paused) { T.end = Date.now() + T.left; T.paused = false; }
        else { T.left = tLeft(); T.paused = true; }
        render("timer"); return;
      }
      if (e.target.closest("[data-tc]") && T.running) { T.running = false; T.paused = false; render("timer"); }
    });
    render(C.startTab || "alarm");
    return el;
  }


  /* ================= 카메라 (보는 사람 기기의 진짜 카메라) ================= */
  const SHOTS = [];
  function cameraApp() {
    const el = h(`<section class="screen cam" data-dark="1">
      <div class="cam-top"><span class="cam-ic">⚡︎</span><span class="cam-chev">⌃</span><span class="cam-ic">◎</span></div>
      <div class="cam-view"><video playsinline muted autoplay></video><div class="cam-msg" hidden></div><div class="cam-flash"></div><span class="cam-zoom">1×</span></div>
      <div class="cam-modes"><span>시네마틱</span><span>동영상</span><b>사진</b><span>인물 사진</span><span>파노라마</span></div>
      <div class="cam-bottom"><button class="cam-thumb" data-thumb></button><button class="cam-shutter" data-shoot aria-label="촬영"><i></i></button><button class="cam-flip" data-flip aria-label="카메라 전환"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 0 0-14.6-4.5M4 13a8 8 0 0 0 14.6 4.5"/><path d="M5 3v4h4M19 21v-4h-4"/></svg></button></div>
    </section>`);
    const video = el.querySelector("video"), msg = el.querySelector(".cam-msg"), thumb = el.querySelector("[data-thumb]");
    let stream = null, facing = "environment", dead = false;
    const stop = () => { if (stream) stream.getTracks().forEach(t => t.stop()); stream = null; };
    el._cleanup = () => { dead = true; stop(); };
    const setThumb = () => { thumb.style.backgroundImage = SHOTS[0] ? `url('${SHOTS[0]}')` : ""; };
    setThumb();
    async function start() {
      stop();
      msg.hidden = true;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1920 }, height: { ideal: 1440 } }, audio: false });
        if (dead) { s.getTracks().forEach(t => t.stop()); return; }
        stream = s; video.srcObject = s;
        const st = s.getVideoTracks()[0].getSettings();
        video.classList.toggle("mirror", (st.facingMode || facing) === "user");
        await video.play().catch(() => {});
        msg.hidden = true;
      } catch (e) {
        msg.hidden = true; // 막혀도 안내 없이 검은 화면만
      }
    }
    el.addEventListener("click", e => {
      if (e.target.closest("[data-flip]")) { facing = facing === "user" ? "environment" : "user"; start(); return; }
      if (e.target.closest("[data-shoot]")) {
        const f = el.querySelector(".cam-flash"); f.classList.remove("go"); void f.offsetWidth; f.classList.add("go");
        if (!stream || !video.videoWidth) return;
        // 화면에 보이는 3:4 영역 그대로 저장
        const vw = video.videoWidth, vh = video.videoHeight, box = video.getBoundingClientRect();
        const ratio = box.width / box.height; let sw = vw, sh = vw / ratio;
        if (sh > vh) { sh = vh; sw = vh * ratio; }
        const c = document.createElement("canvas"); c.width = Math.round(sw); c.height = Math.round(sh);
        const g = c.getContext("2d");
        if (video.classList.contains("mirror")) { g.translate(c.width, 0); g.scale(-1, 1); }
        g.drawImage(video, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, c.width, c.height);
        SHOTS.unshift(c.toDataURL("image/jpeg", .88)); setThumb();
        return;
      }
      if (e.target.closest("[data-thumb]") && SHOTS[0]) {
        const v = h(`<section class="screen viewer" data-dark="1"><div class="navbar"><button class="pill round" data-back style="background:rgba(255,255,255,.2)">${ic.back.replace('<svg', '<svg style="stroke:#fff"')}</button></div><div class="img" style="background-image:url('${SHOTS[0]}')"></div><div style="height:60px"></div></section>`);
        v.querySelector("[data-back]").onclick = back;
        show(v, "push");
      }
    });
    setTimeout(start, 50);
    return el;
  }


  /* ================= 캘린더 ================= */
  function calendarApp() {
    const C = P.calendar || { calendars: {}, birthdays: [], holidays: [], events: [] };
    const key = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const holiday = {}; (C.holidays || []).forEach(x => (holiday[x.date] = holiday[x.date] || []).push(x.title));
    const color = cal => (C.calendars || {})[cal] || "#8e8e93";
    function eventsOn(d) {
      const k = key(d), md = k.slice(5), list = [];
      (holiday[k] || []).forEach(t => list.push({ title: t, cal: "대한민국 공휴일", allday: true }));
      (C.birthdays || []).forEach(b => { if (b.md === md) list.push({ title: `${b.name} 생일`, cal: "생일", allday: true }); });
      (C.events || []).filter(e => e.date === k).sort((a, b) => (a.start || "").localeCompare(b.start || "")).forEach(e => list.push({ ...e, allday: !e.start }));
      return list;
    }
    let view = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1), sel = new Date(TODAY);
    const el = h(`<section class="screen white calapp">
      <div class="navbar"><button class="pill round" data-home>${ic.back}</button><span class="pill" style="gap:14px">${ic.search.replace("<svg", '<svg style="width:20px;height:20px"')}<span style="font-size:22px;font-weight:300">＋</span></span></div>
      <div class="cal-title"><b data-ttl></b></div>
      <div class="cal-wd">${WD.map((w, i) => `<span class="${i === 0 ? "sun" : i === 6 ? "sat" : ""}">${w}</span>`).join("")}</div>
      <div class="cal-grid" data-grid></div>
      <div class="cal-day" data-dayttl></div>
      <div class="scroll cal-list" data-list></div>
      <div class="cal-bottom"><button class="pill" data-today>오늘</button><span class="pill">캘린더</span><span class="pill">받은 편지함</span></div>
    </section>`);
    const grid = el.querySelector("[data-grid]"), list = el.querySelector("[data-list]");
    function renderMonth() {
      el.querySelector("[data-ttl]").textContent = `${view.getFullYear()}년 ${view.getMonth() + 1}월`;
      const first = view.getDay(), days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      let html = "";
      for (let i = 0; i < first; i++) html += `<span></span>`;
      for (let d = 1; d <= days; d++) {
        const dt = new Date(view.getFullYear(), view.getMonth(), d), k = key(dt), ev = eventsOn(dt);
        const cls = ["cd"];
        if (dt.getDay() === 0 || holiday[k]) cls.push("red"); else if (dt.getDay() === 6) cls.push("sat");
        if (k === key(TODAY)) cls.push("today");
        if (k === key(sel)) cls.push("sel");
        const dots = ev.filter(e => e.cal !== "대한민국 공휴일").slice(0, 3).map(e => `<i style="background:${color(e.cal)}"></i>`).join("");
        html += `<button class="${cls.join(" ")}" data-d="${k}"><b>${d}</b><em>${dots}</em></button>`;
      }
      grid.innerHTML = html;
    }
    function renderDay() {
      const ev = eventsOn(sel);
      el.querySelector("[data-dayttl]").textContent = `${sel.getMonth() + 1}월 ${sel.getDate()}일 ${WD[sel.getDay()]}요일${key(sel) === key(TODAY) ? " · 오늘" : ""}`;
      list.innerHTML = ev.length ? ev.map((e, i) => `<button class="cev" data-ev="${i}"><i style="background:${color(e.cal)}"></i><div><b>${e.emoji ? e.emoji + " " : ""}${esc(e.title)}</b>${e.place ? `<small>${esc(e.place)}</small>` : ""}</div><span>${e.allday ? "하루 종일" : esc(e.start) + (e.end ? `<br>${esc(e.end)}` : "")}</span></button>`).join("")
        : `<div class="cal-empty">일정 없음</div>`;
      list._ev = ev;
    }
    function go(delta) { view = new Date(view.getFullYear(), view.getMonth() + delta, 1); grid.classList.remove("slide-l", "slide-r"); void grid.offsetWidth; grid.classList.add(delta > 0 ? "slide-l" : "slide-r"); renderMonth(); }
    el.addEventListener("click", e => {
      if (e.target.closest("[data-home]")) { goHome(); return; }
      const d = e.target.closest("[data-d]");
      if (d) { sel = parseD(d.dataset.d); renderMonth(); renderDay(); return; }
      if (e.target.closest("[data-today]")) { view = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1); sel = new Date(TODAY); renderMonth(); renderDay(); return; }
      const ev = e.target.closest("[data-ev]");
      if (ev) show(eventDetail(list._ev[+ev.dataset.ev], sel), "push");
    });
    // 좌우로 쓸어서 달 넘기기
    let sx = null, sy = null;
    grid.addEventListener("pointerdown", e => { sx = e.clientX; sy = e.clientY; });
    grid.addEventListener("pointerup", e => { if (sx === null) return; const dx = e.clientX - sx, dy = e.clientY - sy; sx = null; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1); });
    grid.addEventListener("wheel", e => { if (Math.abs(e.deltaX) > 30) { e.preventDefault(); go(e.deltaX > 0 ? 1 : -1); } }, { passive: false });
    el.querySelector(".cal-title").insertAdjacentHTML("beforeend", `<span class="cal-arrows"><button data-prev>‹</button><button data-next>›</button></span>`);
    el.querySelector("[data-prev]").onclick = () => go(-1);
    el.querySelector("[data-next]").onclick = () => go(1);
    renderMonth(); renderDay();
    return el;
  }
  function eventDetail(e, d) {
    const C = P.calendar || {}, col = (C.calendars || {})[e.cal] || "#8e8e93";
    const dateStr = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${WD[d.getDay()]})`;
    const el = h(`<section class="screen calapp">
      <div class="navbar"><button class="pill round" data-back>${ic.back}</button><span class="pill">편집</span></div>
      <div class="scroll">
        <div class="evd-head"><h2>${e.emoji ? e.emoji + " " : ""}${esc(e.title)}</h2>${e.place ? `<p class="evd-place">${esc(e.place)}</p>` : ""}<p>${dateStr}</p><p>${e.allday ? "하루 종일" : `${esc(e.start)}${e.end ? ` ~ ${esc(e.end)}` : ""}`}</p></div>
        <div class="evd-card"><div><span>캘린더</span><span class="evd-cal"><i style="background:${col}"></i>${esc(e.cal)}</span></div><div><span>알림</span><span class="dim">${e.allday ? "당일 (오전 9시)" : "30분 전"}</span></div></div>
        ${e.memo ? `<div class="evd-card"><div style="display:block"><span class="dim" style="font-size:13px">메모</span><p style="margin:6px 0 0">${esc(e.memo)}</p></div></div>` : ""}
        ${e.allday && e.cal === "대한민국 공휴일" ? "" : `<div class="evd-card"><div><span style="color:#ff3b30">이벤트 삭제</span></div></div>`}
      </div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    return el;
  }

  const OPEN = { calendar: calendarApp, camera: cameraApp, clock: clockApp, phone: phoneApp, chrome: chromeApp, messages: messagesApp, kakao: kakaoApp, notes: notesApp, translate: translateApp, photos: photosApp };


  /* ================= 흐르는 시계 · 캘린더 알림 ================= */
  const START_SEC = (() => { const [hh, mm, ss] = (P.time || "11:59:30").split(":").map(Number); P.time = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`; return hh * 3600 + mm * 60 + (ss || 0); })();
  let clockStart = null, audioCtx = null;
  const alerted = new Set();
  const phoneSec = () => START_SEC + (clockStart ? Math.floor((Date.now() - clockStart) / 1000) : 0);
  function chime() {
    try {
      if (!audioCtx) return;
      if (audioCtx.state === "suspended") audioCtx.resume();
      [0, .22, .44, 1.2, 1.42, 1.64].forEach((t, i) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain(), at = audioCtx.currentTime + t;
        o.type = "sine"; o.frequency.value = i % 3 === 2 ? 1318.5 : i % 3 === 1 ? 1046.5 : 880;
        g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(.18, at + .02); g.gain.exponentialRampToValueAtTime(.001, at + .4);
        o.connect(g).connect(audioCtx.destination); o.start(at); o.stop(at + .45);
      });
    } catch (e) {}
    try { navigator.vibrate && navigator.vibrate([250, 120, 250]); } catch (e) {}
  }
  /* 메시지 알림음 (짧은 '띠링') + 짧은 진동 */
  function msgTone() {
    try {
      if (audioCtx) {
        if (audioCtx.state === "suspended") audioCtx.resume();
        [[1568, 0], [2093, .11]].forEach(([f, t]) => {
          const o = audioCtx.createOscillator(), g = audioCtx.createGain(), at = audioCtx.currentTime + t;
          o.type = "triangle"; o.frequency.value = f;
          g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(.22, at + .01); g.gain.exponentialRampToValueAtTime(.001, at + .28);
          o.connect(g).connect(audioCtx.destination); o.start(at); o.stop(at + .3);
        });
      }
    } catch (e) {}
    try { navigator.vibrate && navigator.vibrate([90, 60, 90]); } catch (e) {}
  }

  /* ================= 걸려오는 전화 ================= */
  let callFired = false, callEl = null, ringTimer = null, callTimer = null;
  function ringOnce() {
    try {
      if (audioCtx) {
        if (audioCtx.state === "suspended") audioCtx.resume();
        [659.3, 784, 987.8, 784, 659.3, 784, 987.8, 1318.5].forEach((f, i) => {
          const o = audioCtx.createOscillator(), g = audioCtx.createGain(), at = audioCtx.currentTime + i * .16;
          o.type = "sine"; o.frequency.value = f;
          g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(.2, at + .015); g.gain.exponentialRampToValueAtTime(.001, at + .3);
          o.connect(g).connect(audioCtx.destination); o.start(at); o.stop(at + .32);
        });
      }
    } catch (e) {}
    try { navigator.vibrate && navigator.vibrate([700, 300, 700]); } catch (e) {}
  }
  function stopRing() { clearInterval(ringTimer); ringTimer = null; try { navigator.vibrate && navigator.vibrate(0); } catch (e) {} }
  function logCall(name, missed) {
    const last = P.calls[0];
    if (last && last.name === name && !!last.missed === !!missed && last.dir === "in" && last.when === P.time) last.count = (last.count || 1) + 1;
    else P.calls.unshift({ name, kind: "휴대전화", dir: "in", missed: !!missed, when: P.time });
    if (missed) { P.badges.phone = (P.badges.phone || 0) + 1; document.querySelectorAll('[data-badge="phone"]').forEach(b => b.textContent = P.badges.phone); }
    refreshCalls();
  }
  const CI = {
    mute: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3" fill="#fff" stroke="none"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M4 4l16 16"/></svg>`,
    keypad: `<svg viewBox="0 0 24 24" fill="#fff">${[5, 12, 19].flatMap(y => [5, 12, 19].map(x => `<circle cx="${x}" cy="${y}" r="2.2"/>`)).join("")}<circle cx="12" cy="24.5" r="0"/></svg>`,
    audio: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="#fff" stroke="none"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>`,
    add: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
    facetime: `<svg viewBox="0 0 24 24" fill="#fff"><rect x="2.5" y="6.5" width="13" height="11" rx="2.5"/><path d="M16.5 10.5l5-3v9l-5-3z"/></svg>`,
    contact: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3.2"/><path d="M6.5 18.2c1.4-2.1 3.3-3.1 5.5-3.1s4.1 1 5.5 3.1"/></svg>`,
    hang: `<svg viewBox="0 0 24 24"><path d="M3 14.8c5-4.4 13-4.4 18 0l-2 2.3c-.5.5-1.2.6-1.8.2l-2-1.4c-.4-.3-.6-.7-.6-1.2v-1.6c-2.1-.6-4.3-.6-6.4 0v1.6c0 .5-.2.9-.6 1.2l-2 1.4c-.6.4-1.3.3-1.8-.2z" fill="#fff"/></svg>`,
    phone: `<svg viewBox="0 0 24 24"><path d="M6.6 3.4c.8-.5 1.8-.3 2.3.5l1.7 2.7c.5.8.3 1.7-.4 2.3l-1.3 1c.9 2.2 2.6 4.1 4.8 5.2l1-1.2c.6-.7 1.6-.8 2.3-.3l2.6 1.8c.8.5.9 1.6.4 2.4l-.9 1.2c-.9 1.2-2.5 1.6-3.9 1.1C10.4 18.6 6.1 14.3 4.3 9.3c-.5-1.4-.1-3 1.1-3.9z" fill="#34c759"/></svg>`,
    later: `<svg viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="13" r="7.5"/><path d="M12 9v4.3h-3" stroke="#3f4a3f" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M4 6.5l3-2.6M20 6.5l-3-2.6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
    msg: `<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 4C6.8 4 3 7.3 3 11.2c0 2.2 1.2 4.2 3.2 5.5-.2 1.3-.9 2.5-1.9 3.3 2 .1 3.8-.6 5.1-1.7.8.2 1.7.3 2.6.3 5.2 0 9-3.3 9-7.4S17.2 4 12 4z"/></svg>`
  };
  function incomingCall() {
    const C = P.incomingCall || {};
    const name = C.from || "강민재";
    hideBanner();
    callEl = h(`<div class="callui">
      <div class="cu-ringview">
        <div class="cu-name">${esc(name)}</div><div class="cu-sub">휴대전화</div>
        <div class="cu-small"><button data-decline><i>${CI.later}</i>나중에 보기</button><button data-decline><i>${CI.msg}</i>메시지</button></div>
        <div class="cu-slider" data-slider><div class="cu-track-text">밀어서 통화하기</div><div class="cu-knob" data-knob>${CI.phone}</div></div>
      </div>
      <div class="cu-liveview">
        <div class="cu-name">${esc(name)}</div><div class="cu-sub"><span class="cu-sim">기본</span><span data-ctime>00:00</span></div>
        <div class="cu-line" data-line></div>
        <div class="cu-grid">${[["mute", "소리 끔"], ["keypad", "키패드"], ["audio", "오디오"], ["add", "통화 추가"], ["facetime", "FaceTime"], ["contact", "연락처"]].map(([k, l]) => `<button class="cu-key" data-key="${k}"><i>${CI[k]}</i><small>${l}</small></button>`).join("")}</div>
        <button class="cu-end" data-end>${CI.hang}</button>
      </div>
    </div>`);
    $("#device").appendChild(callEl);
    $("#device").classList.add("in-call");
    requestAnimationFrame(() => requestAnimationFrame(() => callEl.classList.add("in")));
    ringOnce(); ringTimer = setInterval(ringOnce, 2600);
    const missTimer = setTimeout(() => { if (callEl && !callEl.classList.contains("live")) { stopRing(); logCall(name, true); closeCall(); } }, (C.ringSeconds || 30) * 1000);
    callEl.querySelectorAll("[data-decline]").forEach(b => b.onclick = () => { clearTimeout(missTimer); stopRing(); logCall(name, true); closeCall(); });
    // 밀어서 통화하기
    const slider = callEl.querySelector("[data-slider]"), knob = callEl.querySelector("[data-knob]");
    let sx = null, max = 0;
    knob.addEventListener("pointerdown", e => { sx = e.clientX; max = slider.clientWidth - knob.offsetWidth - 12; knob.setPointerCapture(e.pointerId); knob.style.transition = "none"; e.stopPropagation(); });
    knob.addEventListener("pointermove", e => { if (sx === null) return; const dx = Math.max(0, Math.min(max, e.clientX - sx)); knob.style.transform = `translateX(${dx}px)`; slider.style.setProperty("--fade", 1 - dx / max); });
    const release = e => {
      if (sx === null) return;
      const dx = Math.max(0, Math.min(max, e.clientX - sx)); sx = null; knob.style.transition = "";
      if (dx > max * .7) { knob.style.transform = `translateX(${max}px)`; answer(); }
      else { knob.style.transform = ""; slider.style.setProperty("--fade", 1); }
      e.stopPropagation();
    };
    knob.addEventListener("pointerup", release); knob.addEventListener("pointercancel", release);
    function answer() {
      clearTimeout(missTimer); stopRing();
      callEl.classList.add("live");
      const tEl = callEl.querySelector("[data-ctime]"), t0 = Date.now();
      const draw = () => { const sec = Math.floor((Date.now() - t0) / 1000); tEl.textContent = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`; };
      draw(); callTimer = setInterval(draw, 1000);
      callEl.querySelectorAll('[data-key="mute"],[data-key="audio"]').forEach(k => k.onclick = () => k.classList.toggle("on"));
      const lineEl = callEl.querySelector("[data-line]"), timers = [];
      const endCall = () => { timers.forEach(clearTimeout); clearInterval(callTimer); lineEl.classList.remove("show"); logCall(name, false); tEl.textContent = "통화 종료"; setTimeout(closeCall, 900); };
      callEl.querySelector("[data-end]").onclick = endCall;
      // 상대방 대사: 차례대로 보여주고 마지막 대사가 사라진 뒤 전화가 끊김
      runLines(C.lines || [], lineEl, timers, { start: C.lineStart, hangUp: C.hangUpAfter, name, showWho: true }, endCall);
    }
  }
  /* 통화 대사 재생: start(ms) 뒤 첫 대사 → 각 대사 ms 동안 표시 → 마지막 대사가 사라지고 hangUp(ms) 뒤 onEnd */
  function runLines(lines, lineEl, timers, o, onEnd) {
    if (!lines.length) return;
    const showWho = o.showWho ?? lines.some(l => l.who === "me");
    const label = l => showWho ? `<small>${l.who === "me" ? "차주한" : esc(o.name)}</small>` : "";
    let at = o.start ?? 1100;
    for (const l of lines) {
      if (l.cut) {
        // 말하는 도중 끊기: 대사를 띄운 뒤 cutAfter(기본 1초) 만에 바로 통화 종료 (대사는 그대로 남음)
        timers.push(setTimeout(() => {
          lineEl.innerHTML = `${label(l)}${esc(l.text)}`;
          lineEl.classList.toggle("me", l.who === "me");
          lineEl.classList.add("show");
        }, at));
        timers.push(setTimeout(() => onEnd(true), at + (l.cutAfter || 1000)));
        return;
      }
      timers.push(setTimeout(() => {
        lineEl.innerHTML = `${label(l)}${esc(l.text)}`;
        lineEl.classList.toggle("me", l.who === "me");
        lineEl.classList.add("show");
      }, at));
      at += l.ms || 2800;
      timers.push(setTimeout(() => lineEl.classList.remove("show"), at));
    }
    timers.push(setTimeout(() => onEnd(false), at + (o.hangUp ?? 900)));
  }
  /* ================= 거는 전화 (통화 기록에서 누르면) ================= */
  let ringbackTimer = null;
  function ringbackOnce() {
    try {
      if (!audioCtx) return;
      if (audioCtx.state === "suspended") audioCtx.resume();
      const at = audioCtx.currentTime;
      [440, 480].forEach(f => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.frequency.value = f; g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(.06, at + .03); g.gain.setValueAtTime(.06, at + 1); g.gain.linearRampToValueAtTime(0, at + 1.05);
        o.connect(g).connect(audioCtx.destination); o.start(at); o.stop(at + 1.1);
      });
    } catch (e) {}
  }
  function outgoingCall(name) {
    if (callEl) return;
    const S = P.callScripts || {}, script = S[name] || S["기본"] || { lines: [] };
    const rate = script.answer ?? S.answerRate ?? 0.8;
    const answered = Math.random() < rate;
    hideBanner();
    callEl = h(`<div class="callui live dialing">
      <div class="cu-liveview">
        <div class="cu-name">${esc(name)}</div><div class="cu-sub"><span class="cu-sim">기본</span><span data-ctime>호출 중...</span></div>
        <div class="cu-line" data-line></div>
        <div class="cu-grid">${[["mute", "소리 끔"], ["keypad", "키패드"], ["audio", "오디오"], ["add", "통화 추가"], ["facetime", "FaceTime"], ["contact", "연락처"]].map(([k, l]) => `<button class="cu-key" data-key="${k}"><i>${CI[k]}</i><small>${l}</small></button>`).join("")}</div>
        <button class="cu-end" data-end>${CI.hang}</button>
      </div>
    </div>`);
    $("#device").appendChild(callEl);
    $("#device").classList.add("in-call");
    requestAnimationFrame(() => requestAnimationFrame(() => callEl.classList.add("in")));
    const tEl = callEl.querySelector("[data-ctime]"), lineEl = callEl.querySelector("[data-line]"), timers = [];
    callEl.querySelectorAll('[data-key="mute"],[data-key="audio"]').forEach(k => k.onclick = () => k.classList.toggle("on"));
    ringbackOnce(); ringbackTimer = setInterval(ringbackOnce, 3000);
    let done = false;
    const finish = (label, keepLine) => {
      if (done) return; done = true;
      timers.forEach(clearTimeout); clearInterval(ringbackTimer); clearInterval(callTimer); if (!keepLine) lineEl.classList.remove("show");
      logOutgoing(name); tEl.textContent = label; setTimeout(closeCall, keepLine ? 1600 : 900);
    };
    callEl.querySelector("[data-end]").onclick = () => finish(callEl.classList.contains("dialing") ? "통화 취소" : "통화 종료");
    const waitMs = answered ? 3000 + Math.random() * 3000 : 9000;
    timers.push(setTimeout(() => {
      clearInterval(ringbackTimer);
      if (!answered) { finish("응답 없음"); return; }
      callEl.classList.remove("dialing");
      const t0 = Date.now();
      const draw = () => { const sec = Math.floor((Date.now() - t0) / 1000); tEl.textContent = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`; };
      draw(); callTimer = setInterval(draw, 1000);
      runLines(script.lines || [], lineEl, timers, { start: script.lineStart, hangUp: script.hangUpAfter, name }, cut => finish("통화 종료", cut));
    }, waitMs));
  }
  function logOutgoing(name) {
    const last = P.calls[0];
    if (last && last.name === name && last.dir === "out" && !last.missed && last.when === P.time) last.count = (last.count || 1) + 1;
    else P.calls.unshift({ name, kind: (P.calls.find(c => c.name === name) || {}).kind || "휴대전화", dir: "out", when: P.time });
    refreshCalls();
  }
  function refreshCalls() { document.querySelectorAll("[data-calls]").forEach(box => box.innerHTML = callsHTML()); }
  function closeCall() {
    if (!callEl) return;
    const el = callEl; callEl = null;
    $("#device").classList.remove("in-call");
    el.classList.remove("in"); setTimeout(() => el.remove(), 400);
  }

  function tick() {
    const t = phoneSec(), hh = Math.floor(t / 3600) % 24, mm = Math.floor(t / 60) % 60, ss = t % 60;
    const str = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    if (str !== P.time) P.time = str;
    $("#sbTime").textContent = P.time;
    const ha = ((hh % 12) + mm / 60) * 30, ma = mm * 6, sa = ss * 6;
    document.querySelectorAll(".ic-h").forEach(n => n.setAttribute("transform", `rotate(${ha} 30 30)`));
    document.querySelectorAll(".ic-m").forEach(n => n.setAttribute("transform", `rotate(${ma} 30 30)`));
    document.querySelectorAll(".ic-sec").forEach(n => n.setAttribute("transform", `rotate(${sa} 30 30)`));
    // 오늘 일정 중 alert: true 인 것이 시작 시각이 되면 알림
    if (lockEl) lockEl.querySelector("[data-ltime]").textContent = (() => { const [a, b] = P.time.split(":"); return `${+a > 12 ? +a - 12 : +a}:${b}`; })();
    if (!layer.classList.contains("open") || locked) return;
    const C = P.incomingCall;
    if (C && C.from && !callFired && !callEl && clockStart && t - START_SEC >= (C.afterMinutes ?? 5) * 60) { callFired = true; incomingCall(); }
    const today = P.today;
    ((P.calendar && P.calendar.events) || []).forEach(e => {
      const id = e.date + e.start + e.title;
      if (e.alert && e.date === today && e.start && e.start <= P.time && !alerted.has(id)) {
        alerted.add(id);
        const [eh, em] = e.start.split(":").map(Number);
        const when = `${eh < 12 ? "오전" : "오후"} ${eh % 12 === 0 ? 12 : eh % 12}:${String(em).padStart(2, "0")}`;
        showBanner({ kind: "calendar", app: "캘린더", from: e.title, text: `오늘 ${when}${e.place ? " · " + e.place : ""}`, duration: 9000, onHide: startKakaoQueue });
        chime();
      }
    });
  }
  setInterval(tick, 1000);


  /* ================= 잠금화면 · 암호 ================= */
  let locked = false, lockEl = null, pin = "";
  const PASS = String(P.passcode || "");
  const PASS_LEN = PASS.length || 4;
  const keys = [["1", ""], ["2", "ABC"], ["3", "DEF"], ["4", "GHI"], ["5", "JKL"], ["6", "MNO"], ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"]];
  function lockPhone() {
    locked = true; pin = "";
    lockEl?.remove();
    const [hh, mm] = P.time.split(":");
    lockEl = h(`<div class="lock">
      <div class="lk-main">
        <svg class="lk-ic" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>
        <div class="lk-date">${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일 ${WD[TODAY.getDay()]}요일</div>
        <div class="lk-time" data-ltime>${+hh > 12 ? +hh - 12 : +hh}:${mm}</div>
        <div class="lk-bottom"><span class="lk-btn"><svg viewBox="0 0 24 24"><path d="M8 2h8l-1.5 6v13a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9.5 21V8z" fill="currentColor"/></svg></span><span class="lk-btn"><svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="currentColor"/><circle cx="12" cy="13" r="3.5" fill="#333"/></svg></span></div>
        <div class="lk-hint">위로 쓸어올려 열기</div>
      </div>
      <div class="lk-pin">
        <div class="pin-title">암호 입력</div>
        <div class="pin-dots">${"<i></i>".repeat(PASS_LEN)}</div>
        <div class="pin-pad">${keys.map(([n, l]) => `<button data-k="${n}"><b>${n}</b><small>${l}</small></button>`).join("")}<span></span><button data-k="0"><b>0</b></button><span></span></div>
        <div class="pin-foot"><span>긴급 상황</span><button data-del>취소</button></div>
      </div>
    </div>`);
    $("#device").insertBefore(lockEl, $("#banner"));
    $("#device").classList.add("is-locked");
    // 아래에서 위로 쓸어올리면 암호 화면
    let sy = null;
    lockEl.addEventListener("pointerdown", e => { if (!lockEl.classList.contains("pin")) sy = e.clientY; });
    lockEl.addEventListener("pointerup", e => { if (sy !== null && sy - e.clientY > 60) showPin(); sy = null; });
    lockEl.addEventListener("click", e => {
      const k = e.target.closest("[data-k]"); if (k) { press(k.dataset.k); return; }
      if (e.target.closest("[data-del]")) { if (pin) { pin = pin.slice(0, -1); drawPin(); } else hidePin(); }
    });
  }
  function showPin() { pin = ""; drawPin(); lockEl.classList.add("pin"); }
  function hidePin() { lockEl.classList.remove("pin"); }
  function drawPin() {
    lockEl.querySelectorAll(".pin-dots i").forEach((d, i) => d.classList.toggle("on", i < pin.length));
    lockEl.querySelector("[data-del]").textContent = pin ? "삭제" : "취소";
  }
  function press(n) {
    if (!locked || pin.length >= PASS_LEN) return;
    pin += n; drawPin();
    if (pin.length < PASS_LEN) return;
    if (!PASS || pin === PASS) setTimeout(unlock, 150);
    else setTimeout(() => { const dots = lockEl.querySelector(".pin-dots"); dots.classList.remove("shake"); void dots.offsetWidth; dots.classList.add("shake"); try { navigator.vibrate && navigator.vibrate(120); } catch (e) {} pin = ""; drawPin(); }, 150);
  }
  function unlock() {
    locked = false;
    if (!clockStart) clockStart = Date.now();   // 처음 잠금을 풀 때부터 시간이 흐르기 시작
    const el = lockEl; lockEl = null;
    $("#device").classList.remove("is-locked");
    el.classList.add("out"); setTimeout(() => el.remove(), 450);
    tick();
  }
  document.addEventListener("keydown", e => {
    if (!locked || !lockEl || !layer.classList.contains("open")) return;
    if (/^[0-9]$/.test(e.key)) { if (!lockEl.classList.contains("pin")) showPin(); press(e.key); }
    else if (e.key === "Backspace" && pin) { pin = pin.slice(0, -1); drawPin(); }
    else if ((e.key === "Enter" || e.key === "ArrowUp" || e.key === " ") && !lockEl.classList.contains("pin")) { e.preventDefault(); showPin(); }
  });

  /* ================= 열기/닫기 ================= */
  let startedOnPhone = false;
  /* 화면 높이에 맞춰 통화·잠금 화면 크기 조절 */
  function fitScale() {
    const dev = $("#device"), hgt = dev.clientHeight || 844;
    dev.style.setProperty("--s", Math.min(1, Math.max(.55, hgt / 844)).toFixed(3));
  }
  window.addEventListener("resize", fitScale);
  if (window.visualViewport) visualViewport.addEventListener("resize", fitScale);
  function openPhone() {
    if (layer.classList.contains("open")) return;
    requestAnimationFrame(fitScale);
    try { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    screens.innerHTML = ""; stack = [];
    show(homeScreen(), "none");
    stack[0].classList.remove("push-enter");
    lockPhone();
    layer.classList.add("open"); layer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closePhone() {
    const n = stack.length - 1;
    hidePhone();
    if (startedOnPhone) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} startedOnPhone = false; }
    else syncHistory(n + 1);
  }
  function hidePhone() {
    if (callEl) { const live = callEl.classList.contains("live"); stopRing(); clearInterval(callTimer); callEl.remove(); callEl = null; $("#device").classList.remove("in-call"); logCall((P.incomingCall || {}).from || "강민재", !live); }
    stack.forEach(sc => sc._cleanup && sc._cleanup());
    layer.classList.remove("open"); layer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; hideBanner();
  }
  layer.addEventListener("click", e => { if (e.target.closest("[data-close]")) closePhone(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && layer.classList.contains("open")) (stack.length > 1 ? back() : closePhone()); });
  story.addEventListener("click", e => {
    const a = e.target.closest(".phone-link"); if (!a) return;
    e.preventDefault();
    try { history.pushState({ d: 0 }, "", "#phone"); } catch (err) {}
    openPhone();
  });
  // 브라우저/안드로이드 '뒤로 가기' → 휴대폰 안에서 한 단계 뒤로
  window.addEventListener("popstate", e => {
    if (ignorePops > 0) { ignorePops--; return; }
    const d = e.state && typeof e.state.d === "number" ? e.state.d : (location.hash === "#phone" ? 0 : -1);
    if (d < 0) { hidePhone(); return; }
    if (!layer.classList.contains("open")) openPhone();
    popTo(d, d === 0);
  });
  if (location.hash === "#phone") {
    startedOnPhone = true;
    try { history.replaceState({ d: 0 }, "", "#phone"); } catch (e) {}
    openPhone();
  }
})();
