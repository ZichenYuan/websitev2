/**
 * Sunny Yuan — personal site
 * Behaviour adapted from the iPortfolio template (BootstrapMade).
 */
(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;
    if (all) selectEl.forEach((e) => e.addEventListener(type, listener));
    else selectEl.addEventListener(type, listener);
  };

  const onscroll = (el, listener) => el.addEventListener("scroll", listener);

  /* Navbar links active state on scroll */
  const navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /* Smooth scroll to an element */
  const scrollto = (el) => {
    const target = select(el);
    if (!target) return;
    window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };

  /* Back to top button */
  const backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle("active", window.scrollY > 100);
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /* Mobile nav toggle */
  on("click", ".mobile-nav-toggle", function () {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /* Scroll with offset on links with a class name .scrollto */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();
        const body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          const navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /* Scroll with offset on page load with hash links in the url */
  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) scrollto(window.location.hash);
  });

  /* Hero type effect */
  const typed = select(".typed");
  if (typed && window.Typed) {
    let typedStrings = typed.getAttribute("data-typed-items");
    typedStrings = typedStrings.split(",").map((s) => s.trim());
    new Typed(".typed", {
      strings: typedStrings,
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2000,
    });
  }

  /* Portfolio isotope and filter */
  window.addEventListener("load", () => {
    const portfolioContainer = select(".portfolio-container");
    if (portfolioContainer && window.Isotope) {
      const portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      const portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach((el) => el.classList.remove("filter-active"));
          this.classList.add("filter-active");
          portfolioIsotope.arrange({ filter: this.getAttribute("data-filter") });
          portfolioIsotope.on("arrangeComplete", () => {
            if (window.AOS) AOS.refresh();
          });
        },
        true
      );
    }
  });

  /* Animation on scroll */
  window.addEventListener("load", () => {
    if (window.AOS) {
      AOS.init({ duration: 1000, easing: "ease-in-out", once: true, mirror: false });
    }
  });
})();
