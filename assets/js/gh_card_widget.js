(function (o) {
  var v = "/assets/js/";
  var i,
  m = 0;
  var e = o.getElementsByTagName("meta");
  var b, w, p, A;
  function a(e) {
    if (o.querySelectorAll) {
      return o.querySelectorAll("." + e);
    }
    var t = o.getElementsByTagName("div");
    var r = [];
    for (i = 0; i < t.length; i++) {
      if (~t[i].className.split(" ").indexOf(e)) {
        r.push(t[i]);
      }
    }
    return r;
  }
  function y(e, t) {
    return e.getAttribute("data-" + t);
  }
  function E(t) {
    if (window.addEventListener) {
      window.addEventListener(
        "message",
        function (e) {
          if (t.id === e.data.sender) {
            t.height = e.data.height;
          }
        },
        false
      );
    }
  }
  function n(e, t) {
    t = t || b;
    if (!t) {
      var r = y(e, "theme") || A || "default";
      t = v + "cards/" + r + ".html";
    }
    var i = y(e, "user");
    var a = y(e, "repo");
    var n = y(e, "github");
    if (n) {
      n = n.split("/");
      if (n.length && !i) {
        i = n[0];
        a = a || n[1];
      }
    }
    if (!i) {
      return;
    }
    m += 1;
    var l = y(e, "width");
    var c = y(e, "height");
    var d = y(e, "target");
    var s = "ghcard-" + i + "-" + m;
    var g = o.createElement("iframe");
    g.setAttribute("id", s);
    var h = t + "?user=" + i + "&identity=" + s;
    if (a) {
      h += "&repo=" + a;
    }
    if (d) {
      h += "&target=" + d;
    }
    g.src = h;
    g.width = l || Math.min(e.parentNode.clientWidth || 400, 400);
    if (c) {
      g.height = c;
    }
    E(g);
    e.parentNode.replaceChild(g, e);
    return g;
  }
  var l = a("github-card");
  for (i = 0; i < l.length; i++) {
    n(l[i]);
  }
  if (window.githubCard) {
    window.githubCard.render = n;
  }
})(document);
