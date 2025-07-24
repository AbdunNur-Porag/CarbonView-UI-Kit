const slide1 = create("div").style({ background: "crimson", color: "white" }).text("Slide 1");
const slide2 = create("div").style({ background: "navy", color: "white" }).text("Slide 2");
const slide3 = create("div").style({ background: "green", color: "white" }).text("Slide 3");

const mySlides = SlideView({
  direction: "top-to-bottom",
  items: [slide1, slide2, slide3] // or use items: { a: slide1, b: slide2 }
});

mySlides.add("body");
