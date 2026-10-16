// =========================================================
// Portfolio interactivity (DOM manipulation + event handling)
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavToggle();
  initScrollSpy();
  initSkillMap();
  initSkillBars();
  initProjectFilter();
  initContactForm();
  initKonamiSparkles();
  initHitCounter();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ---------- 1. Light / dark theme (button click) ---------- */
function initTheme() {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* storage unavailable */ }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  apply(saved || (prefersDark ? "dark" : "light"));

  button.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  });

  function apply(theme) {
    root.dataset.theme = theme;
    const isDark = theme === "dark";
    icon.innerHTML = isDark ? "&#9728;" : "&#9790;"; // sun / moon
    button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }
}

/* ---------- 2. Mobile menu (button click) ---------- */
function initNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  const setOpen = (open) => {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(!links.classList.contains("is-open")));
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/* ---------- 3. Highlight the current section in the menu ---------- */
function initScrollSpy() {
  const links = document.querySelectorAll(".nav-links a[data-section]");
  const sections = [...links].map((a) => document.getElementById(a.dataset.section));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-active", a.dataset.section === entry.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach((s) => s && observer.observe(s));
}

/* ---------- 4. Interactive skill map in the hero ---------- */
function initSkillMap() {
  const info = {
    web: "HTML and CSS: semantic pages, Flexbox and Grid layouts, and responsive design. Certified by freeCodeCamp.",
    laravel: "Laravel: building back-end features and database-driven pages with PHP.",
    data: "Data analysis: cleaning data, finding patterns and presenting the results clearly.",
    network: "Network fundamentals: addressing, protocols and how devices talk to each other.",
    tools: "Jira, Trello and Asana: planning tasks, tracking progress and working in a team."
  };

  const nodes = document.querySelectorAll("#skill-map .node");
  const caption = document.getElementById("skill-caption");

  const select = (node) => {
    nodes.forEach((n) => n.classList.toggle("is-selected", n === node));
    caption.textContent = info[node.dataset.info];
  };

  nodes.forEach((node) => {
    node.addEventListener("click", () => select(node));
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(node); }
    });
  });
}

/* ---------- 5. Skill bars fill when scrolled into view ---------- */
function initSkillBars() {
  const fills = document.querySelectorAll(".fill");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const show = (el) => { el.style.width = el.dataset.level + "%"; };

  if (reduce || !("IntersectionObserver" in window)) {
    fills.forEach(show);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { show(entry.target); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });

  fills.forEach((f) => observer.observe(f));
}

/* ---------- 6. Project filter (button clicks) ---------- */
function initProjectFilter() {
  const buttons = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll("#project-grid .card");
  const emptyNote = document.getElementById("empty-note");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      let visible = 0;
      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.hidden = !match;
        if (match) visible++;
      });
      emptyNote.hidden = visible > 0;
    });
  });
}

/* ---------- 7. Contact form (submit event + validation) ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Enter your name (at least 2 characters)."),
    email: (v) => (emailPattern.test(v.trim()) ? "" : "Enter a valid email address, like name@example.com."),
    message: (v) => (v.trim().length >= 10 ? "" : "Write a message of at least 10 characters.")
  };

  function validateField(input) {
    const message = rules[input.name](input.value);
    const field = input.closest(".field");
    field.classList.toggle("invalid", message !== "");
    field.querySelector(".error").textContent = message;
    input.setAttribute("aria-invalid", String(message !== ""));
    return message === "";
  }

  const inputs = [...form.querySelectorAll("input, textarea")];

  // Validate each field as soon as the user leaves it, and re-check while fixing errors
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("invalid")) validateField(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    const results = inputs.map(validateField);
    const firstInvalid = inputs[results.indexOf(false)];

    if (firstInvalid) {
      firstInvalid.focus();
      status.textContent = "Fix the highlighted fields and try again.";
      return;
    }

    // No back end in this lab: show a confirmation instead of sending data.
    const name = form.elements.name.value.trim();
    status.classList.add("ok");
    status.textContent = `Thanks, ${name}. Your message is ready to send (demo only, no server connected).`;
    form.reset();
  });
}

/* ---------- 8. Secret: type "y2k" anywhere for a sparkle shower ---------- */
function initKonamiSparkles() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const target = "y2k";
  let typed = "";

  const makeSparkle = () => {
    const s = document.createElement("span");
    s.textContent = "✦";
    s.className = "falling-sparkle";
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 0.9 + Math.random() * 1.1 + "rem";
    s.style.animationDuration = 2.2 + Math.random() * 1.8 + "s";
    document.body.appendChild(s);
    s.addEventListener("animationend", () => s.remove());
  };

  document.addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-target.length);
    if (typed === "y2k") {
      typed = "";
      for (let i = 0; i < 24; i++) setTimeout(makeSparkle, i * 90);
    }
  });
}

/* ---------- 9. Fake visitor counter (localStorage, purely decorative) ---------- */
function initHitCounter() {
  const el = document.getElementById("visits");
  if (!el) return;
  let visits = 0;
  try {
    visits = parseInt(localStorage.getItem("y2k-visits") || "0", 10) + 1;
    localStorage.setItem("y2k-visits", String(visits));
  } catch { /* storage unavailable */ visits = 1; }
  el.textContent = String(136 + visits).padStart(6, "0");
}
