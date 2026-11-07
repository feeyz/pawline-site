// Dil seçimi: ?lang=en, sonra kayıtlı seçim, sonra tarayıcı dili (Türkçe değilse İngilizce)
(function () {
  var root = document.documentElement;
  function pick() {
    // /tr/ sayfası hep Türkçe açılır; ana sayfa ve belgeler aşağıdaki sırayla seçer.
    if (root.getAttribute("data-home") === "tr") return "tr";
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
    document.querySelectorAll("img[data-src-en]").forEach(function (img) {
      img.setAttribute("src", img.getAttribute(l === "en" ? "data-src-en" : "data-src-tr"));
    });
    document.querySelectorAll("meta[data-content-en]").forEach(function (meta) {
      meta.setAttribute("content", meta.getAttribute(l === "en" ? "data-content-en" : "data-content-tr"));
    });
    var title = root.getAttribute("data-title-" + l);
    if (title) document.title = title;
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === l));
    });
    if (remember) {
      try { localStorage.setItem("pawline-lang", l); } catch (e) {}
    }
  }
  set(pick(), false);
  document.querySelectorAll("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      var l = b.getAttribute("data-set-lang");
      var home = root.getAttribute("data-home");
      set(l, true);
      // Ana sayfanın iki dilinin kendi adresi var; belgeler aynı adreste kalır.
      if (home === "tr" && l === "en") location.href = "../?lang=en";
      if (home === "en" && l === "tr") location.href = "tr/";
    });
  });
})();
