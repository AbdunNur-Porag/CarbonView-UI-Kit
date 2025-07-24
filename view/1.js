const app = create("div")
  .id("app")
  .children({
    header: create("div").children({
      logo: create("h1").text("My App"),
    }),
    main: create("div").children({
      section: create("div").children({
        article: create("p").text("Read me."),
      }),
    }),
  })
  .add("#app");

// ✅ Deep child edit:
app.header.logo.text("New Logo").style({ color: "red" });
app.main.section.article.text("Updated article.");

// Example items array: mix of strings and build API created elements
const customItems = [
  create("button")
    .text("Click Me")
    .style({ backgroundColor: "lightblue", border: "none", cursor: "pointer" }),

  create("div").html("<b>Bold Text</b>").style({ color: "darkgreen" }),

  "Simple Text Item",

  create("img")
    .attrs({ src: "https://via.placeholder.com/100", alt: "Placeholder" })
    .style({ display: "block", margin: "auto", borderRadius: "8px" }),
];

// Create the grid view component
const myGrid = GridView({
  items: customItems,
  Width: "140px",
  Height: "120px",
  MarginBetween: "15px",
  MarginLeft: "20px",
  MarginTop: "20px",
  MarginRight: "20px",
  MarginBottom: "20px",
  LineGapTop: "10px",
  LineGapBottom: "30px",
});

// Add the grid to the page inside the element with id "app"
myGrid.add("#app");



const itemsArray = [
  create("button").text("Button A").style({ backgroundColor: "lightblue", border: "none", cursor: "pointer" }),
  "Text Item A",
  create("div").html("<i>Italic Div</i>").style({ color: "purple" }),
  "Text Item B",
  create("img").attrs({ src: "https://via.placeholder.com/80" }).style({ borderRadius: "6px" }),
  "Text Item C",
];

const itemsObject = {
  first: create("button").text("Button 1").style({ backgroundColor: "lightgreen", border: "none", cursor: "pointer" }),
  second: "Simple Text 2",
  third: create("div").html("<b>Bold Text 3</b>").style({ color: "darkred" }),
  fourth: create("img").attrs({ src: "https://via.placeholder.com/100" }).style({ borderRadius: "10px" }),
  fifth: "Another Text 4",
};

ScrollView({
  id: "verticalScroll",
  Type: "Vertical",
  items: itemsArray,
  Height:"200px",
  ItemGap: "12px",
}).add("#app");

ScrollView({
  id: "horizontalScroll",
  Type: "Horizontal",
  items: itemsObject,
  Width: "300px",
  Height: "DeviceWidth",
  ItemGap: "15px",
}).add("#app");
