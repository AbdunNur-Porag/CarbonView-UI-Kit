function SlideView(config = {}) {
  const {
    id = "SlideView",
    direction = "left-to-right",
    items = [],
    style = {},
  } = config;

  const isVertical = direction.includes("top") || direction.includes("bottom");
  const isReverse = direction === "right-to-left" || direction === "bottom-to-top";
  let index = 0;

  const wrapper = create("div")
    .id(id)
    .class(["slide-view"])
    .style({
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      position: "relative",
      touchAction: "pan-y pan-x",
      ...style,
    });

  const inner = create("div")
    .class(["slider-inner"])
    .style({
      display: "flex",
      flexDirection: isVertical ? "column" : "row",
      width: "100%",
      height: "100%",
      transition: "transform 0.4s ease",
    });

  // Process items: accept object or array of `create()` components
  const itemList = Array.isArray(items)
    ? items
    : Object.values(items); // support items as object

  itemList.forEach((item) => {
    if (item && item.el instanceof HTMLElement) {
      item.style({
        width: "100vw",
        height: "100vh",
        flexShrink: "0",
      });
      inner.el.appendChild(item.el);
    }
  });

  wrapper.children({ inner });

  // === Swipe Logic ===
  let start = 0, delta = 0, dragging = false;

  const getTranslate = () =>
    isVertical
      ? `translateY(-${index * 100}vh)`
      : `translateX(-${index * 100}vw)`;

  const updateSlide = () => {
    inner.style({ transform: getTranslate() });
  };

  const onStart = (pos) => {
    dragging = true;
    start = pos;
  };

  const onMove = (pos) => {
    if (!dragging) return;
    delta = pos - start;
  };

  const onEnd = () => {
    const threshold = 50;
    if (Math.abs(delta) > threshold) {
      if ((delta < 0 && !isReverse) || (delta > 0 && isReverse)) {
        index = Math.min(index + 1, itemList.length - 1);
      } else {
        index = Math.max(index - 1, 0);
      }
    }
    updateSlide();
    dragging = false;
    delta = 0;
  };

  wrapper.el.addEventListener("touchstart", (e) =>
    onStart(isVertical ? e.touches[0].clientY : e.touches[0].clientX)
  );
  wrapper.el.addEventListener("touchmove", (e) =>
    onMove(isVertical ? e.touches[0].clientY : e.touches[0].clientX)
  );
  wrapper.el.addEventListener("touchend", onEnd);

  wrapper.el.addEventListener("mousedown", (e) =>
    onStart(isVertical ? e.clientY : e.clientX)
  );
  wrapper.el.addEventListener("mousemove", (e) =>
    onMove(isVertical ? e.clientY : e.clientX)
  );
  wrapper.el.addEventListener("mouseup", onEnd);
  wrapper.el.addEventListener("mouseleave", () => dragging && onEnd());

  return wrapper;
}
