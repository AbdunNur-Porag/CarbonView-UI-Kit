function ScrollView({
  id = "scrollView",
  Type = "Vertical",
  items = [],
  Width,
  Height,
  ItemGap = "10px",
}) {
  const isHorizontal = Type.toLowerCase() === "horizontal";

  // Resolve special device dimension strings
  const resolvedWidth =
    Width === "DeviceWidth" ? window.innerWidth + "px" : Width;
  const resolvedHeight =
    Height === "DeviceHeight" ? window.innerHeight + "px" : Height;

  const styleObj = {
    overflowX: isHorizontal ? "auto" : "hidden",
    overflowY: isHorizontal ? "hidden" : "auto",
    display: "flex",
    flexDirection: isHorizontal ? "row" : "column",
    gap: ItemGap,
    boxSizing: "border-box",
    border: "1px solid #ccc",
    padding: "5px",
    minWidth: isHorizontal ? "300px" : "150px",
    minHeight: isHorizontal ? "100px" : "200px",
  };

  if (resolvedWidth) {
    styleObj.width = resolvedWidth;
    delete styleObj.minWidth;
  }
  if (resolvedHeight) {
    styleObj.height = resolvedHeight;
    delete styleObj.minHeight;
  }

  const container = create("div").id(id).style(styleObj);

  const children = {};

  // Normalize items: if object, take values; else array as is
  const normalizedItems = Array.isArray(items)
    ? items
    : typeof items === "object" && items !== null
    ? Object.values(items)
    : [];

  normalizedItems.forEach((item, index) => {
    if (typeof item === "string") {
      children[`item${index}`] = create("div")
        .text(item)
        .style({
          padding: "10px",
          backgroundColor: "lightgray",
          borderRadius: "5px",
          whiteSpace: "nowrap",
          flexShrink: 0,
        });
    } else if (item && item.el instanceof HTMLElement) {
      item.style({
        whiteSpace: "nowrap",
        flexShrink: 0,
      });
      children[`item${index}`] = item;
    }
  });

  container.children(children);

  return container;
}
