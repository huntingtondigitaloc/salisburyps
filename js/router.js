!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports, require("jquery"), require("deparam.js"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery", "deparam.js"], t)
    : t(((e = e || self).jqueryrouter = {}), e.jQuery, e.deparam);
})(this, function(e, t, r) {
  "use strict";
  function n(e) {
    return (n =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(e) {
            return typeof e;
          }
        : function(e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  (t = t && t.hasOwnProperty("default") ? t.default : t),
    (r = r && r.hasOwnProperty("default") ? r.default : r);
  var a = { handlers: [] },
    o = history && history.pushState,
    u = window.location,
    h = { noTrigger: !1 },
    i = {
      pathname: /^\/(?=[^?]*)/,
      routeparams: /:[^\/]+/g,
      hashQuery: /\?.+/
    },
    s = {
      routeChanged: "routeChanged",
      hashchange: "hashchange",
      popstate: "popstate"
    },
    p = { invalidPath: "Path is invalid" };
  function c(e, t) {
    null != e &&
      "object" === n(e) &&
      Object.keys(e).forEach(function(r) {
        t[r] = e[r];
      });
  }
  function l() {
    var e = 0,
      t = arguments[0] && "object" === n(arguments[0]) ? arguments[0] : {};
    for (e = 1; e < arguments.length; e++) c(arguments[e], t);
    return t;
  }
  function f(e) {
    return Array.prototype.slice.call(e);
  }
  function d(e, t) {
    var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
    if (h.noTrigger && t === s.hashchange) h.noTrigger = !1;
    else {
      var a = l({}, h.currentData);
      r && delete h.currentData,
        C.events.trigger(s.routeChanged, {
          data: l({}, r ? a : {}, {
            eventType: t,
            hash: !!r,
            route: e,
            isInit: n
          })
        });
    }
  }
  function y() {
    var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
      t = r(u.search, e),
      n = {};
    return (
      u.hash.match(i.hashQuery) && (n = r(u.hash.match(i.hashQuery)[0], e)),
      l({}, t, n)
    );
  }
  function g(e, t, r) {
    if (
      (function(e) {
        return "string" == typeof e && i.pathname.test(e);
      })(e)
    )
      return (function(e, t, r) {
        return t || r
          ? "string" == typeof t
            ? (t = t.trim()) && r
              ? ""
                  .concat(e)
                  .concat(u.search, "&")
                  .concat(t.replace("?", ""))
              : t
              ? "".concat(e, "?").concat(t.replace("?", ""))
              : e
            : void 0
          : e;
      })(e, t, r);
    throw new TypeError(p.invalidPath);
  }
  function m(e, t, r) {
    if (e) {
      var a = null,
        i = "",
        p = "",
        c = !1,
        f = !1,
        d = t ? "replaceState" : "pushState",
        y = {};
      (h.noTrigger = r),
        "object" === n(e)
          ? ((y = e.data),
            (a = e.title),
            (i = e.route),
            (p = e.queryString),
            (c = e.appendQuery))
          : "string" == typeof e && (i = e),
        "#" === i.charAt(0) && ((f = !0), (i = i.replace("#", ""))),
        o && !f
          ? (history[d](h.data, a, g(i, p, c)),
            r ||
              ((y = l({}, y, { eventType: s.popstate, hash: !1, route: i })),
              C.events.trigger(s.routeChanged, { data: y })))
          : ((h.currentData = y),
            t ? u.replace("#" + g(i, p, c)) : (u.hash = g(i, p, c)));
    }
  }
  function v(e, t) {
    var r = this;
    "function" == typeof e && ((t = e), (e = "*")),
      a.handlers.filter(function(n) {
        var a = n.originalHandler === t && n.route === e;
        return r && (a = a && n.element === r), a;
      }).length ||
        a.handlers.push({
          eventName: s.routeChanged,
          originalHandler: t,
          handler: t.bind(this),
          element: this,
          route: e
        });
  }
  function b(e, t) {
    var r = arguments.length;
    0 === r.length && (a.handlers.length = 0),
      (a.handlers = a.handlers.filter(function(n) {
        return 1 === r.length && "string" == typeof r[0]
          ? n.route !== e
          : (1 === r.length &&
              "function" == typeof r[0] &&
              ((t = r[0]), (e = "*")),
            !(n.route === e && n.handler === t));
      }));
  }
  function j(e) {
    return e.replace(/^([^a-zA-Z0-9]+)|([^a-zA-Z0-9]+)$/g, "");
  }
  function w(e, t, r) {
    if (
      (~t.indexOf("?") && (t = t.substring(0, t.indexOf("?"))),
      (i.routeparams.lastIndex = 0),
      !i.routeparams.test(e))
    )
      return e === t || "*" === e;
    r.params = {};
    var n = new RegExp(
      e.replace(/\//g, "\\/").replace(/:[^\/\\]+/g, "([^\\/]+)")
    );
    if (n.test(t)) {
      i.routeparams.lastIndex = 0;
      var a = f(e.match(i.routeparams)).map(j),
        o = f(t.match(n));
      return (
        o.shift(),
        a.forEach(function(e, t) {
          r.params[e] = o[t];
        }),
        !0
      );
    }
    return !1;
  }
  function S(e, t) {
    (t = l(t)).data = l(t.data);
    var r = t.data,
      n = r.hash,
      i = r.isInit;
    a.handlers.forEach(function(r) {
      r.eventName === e &&
        (!o || n || !w(r.route, u.pathname, t) || (i && r.called)
          ? n &&
            (u.hash || o || !w(r.route, u.pathname, t)
              ? !w(r.route, u.hash.substring(1), t) ||
                (i && r.hashCalled) ||
                ((r.hashCalled = !0), r.handler(t.data, t.params, y(!1)))
              : ((h.data = t.data), u.replace("#" + u.pathname)))
          : ((r.called = !0), r.handler(t.data, t.params, y(!1))));
    });
  }
  var x,
    C = {
      events: l(
        {
          trigger: function(e, t) {
            return S.apply(this, [e, t]);
          }
        },
        s
      ),
      init: function() {
        var e = {
          eventType: o ? s.popstate : s.hashchange,
          hash: !o,
          route: o ? u.pathname : u.hash,
          isInit: !0
        };
        this.events.trigger(s.routeChanged, { data: e }),
          u.hash && t(window).trigger(s.hashchange, [!0]);
      },
      set: function() {
        return m.apply(this, arguments);
      },
      historySupported: !!o
    };
  function T() {
    return v.apply(this, arguments);
  }
  function q() {
    return b.apply(this, arguments);
  }
  "function" == typeof t &&
    ((t.route = t.prototype.route = T),
    (t.unroute = t.prototype.unroute = q),
    (t.router = C)),
    (x = t(window)).on(s.popstate, function(e) {
      d.apply(this, [u.pathname, e.type]);
    }),
    x.on(s.hashchange, function(e, t) {
      d.apply(this, [u.hash, e.type, !0, t]);
    }),
    (e.route = T),
    (e.router = C),
    (e.unroute = q),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
