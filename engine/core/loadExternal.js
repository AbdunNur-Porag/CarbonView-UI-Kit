function LoadJs(path, options = {}, maxRetries = 3) {
  const {
    type = "",
    async = true,
    defer = false,
    integrity = "",
    crossOrigin = "",
    force = false,
  } = options;

  return new Promise((resolve, reject) => {
    // Already loaded check — check also for success state
    const existing = document.querySelector(`script[src="${path}"]`);
    if (existing && !force) {
      if (existing.dataset.loaded === "true") {
        return resolve(`${path} already loaded`);
      } else {
        // Wait for it to finish loading
        existing.addEventListener("load", () => resolve(`${path} loaded later`));
        existing.addEventListener("error", () => reject(new Error(`Failed previously: ${path}`)));
        return;
      }
    }

    let attempts = 0;

    function tryLoad() {
      const script = document.createElement("script");
      script.src = path;
      if (type) script.type = type;
      if (async) script.async = true;
      if (defer) script.defer = true;
      if (integrity) script.integrity = integrity;
      if (crossOrigin) script.crossOrigin = crossOrigin;

      script.dataset.loaded = "false";

      script.onload = () => {
        script.dataset.loaded = "true";
        resolve(`Loaded: ${path}`);
      };

      script.onerror = () => {
        script.remove(); // remove broken tag
        attempts++;
        if (attempts < maxRetries) {
          console.warn(`Retrying ${path} (${attempts})`);
          setTimeout(tryLoad, 200 * attempts); // backoff retry
        } else {
          reject(new Error(`Failed to load: ${path} after ${attempts} attempts`));
        }
      };

      document.head.appendChild(script);
    }

    tryLoad();
  });
}
