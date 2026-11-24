(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const drawer = document.querySelector(".nav-drawer");
  const drawerClose = document.querySelector(".nav-drawer__close");
  const navLinks = document.querySelectorAll(".nav-desktop a[href^='#']");
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const progress = document.querySelector(".cs-progress");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const setHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });

  const setDrawer = (open) => {
    if (!drawer || !toggle) return;
    drawer.classList.toggle("is-open", open);
    drawer.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
    if (open) drawer.querySelector("a")?.focus();
    else toggle.focus();
  };

  toggle?.addEventListener("click", () => setDrawer(true));
  drawerClose?.addEventListener("click", () => setDrawer(false));
  drawer?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setDrawer(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer?.classList.contains("is-open")) {
      setDrawer(false);
    }
  });

  drawer?.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusable = [...drawer.querySelectorAll("a, button")];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  const onScrollSpy = () => {
    if (!sections.length) return;
    const fromTop = window.scrollY + 96;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.offsetTop <= fromTop) current = section;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
    });
  };

  window.addEventListener("scroll", onScrollSpy, { passive: true });
  onScrollSpy();

  const csLinks = document.querySelectorAll(".cs-nav a");
  const csSections = [...csLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const onCaseSpy = () => {
    if (!csSections.length) return;
    const fromTop = window.scrollY + 120;
    let current = csSections[0];
    csSections.forEach((section) => {
      if (section.offsetTop <= fromTop) current = section;
    });
    csLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
    });
  };

  window.addEventListener("scroll", onCaseSpy, { passive: true });
  onCaseSpy();

  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? window.scrollY / max : 0;
    progress.style.transform = `scaleX(${value})`;
    progress.style.width = "100%";
  };

  if (progress) {
    progress.style.transform = "scaleX(0)";
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal, .media-reveal, .step").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal, .media-reveal, .step").forEach((el) => el.classList.add("is-in"));
  }

  if (!reduceMotion && finePointer) {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / 8;
        const y = (e.clientY - r.top - r.height / 2) / 8;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });

    document.body.classList.add("has-cursor");
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;

    window.addEventListener(
      "mousemove",
      (e) => {
        x = e.clientX;
        y = e.clientY;
        dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      },
      { passive: true }
    );

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("is-pointer"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("is-pointer"));
    });
  }
})();
