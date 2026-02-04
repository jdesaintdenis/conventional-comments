// Attach listeners to settings checkboxes
function attachListeners(root) {
  // Prettify option
  const prettifyToggle = root.querySelector("#prettify");

  if (prettifyToggle) {
    chrome.storage.local.get(["prettify"], (result) => {
      prettifyToggle.checked = result.prettify ?? true; // Default to true
    });

    prettifyToggle.addEventListener("change", () => {
      const isEnabled = prettifyToggle.checked;
      chrome.storage.local.set({ prettify: isEnabled });
    });
  }

  const boldLabelsToggle = root.querySelector("#bold-labels");

  if (boldLabelsToggle) {
    chrome.storage.local.get(["boldLabels"], (result) => {
      boldLabelsToggle.checked = result.boldLabels ?? true; // Default to true
    });

    boldLabelsToggle.addEventListener("change", () => {
      const isEnabled = boldLabelsToggle.checked;
      chrome.storage.local.set({ boldLabels: isEnabled });
    });
  }
}

// Exported initialization function for fallback modal
export function initialize() {
  let root = document.getElementById("cc-popup-body");
  if (root === null) {
    root = document
      .getElementById("cc-modal-container")
      ?.shadowRoot?.getElementById("cc-popup-body");
  }

  if (root) {
    attachListeners(root);
  }
}

// Auto-initialize for native popup
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
