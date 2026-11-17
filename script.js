// ===== تبديل اللغة =====
const pageTitles = {
  ar: "حنين زيد | موقع تعريفي",
  en: "Haneen Zayed | Personal Portfolio"
};

const pageDescriptions = {
  ar: "الموقع التعريفي لحنين خالد منصور زيد - طالبة علوم حاسب مهتمة بتطوير البرمجيات وتصميم المواقع.",
  en: "Personal portfolio of Haneen Khaled Mansour Zayed - a Computer Science student passionate about software development and web design."
};

const translatable = document.querySelectorAll("[data-ar]");
const langButtons = document.querySelectorAll(".lang-btn");

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  translatable.forEach((el) => {
    const value = el.getAttribute(`data-${lang}`);
    if (value !== null) {
      el.innerHTML = value.replace("{year}", new Date().getFullYear());
    }
  });

  document.querySelectorAll("[data-ar-label]").forEach((el) => {
    el.setAttribute("aria-label", el.getAttribute(`data-${lang}-label`));
  });

  document.title = pageTitles[lang];
  document.getElementById("metaDescription").content = pageDescriptions[lang];

  langButtons.forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  localStorage.setItem("site-lang", lang);
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

setLanguage(localStorage.getItem("site-lang") === "en" ? "en" : "ar");

// ===== تبديل الوضع الليلي =====
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  }
});

// ===== قائمة الجوال =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== تمييز الرابط النشط أثناء التمرير =====
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});
