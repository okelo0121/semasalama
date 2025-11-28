const ext = typeof browser !== "undefined" ? browser : chrome;

ext.runtime.onInstalled.addListener(() => {
  ext.storage.local.get("customBlocklist", (data) => {
    if (!data || !data.customBlocklist) {
      ext.storage.local.set({ customBlocklist: [] });
    }
  });
});

ext.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "blocklistUpdated") {
    ext.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0]) {
        ext.tabs.sendMessage(tabs[0].id, { type: "re-scan" });
      }
    });
  }
});
