(function () {
  "use strict";
  var btn = document.getElementById("standalone-close");
  if (!btn) return;
  btn.addEventListener("click", function () {
    window.location.href = btn.dataset.homeUrl;
  });
})();
