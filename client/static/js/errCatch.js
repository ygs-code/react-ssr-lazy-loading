var errorMessageStr = "Uncaught SyntaxError: Unexpected token ' < '";

window.addEventListener("unhandledrejection", function (event) {
  var { reason: { message } = {} } = event;
  var isErrorReload = sessionStorage.getItem("pageErrorReload");
  if (
    message &&
    (message.search(errorMessageStr) >= 0 ||
      message.search("ChunkLoadError") >= 0) &&
    (!isErrorReload || isErrorReload !== "true")
  ) {
    sessionStorage.setItem("pageErrorReload", "true");
    window.location.reload();
  }
});

window.addEventListener("error", function (event) {
  var eventMsg = event.message || "";
  var isErrorReload = sessionStorage.getItem("pageErrorReload");
  if (
    (eventMsg.includes(errorMessageStr) ||
      eventMsg.includes("ChunkLoadError")) &&
    (!isErrorReload || isErrorReload !== "true")
  ) {
    sessionStorage.setItem("pageErrorReload", "true");
    window.location.reload();
  }
});
