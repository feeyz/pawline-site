// Dil seçimi: ?lang=en, sonra kayıtlı seçim, sonra tarayıcı dili (Türkçe değilse İngilizce)
(function () {
  var root = document.documentElement;
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "tr" || q === "en") return q;
    try {
      var s = localStorage.getItem("pawline-lang");
      if (s === "tr" || s === "en") return s;
    } catch (e) {}
    return (navigator.language || "tr").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
  }
  function set(l, remember) {
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l);
    document.querySelectorAll("img[data-alt-en]").forEach(function (img) {
      if (!img.hasAttribute("data-alt-tr")) img.setAttribute("data-alt-tr", img.getAttribute("alt"));
      img.setAttribute("alt", img.getAttribute(l === "en" ? "data-alt-en" : "data-alt-tr"));
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === l));
    });
    if (remember) {
      try { localStorage.setItem("pawline-lang", l); } catch (e) {}
    }
  }
  set(pick(), false);
  document.querySelectorAll("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () { set(b.getAttribute("data-set-lang"), true); });
  });
})();
