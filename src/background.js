// Message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Validate sender is this chrome extension
  if (sender.id !== chrome.runtime.id) {
    return false; // Ignore this message
  }

  // Assume all messages contain at least the 'type' field

  switch (request.type) {
    default:
      sendResponse({ error: "Unrecognized message" });
      return true;
  }
});
