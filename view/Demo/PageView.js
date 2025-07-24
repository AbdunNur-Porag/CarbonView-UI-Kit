PageView({
  Name: "home",
  InitialPage: true,
  Children: {
    title: create("h1").text("Home Page"),
    btn: create("button").text("Go to About").event({
      click: () => OpenPageView("about")
    }),
    back: create("button").text("Back").event({
      click: () => BackPageView()
    }),
  },
});

PageView({
  Name: "about",
  Children: {
    title: create("h1").text("About Page"),
    btn: create("button").text("Go to Home").event({
      click: () => OpenPageView("home")
    }),
    back: create("button").text("Back").event({
      click: () => BackPageView()
    }),
  },
});

// === NOT FOUND PAGE ===
NotFoundPage = create("div")
  .id("page-notfound")
  .class(["page-view"])
  .children({
    msg: create("h2").text("❌ Page View Not Found"),
    back: create("button").text("Back").event({
      click: () => BackPageView()
    }),
  })
  .add("#app");