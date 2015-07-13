Template.unsupportedBrowser.helpers({
  browser: function () {
    return BrowserDetect.browser;
  },
  version: function () {
    return BrowserDetect.version;
  }
});
