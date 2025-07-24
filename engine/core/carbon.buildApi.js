// CARBON BUILD API
/*
create(tag)
.id()
.class([])
.attrs({})
.style({})
.event(function)
.add(id or class)
.children({
  nested obj
})
*/
function create(tag) {
  const el = document.createElement(tag);

  const api = {
    el,

    id(id) {
      el.id = id;
      return this;
    },

    class(classes) {
      if (Array.isArray(classes)) {
        el.classList.add(...classes);
      } else if (typeof classes === "string") {
        el.classList.add(classes);
      }
      return this;
    },

    attrs(attrObj) {
      for (const key in attrObj) {
        el.setAttribute(key, attrObj[key]);
      }
      return this;
    },

    style(styleObj) {
      Object.assign(el.style, styleObj);
      return this;
    },

    event(eventMap) {
      for (const type in eventMap) {
        el.addEventListener(type, eventMap[type]);
      }
      return this;
    },

    html(rawHTML) {
      el.innerHTML = rawHTML;
      return this;
    },

    text(textContent) {
      el.innerText = textContent;
      return this;
    },

    add(selector) {
      const target =
        typeof selector === "string"
          ? document.querySelector(selector)
          : selector instanceof HTMLElement
          ? selector
          : null;

      if (target) {
        target.appendChild(el);
      }
      return this;
    },

    children(childMap) {
      for (const key in childMap) {
        const child = childMap[key];
        if (child && child.el instanceof HTMLElement) {
          el.appendChild(child.el);
          this[key] = child; // Attach child to parent
        }

        // If child has its own .children(), it will also store grandchild references
      }
      return this;
    },
  };

  return api;
}
