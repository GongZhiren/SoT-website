function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  if (!lightbox || !lightboxImg || !closeBtn) return;

  const imgs = document.querySelectorAll("img[data-full]");
  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      const src = img.getAttribute("data-full");
      if (!src) return;
      lightboxImg.src = src;
      lightbox.classList.add("show");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("show")) closeLightbox();
  });
}

function initNavHighlight() {
  const links = Array.from(document.querySelectorAll(".nav nav a[href^='#']"));
  if (!links.length) return;

  const map = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    const sec = document.getElementById(id);
    if (sec) map.set(sec, link);
  });

  const sections = Array.from(map.keys());
  if (!sections.length) return;

  function setActive(link) {
    links.forEach((item) => item.classList.remove("active"));
    if (link) link.classList.add("active");
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      setActive(map.get(visible[0].target));
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.35, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
  setActive(map.get(sections[0]));
}

function initDatasetTabs() {
  const tabs = Array.from(document.querySelectorAll(".tab-btn"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.panel;
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });
}

function initResultPanels() {
  const toggles = Array.from(document.querySelectorAll(".result-toggle"));
  const panels = Array.from(document.querySelectorAll(".result-panel"));
  if (!toggles.length || !panels.length) return;

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      if (!target) return;
      toggles.forEach((item) => item.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("show"));
      btn.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) panel.classList.add("show");
    });
  });
}

initLightbox();
initNavHighlight();
initDatasetTabs();
initResultPanels();
