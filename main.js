async function loadAllScripts() {
  try {
    await LoadJs("/engine/preBuilt/SlideView/SlideView.js");
    console.log("✅ All scripts and styles loaded successfully.");
  } catch (err) {
    console.error("❌ Script load failed:", err.message);
    alert("Script failed to load: " + err.message);
  }
}

loadAllScripts();
