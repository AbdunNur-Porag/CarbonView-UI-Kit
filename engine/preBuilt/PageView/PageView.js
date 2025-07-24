// Inject page-view styles at runtime
(function injectPageViewStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .page-view {
      display: none;
    }

    .page-view.active {
      display: block;
    }
  `;
  document.head.appendChild(style);
})();

// === PAGEVIEW ROUTER ===
const PageRegistry = {};
let initialSet = false;
let NotFoundPage = null;

function PageView({ Name, InitialPage = false, Children }) {
  const view = create("div")
    .id("page-" + Name)
    .class(["page-view"])
    .children(Children);

  PageRegistry[Name] = view;
  view.add("#app");

  const current = new URLSearchParams(window.location.search).get("page");
  if (!initialSet && (current === Name || (!current && InitialPage))) {
    view.el.classList.add("active");
    history.replaceState({}, "", "?page=" + Name);
    initialSet = true;
  }

  return view;
}

function OpenPageView(name, fromPopState = false) {
  let found = false;

  for (const key in PageRegistry) {
    const page = PageRegistry[key];
    page.el.classList.remove("active");
    if (key === name) {
      page.el.classList.add("active");
      found = true;
    }
  }

  if (!found && NotFoundPage) {
    for (const key in PageRegistry) PageRegistry[key].el.classList.remove("active");
    NotFoundPage.el.classList.add("active");
    if (!fromPopState) {
      history.pushState({}, "", "?page=notfound");
    }
    return;
  }

  if (!fromPopState) {
    const current = new URLSearchParams(window.location.search).get("page");
    if (current !== name) {
      history.pushState({}, "", "?page=" + name);
    }
  }
}

function BackPageView() {
  history.back();
}

function handlePageFromURL() {
  const pageName = new URLSearchParams(window.location.search).get("page");
  OpenPageView(pageName || "", true);
}

window.addEventListener("DOMContentLoaded", handlePageFromURL);
window.addEventListener("popstate", handlePageFromURL);
