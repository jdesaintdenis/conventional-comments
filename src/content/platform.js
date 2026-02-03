// --- Selector marker constants used across modules ---

export const TOOLBAR_MARKER_CLASS = "cc-toolbar-added";

// --- Platform specific configurations ---

const GITHUB_CONFIG_OLD = {
  targetTextareaSelectors: [
    'textarea[name="comment[body]"]',
    'textarea[name="issue_comment[body]"]',
    'textarea[name="pull_request_review_comment[body]"]',
    'textarea[name="pull_request_review[body]"]',
  ],
};

const GITHUB_CONFIG_NEW = {
  targetTextareaSelectors: [
    // First inline editor (new thread) — appears before any comment exists
    'div[data-marker-navigation-new-thread="true"] textarea[aria-label="Markdown value"]',

    // Any inline thread editor (subsequent comments / replies)
    'div[data-marker-id] textarea[aria-label="Markdown value"]',

    // Fallback inside the markdown editor fieldset (covers odd cases and PR header comment box)
    'fieldset textarea[aria-label="Markdown value"]',
  ],
};

const GITLAB_CONFIG = {
  targetTextareaSelectors: [
    'textarea[name="note[note]"]',
    'textarea[name="work-item-add-or-edit-comment"]',
  ],
};

// --- Platform strategies ---

const basePlatformStrategy = {
  config: {},

  getUnprocessedTextareaQuery() {
    return this.config.targetTextareaSelectors
      .map((sel) => `${sel}:not(.${TOOLBAR_MARKER_CLASS})`)
      .join(", ");
  },
};

const githubOldStrategy = {
  ...basePlatformStrategy,
  config: GITHUB_CONFIG_OLD,
};

const githubNewStrategy = {
  ...basePlatformStrategy,
  config: GITHUB_CONFIG_NEW,
};

const gitlabStrategy = {
  ...basePlatformStrategy,
  config: GITLAB_CONFIG,
};

// --- Platform object to automatically select proper strategy ---

function detectGithubExperience() {
  // Prefer the new experience whenever we see any of the new editor/thread markers.
  // This catches the very first inline editor (new-thread box) which appears before a review-thread exists.
  const newMarkers = document.querySelector(
    [
      // Any review thread (present once there are comments)
      'div[data-testid="review-thread"]',
      // Inline thread container used in the new UI
      "div[data-marker-id]",
      // The first inline editor container when starting a brand new thread
      'div[data-marker-navigation-new-thread="true"]',
      // New markdown editor module containers show up even before a comment exists
      '[class^="MarkdownEditor-module__container"]',
      // Textareas used by the new markdown editor (appears on PR pages and inline editors)
      'textarea[aria-label="Markdown value"]',
    ].join(", ")
  );

  return newMarkers ? "new" : "old";
}

export const Platform = (function () {
  let currentStrategy = null;
  let currentSettings = null;

  // Promise-based initialization
  let resolveReady;
  const readyPromise = new Promise((resolve) => {
    resolveReady = resolve;
  });

  function determineStrategy() {
    const hostname = window.location.hostname;

    if (hostname.includes("github.com")) {
      const experience = detectGithubExperience();
      return experience === "new" ? githubNewStrategy : githubOldStrategy;
    }
    if (hostname.includes("gitlab.com")) {
      return gitlabStrategy;
    }

    return { ...basePlatformStrategy };
  }

  chrome.storage.local.get(null, (settings) => {
    currentSettings = settings;
    resolveReady();
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    // We only care about changes in 'local' storage
    if (areaName === "local") {
      // Update currentSettings with the new values
      for (let key in changes) {
        currentSettings[key] = changes[key].newValue;
      }

      document.dispatchEvent(
        new CustomEvent("platformSettingsChanged", { detail: { changes } })
      );
    }
  });

  const publicInterface = {
    // A promise that resolves when the initial settings have been loaded.
    // Use this to ensure the Platform is ready before using it.
    ready: () => readyPromise,

    recheck() {
      currentStrategy = determineStrategy();
    },
    get config() {
      return currentStrategy ? currentStrategy.config : {};
    },
    get strategy() {
      return currentStrategy;
    },
    settings: {
      get(key, defaultValue = undefined) {
        if (currentSettings === null) {
          return defaultValue;
        }

        return currentSettings.hasOwnProperty(key)
          ? currentSettings[key]
          : defaultValue;
      },
      set(key, value) {
        return chrome.storage.local.set({ [key]: value });
      },
    },
  };

  currentStrategy = determineStrategy();
  return publicInterface;
})();

export default Platform;
