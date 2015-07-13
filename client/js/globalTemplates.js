Template.registerHelper('browserSupported', function () {
  if (BrowserDetect.browser == "Explorer" && BrowserDetect.version < 9)
    return false;
  return true;
});
