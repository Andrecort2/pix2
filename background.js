chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "pixelate",
    title: "Pixelar imagem",
    contexts: ["image"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "pixelate") {
    const imageUrl = info.srcUrl;
    chrome.tabs.create({
      url: `popup.html?url=${encodeURIComponent(imageUrl)}`,
    });
  }
});
