/*! For license information please see sdk.min.js.LICENSE.txt */ ! function(e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.sdk = t() : e.sdk = t()
}(window, (function() {
  return function(e) {
    var t = {};

    function n(r) {
      if (t[r]) return t[r].exports;
      var i = t[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    return n.m = e, n.c = t, n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: r
      })
    }, n.r = function(e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, n.t = function(e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
        for (var i in e) n.d(r, i, function(t) {
          return e[t]
        }.bind(null, i));
      return r
    }, n.n = function(e) {
      var t = e && e.__esModule ? function() {
        return e.default
      } : function() {
        return e
      };
      return n.d(t, "a", t), t
    }, n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 34)
  }([function(e, t, n) {
    "use strict";
    var r = this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.isSet = t.isUnset = t.Utils = void 0;
    var i = n(33),
      o = r(n(10)),
      a = i.customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 24),
      s = function() {
        function e() {}
        return e.nanoid = function() {
          return e.SHA256(a())
        }, e.SHA256 = function(e) {
          var t = new o.default("SHA-256", "TEXT");
          return t.update(e), t.getHash("HEX")
        }, e.getAb = function(e) {
          if ("string" == typeof e) {
            for (var t = 1e13, n = 0, r = 1, i = 0; i < e.length; i++) n += (e.charCodeAt(i) - 44) * r, n %= t, r *= 13, r %= t;
            return n % 100
          }
          return 0
        }, e.getCookie = function(e) {
          var t = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([.$?*|{}()\[\]\\\/+^])/g, "\\$1") + "=([^;]*)"));
          return t ? decodeURIComponent(t[1]) : void 0
        }, e
      }();

    function u(e) {
      return null === e || "" === e || void 0 === e
    }
    t.Utils = s, t.isUnset = u, t.isSet = function(e) {
      return !u(e)
    }
  }, function(e, t, n) {
    "use strict";
    var r;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.logger = t.Logger = t.LogLevels = void 0,
      function(e) {
        e[e.Debug = 0] = "Debug", e[e.Info = 1] = "Info", e[e.Warn = 2] = "Warn", e[e.Error = 3] = "Error"
      }(r = t.LogLevels || (t.LogLevels = {}));
    var i = function() {
      function e(e) {
        this.channel = e, this.level = r.Error, this.startTime = (new Date).getTime()
      }
      return e.prototype.setLevel = function(e) {
        this.level = e
      }, e.prototype.log = function(e, t, n) {
        void 0 === n && (n = ""), e >= this.level && console.log(this.buildLine(e, t), n)
      }, e.prototype.buildLine = function(e, t) {
        var n = (new Date).getTime() - this.startTime;
        return "[" + this.channel + "][" + r[e].toLowerCase() + "][" + n + " ms] " + t
      }, e
    }();
    t.Logger = i, t.logger = new i("app")
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__createBinding || (Object.create ? function(e, t, n, r) {
        void 0 === r && (r = n), Object.defineProperty(e, r, {
          enumerable: !0,
          get: function() {
            return t[n]
          }
        })
      } : function(e, t, n, r) {
        void 0 === r && (r = n), e[r] = t[n]
      }),
      i = this && this.__setModuleDefault || (Object.create ? function(e, t) {
        Object.defineProperty(e, "default", {
          enumerable: !0,
          value: t
        })
      } : function(e, t) {
        e.default = t
      }),
      o = this && this.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && r(t, e, n);
        return i(t, e), t
      },
      a = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      s = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.fingerprint = t.Fingerprint = void 0;
    var u = n(0),
      l = n(5),
      c = n(3),
      f = o(n(12)),
      d = {
        excludes: {
          doNotTrack: !0,
          fonts: !0,
          fontsFlash: !0,
          webgl: !0,
          webdriver: !0,
          hardwareConcurrency: !0,
          deviceMemory: !0,
          cpuClass: !0,
          platform: !0,
          userAgent: !0,
          localStorage: !0,
          language: !0,
          sessionStorage: !0,
          indexedDb: !0,
          addBehavior: !0,
          openDatabase: !0,
          plugins: !0,
          canvas: !0,
          adBlock: !0,
          audio: !0,
          timezone: !0,
          enumerateDevices: !0
        },
        screen: {
          detectScreenOrientation: !0
        },
        extraComponents: [{
          key: "os",
          getData: function(e, t) {
            var n = (new c.UAParser).getOS();
            e(n.name.replace(/\s+/g, "") + n.version.split(".").slice(0, 2).join("."))
          }
        }, {
          key: "location",
          getData: function(e, t) {
            return a(void 0, void 0, void 0, (function() {
              var t;
              return s(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [4, l.locationFactory.getLocation()];
                  case 1:
                    return t = n.sent(), e(t.timezone), [2]
                }
              }))
            }))
          }
        }],
        NOT_AVAILABLE: null,
        ERROR: null,
        EXCLUDED: null
      },
      h = {
        excludes: {
          doNotTrack: !0,
          fontsFlash: !0,
          hardwareConcurrency: !0,
          deviceMemory: !0,
          cpuClass: !0,
          adBlock: !0,
          plugins: !0,
          audio: !0,
          enumerateDevices: !0
        },
        screen: {
          detectScreenOrientation: !0
        },
        NOT_AVAILABLE: null,
        ERROR: null,
        EXCLUDED: null
      },
      p = function() {
        function e() {
          this.timeout = 1e3, this.components = {
            weak: null,
            strong: null
          }, this.udid = {
            weak: null,
            strong: null
          }, this.time = null, this.pending = !1
        }
        return e.prototype.initialize = function() {
          return a(this, void 0, void 0, (function() {
            return s(this, (function(e) {
              switch (e.label) {
                case 0:
                  return [4, this.get()];
                case 1:
                  return e.sent(), [2]
              }
            }))
          }))
        }, e.prototype.stringifyComponents = function(e) {
          return e.map((function(e) {
            return "number" == typeof e.value && (e.value = Number(e.value.toFixed(1))), e.key + ":" + e.value
          })).join(";")
        }, e.prototype.get = function() {
          return a(this, void 0, void 0, (function() {
            var e, t, n;
            return s(this, (function(r) {
              switch (r.label) {
                case 0:
                  return this.pending ? [4, new Promise((function(e) {
                    return setTimeout(e, 100)
                  }))] : [3, 2];
                case 1:
                  return r.sent(), [3, 0];
                case 2:
                  return this.pending = !0, e = Date.now(), this.components.weak ? [3, 4] : (t = this.components, [4, f.getPromise(d)]);
                case 3:
                  t.weak = r.sent(), r.label = 4;
                case 4:
                  return this.components.strong ? [3, 6] : (n = this.components, [4, f.getPromise(h)]);
                case 5:
                  n.strong = r.sent(), r.label = 6;
                case 6:
                  return this.udid.weak || (this.udid.weak = u.Utils.SHA256(f.x64hash128(this.stringifyComponents(this.components.weak), 31))), this.udid.strong || (this.udid.strong = u.Utils.SHA256(f.x64hash128(this.stringifyComponents(this.components.strong), 31))), this.time = Date.now() - e, this.pending = !1, [2, this.udid]
              }
            }))
          }))
        }, e
      }();
    t.Fingerprint = p;
    var g = new p;
    t.fingerprint = g
  }, function(e, t, n) {
    var r;
    ! function(i, o) {
      "use strict";
      var a = "function",
        s = "undefined",
        u = "object",
        l = "model",
        c = "name",
        f = "type",
        d = "vendor",
        h = "version",
        p = "architecture",
        g = "console",
        b = "mobile",
        w = "tablet",
        v = "smarttv",
        y = "wearable",
        m = {
          extend: function(e, t) {
            var n = {};
            for (var r in e) t[r] && t[r].length % 2 == 0 ? n[r] = t[r].concat(e[r]) : n[r] = e[r];
            return n
          },
          has: function(e, t) {
            return "string" == typeof e && -1 !== t.toLowerCase().indexOf(e.toLowerCase())
          },
          lowerize: function(e) {
            return e.toLowerCase()
          },
          major: function(e) {
            return "string" == typeof e ? e.replace(/[^\d\.]/g, "").split(".")[0] : o
          },
          trim: function(e) {
            return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
          }
        },
        T = {
          rgx: function(e, t) {
            for (var n, r, i, s, l, c, f = 0; f < t.length && !l;) {
              var d = t[f],
                h = t[f + 1];
              for (n = r = 0; n < d.length && !l;)
                if (l = d[n++].exec(e))
                  for (i = 0; i < h.length; i++) c = l[++r], typeof(s = h[i]) === u && s.length > 0 ? 2 == s.length ? typeof s[1] == a ? this[s[0]] = s[1].call(this, c) : this[s[0]] = s[1] : 3 == s.length ? typeof s[1] !== a || s[1].exec && s[1].test ? this[s[0]] = c ? c.replace(s[1], s[2]) : o : this[s[0]] = c ? s[1].call(this, c, s[2]) : o : 4 == s.length && (this[s[0]] = c ? s[3].call(this, c.replace(s[1], s[2])) : o) : this[s] = c || o;
              f += 2
            }
          },
          str: function(e, t) {
            for (var n in t)
              if (typeof t[n] === u && t[n].length > 0) {
                for (var r = 0; r < t[n].length; r++)
                  if (m.has(t[n][r], e)) return "?" === n ? o : n
              } else if (m.has(t[n], e)) return "?" === n ? o : n;
            return e
          }
        },
        A = {
          browser: {
            oldsafari: {
              version: {
                "1.0": "/8",
                1.2: "/1",
                1.3: "/3",
                "2.0": "/412",
                "2.0.2": "/416",
                "2.0.3": "/417",
                "2.0.4": "/419",
                "?": "/"
              }
            }
          },
          device: {
            amazon: {
              model: {
                "Fire Phone": ["SD", "KF"]
              }
            },
            sprint: {
              model: {
                "Evo Shift 4G": "7373KT"
              },
              vendor: {
                HTC: "APA",
                Sprint: "Sprint"
              }
            }
          },
          os: {
            windows: {
              version: {
                ME: "4.90",
                "NT 3.11": "NT3.51",
                "NT 4.0": "NT4.0",
                2e3: "NT 5.0",
                XP: ["NT 5.1", "NT 5.2"],
                Vista: "NT 6.0",
                7: "NT 6.1",
                8: "NT 6.2",
                8.1: "NT 6.3",
                10: ["NT 6.4", "NT 10.0"],
                RT: "ARM"
              }
            }
          }
        },
        S = {
          browser: [
            [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
            [c, h],
            [/(opios)[\/\s]+([\w\.]+)/i],
            [
              [c, "Opera Mini"], h
            ],
            [/\s(opr)\/([\w\.]+)/i],
            [
              [c, "Opera"], h
            ],
            [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]*)/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i],
            [c, h],
            [/(konqueror)\/([\w\.]+)/i],
            [
              [c, "Konqueror"], h
            ],
            [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
            [
              [c, "IE"], h
            ],
            [/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i],
            [
              [c, "Edge"], h
            ],
            [/(yabrowser)\/([\w\.]+)/i],
            [
              [c, "Yandex"], h
            ],
            [/(puffin)\/([\w\.]+)/i],
            [
              [c, "Puffin"], h
            ],
            [/(focus)\/([\w\.]+)/i],
            [
              [c, "Firefox Focus"], h
            ],
            [/(opt)\/([\w\.]+)/i],
            [
              [c, "Opera Touch"], h
            ],
            [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
            [
              [c, "UCBrowser"], h
            ],
            [/(comodo_dragon)\/([\w\.]+)/i],
            [
              [c, /_/g, " "], h
            ],
            [/(windowswechat qbcore)\/([\w\.]+)/i],
            [
              [c, "WeChat(Win) Desktop"], h
            ],
            [/(micromessenger)\/([\w\.]+)/i],
            [
              [c, "WeChat"], h
            ],
            [/(brave)\/([\w\.]+)/i],
            [
              [c, "Brave"], h
            ],
            [/(qqbrowserlite)\/([\w\.]+)/i],
            [c, h],
            [/(QQ)\/([\d\.]+)/i],
            [c, h],
            [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
            [c, h],
            [/(BIDUBrowser)[\/\s]?([\w\.]+)/i],
            [c, h],
            [/(2345Explorer)[\/\s]?([\w\.]+)/i],
            [c, h],
            [/(MetaSr)[\/\s]?([\w\.]+)/i],
            [c],
            [/(LBBROWSER)/i],
            [c],
            [/xiaomi\/miuibrowser\/([\w\.]+)/i],
            [h, [c, "MIUI Browser"]],
            [/;fbav\/([\w\.]+);/i],
            [h, [c, "Facebook"]],
            [/safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i],
            [c, h],
            [/headlesschrome(?:\/([\w\.]+)|\s)/i],
            [h, [c, "Chrome Headless"]],
            [/\swv\).+(chrome)\/([\w\.]+)/i],
            [
              [c, /(.+)/, "$1 WebView"], h
            ],
            [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
            [
              [c, /(.+(?:g|us))(.+)/, "$1 $2"], h
            ],
            [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
            [h, [c, "Android Browser"]],
            [/(sailfishbrowser)\/([\w\.]+)/i],
            [
              [c, "Sailfish Browser"], h
            ],
            [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
            [c, h],
            [/(dolfin)\/([\w\.]+)/i],
            [
              [c, "Dolphin"], h
            ],
            [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
            [
              [c, "Chrome"], h
            ],
            [/(coast)\/([\w\.]+)/i],
            [
              [c, "Opera Coast"], h
            ],
            [/fxios\/([\w\.-]+)/i],
            [h, [c, "Firefox"]],
            [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
            [h, [c, "Mobile Safari"]],
            [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
            [h, c],
            [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
            [
              [c, "GSA"], h
            ],
            [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
            [c, [h, T.str, A.browser.oldsafari.version]],
            [/(webkit|khtml)\/([\w\.]+)/i],
            [c, h],
            [/(navigator|netscape)\/([\w\.-]+)/i],
            [
              [c, "Netscape"], h
            ],
            [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
            [c, h]
          ],
          cpu: [
            [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
            [
              [p, "amd64"]
            ],
            [/(ia32(?=;))/i],
            [
              [p, m.lowerize]
            ],
            [/((?:i[346]|x)86)[;\)]/i],
            [
              [p, "ia32"]
            ],
            [/windows\s(ce|mobile);\sppc;/i],
            [
              [p, "arm"]
            ],
            [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
            [
              [p, /ower/, "", m.lowerize]
            ],
            [/(sun4\w)[;\)]/i],
            [
              [p, "sparc"]
            ],
            [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
            [
              [p, m.lowerize]
            ]
          ],
          device: [
            [/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i],
            [l, d, [f, w]],
            [/applecoremedia\/[\w\.]+ \((ipad)/],
            [l, [d, "Apple"],
              [f, w]
            ],
            [/(apple\s{0,1}tv)/i],
            [
              [l, "Apple TV"],
              [d, "Apple"]
            ],
            [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i],
            [d, l, [f, w]],
            [/(kf[A-z]+)\sbuild\/.+silk\//i],
            [l, [d, "Amazon"],
              [f, w]
            ],
            [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],
            [
              [l, T.str, A.device.amazon.model],
              [d, "Amazon"],
              [f, b]
            ],
            [/android.+aft([bms])\sbuild/i],
            [l, [d, "Amazon"],
              [f, v]
            ],
            [/\((ip[honed|\s\w*]+);.+(apple)/i],
            [l, d, [f, b]],
            [/\((ip[honed|\s\w*]+);/i],
            [l, [d, "Apple"],
              [f, b]
            ],
            [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i],
            [d, l, [f, b]],
            [/\(bb10;\s(\w+)/i],
            [l, [d, "BlackBerry"],
              [f, b]
            ],
            [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i],
            [l, [d, "Asus"],
              [f, w]
            ],
            [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
            [
              [d, "Sony"],
              [l, "Xperia Tablet"],
              [f, w]
            ],
            [/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
            [l, [d, "Sony"],
              [f, b]
            ],
            [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
            [d, l, [f, g]],
            [/android.+;\s(shield)\sbuild/i],
            [l, [d, "Nvidia"],
              [f, g]
            ],
            [/(playstation\s[34portablevi]+)/i],
            [l, [d, "Sony"],
              [f, g]
            ],
            [/(sprint\s(\w+))/i],
            [
              [d, T.str, A.device.sprint.vendor],
              [l, T.str, A.device.sprint.model],
              [f, b]
            ],
            [/(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],
            [d, [l, /_/g, " "],
              [f, b]
            ],
            [/(nexus\s9)/i],
            [l, [d, "HTC"],
              [f, w]
            ],
            [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i],
            [l, [d, "Huawei"],
              [f, b]
            ],
            [/(microsoft);\s(lumia[\s\w]+)/i],
            [d, l, [f, b]],
            [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
            [l, [d, "Microsoft"],
              [f, g]
            ],
            [/(kin\.[onetw]{3})/i],
            [
              [l, /\./g, " "],
              [d, "Microsoft"],
              [f, b]
            ],
            [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i],
            [l, [d, "Motorola"],
              [f, b]
            ],
            [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
            [l, [d, "Motorola"],
              [f, w]
            ],
            [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
            [
              [d, m.trim],
              [l, m.trim],
              [f, v]
            ],
            [/hbbtv.+maple;(\d+)/i],
            [
              [l, /^/, "SmartTV"],
              [d, "Samsung"],
              [f, v]
            ],
            [/\(dtv[\);].+(aquos)/i],
            [l, [d, "Sharp"],
              [f, v]
            ],
            [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
            [
              [d, "Samsung"], l, [f, w]
            ],
            [/smart-tv.+(samsung)/i],
            [d, [f, v], l],
            [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i],
            [
              [d, "Samsung"], l, [f, b]
            ],
            [/sie-(\w*)/i],
            [l, [d, "Siemens"],
              [f, b]
            ],
            [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i],
            [
              [d, "Nokia"], l, [f, b]
            ],
            [/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],
            [l, [d, "Acer"],
              [f, w]
            ],
            [/android.+([vl]k\-?\d{3})\s+build/i],
            [l, [d, "LG"],
              [f, w]
            ],
            [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
            [
              [d, "LG"], l, [f, w]
            ],
            [/(lg) netcast\.tv/i],
            [d, l, [f, v]],
            [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i],
            [l, [d, "LG"],
              [f, b]
            ],
            [/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i],
            [d, l, [f, w]],
            [/android.+(ideatab[a-z0-9\-\s]+)/i],
            [l, [d, "Lenovo"],
              [f, w]
            ],
            [/(lenovo)[_\s-]?([\w-]+)/i],
            [d, l, [f, b]],
            [/linux;.+((jolla));/i],
            [d, l, [f, b]],
            [/((pebble))app\/[\d\.]+\s/i],
            [d, l, [f, y]],
            [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
            [d, l, [f, b]],
            [/crkey/i],
            [
              [l, "Chromecast"],
              [d, "Google"]
            ],
            [/android.+;\s(glass)\s\d/i],
            [l, [d, "Google"],
              [f, y]
            ],
            [/android.+;\s(pixel c)[\s)]/i],
            [l, [d, "Google"],
              [f, w]
            ],
            [/android.+;\s(pixel( [23])?( xl)?)[\s)]/i],
            [l, [d, "Google"],
              [f, b]
            ],
            [/android.+;\s(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i],
            [
              [l, /_/g, " "],
              [d, "Xiaomi"],
              [f, b]
            ],
            [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],
            [
              [l, /_/g, " "],
              [d, "Xiaomi"],
              [f, w]
            ],
            [/android.+;\s(m[1-5]\snote)\sbuild/i],
            [l, [d, "Meizu"],
              [f, b]
            ],
            [/(mz)-([\w-]{2,})/i],
            [
              [d, "Meizu"], l, [f, b]
            ],
            [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i],
            [l, [d, "OnePlus"],
              [f, b]
            ],
            [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
            [l, [d, "RCA"],
              [f, w]
            ],
            [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],
            [l, [d, "Dell"],
              [f, w]
            ],
            [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
            [l, [d, "Verizon"],
              [f, w]
            ],
            [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
            [
              [d, "Barnes & Noble"], l, [f, w]
            ],
            [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
            [l, [d, "NuVision"],
              [f, w]
            ],
            [/android.+;\s(k88)\sbuild/i],
            [l, [d, "ZTE"],
              [f, w]
            ],
            [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
            [l, [d, "Swiss"],
              [f, b]
            ],
            [/android.+[;\/]\s*(zur\d{3})\s+build/i],
            [l, [d, "Swiss"],
              [f, w]
            ],
            [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
            [l, [d, "Zeki"],
              [f, w]
            ],
            [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],
            [
              [d, "Dragon Touch"], l, [f, w]
            ],
            [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],
            [l, [d, "Insignia"],
              [f, w]
            ],
            [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],
            [l, [d, "NextBook"],
              [f, w]
            ],
            [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
            [
              [d, "Voice"], l, [f, b]
            ],
            [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],
            [
              [d, "LvTel"], l, [f, b]
            ],
            [/android.+;\s(PH-1)\s/i],
            [l, [d, "Essential"],
              [f, b]
            ],
            [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
            [l, [d, "Envizen"],
              [f, w]
            ],
            [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],
            [d, l, [f, w]],
            [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
            [l, [d, "MachSpeed"],
              [f, w]
            ],
            [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
            [d, l, [f, w]],
            [/android.+[;\/]\s*TU_(1491)\s+build/i],
            [l, [d, "Rotor"],
              [f, w]
            ],
            [/android.+(KS(.+))\s+build/i],
            [l, [d, "Amazon"],
              [f, w]
            ],
            [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],
            [d, l, [f, w]],
            [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
            [
              [f, m.lowerize], d, l
            ],
            [/[\s\/\(](smart-?tv)[;\)]/i],
            [
              [f, v]
            ],
            [/(android[\w\.\s\-]{0,9});.+build/i],
            [l, [d, "Generic"]]
          ],
          engine: [
            [/windows.+\sedge\/([\w\.]+)/i],
            [h, [c, "EdgeHTML"]],
            [/webkit\/537\.36.+chrome\/(?!27)/i],
            [
              [c, "Blink"]
            ],
            [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
            [c, h],
            [/rv\:([\w\.]{1,9}).+(gecko)/i],
            [h, c]
          ],
          os: [
            [/microsoft\s(windows)\s(vista|xp)/i],
            [c, h],
            [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
            [c, [h, T.str, A.os.windows.version]],
            [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
            [
              [c, "Windows"],
              [h, T.str, A.os.windows.version]
            ],
            [/\((bb)(10);/i],
            [
              [c, "BlackBerry"], h
            ],
            [/(blackberry)\w*\/?([\w\.]*)/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i],
            [c, h],
            [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
            [
              [c, "Symbian"], h
            ],
            [/\((series40);/i],
            [c],
            [/mozilla.+\(mobile;.+gecko.+firefox/i],
            [
              [c, "Firefox OS"], h
            ],
            [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i],
            [c, h],
            [/(cros)\s[\w]+\s([\w\.]+\w)/i],
            [
              [c, "Chromium OS"], h
            ],
            [/(sunos)\s?([\w\.\d]*)/i],
            [
              [c, "Solaris"], h
            ],
            [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
            [c, h],
            [/(haiku)\s(\w+)/i],
            [c, h],
            [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],
            [
              [h, /_/g, "."],
              [c, "iOS"]
            ],
            [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i],
            [
              [c, "Mac OS"],
              [h, /_/g, "."]
            ],
            [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, /(unix)\s?([\w\.]*)/i],
            [c, h]
          ]
        },
        E = function(e, t) {
          if ("object" == typeof e && (t = e, e = o), !(this instanceof E)) return new E(e, t).getResult();
          var n = e || (i && i.navigator && i.navigator.userAgent ? i.navigator.userAgent : ""),
            r = t ? m.extend(S, t) : S;
          return this.getBrowser = function() {
            var e = {
              name: o,
              version: o
            };
            return T.rgx.call(e, n, r.browser), e.major = m.major(e.version), e
          }, this.getCPU = function() {
            var e = {
              architecture: o
            };
            return T.rgx.call(e, n, r.cpu), e
          }, this.getDevice = function() {
            var e = {
              vendor: o,
              model: o,
              type: o
            };
            return T.rgx.call(e, n, r.device), e
          }, this.getEngine = function() {
            var e = {
              name: o,
              version: o
            };
            return T.rgx.call(e, n, r.engine), e
          }, this.getOS = function() {
            var e = {
              name: o,
              version: o
            };
            return T.rgx.call(e, n, r.os), e
          }, this.getResult = function() {
            return {
              ua: this.getUA(),
              browser: this.getBrowser(),
              engine: this.getEngine(),
              os: this.getOS(),
              device: this.getDevice(),
              cpu: this.getCPU()
            }
          }, this.getUA = function() {
            return n
          }, this.setUA = function(e) {
            return n = e, this
          }, this
        };
      E.VERSION = "0.7.20", E.BROWSER = {
        NAME: c,
        MAJOR: "major",
        VERSION: h
      }, E.CPU = {
        ARCHITECTURE: p
      }, E.DEVICE = {
        MODEL: l,
        VENDOR: d,
        TYPE: f,
        CONSOLE: g,
        MOBILE: b,
        SMARTTV: v,
        TABLET: w,
        WEARABLE: y,
        EMBEDDED: "embedded"
      }, E.ENGINE = {
        NAME: c,
        VERSION: h
      }, E.OS = {
        NAME: c,
        VERSION: h
      }, typeof t !== s ? (typeof e !== s && e.exports && (t = e.exports = E), t.UAParser = E) : (r = function() {
        return E
      }.call(t, n, t, e)) === o || (e.exports = r);
      var x = i && (i.jQuery || i.Zepto);
      if (typeof x !== s && !x.ua) {
        var _ = new E;
        x.ua = _.getResult(), x.ua.get = function() {
          return _.getUA()
        }, x.ua.set = function(e) {
          _.setUA(e);
          var t = _.getResult();
          for (var n in t) x.ua[n] = t[n]
        }
      }
    }("object" == typeof window ? window : this)
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || function() {
      return (r = Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e
      }).apply(this, arguments)
    };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.configManager = t.defaultConfig = void 0, t.defaultConfig = {
      debug: !1,
      httpUrl: "https://tracks.yclients.dev/api/v1",
      websocketUrl: "wss://tracks.yclients.dev/api/v1",
      enableBrowserGeolocation: !1
    };
    var i = function() {
      function e() {
        this.currentConfig = t.defaultConfig
      }
      return Object.defineProperty(e.prototype, "config", {
        get: function() {
          return this.currentConfig
        },
        set: function(e) {
          this.currentConfig = r(r({}, t.defaultConfig), e)
        },
        enumerable: !1,
        configurable: !0
      }), e
    }();
    t.configManager = new i
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      i = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.locationFactory = void 0;
    var o = n(4),
      a = n(0),
      s = new(function() {
        function e() {
          this.label = {
            latitude: null,
            longitude: null,
            altitude: null,
            accuracy: null,
            timezone: null,
            country_iso_code: null
          }, this.pending = !1, this.isReady = !1, this.geoContext = null
        }
        return e.prototype.init = function(e) {
          return r(this, void 0, void 0, (function() {
            return i(this, (function(t) {
              switch (t.label) {
                case 0:
                  return [4, this.getLocation()];
                case 1:
                  return t.sent(), this.enrich(e), this.isReady = !0, [2]
              }
            }))
          }))
        }, e.prototype.getLabel = function() {
          return this.label
        }, e.prototype.getLabelConfig = function() {
          return {
            label: this.label,
            name: e.slug,
            isRequired: !0,
            isReady: this.isReady
          }
        }, e.prototype.updateLabel = function(e) {}, e.prototype.getBrowserLocation = function() {
          return new Promise((function(e, t) {
            navigator.geolocation.getCurrentPosition(e, t)
          }))
        }, e.prototype.getLocation = function() {
          return r(this, void 0, void 0, (function() {
            var e, t;
            return i(this, (function(n) {
              switch (n.label) {
                case 0:
                  return this.isReady ? [2, this.label] : o.configManager.config.enableBrowserGeolocation ? [4, this.getBrowserLocation()] : [3, 2];
                case 1:
                  e = n.sent(), this.label.accuracy = e.coords.accuracy, this.label.altitude = e.coords.altitude, this.label.latitude = e.coords.latitude, this.label.longitude = e.coords.longitude, n.label = 2;
                case 2:
                  return this.label.latitude && this.label.longitude ? [3, 4] : [4, this.getGeoContext()];
                case 3:
                  (t = n.sent()) && (this.label.latitude = a.isSet(t.location_latitude) ? parseFloat(t.location_latitude) : null, this.label.longitude = a.isSet(t.location_longitude) ? parseFloat(t.location_longitude) : null, this.label.timezone = t.location_timezone, this.label.country_name = t.country_name, this.label.country_iso_code = t.country_iso_code, this.label.city_name = t.city_name), n.label = 4;
                case 4:
                  return [2, this.label]
              }
            }))
          }))
        }, e.prototype.getGeoContext = function() {
          return r(this, void 0, void 0, (function() {
            var e, t;
            return i(this, (function(n) {
              switch (n.label) {
                case 0:
                  return this.pending ? [4, new Promise((function(e) {
                    return setTimeout(e, 100)
                  }))] : [3, 2];
                case 1:
                  return n.sent(), [3, 0];
                case 2:
                  try {
                    this.geoContext = JSON.parse(sessionStorage.getItem("bi_tracks_location"))
                  } catch (e) {}
                  if (this.geoContext) return [2, this.geoContext];
                  this.pending = !0, n.label = 3;
                case 3:
                  return n.trys.push([3, 6, , 7]), [4, window.fetch("https://api.yclients.com/api/v1/geoip", {
                    method: "GET",
                    mode: "cors",
                    headers: {
                      Accept: "application/json"
                    }
                  })];
                case 4:
                  return e = n.sent(), t = this, [4, e.json()];
                case 5:
                  return t.geoContext = n.sent(), sessionStorage.setItem("bi_tracks_location", JSON.stringify(this.geoContext)), [3, 7];
                case 6:
                  return n.sent(), [3, 7];
                case 7:
                  return this.pending = !1, [2, this.geoContext]
              }
            }))
          }))
        }, e.prototype.enrich = function(t) {
          this.isReady = !0, t.enrich(e.slug, this.label)
        }, e.slug = "location", e
      }());
    t.locationFactory = s
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      i = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.IdentifyFactory = void 0;
    var o = n(2),
      a = n(14),
      s = function() {
        function e() {
          this.label = {
            sid: "",
            udid: {}
          }, this.isReady = !1
        }
        return e.prototype.init = function(t) {
          return r(this, void 0, void 0, (function() {
            var n;
            return i(this, (function(r) {
              switch (r.label) {
                case 0:
                  return [4, this.getData()];
                case 1:
                  return n = r.sent(), this.label = n, this.isReady = !0, t.enrich(e.slug, this.label), [2]
              }
            }))
          }))
        }, e.prototype.getLabelConfig = function() {
          return {
            label: this.label,
            name: e.slug,
            isRequired: !0,
            isReady: this.isReady
          }
        }, e.prototype.getLabel = function() {
          return this.label
        }, e.prototype.updateLabel = function(e) {}, e.prototype.getData = function() {
          return r(this, void 0, void 0, (function() {
            var e;
            return i(this, (function(t) {
              switch (t.label) {
                case 0:
                  return e = {}, [4, o.fingerprint.get()];
                case 1:
                  return [2, (e.udid = t.sent(), e.sid = a.session.getId(), e)]
              }
            }))
          }))
        }, e.slug = "identify", e
      }();
    t.IdentifyFactory = s
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || function() {
        return (r = Object.assign || function(e) {
          for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e
        }).apply(this, arguments)
      },
      i = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      o = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.VirtualDeviceFactory = void 0;
    var a = n(2),
      s = n(3),
      u = function() {
        function e() {
          this.label = {
            device: null,
            os: null,
            browser: null,
            screen: null,
            fullscreen: null,
            url: null,
            referrer: null,
            language: null,
            languages: null,
            connection: null,
            adblock: null,
            bot: null
          }, this.isReady = !1, this.uaParser = new s.UAParser
        }
        return e.prototype.init = function(t) {
          return i(this, void 0, void 0, (function() {
            var n;
            return o(this, (function(r) {
              switch (r.label) {
                case 0:
                  return [4, this.getData()];
                case 1:
                  return n = r.sent(), this.label = n, this.isReady = !0, t.enrich(e.slug, n), [2]
              }
            }))
          }))
        }, e.prototype.getLabelConfig = function() {
          return {
            label: this.label,
            name: e.slug,
            isRequired: !0,
            isReady: this.isReady
          }
        }, e.prototype.getLabel = function() {
          return this.label
        }, e.prototype.updateLabel = function(e) {}, e.prototype.getBrowser = function() {
          var e = this.uaParser.getBrowser(),
            t = this.uaParser.getEngine();
          return {
            name: e.name || "",
            version: e.version || "",
            engine: {
              name: t.name || "",
              version: t.version || ""
            },
            useragent: navigator.userAgent || ""
          }
        }, e.prototype.getDevice = function() {
          return {
            uuid: window.device ? window.device.uuid : null,
            name: this.uaParser.getDevice().vendor || "",
            version: this.uaParser.getDevice().model || "",
            type: this.uaParser.getDevice().type || "",
            memory: navigator.deviceMemory || null,
            concurrency: navigator.hardwareConcurrency || null
          }
        }, e.prototype.getOs = function() {
          return r({
            language: navigator.language,
            languages: navigator.languages
          }, r({
            name: null,
            version: null
          }, this.uaParser.getOS()))
        }, e.prototype.getAdBlock = function() {
          var e = document.createElement("div");
          e.innerHTML = "&nbsp;", e.className = "adsbox";
          var t = !1;
          try {
            document.body.appendChild(e);
            var n = document.getElementsByClassName("adsbox")[0];
            null !== n && n instanceof HTMLElement && (t = 0 === n.offsetHeight), document.body.removeChild(e)
          } catch (e) {
            t = !1
          }
          return Number(t)
        }, e.prototype.getTouchSupport = function() {
          var e, t = 0;
          void 0 !== navigator.maxTouchPoints ? t = navigator.maxTouchPoints : void 0 !== navigator.msMaxTouchPoints && (t = navigator.msMaxTouchPoints);
          try {
            document.createEvent("TouchEvent"), e = !0
          } catch (t) {
            e = !1
          }
          return [t, e, "ontouchstart" in window]
        }, e.prototype.isBot = function() {
          return navigator.webdriver ? 1 : 0
        }, e.prototype.getScreen = function() {
          var e = window.screen.orientation ? window.screen.orientation : {
              type: null,
              angle: null
            },
            t = e.type,
            n = e.angle,
            r = window.screen;
          return {
            orientation: {
              type: t,
              angle: n
            },
            resolution: {
              current: [r.width, r.height]
            },
            touch: this.getTouchSupport().map((function(e) {
              return Number(e)
            })),
            full: window.innerHeight == screen.height ? 1 : 0
          }
        }, e.prototype.getConnection = function() {
          var e = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
          return {
            effective_type: e ? e.effectiveType || e.type : null,
            rtt: e.rtt ? e.rtt : null
          }
        }, e.prototype.getData = function() {
          return i(this, void 0, void 0, (function() {
            var e, t, n, r, i, s, u, l, c;
            return o(this, (function(o) {
              switch (o.label) {
                case 0:
                  return [4, a.fingerprint.initialize()];
                case 1:
                  return o.sent(), e = this.getDevice(), t = this.getOs(), n = this.getBrowser(), r = this.getScreen(), i = window.location.href || "", s = document.referrer || "", u = this.getConnection(), l = this.getAdBlock(), c = this.isBot(), [2, {
                    device: e,
                    os: t,
                    browser: n,
                    screen: r,
                    url: i,
                    referrer: s,
                    connection: u,
                    adblock: l,
                    bot: c
                  }]
              }
            }))
          }))
        }, e.slug = "virtualDevice", e
      }();
    t.VirtualDeviceFactory = u
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || function() {
        return (r = Object.assign || function(e) {
          for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e
        }).apply(this, arguments)
      },
      i = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      o = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.UAParser = t.Action = t.identify = t.getAb = t.setBusiness = t.setUtm = t.setPage = t.setUser = t.addLabel = t.track = t.version = t.debugMode = t.init = void 0;
    var a = n(32),
      s = n(3);
    Object.defineProperty(t, "UAParser", {
      enumerable: !0,
      get: function() {
        return s.UAParser
      }
    });
    var u = n(4),
      l = n(9),
      c = n(0),
      f = n(11),
      d = n(6),
      h = n(15),
      p = n(5),
      g = n(17),
      b = n(18),
      w = n(19),
      v = n(20),
      y = n(21),
      m = n(7),
      T = n(1),
      A = n(22);
    Object.defineProperty(t, "Action", {
      enumerable: !0,
      get: function() {
        return A.Action
      }
    });
    var S = new(n(23).TrackManager)([new m.VirtualDeviceFactory, new d.IdentifyFactory, new g.PageFactory, new f.AbFactory, p.locationFactory, new b.TransportFactory, new v.UtmFactory, y.webVitalsFactory, new w.UserFactory, new h.BusinessFactory]);
    t.init = function(e, t) {
      void 0 === t && (t = u.defaultConfig);
      try {
        var n = y.webVitalsFactory.handleEvent.bind(y.webVitalsFactory);
        a.getFID(n, !0), a.getLCP(n, !0), a.getCLS(n, !0), a.getTTFB(n), a.getFCP(n, !0)
      } catch (e) {
        console.warn("Web Vitals polyfill required")
      }
      S.addDefaultLabel({
        name: "app",
        label: {
          name: e.name,
          type: e.type,
          version: e.version
        }
      }), S.addDefaultLabel({
        name: "sdk",
        label: {
          version: "5.0.2"
        }
      }), S.addDefaultLabel({
        name: y.webVitalsFactory.getLabelConfig().name,
        label: y.webVitalsFactory.getLabel()
      }), u.configManager.config = t, t.debug && T.logger.setLevel(T.LogLevels.Debug), l.applicationInit.broadcast()
    }, t.debugMode = function(e) {
      c.isSet(e) && (u.configManager.config.debug = e, T.logger.setLevel(e ? T.LogLevels.Debug : T.LogLevels.Error)), T.logger.log(T.LogLevels.Debug, "debug mode is " + (u.configManager.config.debug ? "on" : "off"))
    }, t.version = function() {
      return "5.0.2"
    }, t.track = function(e) {
      S.send(new A.Track(e).getData()), T.logger.log(T.LogLevels.Debug, "track: " + e.type)
    }, t.addLabel = function(e) {
      S.addLabel(e)
    }, t.setUser = function(e, t) {
      S.addDefaultLabel({
        name: w.UserFactory.slug,
        label: {
          id: e,
          type: t || null
        }
      })
    }, t.setPage = function(e, t) {
      S.addDefaultLabel({
        name: g.PageFactory.slug,
        label: {
          name: e,
          object: r({
            name: "",
            type: ""
          }, t)
        }
      })
    }, t.setUtm = function(e) {
      S.addDefaultLabel({
        name: v.UtmFactory.slug,
        label: e
      })
    }, t.setBusiness = function(e, t) {
      S.addDefaultLabel({
        name: h.BusinessFactory.slug,
        label: {
          type: e,
          entity_id: t
        }
      })
    }, t.getAb = function() {
      return i(this, void 0, void 0, (function() {
        return o(this, (function(e) {
          switch (e.label) {
            case 0:
              return [4, (new f.AbFactory).getAb()];
            case 1:
              return [2, e.sent()]
          }
        }))
      }))
    }, t.identify = function() {
      return i(this, void 0, void 0, (function() {
        return o(this, (function(e) {
          switch (e.label) {
            case 0:
              return [4, (new d.IdentifyFactory).getData()];
            case 1:
              return [2, e.sent()]
          }
        }))
      }))
    }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.applicationInit = t.Observer = void 0;
    var r = n(0),
      i = function() {
        function e() {
          this.observers = []
        }
        return e.prototype.subscribe = function(e) {
          r.isSet(e) && this.observers.push(e)
        }, e.prototype.unsubscribe = function(e) {
          this.observers = this.observers.filter((function(t) {
            return t !== e
          }))
        }, e.prototype.broadcast = function(e) {
          void 0 === e && (e = null), this.observers.forEach((function(t) {
            return t(e)
          }))
        }, e
      }();
    t.Observer = i, t.applicationInit = new i
  }, function(e, t, n) {
    "use strict";
    var r;
    ! function(i) {
      function o(e, t, n) {
        var r, i, o, a, h, p, g, b, w, v = 0,
          y = [],
          m = 0,
          T = !1,
          A = [],
          S = [],
          E = !1,
          x = !1,
          _ = -1;
        if (r = (n = n || {}).encoding || "UTF8", (w = n.numRounds || 1) !== parseInt(w, 10) || 1 > w) throw Error("numRounds must a integer >= 1");
        if ("SHA-1" === e) h = 512, p = N, g = U, a = 160, b = function(e) {
          return e.slice()
        };
        else if (0 === e.lastIndexOf("SHA-", 0))
          if (p = function(t, n) {
            return H(t, n, e)
          }, g = function(t, n, r, i) {
            var o, a;
            if ("SHA-224" === e || "SHA-256" === e) o = 15 + (n + 65 >>> 9 << 4), a = 16;
            else {
              if ("SHA-384" !== e && "SHA-512" !== e) throw Error("Unexpected error in SHA-2 implementation");
              o = 31 + (n + 129 >>> 10 << 5), a = 32
            }
            for (; t.length <= o;) t.push(0);
            for (t[n >>> 5] |= 128 << 24 - n % 32, n += r, t[o] = 4294967295 & n, t[o - 1] = n / 4294967296 | 0, r = t.length, n = 0; n < r; n += a) i = H(t.slice(n, n + a), i, e);
            if ("SHA-224" === e) t = [i[0], i[1], i[2], i[3], i[4], i[5], i[6]];
            else if ("SHA-256" === e) t = i;
            else if ("SHA-384" === e) t = [i[0].a, i[0].b, i[1].a, i[1].b, i[2].a, i[2].b, i[3].a, i[3].b, i[4].a, i[4].b, i[5].a, i[5].b];
            else {
              if ("SHA-512" !== e) throw Error("Unexpected error in SHA-2 implementation");
              t = [i[0].a, i[0].b, i[1].a, i[1].b, i[2].a, i[2].b, i[3].a, i[3].b, i[4].a, i[4].b, i[5].a, i[5].b, i[6].a, i[6].b, i[7].a, i[7].b]
            }
            return t
          }, b = function(e) {
            return e.slice()
          }, "SHA-224" === e) h = 512, a = 224;
          else if ("SHA-256" === e) h = 512, a = 256;
          else if ("SHA-384" === e) h = 1024, a = 384;
          else {
            if ("SHA-512" !== e) throw Error("Chosen SHA variant is not supported");
            h = 1024, a = 512
          } else {
          if (0 !== e.lastIndexOf("SHA3-", 0) && 0 !== e.lastIndexOf("SHAKE", 0)) throw Error("Chosen SHA variant is not supported");
          var C = 6;
          if (p = j, b = function(e) {
            var t, n = [];
            for (t = 0; 5 > t; t += 1) n[t] = e[t].slice();
            return n
          }, _ = 1, "SHA3-224" === e) h = 1152, a = 224;
          else if ("SHA3-256" === e) h = 1088, a = 256;
          else if ("SHA3-384" === e) h = 832, a = 384;
          else if ("SHA3-512" === e) h = 576, a = 512;
          else if ("SHAKE128" === e) h = 1344, a = -1, C = 31, x = !0;
          else {
            if ("SHAKE256" !== e) throw Error("Chosen SHA variant is not supported");
            h = 1088, a = -1, C = 31, x = !0
          }
          g = function(e, t, n, r, i) {
            var o, a = C,
              s = [],
              u = (n = h) >>> 5,
              l = 0,
              c = t >>> 5;
            for (o = 0; o < c && t >= n; o += u) r = j(e.slice(o, o + u), r), t -= n;
            for (e = e.slice(o), t %= n; e.length < u;) e.push(0);
            for (e[(o = t >>> 3) >> 2] ^= a << o % 4 * 8, e[u - 1] ^= 2147483648, r = j(e, r); 32 * s.length < i && (e = r[l % 5][l / 5 | 0], s.push(e.b), !(32 * s.length >= i));) s.push(e.a), 0 == 64 * (l += 1) % n && j(null, r);
            return s
          }
        }
        o = d(t, r, _), i = F(e), this.setHMACKey = function(t, n, o) {
          var s;
          if (!0 === T) throw Error("HMAC key already set");
          if (!0 === E) throw Error("Cannot set HMAC key after calling update");
          if (!0 === x) throw Error("SHAKE is not supported for HMAC");
          if (t = (n = d(n, r = (o || {}).encoding || "UTF8", _)(t)).binLen, n = n.value, o = (s = h >>> 3) / 4 - 1, s < t / 8) {
            for (n = g(n, t, 0, F(e), a); n.length <= o;) n.push(0);
            n[o] &= 4294967040
          } else if (s > t / 8) {
            for (; n.length <= o;) n.push(0);
            n[o] &= 4294967040
          }
          for (t = 0; t <= o; t += 1) A[t] = 909522486 ^ n[t], S[t] = 1549556828 ^ n[t];
          i = p(A, i), v = h, T = !0
        }, this.update = function(e) {
          var t, n, r, a = 0,
            s = h >>> 5;
          for (e = (t = o(e, y, m)).binLen, n = t.value, t = e >>> 5, r = 0; r < t; r += s) a + h <= e && (i = p(n.slice(r, r + s), i), a += h);
          v += a, y = n.slice(a >>> 5), m = e % h, E = !0
        }, this.getHash = function(t, n) {
          var r, o, d, h;
          if (!0 === T) throw Error("Cannot call getHash after setting HMAC key");
          if (d = f(n), !0 === x) {
            if (-1 === d.shakeLen) throw Error("shakeLen must be specified in options");
            a = d.shakeLen
          }
          switch (t) {
            case "HEX":
              r = function(e) {
                return s(e, a, _, d)
              };
              break;
            case "B64":
              r = function(e) {
                return u(e, a, _, d)
              };
              break;
            case "BYTES":
              r = function(e) {
                return l(e, a, _)
              };
              break;
            case "ARRAYBUFFER":
              try {
                o = new ArrayBuffer(0)
              } catch (e) {
                throw Error("ARRAYBUFFER not supported by this environment")
              }
              r = function(e) {
                return c(e, a, _)
              };
              break;
            default:
              throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER")
          }
          for (h = g(y.slice(), m, v, b(i), a), o = 1; o < w; o += 1) !0 === x && 0 != a % 32 && (h[h.length - 1] &= 16777215 >>> 24 - a % 32), h = g(h, a, 0, F(e), a);
          return r(h)
        }, this.getHMAC = function(t, n) {
          var r, o, d, w;
          if (!1 === T) throw Error("Cannot call getHMAC without first setting HMAC key");
          switch (d = f(n), t) {
            case "HEX":
              r = function(e) {
                return s(e, a, _, d)
              };
              break;
            case "B64":
              r = function(e) {
                return u(e, a, _, d)
              };
              break;
            case "BYTES":
              r = function(e) {
                return l(e, a, _)
              };
              break;
            case "ARRAYBUFFER":
              try {
                r = new ArrayBuffer(0)
              } catch (e) {
                throw Error("ARRAYBUFFER not supported by this environment")
              }
              r = function(e) {
                return c(e, a, _)
              };
              break;
            default:
              throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER")
          }
          return o = g(y.slice(), m, v, b(i), a), w = p(S, F(e)), r(w = g(o, a, h, w, a))
        }
      }

      function a(e, t) {
        this.a = e, this.b = t
      }

      function s(e, t, n, r) {
        var i, o, a, s = "";
        for (t /= 8, a = -1 === n ? 3 : 0, i = 0; i < t; i += 1) o = e[i >>> 2] >>> 8 * (a + i % 4 * n), s += "0123456789abcdef".charAt(o >>> 4 & 15) + "0123456789abcdef".charAt(15 & o);
        return r.outputUpper ? s.toUpperCase() : s
      }

      function u(e, t, n, r) {
        var i, o, a, s, u = "",
          l = t / 8;
        for (s = -1 === n ? 3 : 0, i = 0; i < l; i += 3)
          for (o = i + 1 < l ? e[i + 1 >>> 2] : 0, a = i + 2 < l ? e[i + 2 >>> 2] : 0, a = (e[i >>> 2] >>> 8 * (s + i % 4 * n) & 255) << 16 | (o >>> 8 * (s + (i + 1) % 4 * n) & 255) << 8 | a >>> 8 * (s + (i + 2) % 4 * n) & 255, o = 0; 4 > o; o += 1) u += 8 * i + 6 * o <= t ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a >>> 6 * (3 - o) & 63) : r.b64Pad;
        return u
      }

      function l(e, t, n) {
        var r, i, o, a = "";
        for (t /= 8, o = -1 === n ? 3 : 0, r = 0; r < t; r += 1) i = e[r >>> 2] >>> 8 * (o + r % 4 * n) & 255, a += String.fromCharCode(i);
        return a
      }

      function c(e, t, n) {
        t /= 8;
        var r, i, o, a = new ArrayBuffer(t);
        for (o = new Uint8Array(a), i = -1 === n ? 3 : 0, r = 0; r < t; r += 1) o[r] = e[r >>> 2] >>> 8 * (i + r % 4 * n) & 255;
        return a
      }

      function f(e) {
        var t = {
          outputUpper: !1,
          b64Pad: "=",
          shakeLen: -1
        };
        if (e = e || {}, t.outputUpper = e.outputUpper || !1, !0 === e.hasOwnProperty("b64Pad") && (t.b64Pad = e.b64Pad), !0 === e.hasOwnProperty("shakeLen")) {
          if (0 != e.shakeLen % 8) throw Error("shakeLen must be a multiple of 8");
          t.shakeLen = e.shakeLen
        }
        if ("boolean" != typeof t.outputUpper) throw Error("Invalid outputUpper formatting option");
        if ("string" != typeof t.b64Pad) throw Error("Invalid b64Pad formatting option");
        return t
      }

      function d(e, t, n) {
        switch (t) {
          case "UTF8":
          case "UTF16BE":
          case "UTF16LE":
            break;
          default:
            throw Error("encoding must be UTF8, UTF16BE, or UTF16LE")
        }
        switch (e) {
          case "HEX":
            e = function(e, t, r) {
              var i, o, a, s, u, l, c = e.length;
              if (0 != c % 2) throw Error("String of HEX type must be in byte increments");
              for (t = t || [0], u = (r = r || 0) >>> 3, l = -1 === n ? 3 : 0, i = 0; i < c; i += 2) {
                if (o = parseInt(e.substr(i, 2), 16), isNaN(o)) throw Error("String of HEX type contains invalid characters");
                for (a = (s = (i >>> 1) + u) >>> 2; t.length <= a;) t.push(0);
                t[a] |= o << 8 * (l + s % 4 * n)
              }
              return {
                value: t,
                binLen: 4 * c + r
              }
            };
            break;
          case "TEXT":
            e = function(e, r, i) {
              var o, a, s, u, l, c, f, d, h = 0;
              if (r = r || [0], l = (i = i || 0) >>> 3, "UTF8" === t)
                for (d = -1 === n ? 3 : 0, s = 0; s < e.length; s += 1)
                  for (a = [], 128 > (o = e.charCodeAt(s)) ? a.push(o) : 2048 > o ? (a.push(192 | o >>> 6), a.push(128 | 63 & o)) : 55296 > o || 57344 <= o ? a.push(224 | o >>> 12, 128 | o >>> 6 & 63, 128 | 63 & o) : (s += 1, o = 65536 + ((1023 & o) << 10 | 1023 & e.charCodeAt(s)), a.push(240 | o >>> 18, 128 | o >>> 12 & 63, 128 | o >>> 6 & 63, 128 | 63 & o)), u = 0; u < a.length; u += 1) {
                    for (c = (f = h + l) >>> 2; r.length <= c;) r.push(0);
                    r[c] |= a[u] << 8 * (d + f % 4 * n), h += 1
                  } else if ("UTF16BE" === t || "UTF16LE" === t)
                for (d = -1 === n ? 2 : 0, a = "UTF16LE" === t && 1 !== n || "UTF16LE" !== t && 1 === n, s = 0; s < e.length; s += 1) {
                  for (o = e.charCodeAt(s), !0 === a && (o = (u = 255 & o) << 8 | o >>> 8), c = (f = h + l) >>> 2; r.length <= c;) r.push(0);
                  r[c] |= o << 8 * (d + f % 4 * n), h += 2
                }
              return {
                value: r,
                binLen: 8 * h + i
              }
            };
            break;
          case "B64":
            e = function(e, t, r) {
              var i, o, a, s, u, l, c, f, d = 0;
              if (-1 === e.search(/^[a-zA-Z0-9=+\/]+$/)) throw Error("Invalid character in base-64 string");
              if (o = e.indexOf("="), e = e.replace(/\=/g, ""), -1 !== o && o < e.length) throw Error("Invalid '=' found in base-64 string");
              for (t = t || [0], l = (r = r || 0) >>> 3, f = -1 === n ? 3 : 0, o = 0; o < e.length; o += 4) {
                for (u = e.substr(o, 4), a = s = 0; a < u.length; a += 1) s |= (i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(u[a])) << 18 - 6 * a;
                for (a = 0; a < u.length - 1; a += 1) {
                  for (i = (c = d + l) >>> 2; t.length <= i;) t.push(0);
                  t[i] |= (s >>> 16 - 8 * a & 255) << 8 * (f + c % 4 * n), d += 1
                }
              }
              return {
                value: t,
                binLen: 8 * d + r
              }
            };
            break;
          case "BYTES":
            e = function(e, t, r) {
              var i, o, a, s, u, l;
              for (t = t || [0], a = (r = r || 0) >>> 3, l = -1 === n ? 3 : 0, o = 0; o < e.length; o += 1) i = e.charCodeAt(o), s = (u = o + a) >>> 2, t.length <= s && t.push(0), t[s] |= i << 8 * (l + u % 4 * n);
              return {
                value: t,
                binLen: 8 * e.length + r
              }
            };
            break;
          case "ARRAYBUFFER":
            try {
              e = new ArrayBuffer(0)
            } catch (e) {
              throw Error("ARRAYBUFFER not supported by this environment")
            }
            e = function(e, t, r) {
              var i, o, a, s, u, l;
              for (t = t || [0], o = (r = r || 0) >>> 3, u = -1 === n ? 3 : 0, l = new Uint8Array(e), i = 0; i < e.byteLength; i += 1) a = (s = i + o) >>> 2, t.length <= a && t.push(0), t[a] |= l[i] << 8 * (u + s % 4 * n);
              return {
                value: t,
                binLen: 8 * e.byteLength + r
              }
            };
            break;
          default:
            throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER")
        }
        return e
      }

      function h(e, t) {
        return e << t | e >>> 32 - t
      }

      function p(e, t) {
        return 32 < t ? (t -= 32, new a(e.b << t | e.a >>> 32 - t, e.a << t | e.b >>> 32 - t)) : 0 !== t ? new a(e.a << t | e.b >>> 32 - t, e.b << t | e.a >>> 32 - t) : e
      }

      function g(e, t) {
        return e >>> t | e << 32 - t
      }

      function b(e, t) {
        var n = null;
        n = new a(e.a, e.b);
        return 32 >= t ? new a(n.a >>> t | n.b << 32 - t & 4294967295, n.b >>> t | n.a << 32 - t & 4294967295) : new a(n.b >>> t - 32 | n.a << 64 - t & 4294967295, n.a >>> t - 32 | n.b << 64 - t & 4294967295)
      }

      function w(e, t) {
        return 32 >= t ? new a(e.a >>> t, e.b >>> t | e.a << 32 - t & 4294967295) : new a(0, e.a >>> t - 32)
      }

      function v(e, t, n) {
        return e & t ^ ~e & n
      }

      function y(e, t, n) {
        return new a(e.a & t.a ^ ~e.a & n.a, e.b & t.b ^ ~e.b & n.b)
      }

      function m(e, t, n) {
        return e & t ^ e & n ^ t & n
      }

      function T(e, t, n) {
        return new a(e.a & t.a ^ e.a & n.a ^ t.a & n.a, e.b & t.b ^ e.b & n.b ^ t.b & n.b)
      }

      function A(e) {
        return g(e, 2) ^ g(e, 13) ^ g(e, 22)
      }

      function S(e) {
        var t = b(e, 28),
          n = b(e, 34);
        return e = b(e, 39), new a(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b)
      }

      function E(e) {
        return g(e, 6) ^ g(e, 11) ^ g(e, 25)
      }

      function x(e) {
        var t = b(e, 14),
          n = b(e, 18);
        return e = b(e, 41), new a(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b)
      }

      function _(e) {
        return g(e, 7) ^ g(e, 18) ^ e >>> 3
      }

      function C(e) {
        var t = b(e, 1),
          n = b(e, 8);
        return e = w(e, 7), new a(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b)
      }

      function k(e) {
        return g(e, 17) ^ g(e, 19) ^ e >>> 10
      }

      function O(e) {
        var t = b(e, 19),
          n = b(e, 61);
        return e = w(e, 6), new a(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b)
      }

      function L(e, t) {
        var n = (65535 & e) + (65535 & t);
        return ((e >>> 16) + (t >>> 16) + (n >>> 16) & 65535) << 16 | 65535 & n
      }

      function B(e, t, n, r) {
        var i = (65535 & e) + (65535 & t) + (65535 & n) + (65535 & r);
        return ((e >>> 16) + (t >>> 16) + (n >>> 16) + (r >>> 16) + (i >>> 16) & 65535) << 16 | 65535 & i
      }

      function P(e, t, n, r, i) {
        var o = (65535 & e) + (65535 & t) + (65535 & n) + (65535 & r) + (65535 & i);
        return ((e >>> 16) + (t >>> 16) + (n >>> 16) + (r >>> 16) + (i >>> 16) + (o >>> 16) & 65535) << 16 | 65535 & o
      }

      function M(e, t) {
        var n, r, i;
        return n = (65535 & e.b) + (65535 & t.b), i = (65535 & (r = (e.b >>> 16) + (t.b >>> 16) + (n >>> 16))) << 16 | 65535 & n, n = (65535 & e.a) + (65535 & t.a) + (r >>> 16), new a((65535 & (r = (e.a >>> 16) + (t.a >>> 16) + (n >>> 16))) << 16 | 65535 & n, i)
      }

      function R(e, t, n, r) {
        var i, o, s;
        return i = (65535 & e.b) + (65535 & t.b) + (65535 & n.b) + (65535 & r.b), s = (65535 & (o = (e.b >>> 16) + (t.b >>> 16) + (n.b >>> 16) + (r.b >>> 16) + (i >>> 16))) << 16 | 65535 & i, i = (65535 & e.a) + (65535 & t.a) + (65535 & n.a) + (65535 & r.a) + (o >>> 16), new a((65535 & (o = (e.a >>> 16) + (t.a >>> 16) + (n.a >>> 16) + (r.a >>> 16) + (i >>> 16))) << 16 | 65535 & i, s)
      }

      function D(e, t, n, r, i) {
        var o, s, u;
        return o = (65535 & e.b) + (65535 & t.b) + (65535 & n.b) + (65535 & r.b) + (65535 & i.b), u = (65535 & (s = (e.b >>> 16) + (t.b >>> 16) + (n.b >>> 16) + (r.b >>> 16) + (i.b >>> 16) + (o >>> 16))) << 16 | 65535 & o, o = (65535 & e.a) + (65535 & t.a) + (65535 & n.a) + (65535 & r.a) + (65535 & i.a) + (s >>> 16), new a((65535 & (s = (e.a >>> 16) + (t.a >>> 16) + (n.a >>> 16) + (r.a >>> 16) + (i.a >>> 16) + (o >>> 16))) << 16 | 65535 & o, u)
      }

      function I(e, t) {
        return new a(e.a ^ t.a, e.b ^ t.b)
      }

      function F(e) {
        var t, n = [];
        if ("SHA-1" === e) n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        else if (0 === e.lastIndexOf("SHA-", 0)) switch (n = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428], t = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], e) {
          case "SHA-224":
            break;
          case "SHA-256":
            n = t;
            break;
          case "SHA-384":
            n = [new a(3418070365, n[0]), new a(1654270250, n[1]), new a(2438529370, n[2]), new a(355462360, n[3]), new a(1731405415, n[4]), new a(41048885895, n[5]), new a(3675008525, n[6]), new a(1203062813, n[7])];
            break;
          case "SHA-512":
            n = [new a(t[0], 4089235720), new a(t[1], 2227873595), new a(t[2], 4271175723), new a(t[3], 1595750129), new a(t[4], 2917565137), new a(t[5], 725511199), new a(t[6], 4215389547), new a(t[7], 327033209)];
            break;
          default:
            throw Error("Unknown SHA variant")
        } else {
          if (0 !== e.lastIndexOf("SHA3-", 0) && 0 !== e.lastIndexOf("SHAKE", 0)) throw Error("No SHA variants supported");
          for (e = 0; 5 > e; e += 1) n[e] = [new a(0, 0), new a(0, 0), new a(0, 0), new a(0, 0), new a(0, 0)]
        }
        return n
      }

      function N(e, t) {
        var n, r, i, o, a, s, u, l = [];
        for (n = t[0], r = t[1], i = t[2], o = t[3], a = t[4], u = 0; 80 > u; u += 1) l[u] = 16 > u ? e[u] : h(l[u - 3] ^ l[u - 8] ^ l[u - 14] ^ l[u - 16], 1), s = 20 > u ? P(h(n, 5), r & i ^ ~r & o, a, 1518500249, l[u]) : 40 > u ? P(h(n, 5), r ^ i ^ o, a, 1859775393, l[u]) : 60 > u ? P(h(n, 5), m(r, i, o), a, 2400959708, l[u]) : P(h(n, 5), r ^ i ^ o, a, 3395469782, l[u]), a = o, o = i, i = h(r, 30), r = n, n = s;
        return t[0] = L(n, t[0]), t[1] = L(r, t[1]), t[2] = L(i, t[2]), t[3] = L(o, t[3]), t[4] = L(a, t[4]), t
      }

      function U(e, t, n, r) {
        var i;
        for (i = 15 + (t + 65 >>> 9 << 4); e.length <= i;) e.push(0);
        for (e[t >>> 5] |= 128 << 24 - t % 32, t += n, e[i] = 4294967295 & t, e[i - 1] = t / 4294967296 | 0, t = e.length, i = 0; i < t; i += 16) r = N(e.slice(i, i + 16), r);
        return r
      }

      function H(e, t, n) {
        var r, i, o, s, u, l, c, f, d, h, p, g, b, w, I, F, N, U, H, j, X, W, z, q = [];
        if ("SHA-224" === n || "SHA-256" === n) h = 64, g = 1, W = Number, b = L, w = B, I = P, F = _, N = k, U = A, H = E, X = m, j = v, z = G;
        else {
          if ("SHA-384" !== n && "SHA-512" !== n) throw Error("Unexpected error in SHA-2 implementation");
          h = 80, g = 2, W = a, b = M, w = R, I = D, F = C, N = O, U = S, H = x, X = T, j = y, z = V
        }
        for (n = t[0], r = t[1], i = t[2], o = t[3], s = t[4], u = t[5], l = t[6], c = t[7], p = 0; p < h; p += 1) 16 > p ? (d = p * g, f = e.length <= d ? 0 : e[d], d = e.length <= d + 1 ? 0 : e[d + 1], q[p] = new W(f, d)) : q[p] = w(N(q[p - 2]), q[p - 7], F(q[p - 15]), q[p - 16]), f = I(c, H(s), j(s, u, l), z[p], q[p]), d = b(U(n), X(n, r, i)), c = l, l = u, u = s, s = b(o, f), o = i, i = r, r = n, n = b(f, d);
        return t[0] = b(n, t[0]), t[1] = b(r, t[1]), t[2] = b(i, t[2]), t[3] = b(o, t[3]), t[4] = b(s, t[4]), t[5] = b(u, t[5]), t[6] = b(l, t[6]), t[7] = b(c, t[7]), t
      }

      function j(e, t) {
        var n, r, i, o, s = [],
          u = [];
        if (null !== e)
          for (r = 0; r < e.length; r += 2) t[(r >>> 1) % 5][(r >>> 1) / 5 | 0] = I(t[(r >>> 1) % 5][(r >>> 1) / 5 | 0], new a(e[r + 1], e[r]));
        for (n = 0; 24 > n; n += 1) {
          for (o = F("SHA3-"), r = 0; 5 > r; r += 1) {
            i = t[r][0];
            var l = t[r][1],
              c = t[r][2],
              f = t[r][3],
              d = t[r][4];
            s[r] = new a(i.a ^ l.a ^ c.a ^ f.a ^ d.a, i.b ^ l.b ^ c.b ^ f.b ^ d.b)
          }
          for (r = 0; 5 > r; r += 1) u[r] = I(s[(r + 4) % 5], p(s[(r + 1) % 5], 1));
          for (r = 0; 5 > r; r += 1)
            for (i = 0; 5 > i; i += 1) t[r][i] = I(t[r][i], u[r]);
          for (r = 0; 5 > r; r += 1)
            for (i = 0; 5 > i; i += 1) o[i][(2 * r + 3 * i) % 5] = p(t[r][i], X[r][i]);
          for (r = 0; 5 > r; r += 1)
            for (i = 0; 5 > i; i += 1) t[r][i] = I(o[r][i], new a(~o[(r + 1) % 5][i].a & o[(r + 2) % 5][i].a, ~o[(r + 1) % 5][i].b & o[(r + 2) % 5][i].b));
          t[0][0] = I(t[0][0], W[n])
        }
        return t
      }
      var G, V, X, W;
      V = [new a((G = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298])[0], 3609767458), new a(G[1], 602891725), new a(G[2], 3964484399), new a(G[3], 2173295548), new a(G[4], 4081628472), new a(G[5], 3053834265), new a(G[6], 2937671579), new a(G[7], 3664609560), new a(G[8], 2734883394), new a(G[9], 1164996542), new a(G[10], 1323610764), new a(G[11], 3590304994), new a(G[12], 4068182383), new a(G[13], 991336113), new a(G[14], 633803317), new a(G[15], 3479774868), new a(G[16], 2666613458), new a(G[17], 944711139), new a(G[18], 2341262773), new a(G[19], 2007800933), new a(G[20], 1495990901), new a(G[21], 1856431235), new a(G[22], 3175218132), new a(G[23], 2198950837), new a(G[24], 3999719339), new a(G[25], 766784016), new a(G[26], 2566594879), new a(G[27], 3203337956), new a(G[28], 1034457026), new a(G[29], 2466948901), new a(G[30], 3758326383), new a(G[31], 168717936), new a(G[32], 1188179964), new a(G[33], 1546045734), new a(G[34], 1522805485), new a(G[35], 2643833823), new a(G[36], 2343527390), new a(G[37], 1014477480), new a(G[38], 1206759142), new a(G[39], 344077627), new a(G[40], 1290863460), new a(G[41], 3158454273), new a(G[42], 3505952657), new a(G[43], 106217008), new a(G[44], 3606008344), new a(G[45], 1432725776), new a(G[46], 1467031594), new a(G[47], 851169720), new a(G[48], 3100823752), new a(G[49], 1363258195), new a(G[50], 3750685593), new a(G[51], 3785050280), new a(G[52], 3318307427), new a(G[53], 3812723403), new a(G[54], 2003034995), new a(G[55], 3602036899), new a(G[56], 1575990012), new a(G[57], 1125592928), new a(G[58], 2716904306), new a(G[59], 442776044), new a(G[60], 593698344), new a(G[61], 3733110249), new a(G[62], 2999351573), new a(G[63], 3815920427), new a(3391569614, 3928383900), new a(3515267271, 566280711), new a(3940187606, 3454069534), new a(4118630271, 4000239992), new a(116418474, 1914138554), new a(174292421, 2731055270), new a(289380356, 3203993006), new a(460393269, 320620315), new a(685471733, 587496836), new a(852142971, 1086792851), new a(1017036298, 365543100), new a(1126000580, 2618297676), new a(1288033470, 3409855158), new a(1501505948, 4234509866), new a(1607167915, 987167468), new a(1816402316, 1246189591)], W = [new a(0, 1), new a(0, 32898), new a(2147483648, 32906), new a(2147483648, 2147516416), new a(0, 32907), new a(0, 2147483649), new a(2147483648, 2147516545), new a(2147483648, 32777), new a(0, 138), new a(0, 136), new a(0, 2147516425), new a(0, 2147483658), new a(0, 2147516555), new a(2147483648, 139), new a(2147483648, 32905), new a(2147483648, 32771), new a(2147483648, 32770), new a(2147483648, 128), new a(0, 32778), new a(2147483648, 2147483658), new a(2147483648, 2147516545), new a(2147483648, 32896), new a(0, 2147483649), new a(2147483648, 2147516424)], X = [
        [0, 36, 3, 41, 18],
        [1, 44, 10, 45, 2],
        [62, 6, 43, 15, 61],
        [28, 55, 25, 21, 56],
        [27, 20, 39, 8, 14]
      ], void 0 === (r = function() {
        return o
      }.call(t, n, t, e)) || (e.exports = r)
    }()
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      i = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.AbFactory = void 0;
    var o = n(0),
      a = n(2),
      s = function() {
        function e() {
          this.label = {
            group: {
              weak: null,
              strong: null
            }
          }, this.isReady = !1
        }
        return e.prototype.init = function(t) {
          return r(this, void 0, void 0, (function() {
            var n;
            return i(this, (function(r) {
              switch (r.label) {
                case 0:
                  return n = this, [4, this.getData()];
                case 1:
                  return n.label = r.sent(), this.isReady = !0, t.enrich(e.slug, this.label), [2]
              }
            }))
          }))
        }, e.prototype.getLabel = function() {
          return this.label
        }, e.prototype.getLabelConfig = function() {
          return {
            label: this.label,
            name: e.slug,
            isRequired: !0,
            isReady: this.isReady
          }
        }, e.prototype.updateLabel = function(e) {
          this.label = e
        }, e.prototype.getAb = function() {
          return r(this, void 0, void 0, (function() {
            var e;
            return i(this, (function(t) {
              switch (t.label) {
                case 0:
                  return [4, a.fingerprint.get()];
                case 1:
                  return e = t.sent(), [2, {
                    weak: o.Utils.getAb(e.weak).toString(),
                    strong: o.Utils.getAb(e.strong).toString()
                  }]
              }
            }))
          }))
        }, e.prototype.getData = function() {
          return r(this, void 0, void 0, (function() {
            var e;
            return i(this, (function(t) {
              switch (t.label) {
                case 0:
                  return e = {}, [4, this.getAb()];
                case 1:
                  return [2, (e.group = t.sent(), e)]
              }
            }))
          }))
        }, e.slug = "ab", e
      }();
    t.AbFactory = s
  }, function(e, t, n) {
    var r, i;
    ! function(o, a, s) {
      "use strict";
      "undefined" != typeof window && n(13) ? void 0 === (i = "function" == typeof(r = s) ? r.call(t, n, t, e) : r) || (e.exports = i) : e.exports ? e.exports = s() : a.exports ? a.exports = s() : a.Fingerprint2 = s()
    }(0, this, (function() {
      "use strict";
      void 0 === Array.isArray && (Array.isArray = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
      });
      var e = function(e, t) {
          e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
          var n = [0, 0, 0, 0];
          return n[3] += e[3] + t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] + t[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] + t[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] + t[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]]
        },
        t = function(e, t) {
          e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
          var n = [0, 0, 0, 0];
          return n[3] += e[3] * t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] * t[3], n[1] += n[2] >>> 16, n[2] &= 65535, n[2] += e[3] * t[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] * t[3], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[2] * t[2], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[3] * t[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]]
        },
        n = function(e, t) {
          return 32 === (t %= 64) ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32, [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t])
        },
        r = function(e, t) {
          return 0 === (t %= 64) ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
        },
        i = function(e, t) {
          return [e[0] ^ t[0], e[1] ^ t[1]]
        },
        o = function(e) {
          return e = i(e, [0, e[0] >>> 1]), e = t(e, [4283543511, 3981806797]), e = i(e, [0, e[0] >>> 1]), e = t(e, [3301882366, 444984403]), e = i(e, [0, e[0] >>> 1])
        },
        a = function(a, s) {
          s = s || 0;
          for (var u = (a = a || "").length % 16, l = a.length - u, c = [0, s], f = [0, s], d = [0, 0], h = [0, 0], p = [2277735313, 289559509], g = [1291169091, 658871167], b = 0; b < l; b += 16) d = [255 & a.charCodeAt(b + 4) | (255 & a.charCodeAt(b + 5)) << 8 | (255 & a.charCodeAt(b + 6)) << 16 | (255 & a.charCodeAt(b + 7)) << 24, 255 & a.charCodeAt(b) | (255 & a.charCodeAt(b + 1)) << 8 | (255 & a.charCodeAt(b + 2)) << 16 | (255 & a.charCodeAt(b + 3)) << 24], h = [255 & a.charCodeAt(b + 12) | (255 & a.charCodeAt(b + 13)) << 8 | (255 & a.charCodeAt(b + 14)) << 16 | (255 & a.charCodeAt(b + 15)) << 24, 255 & a.charCodeAt(b + 8) | (255 & a.charCodeAt(b + 9)) << 8 | (255 & a.charCodeAt(b + 10)) << 16 | (255 & a.charCodeAt(b + 11)) << 24], d = t(d, p), d = n(d, 31), d = t(d, g), c = i(c, d), c = n(c, 27), c = e(c, f), c = e(t(c, [0, 5]), [0, 1390208809]), h = t(h, g), h = n(h, 33), h = t(h, p), f = i(f, h), f = n(f, 31), f = e(f, c), f = e(t(f, [0, 5]), [0, 944331445]);
          switch (d = [0, 0], h = [0, 0], u) {
            case 15:
              h = i(h, r([0, a.charCodeAt(b + 14)], 48));
            case 14:
              h = i(h, r([0, a.charCodeAt(b + 13)], 40));
            case 13:
              h = i(h, r([0, a.charCodeAt(b + 12)], 32));
            case 12:
              h = i(h, r([0, a.charCodeAt(b + 11)], 24));
            case 11:
              h = i(h, r([0, a.charCodeAt(b + 10)], 16));
            case 10:
              h = i(h, r([0, a.charCodeAt(b + 9)], 8));
            case 9:
              h = i(h, [0, a.charCodeAt(b + 8)]), h = t(h, g), h = n(h, 33), h = t(h, p), f = i(f, h);
            case 8:
              d = i(d, r([0, a.charCodeAt(b + 7)], 56));
            case 7:
              d = i(d, r([0, a.charCodeAt(b + 6)], 48));
            case 6:
              d = i(d, r([0, a.charCodeAt(b + 5)], 40));
            case 5:
              d = i(d, r([0, a.charCodeAt(b + 4)], 32));
            case 4:
              d = i(d, r([0, a.charCodeAt(b + 3)], 24));
            case 3:
              d = i(d, r([0, a.charCodeAt(b + 2)], 16));
            case 2:
              d = i(d, r([0, a.charCodeAt(b + 1)], 8));
            case 1:
              d = i(d, [0, a.charCodeAt(b)]), d = t(d, p), d = n(d, 31), d = t(d, g), c = i(c, d)
          }
          return c = i(c, [0, a.length]), f = i(f, [0, a.length]), c = e(c, f), f = e(f, c), c = o(c), f = o(f), c = e(c, f), f = e(f, c), ("00000000" + (c[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (f[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (f[1] >>> 0).toString(16)).slice(-8)
        },
        s = {
          preprocessor: null,
          audio: {
            timeout: 1e3,
            excludeIOS11: !0
          },
          fonts: {
            swfContainerId: "fingerprintjs2",
            swfPath: "flash/compiled/FontList.swf",
            userDefinedFonts: [],
            extendedJsFonts: !1
          },
          screen: {
            detectScreenOrientation: !0
          },
          plugins: {
            sortPluginsFor: [/palemoon/i],
            excludeIE: !1
          },
          extraComponents: [],
          excludes: {
            enumerateDevices: !0,
            pixelRatio: !0,
            doNotTrack: !0,
            fontsFlash: !0,
            adBlock: !0
          },
          NOT_AVAILABLE: "not available",
          ERROR: "error",
          EXCLUDED: "excluded"
        },
        u = function(e, t) {
          if (Array.prototype.forEach && e.forEach === Array.prototype.forEach) e.forEach(t);
          else if (e.length === +e.length)
            for (var n = 0, r = e.length; n < r; n++) t(e[n], n, e);
          else
            for (var i in e) e.hasOwnProperty(i) && t(e[i], i, e)
        },
        l = function(e, t) {
          var n = [];
          return null == e ? n : Array.prototype.map && e.map === Array.prototype.map ? e.map(t) : (u(e, (function(e, r, i) {
            n.push(t(e, r, i))
          })), n)
        },
        c = function() {
          return navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
        },
        f = function(e) {
          var t = [window.screen.width, window.screen.height];
          return e.screen.detectScreenOrientation && t.sort().reverse(), t
        },
        d = function(e) {
          if (window.screen.availWidth && window.screen.availHeight) {
            var t = [window.screen.availHeight, window.screen.availWidth];
            return e.screen.detectScreenOrientation && t.sort().reverse(), t
          }
          return e.NOT_AVAILABLE
        },
        h = function(e) {
          if (null == navigator.plugins) return e.NOT_AVAILABLE;
          for (var t = [], n = 0, r = navigator.plugins.length; n < r; n++) navigator.plugins[n] && t.push(navigator.plugins[n]);
          return g(e) && (t = t.sort((function(e, t) {
            return e.name > t.name ? 1 : e.name < t.name ? -1 : 0
          }))), l(t, (function(e) {
            var t = l(e, (function(e) {
              return [e.type, e.suffixes]
            }));
            return [e.name, e.description, t]
          }))
        },
        p = function(e) {
          var t = [];
          if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) {
            t = l(["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"], (function(t) {
              try {
                return new window.ActiveXObject(t), t
              } catch (t) {
                return e.ERROR
              }
            }))
          } else t.push(e.NOT_AVAILABLE);
          return navigator.plugins && (t = t.concat(h(e))), t
        },
        g = function(e) {
          for (var t = !1, n = 0, r = e.plugins.sortPluginsFor.length; n < r; n++) {
            var i = e.plugins.sortPluginsFor[n];
            if (navigator.userAgent.match(i)) {
              t = !0;
              break
            }
          }
          return t
        },
        b = function(e) {
          try {
            return !!window.sessionStorage
          } catch (t) {
            return e.ERROR
          }
        },
        w = function(e) {
          try {
            return !!window.localStorage
          } catch (t) {
            return e.ERROR
          }
        },
        v = function(e) {
          if (D()) return e.EXCLUDED;
          try {
            return !!window.indexedDB
          } catch (t) {
            return e.ERROR
          }
        },
        y = function(e) {
          return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : e.NOT_AVAILABLE
        },
        m = function(e) {
          return navigator.cpuClass || e.NOT_AVAILABLE
        },
        T = function(e) {
          return navigator.platform ? navigator.platform : e.NOT_AVAILABLE
        },
        A = function(e) {
          return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : e.NOT_AVAILABLE
        },
        S = function() {
          var e, t = 0;
          void 0 !== navigator.maxTouchPoints ? t = navigator.maxTouchPoints : void 0 !== navigator.msMaxTouchPoints && (t = navigator.msMaxTouchPoints);
          try {
            document.createEvent("TouchEvent"), e = !0
          } catch (t) {
            e = !1
          }
          return [t, e, "ontouchstart" in window]
        },
        E = function(e) {
          var t = [],
            n = document.createElement("canvas");
          n.width = 2e3, n.height = 200, n.style.display = "inline";
          var r = n.getContext("2d");
          return r.rect(0, 0, 10, 10), r.rect(2, 2, 6, 6), t.push("canvas winding:" + (!1 === r.isPointInPath(5, 5, "evenodd") ? "yes" : "no")), r.textBaseline = "alphabetic", r.fillStyle = "#f60", r.fillRect(125, 1, 62, 20), r.fillStyle = "#069", e.dontUseFakeFontInCanvas ? r.font = "11pt Arial" : r.font = "11pt no-real-font-123", r.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15), r.fillStyle = "rgba(102, 204, 0, 0.2)", r.font = "18pt Arial", r.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45), r.globalCompositeOperation = "multiply", r.fillStyle = "rgb(255,0,255)", r.beginPath(), r.arc(50, 50, 50, 0, 2 * Math.PI, !0), r.closePath(), r.fill(), r.fillStyle = "rgb(0,255,255)", r.beginPath(), r.arc(100, 50, 50, 0, 2 * Math.PI, !0), r.closePath(), r.fill(), r.fillStyle = "rgb(255,255,0)", r.beginPath(), r.arc(75, 100, 50, 0, 2 * Math.PI, !0), r.closePath(), r.fill(), r.fillStyle = "rgb(255,0,255)", r.arc(75, 75, 75, 0, 2 * Math.PI, !0), r.arc(75, 75, 25, 0, 2 * Math.PI, !0), r.fill("evenodd"), n.toDataURL && t.push("canvas fp:" + n.toDataURL()), t
        },
        x = function() {
          var e, t = function(t) {
            return e.clearColor(0, 0, 0, 1), e.enable(e.DEPTH_TEST), e.depthFunc(e.LEQUAL), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), "[" + t[0] + ", " + t[1] + "]"
          };
          if (!(e = U())) return null;
          var n = [],
            r = e.createBuffer();
          e.bindBuffer(e.ARRAY_BUFFER, r);
          var i = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
          e.bufferData(e.ARRAY_BUFFER, i, e.STATIC_DRAW), r.itemSize = 3, r.numItems = 3;
          var o = e.createProgram(),
            a = e.createShader(e.VERTEX_SHADER);
          e.shaderSource(a, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"), e.compileShader(a);
          var s = e.createShader(e.FRAGMENT_SHADER);
          e.shaderSource(s, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"), e.compileShader(s), e.attachShader(o, a), e.attachShader(o, s), e.linkProgram(o), e.useProgram(o), o.vertexPosAttrib = e.getAttribLocation(o, "attrVertex"), o.offsetUniform = e.getUniformLocation(o, "uniformOffset"), e.enableVertexAttribArray(o.vertexPosArray), e.vertexAttribPointer(o.vertexPosAttrib, r.itemSize, e.FLOAT, !1, 0, 0), e.uniform2f(o.offsetUniform, 1, 1), e.drawArrays(e.TRIANGLE_STRIP, 0, r.numItems);
          try {
            n.push(e.canvas.toDataURL())
          } catch (e) {}
          n.push("extensions:" + (e.getSupportedExtensions() || []).join(";")), n.push("webgl aliased line width range:" + t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))), n.push("webgl aliased point size range:" + t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))), n.push("webgl alpha bits:" + e.getParameter(e.ALPHA_BITS)), n.push("webgl antialiasing:" + (e.getContextAttributes().antialias ? "yes" : "no")), n.push("webgl blue bits:" + e.getParameter(e.BLUE_BITS)), n.push("webgl depth bits:" + e.getParameter(e.DEPTH_BITS)), n.push("webgl green bits:" + e.getParameter(e.GREEN_BITS)), n.push("webgl max anisotropy:" + function(e) {
            var t = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");
            if (t) {
              var n = e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
              return 0 === n && (n = 2), n
            }
            return null
          }(e)), n.push("webgl max combined texture image units:" + e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)), n.push("webgl max cube map texture size:" + e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)), n.push("webgl max fragment uniform vectors:" + e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)), n.push("webgl max render buffer size:" + e.getParameter(e.MAX_RENDERBUFFER_SIZE)), n.push("webgl max texture image units:" + e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)), n.push("webgl max texture size:" + e.getParameter(e.MAX_TEXTURE_SIZE)), n.push("webgl max varying vectors:" + e.getParameter(e.MAX_VARYING_VECTORS)), n.push("webgl max vertex attribs:" + e.getParameter(e.MAX_VERTEX_ATTRIBS)), n.push("webgl max vertex texture image units:" + e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)), n.push("webgl max vertex uniform vectors:" + e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)), n.push("webgl max viewport dims:" + t(e.getParameter(e.MAX_VIEWPORT_DIMS))), n.push("webgl red bits:" + e.getParameter(e.RED_BITS)), n.push("webgl renderer:" + e.getParameter(e.RENDERER)), n.push("webgl shading language version:" + e.getParameter(e.SHADING_LANGUAGE_VERSION)), n.push("webgl stencil bits:" + e.getParameter(e.STENCIL_BITS)), n.push("webgl vendor:" + e.getParameter(e.VENDOR)), n.push("webgl version:" + e.getParameter(e.VERSION));
          try {
            var l = e.getExtension("WEBGL_debug_renderer_info");
            l && (n.push("webgl unmasked vendor:" + e.getParameter(l.UNMASKED_VENDOR_WEBGL)), n.push("webgl unmasked renderer:" + e.getParameter(l.UNMASKED_RENDERER_WEBGL)))
          } catch (e) {}
          return e.getShaderPrecisionFormat ? (u(["FLOAT", "INT"], (function(t) {
            u(["VERTEX", "FRAGMENT"], (function(r) {
              u(["HIGH", "MEDIUM", "LOW"], (function(i) {
                u(["precision", "rangeMin", "rangeMax"], (function(o) {
                  var a = e.getShaderPrecisionFormat(e[r + "_SHADER"], e[i + "_" + t])[o];
                  "precision" !== o && (o = "precision " + o);
                  var s = ["webgl ", r.toLowerCase(), " shader ", i.toLowerCase(), " ", t.toLowerCase(), " ", o, ":", a].join("");
                  n.push(s)
                }))
              }))
            }))
          })), H(e), n) : (H(e), n)
        },
        _ = function() {
          try {
            var e = U(),
              t = e.getExtension("WEBGL_debug_renderer_info"),
              n = e.getParameter(t.UNMASKED_VENDOR_WEBGL) + "~" + e.getParameter(t.UNMASKED_RENDERER_WEBGL);
            return H(e), n
          } catch (e) {
            return null
          }
        },
        C = function() {
          var e = document.createElement("div");
          e.innerHTML = "&nbsp;", e.className = "adsbox";
          var t = !1;
          try {
            document.body.appendChild(e), t = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight, document.body.removeChild(e)
          } catch (e) {
            t = !1
          }
          return t
        },
        k = function() {
          if (void 0 !== navigator.languages) try {
            if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2)) return !0
          } catch (e) {
            return !0
          }
          return !1
        },
        O = function() {
          return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight
        },
        L = function() {
          var e, t = navigator.userAgent.toLowerCase(),
            n = navigator.oscpu,
            r = navigator.platform.toLowerCase();
          if (e = t.indexOf("windows phone") >= 0 ? "Windows Phone" : t.indexOf("windows") >= 0 || t.indexOf("win16") >= 0 || t.indexOf("win32") >= 0 || t.indexOf("win64") >= 0 || t.indexOf("win95") >= 0 || t.indexOf("win98") >= 0 || t.indexOf("winnt") >= 0 || t.indexOf("wow64") >= 0 ? "Windows" : t.indexOf("android") >= 0 ? "Android" : t.indexOf("linux") >= 0 || t.indexOf("cros") >= 0 || t.indexOf("x11") >= 0 ? "Linux" : t.indexOf("iphone") >= 0 || t.indexOf("ipad") >= 0 || t.indexOf("ipod") >= 0 || t.indexOf("crios") >= 0 || t.indexOf("fxios") >= 0 ? "iOS" : t.indexOf("macintosh") >= 0 || t.indexOf("mac_powerpc)") >= 0 ? "Mac" : "Other", ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && "Windows" !== e && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e && -1 === t.indexOf("cros")) return !0;
          if (void 0 !== n) {
            if ((n = n.toLowerCase()).indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e) return !0;
            if (n.indexOf("linux") >= 0 && "Linux" !== e && "Android" !== e) return !0;
            if (n.indexOf("mac") >= 0 && "Mac" !== e && "iOS" !== e) return !0;
            if ((-1 === n.indexOf("win") && -1 === n.indexOf("linux") && -1 === n.indexOf("mac")) != ("Other" === e)) return !0
          }
          return r.indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e || ((r.indexOf("linux") >= 0 || r.indexOf("android") >= 0 || r.indexOf("pike") >= 0) && "Linux" !== e && "Android" !== e || ((r.indexOf("mac") >= 0 || r.indexOf("ipad") >= 0 || r.indexOf("ipod") >= 0 || r.indexOf("iphone") >= 0) && "Mac" !== e && "iOS" !== e || !(r.indexOf("arm") >= 0 && "Windows Phone" === e) && (!(r.indexOf("pike") >= 0 && t.indexOf("opera mini") >= 0) && ((r.indexOf("win") < 0 && r.indexOf("linux") < 0 && r.indexOf("mac") < 0 && r.indexOf("iphone") < 0 && r.indexOf("ipad") < 0 && r.indexOf("ipod") < 0) !== ("Other" === e) || void 0 === navigator.plugins && "Windows" !== e && "Windows Phone" !== e))))
        },
        B = function() {
          var e, t = navigator.userAgent.toLowerCase(),
            n = navigator.productSub;
          if (t.indexOf("edge/") >= 0 || t.indexOf("iemobile/") >= 0) return !1;
          if (t.indexOf("opera mini") >= 0) return !1;
          if (("Chrome" === (e = t.indexOf("firefox/") >= 0 ? "Firefox" : t.indexOf("opera/") >= 0 || t.indexOf(" opr/") >= 0 ? "Opera" : t.indexOf("chrome/") >= 0 ? "Chrome" : t.indexOf("safari/") >= 0 ? t.indexOf("android 1.") >= 0 || t.indexOf("android 2.") >= 0 || t.indexOf("android 3.") >= 0 || t.indexOf("android 4.") >= 0 ? "AOSP" : "Safari" : t.indexOf("trident/") >= 0 ? "Internet Explorer" : "Other") || "Safari" === e || "Opera" === e) && "20030107" !== n) return !0;
          var r, i = eval.toString().length;
          if (37 === i && "Safari" !== e && "Firefox" !== e && "Other" !== e) return !0;
          if (39 === i && "Internet Explorer" !== e && "Other" !== e) return !0;
          if (33 === i && "Chrome" !== e && "AOSP" !== e && "Opera" !== e && "Other" !== e) return !0;
          try {
            throw "a"
          } catch (e) {
            try {
              e.toSource(), r = !0
            } catch (e) {
              r = !1
            }
          }
          return r && "Firefox" !== e && "Other" !== e
        },
        P = function() {
          var e = document.createElement("canvas");
          return !(!e.getContext || !e.getContext("2d"))
        },
        M = function() {
          if (!P()) return !1;
          var e = U(),
            t = !!window.WebGLRenderingContext && !!e;
          return H(e), t
        },
        R = function() {
          return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent))
        },
        D = function() {
          return ("msWriteProfilerMark" in window) + ("msLaunchUri" in navigator) + ("msSaveBlob" in navigator) >= 2
        },
        I = function() {
          return void 0 !== window.swfobject
        },
        F = function() {
          return window.swfobject.hasFlashPlayerVersion("9.0.0")
        },
        N = function(e, t) {
          var n = "___fp_swf_loaded";
          window[n] = function(t) {
            e(t)
          };
          var r = t.fonts.swfContainerId;
          ! function(e) {
            var t = document.createElement("div");
            t.setAttribute("id", e.fonts.swfContainerId), document.body.appendChild(t)
          }();
          var i = {
            onReady: n
          };
          window.swfobject.embedSWF(t.fonts.swfPath, r, "1", "1", "9.0.0", !1, i, {
            allowScriptAccess: "always",
            menu: "false"
          }, {})
        },
        U = function() {
          var e = document.createElement("canvas"),
            t = null;
          try {
            t = e.getContext("webgl") || e.getContext("experimental-webgl")
          } catch (e) {}
          return t || (t = null), t
        },
        H = function(e) {
          var t = e.getExtension("WEBGL_lose_context");
          null != t && t.loseContext()
        },
        j = [{
          key: "userAgent",
          getData: function(e) {
            e(navigator.userAgent)
          }
        }, {
          key: "webdriver",
          getData: function(e, t) {
            e(null == navigator.webdriver ? t.NOT_AVAILABLE : navigator.webdriver)
          }
        }, {
          key: "language",
          getData: function(e, t) {
            e(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || t.NOT_AVAILABLE)
          }
        }, {
          key: "colorDepth",
          getData: function(e, t) {
            e(window.screen.colorDepth || t.NOT_AVAILABLE)
          }
        }, {
          key: "deviceMemory",
          getData: function(e, t) {
            e(navigator.deviceMemory || t.NOT_AVAILABLE)
          }
        }, {
          key: "pixelRatio",
          getData: function(e, t) {
            e(window.devicePixelRatio || t.NOT_AVAILABLE)
          }
        }, {
          key: "hardwareConcurrency",
          getData: function(e, t) {
            e(y(t))
          }
        }, {
          key: "screenResolution",
          getData: function(e, t) {
            e(f(t))
          }
        }, {
          key: "availableScreenResolution",
          getData: function(e, t) {
            e(d(t))
          }
        }, {
          key: "timezoneOffset",
          getData: function(e) {
            e((new Date).getTimezoneOffset())
          }
        }, {
          key: "timezone",
          getData: function(e, t) {
            window.Intl && window.Intl.DateTimeFormat ? e((new window.Intl.DateTimeFormat).resolvedOptions().timeZone || t.NOT_AVAILABLE) : e(t.NOT_AVAILABLE)
          }
        }, {
          key: "sessionStorage",
          getData: function(e, t) {
            e(b(t))
          }
        }, {
          key: "localStorage",
          getData: function(e, t) {
            e(w(t))
          }
        }, {
          key: "indexedDb",
          getData: function(e, t) {
            e(v(t))
          }
        }, {
          key: "addBehavior",
          getData: function(e) {
            e(!!window.HTMLElement.prototype.addBehavior)
          }
        }, {
          key: "openDatabase",
          getData: function(e) {
            e(!!window.openDatabase)
          }
        }, {
          key: "cpuClass",
          getData: function(e, t) {
            e(m(t))
          }
        }, {
          key: "platform",
          getData: function(e, t) {
            e(T(t))
          }
        }, {
          key: "doNotTrack",
          getData: function(e, t) {
            e(A(t))
          }
        }, {
          key: "plugins",
          getData: function(e, t) {
            R() ? t.plugins.excludeIE ? e(t.EXCLUDED) : e(p(t)) : e(h(t))
          }
        }, {
          key: "canvas",
          getData: function(e, t) {
            P() ? e(E(t)) : e(t.NOT_AVAILABLE)
          }
        }, {
          key: "webgl",
          getData: function(e, t) {
            M() ? e(x()) : e(t.NOT_AVAILABLE)
          }
        }, {
          key: "webglVendorAndRenderer",
          getData: function(e) {
            M() ? e(_()) : e()
          }
        }, {
          key: "adBlock",
          getData: function(e) {
            e(C())
          }
        }, {
          key: "hasLiedLanguages",
          getData: function(e) {
            e(k())
          }
        }, {
          key: "hasLiedResolution",
          getData: function(e) {
            e(O())
          }
        }, {
          key: "hasLiedOs",
          getData: function(e) {
            e(L())
          }
        }, {
          key: "hasLiedBrowser",
          getData: function(e) {
            e(B())
          }
        }, {
          key: "touchSupport",
          getData: function(e) {
            e(S())
          }
        }, {
          key: "fonts",
          getData: function(e, t) {
            var n = ["monospace", "sans-serif", "serif"],
              r = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];
            if (t.fonts.extendedJsFonts) {
              r = r.concat(["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"])
            }
            r = (r = r.concat(t.fonts.userDefinedFonts)).filter((function(e, t) {
              return r.indexOf(e) === t
            }));
            var i = document.getElementsByTagName("body")[0],
              o = document.createElement("div"),
              a = document.createElement("div"),
              s = {},
              u = {},
              l = function() {
                var e = document.createElement("span");
                return e.style.position = "absolute", e.style.left = "-9999px", e.style.fontSize = "72px", e.style.fontStyle = "normal", e.style.fontWeight = "normal", e.style.letterSpacing = "normal", e.style.lineBreak = "auto", e.style.lineHeight = "normal", e.style.textTransform = "none", e.style.textAlign = "left", e.style.textDecoration = "none", e.style.textShadow = "none", e.style.whiteSpace = "normal", e.style.wordBreak = "normal", e.style.wordSpacing = "normal", e.innerHTML = "mmmmmmmmmmlli", e
              },
              c = function(e, t) {
                var n = l();
                return n.style.fontFamily = "'" + e + "'," + t, n
              },
              f = function(e) {
                for (var t = !1, r = 0; r < n.length; r++)
                  if (t = e[r].offsetWidth !== s[n[r]] || e[r].offsetHeight !== u[n[r]]) return t;
                return t
              },
              d = function() {
                for (var e = [], t = 0, r = n.length; t < r; t++) {
                  var i = l();
                  i.style.fontFamily = n[t], o.appendChild(i), e.push(i)
                }
                return e
              }();
            i.appendChild(o);
            for (var h = 0, p = n.length; h < p; h++) s[n[h]] = d[h].offsetWidth, u[n[h]] = d[h].offsetHeight;
            var g = function() {
              for (var e = {}, t = 0, i = r.length; t < i; t++) {
                for (var o = [], s = 0, u = n.length; s < u; s++) {
                  var l = c(r[t], n[s]);
                  a.appendChild(l), o.push(l)
                }
                e[r[t]] = o
              }
              return e
            }();
            i.appendChild(a);
            for (var b = [], w = 0, v = r.length; w < v; w++) f(g[r[w]]) && b.push(r[w]);
            i.removeChild(a), i.removeChild(o), e(b)
          },
          pauseBefore: !0
        }, {
          key: "fontsFlash",
          getData: function(e, t) {
            return I() ? F() ? t.fonts.swfPath ? void N((function(t) {
              e(t)
            }), t) : e("missing options.fonts.swfPath") : e("flash not installed") : e("swf object not loaded")
          },
          pauseBefore: !0
        }, {
          key: "audio",
          getData: function(e, t) {
            var n = t.audio;
            if (n.excludeIOS11 && navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)) return e(t.EXCLUDED);
            var r = window.OfflineAudioContext || window.webkitOfflineAudioContext;
            if (null == r) return e(t.NOT_AVAILABLE);
            var i = new r(1, 44100, 44100),
              o = i.createOscillator();
            o.type = "triangle", o.frequency.setValueAtTime(1e4, i.currentTime);
            var a = i.createDynamicsCompressor();
            u([
              ["threshold", -50],
              ["knee", 40],
              ["ratio", 12],
              ["reduction", -20],
              ["attack", 0],
              ["release", .25]
            ], (function(e) {
              void 0 !== a[e[0]] && "function" == typeof a[e[0]].setValueAtTime && a[e[0]].setValueAtTime(e[1], i.currentTime)
            })), o.connect(a), a.connect(i.destination), o.start(0), i.startRendering();
            var s = setTimeout((function() {
              return console.warn('Audio fingerprint timed out. Please report bug at https://github.com/fingerprintjs/fingerprintjs with your user agent: "' + navigator.userAgent + '".'), i.oncomplete = function() {}, i = null, e("audioTimeout")
            }), n.timeout);
            i.oncomplete = function(t) {
              var n;
              try {
                clearTimeout(s), n = t.renderedBuffer.getChannelData(0).slice(4500, 5e3).reduce((function(e, t) {
                  return e + Math.abs(t)
                }), 0).toString(), o.disconnect(), a.disconnect()
              } catch (t) {
                return void e(t)
              }
              e(n)
            }
          }
        }, {
          key: "enumerateDevices",
          getData: function(e, t) {
            if (!c()) return e(t.NOT_AVAILABLE);
            navigator.mediaDevices.enumerateDevices().then((function(t) {
              e(t.map((function(e) {
                return "id=" + e.deviceId + ";gid=" + e.groupId + ";" + e.kind + ";" + e.label
              })))
            })).catch((function(t) {
              e(t)
            }))
          }
        }],
        G = function(e) {
          throw new Error("'new Fingerprint()' is deprecated, see https://github.com/fingerprintjs/fingerprintjs#upgrade-guide-from-182-to-200")
        };
      return G.get = function(e, t) {
        t ? e || (e = {}) : (t = e, e = {}),
          function(e, t) {
            if (null == t) return e;
            var n, r;
            for (r in t) null == (n = t[r]) || Object.prototype.hasOwnProperty.call(e, r) || (e[r] = n)
          }(e, s), e.components = e.extraComponents.concat(j);
        var n = {
            data: [],
            addPreprocessedComponent: function(t, r) {
              "function" == typeof e.preprocessor && (r = e.preprocessor(t, r)), n.data.push({
                key: t,
                value: r
              })
            }
          },
          r = -1,
          i = function(o) {
            if ((r += 1) >= e.components.length) t(n.data);
            else {
              var a = e.components[r];
              if (e.excludes[a.key]) i(!1);
              else {
                if (!o && a.pauseBefore) return r -= 1, void setTimeout((function() {
                  i(!0)
                }), 1);
                try {
                  a.getData((function(e) {
                    n.addPreprocessedComponent(a.key, e), i(!1)
                  }), e)
                } catch (e) {
                  n.addPreprocessedComponent(a.key, String(e)), i(!1)
                }
              }
            }
          };
        i(!1)
      }, G.getPromise = function(e) {
        return new Promise((function(t, n) {
          G.get(e, t)
        }))
      }, G.getV18 = function(e, t) {
        return null == t && (t = e, e = {}), G.get(e, (function(n) {
          for (var r = [], i = 0; i < n.length; i++) {
            var o = n[i];
            if (o.value === (e.NOT_AVAILABLE || "not available")) r.push({
              key: o.key,
              value: "unknown"
            });
            else if ("plugins" === o.key) r.push({
              key: "plugins",
              value: l(o.value, (function(e) {
                var t = l(e[2], (function(e) {
                  return e.join ? e.join("~") : e
                })).join(",");
                return [e[0], e[1], t].join("::")
              }))
            });
            else if (-1 !== ["canvas", "webgl"].indexOf(o.key) && Array.isArray(o.value)) r.push({
              key: o.key,
              value: o.value.join("~")
            });
            else if (-1 !== ["sessionStorage", "localStorage", "indexedDb", "addBehavior", "openDatabase"].indexOf(o.key)) {
              if (!o.value) continue;
              r.push({
                key: o.key,
                value: 1
              })
            } else o.value ? r.push(o.value.join ? {
              key: o.key,
              value: o.value.join(";")
            } : o) : r.push({
              key: o.key,
              value: o.value
            })
          }
          var s = a(l(r, (function(e) {
            return e.value
          })).join("~~~"), 31);
          t(s, r)
        }))
      }, G.x64hash128 = a, G.VERSION = "2.1.4", G
    }))
  }, function(e, t) {
    (function(t) {
      e.exports = t
    }).call(this, {})
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.session = void 0;
    var r = n(0),
      i = new(function() {
        function e() {
          this.key = "bi_tracks_sid"
        }
        return e.prototype.getId = function() {
          var e = sessionStorage.getItem(this.key);
          return e || (e = r.Utils.SHA256(r.Utils.nanoid()), sessionStorage.setItem(this.key, e)), e
        }, e
      }());
    t.session = i
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.BusinessFactory = void 0;
    var r = n(16),
      i = function() {
        function e() {
          this.type = null, this.entity_id = null
        }
        return e.prototype.init = function(t) {
          this.loadState(), t.enrich(e.slug, this.getLabel())
        }, e.prototype.getLabelConfig = function() {
          return {
            label: this.getLabel(),
            name: e.slug,
            isRequired: !1,
            isReady: !0
          }
        }, e.prototype.getLabel = function() {
          return {
            type: this.type,
            entity_id: this.entity_id
          }
        }, e.prototype.updateLabel = function(t) {
          try {
            null === t ? sessionStorage.removeItem("bi_tracks_" + e.slug) : sessionStorage.setItem("bi_tracks_" + e.slug, JSON.stringify(t))
          } catch (e) {}
          this.loadState()
        }, e.prototype.loadState = function() {
          try {
            var t = sessionStorage.getItem("bi_tracks_" + e.slug) || null;
            if (null !== t) {
              var n = JSON.parse(t),
                i = n.type,
                o = n.entity_id;
              i !== r.BusinessTypes.salon && i !== r.BusinessTypes.group || (this.type = i), this.entity_id = o
            } else Object.assign(this, (new e).getLabel())
          } catch (e) {}
        }, e.slug = "business", e
      }();
    t.BusinessFactory = i
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.BusinessTypes = void 0, t.BusinessTypes = {
      group: "group",
      salon: "salon"
    }
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || function() {
        return (r = Object.assign || function(e) {
          for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e
        }).apply(this, arguments)
      },
      i = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      o = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.PageFactory = void 0;
    var a = n(0),
      s = function() {
        function e() {
          this.label = {
            name: "",
            referrer: {
              name: ""
            },
            object: {
              name: "",
              type: ""
            },
            view: {
              id: "",
              referrer: {
                id: ""
              }
            }
          }, this.isReady = !1, this.referrerName = null, this.refererViewId = null
        }
        return e.prototype.init = function(t) {
          return i(this, void 0, void 0, (function() {
            return o(this, (function(n) {
              return t.enrich(e.slug, this.label), [2]
            }))
          }))
        }, e.prototype.getLabelConfig = function() {
          return {
            label: this.label,
            name: e.slug,
            isRequired: !0,
            isReady: this.isReady
          }
        }, e.prototype.getLabel = function() {
          return this.label
        }, e.prototype.updateLabel = function(e) {
          this.enrichPage(e), this.updateReferrer(), this.isReady = !0
        }, e.prototype.updateReferrer = function() {
          this.refererViewId = this.label.view.id, this.referrerName = this.label.name
        }, e.prototype.enrichPage = function(e) {
          this.label = r(r(r(r({}, this.label), {
            object: {
              name: "",
              type: ""
            }
          }), e), {
            referrer: {
              name: this.referrerName || ""
            },
            view: {
              id: a.Utils.nanoid(),
              referrer: {
                id: this.refererViewId || ""
              }
            }
          })
        }, e.slug = "page", e
      }();
    t.PageFactory = s
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      i = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.TransportFactory = void 0;
    var o = function() {
      function e() {
        this.label = {
          retry: 0,
          latency: 0
        }, this.isReady = !0
      }
      return e.prototype.init = function(t) {
        return r(this, void 0, void 0, (function() {
          return i(this, (function(n) {
            return t.enrich(e.name, this.label), [2]
          }))
        }))
      }, e.prototype.getLabel = function() {
        return this.label
      }, e.prototype.getLabelConfig = function() {
        return {
          label: this.label,
          name: e.slug,
          isRequired: !0,
          isReady: this.isReady
        }
      }, e.prototype.updateLabel = function(e) {
        this.label = e
      }, e.slug = "transport", e
    }();
    t.TransportFactory = o
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      i = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.UserFactory = void 0;
    var o = function() {
      function e() {
        this.label = {
          id: "",
          type: ""
        }, this.isReady = !0
      }
      return e.prototype.init = function(t) {
        return r(this, void 0, void 0, (function() {
          return i(this, (function(n) {
            return t.enrich(e.slug, this.label), [2]
          }))
        }))
      }, e.prototype.getLabel = function() {
        return this.label
      }, e.prototype.getLabelConfig = function() {
        return {
          label: this.label,
          name: e.slug,
          isRequired: !0,
          isReady: this.isReady
        }
      }, e.prototype.updateLabel = function(e) {
        var t = e.id.toString();
        this.label = {
          id: t,
          type: e.type
        }
      }, e.slug = "user", e
    }();
    t.UserFactory = o
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      i = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.UtmFactory = void 0;
    var o = function() {
      function e() {
        this.label = {
          content: "",
          medium: "",
          source: "",
          term: ""
        }, this.isReady = !0
      }
      return e.prototype.init = function(t) {
        return r(this, void 0, void 0, (function() {
          return i(this, (function(n) {
            return t.enrich(e.slug, this.label), [2]
          }))
        }))
      }, e.prototype.getLabel = function() {
        return this.label
      }, e.prototype.getLabelConfig = function() {
        return {
          label: this.label,
          name: e.slug,
          isRequired: !0,
          isReady: this.isReady
        }
      }, e.prototype.updateLabel = function(e) {
        this.label = e
      }, e.slug = "utm", e
    }();
    t.UtmFactory = o
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      i = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.webVitalsFactory = t.WebVitalsFactory = void 0;
    var o = n(1),
      a = function() {
        function e() {
          this.label = {
            ttfb: null,
            fcp: null,
            lcp: null,
            fid: null,
            cls: null
          }, this.isReady = !0
        }
        return e.prototype.init = function(t) {
          return r(this, void 0, void 0, (function() {
            return i(this, (function(n) {
              return t.enrich(e.slug, this.label), [2]
            }))
          }))
        }, e.prototype.getLabel = function() {
          return this.label
        }, e.prototype.getLabelConfig = function() {
          return {
            label: this.label,
            name: e.slug,
            isRequired: !0,
            isReady: this.isReady
          }
        }, e.prototype.updateLabel = function(e) {
          this.label = e
        }, e.prototype.handleEvent = function(e) {
          var t = this.getLabel();
          t[e.name.toLowerCase()] = Number(e.value.toFixed(2)), this.updateLabel(t), o.logger.log(o.LogLevels.Debug, "Web vitals event: " + e.name + " => " + e.value)
        }, e.slug = "web_vitals", e
      }();
    t.WebVitalsFactory = a, t.webVitalsFactory = new a
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__rest || function(e, t) {
      var n = {};
      for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
      if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
      }
      return n
    };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.Track = t.Action = void 0, t.Action = {
      pageView: "page_view",
      view: "view",
      partView: "part_view",
      delete: "delete",
      hide: "hide",
      open: "open",
      add: "add",
      select: "select",
      unselect: "unselect",
      click: "click"
    };
    var i = function() {
      function e(e) {
        this.context = e
      }
      return e.prototype.getData = function() {
        var e = this.context,
          t = e.type,
          n = e.name,
          i = r(e, ["type", "name"]);
        return {
          type: t,
          name: n || "",
          date: {
            track: (new Date).toISOString()
          },
          context: i
        }
      }, e
    }();
    t.Track = i
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || function() {
        return (r = Object.assign || function(e) {
          for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e
        }).apply(this, arguments)
      },
      i = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      o = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.TrackManager = void 0;
    var a = n(24),
      s = n(27),
      u = n(6),
      l = n(29),
      c = n(7),
      f = n(1),
      d = n(30),
      h = function() {
        function e(e) {
          var t = this;
          this.defaultLabelFactories = e, this.ready = !1, this.transportStrategy = new s.TransportStrategy, this.storage = new d.TrackStore("bi_tracks"), this.defaultLabelCollection = new l.LabelCollection, this.customLabelCollection = new l.LabelCollection, this.flattenLabels = [c.VirtualDeviceFactory.slug, u.IdentifyFactory.slug], this.onComplete = function(e) {
            return i(t, void 0, void 0, (function() {
              return o(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return f.logger.log(f.LogLevels.Debug, "data from server", e), [4, this.storage.remove(e)];
                  case 1:
                    return t.sent(), [2, e]
                }
              }))
            }))
          };
          var n = [];
          e.forEach((function(e) {
            t.defaultLabelCollection.add(e.getLabelConfig()), n.push(e.init(t.defaultLabelCollection))
          })), a.Promise.all(n).then((function() {
            t.ready = !0, t.storage.get().forEach((function(e) {
              t.send(e)
            }))
          }))
        }
        return e.prototype.addDefaultLabel = function(e) {
          var t = this.defaultLabelFactories.find((function(t) {
            return t.getLabelConfig().name === e.name
          }));
          if (t) {
            t.updateLabel(e.label);
            var n = t.getLabelConfig();
            this.defaultLabelCollection.add(n)
          } else this.defaultLabelCollection.add(e)
        }, e.prototype.addLabel = function(e) {
          var t = this;
          Object.keys(e).forEach((function(n) {
            var r = {
              name: n,
              label: e[n]
            };
            t.customLabelCollection.add(r)
          }))
        }, e.prototype.mergeLabels = function(e) {
          return e = this.mergeDefaultLabels(e), e = this.mergeCustomLabels(e)
        }, e.prototype.mergeDefaultLabels = function(e) {
          for (var t = this, n = function(n) {
            var o, a = i.flattenLabels.find((function(e) {
              return e === t.defaultLabelCollection.labelConfigs[n].name
            }));
            e = r(r({}, e), a ? i.defaultLabelCollection.labelConfigs[n].label : ((o = {})[i.defaultLabelCollection.labelConfigs[n].name] = r({}, i.defaultLabelCollection.labelConfigs[n].label), o))
          }, i = this, o = 0; o < this.defaultLabelCollection.labelConfigs.length; o++) n(o);
          return e
        }, e.prototype.mergeCustomLabels = function(e) {
          for (var t, n = this.customLabelCollection.labelConfigs, i = 0; i < n.length; i++) e = r(r({}, e), {
            context: r(r({}, e.context), (t = {}, t[n[i].name] = r({}, n[i].label), t))
          });
          return e
        }, e.prototype.send = function(e) {
          this.ready ? (e = this.mergeLabels(e), this.transportStrategy.send([e], this.onComplete), f.logger.log(f.LogLevels.Debug, "sent event:", e)) : this.storage.add(e)
        }, e
      }();
    t.TrackManager = h
  }, function(e, t, n) {
    (function(t, n) {
      var r;
      r = function() {
        "use strict";

        function e(e) {
          return "function" == typeof e
        }
        var r = Array.isArray ? Array.isArray : function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
          },
          i = 0,
          o = void 0,
          a = void 0,
          s = function(e, t) {
            p[i] = e, p[i + 1] = t, 2 === (i += 2) && (a ? a(g) : m())
          },
          u = "undefined" != typeof window ? window : void 0,
          l = u || {},
          c = l.MutationObserver || l.WebKitMutationObserver,
          f = "undefined" == typeof self && void 0 !== t && "[object process]" === {}.toString.call(t),
          d = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

        function h() {
          var e = setTimeout;
          return function() {
            return e(g, 1)
          }
        }
        var p = new Array(1e3);

        function g() {
          for (var e = 0; e < i; e += 2)(0, p[e])(p[e + 1]), p[e] = void 0, p[e + 1] = void 0;
          i = 0
        }
        var b, w, v, y, m = void 0;

        function T(e, t) {
          var n = this,
            r = new this.constructor(E);
          void 0 === r[S] && D(r);
          var i = n._state;
          if (i) {
            var o = arguments[i - 1];
            s((function() {
              return M(i, r, o, n._result)
            }))
          } else B(n, r, e, t);
          return r
        }

        function A(e) {
          if (e && "object" == typeof e && e.constructor === this) return e;
          var t = new this(E);
          return C(t, e), t
        }
        f ? m = function() {
          return t.nextTick(g)
        } : c ? (w = 0, v = new c(g), y = document.createTextNode(""), v.observe(y, {
          characterData: !0
        }), m = function() {
          y.data = w = ++w % 2
        }) : d ? ((b = new MessageChannel).port1.onmessage = g, m = function() {
          return b.port2.postMessage(0)
        }) : m = void 0 === u ? function() {
          try {
            var e = Function("return this")().require("vertx");
            return void 0 !== (o = e.runOnLoop || e.runOnContext) ? function() {
              o(g)
            } : h()
          } catch (e) {
            return h()
          }
        }() : h();
        var S = Math.random().toString(36).substring(2);

        function E() {}
        var x = void 0;

        function _(t, n, r) {
          n.constructor === t.constructor && r === T && n.constructor.resolve === A ? function(e, t) {
            1 === t._state ? O(e, t._result) : 2 === t._state ? L(e, t._result) : B(t, void 0, (function(t) {
              return C(e, t)
            }), (function(t) {
              return L(e, t)
            }))
          }(t, n) : void 0 === r ? O(t, n) : e(r) ? function(e, t, n) {
            s((function(e) {
              var r = !1,
                i = function(e, t, n, r) {
                  try {
                    e.call(t, n, r)
                  } catch (e) {
                    return e
                  }
                }(n, t, (function(n) {
                  r || (r = !0, t !== n ? C(e, n) : O(e, n))
                }), (function(t) {
                  r || (r = !0, L(e, t))
                }), e._label);
              !r && i && (r = !0, L(e, i))
            }), e)
          }(t, n, r) : O(t, n)
        }

        function C(e, t) {
          if (e === t) L(e, new TypeError("You cannot resolve a promise with itself"));
          else if (i = typeof(r = t), null === r || "object" !== i && "function" !== i) O(e, t);
          else {
            var n = void 0;
            try {
              n = t.then
            } catch (t) {
              return void L(e, t)
            }
            _(e, t, n)
          }
          var r, i
        }

        function k(e) {
          e._onerror && e._onerror(e._result), P(e)
        }

        function O(e, t) {
          e._state === x && (e._result = t, e._state = 1, 0 !== e._subscribers.length && s(P, e))
        }

        function L(e, t) {
          e._state === x && (e._state = 2, e._result = t, s(k, e))
        }

        function B(e, t, n, r) {
          var i = e._subscribers,
            o = i.length;
          e._onerror = null, i[o] = t, i[o + 1] = n, i[o + 2] = r, 0 === o && e._state && s(P, e)
        }

        function P(e) {
          var t = e._subscribers,
            n = e._state;
          if (0 !== t.length) {
            for (var r = void 0, i = void 0, o = e._result, a = 0; a < t.length; a += 3) r = t[a], i = t[a + n], r ? M(n, r, i, o) : i(o);
            e._subscribers.length = 0
          }
        }

        function M(t, n, r, i) {
          var o = e(r),
            a = void 0,
            s = void 0,
            u = !0;
          if (o) {
            try {
              a = r(i)
            } catch (e) {
              u = !1, s = e
            }
            if (n === a) return void L(n, new TypeError("A promises callback cannot return that same promise."))
          } else a = i;
          n._state !== x || (o && u ? C(n, a) : !1 === u ? L(n, s) : 1 === t ? O(n, a) : 2 === t && L(n, a))
        }
        var R = 0;

        function D(e) {
          e[S] = R++, e._state = void 0, e._result = void 0, e._subscribers = []
        }
        var I = function() {
            function e(e, t) {
              this._instanceConstructor = e, this.promise = new e(E), this.promise[S] || D(this.promise), r(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? O(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), 0 === this._remaining && O(this.promise, this._result))) : L(this.promise, new Error("Array Methods must be provided an Array"))
            }
            return e.prototype._enumerate = function(e) {
              for (var t = 0; this._state === x && t < e.length; t++) this._eachEntry(e[t], t)
            }, e.prototype._eachEntry = function(e, t) {
              var n = this._instanceConstructor,
                r = n.resolve;
              if (r === A) {
                var i = void 0,
                  o = void 0,
                  a = !1;
                try {
                  i = e.then
                } catch (e) {
                  a = !0, o = e
                }
                if (i === T && e._state !== x) this._settledAt(e._state, t, e._result);
                else if ("function" != typeof i) this._remaining--, this._result[t] = e;
                else if (n === F) {
                  var s = new n(E);
                  a ? L(s, o) : _(s, e, i), this._willSettleAt(s, t)
                } else this._willSettleAt(new n((function(t) {
                  return t(e)
                })), t)
              } else this._willSettleAt(r(e), t)
            }, e.prototype._settledAt = function(e, t, n) {
              var r = this.promise;
              r._state === x && (this._remaining--, 2 === e ? L(r, n) : this._result[t] = n), 0 === this._remaining && O(r, this._result)
            }, e.prototype._willSettleAt = function(e, t) {
              var n = this;
              B(e, void 0, (function(e) {
                return n._settledAt(1, t, e)
              }), (function(e) {
                return n._settledAt(2, t, e)
              }))
            }, e
          }(),
          F = function() {
            function t(e) {
              this[S] = R++, this._result = this._state = void 0, this._subscribers = [], E !== e && ("function" != typeof e && function() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
              }(), this instanceof t ? function(e, t) {
                try {
                  t((function(t) {
                    C(e, t)
                  }), (function(t) {
                    L(e, t)
                  }))
                } catch (t) {
                  L(e, t)
                }
              }(this, e) : function() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
              }())
            }
            return t.prototype.catch = function(e) {
              return this.then(null, e)
            }, t.prototype.finally = function(t) {
              var n = this,
                r = n.constructor;
              return e(t) ? n.then((function(e) {
                return r.resolve(t()).then((function() {
                  return e
                }))
              }), (function(e) {
                return r.resolve(t()).then((function() {
                  throw e
                }))
              })) : n.then(t, t)
            }, t
          }();
        return F.prototype.then = T, F.all = function(e) {
          return new I(this, e).promise
        }, F.race = function(e) {
          var t = this;
          return r(e) ? new t((function(n, r) {
            for (var i = e.length, o = 0; o < i; o++) t.resolve(e[o]).then(n, r)
          })) : new t((function(e, t) {
            return t(new TypeError("You must pass an array to race."))
          }))
        }, F.resolve = A, F.reject = function(e) {
          var t = new this(E);
          return L(t, e), t
        }, F._setScheduler = function(e) {
          a = e
        }, F._setAsap = function(e) {
          s = e
        }, F._asap = s, F.polyfill = function() {
          var e = void 0;
          if (void 0 !== n) e = n;
          else if ("undefined" != typeof self) e = self;
          else try {
              e = Function("return this")()
            } catch (e) {
              throw new Error("polyfill failed because global object is unavailable in this environment")
            }
          var t = e.Promise;
          if (t) {
            var r = null;
            try {
              r = Object.prototype.toString.call(t.resolve())
            } catch (e) {}
            if ("[object Promise]" === r && !t.cast) return
          }
          e.Promise = F
        }, F.Promise = F, F
      }, e.exports = r()
    }).call(this, n(25), n(26))
  }, function(e, t) {
    var n, r, i = e.exports = {};

    function o() {
      throw new Error("setTimeout has not been defined")
    }

    function a() {
      throw new Error("clearTimeout has not been defined")
    }

    function s(e) {
      if (n === setTimeout) return setTimeout(e, 0);
      if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
      try {
        return n(e, 0)
      } catch (t) {
        try {
          return n.call(null, e, 0)
        } catch (t) {
          return n.call(this, e, 0)
        }
      }
    }! function() {
      try {
        n = "function" == typeof setTimeout ? setTimeout : o
      } catch (e) {
        n = o
      }
      try {
        r = "function" == typeof clearTimeout ? clearTimeout : a
      } catch (e) {
        r = a
      }
    }();
    var u, l = [],
      c = !1,
      f = -1;

    function d() {
      c && u && (c = !1, u.length ? l = u.concat(l) : f = -1, l.length && h())
    }

    function h() {
      if (!c) {
        var e = s(d);
        c = !0;
        for (var t = l.length; t;) {
          for (u = l, l = []; ++f < t;) u && u[f].run();
          f = -1, t = l.length
        }
        u = null, c = !1,
          function(e) {
            if (r === clearTimeout) return clearTimeout(e);
            if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
            try {
              r(e)
            } catch (t) {
              try {
                return r.call(null, e)
              } catch (t) {
                return r.call(this, e)
              }
            }
          }(e)
      }
    }

    function p(e, t) {
      this.fun = e, this.array = t
    }

    function g() {}
    i.nextTick = function(e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      l.push(new p(e, t)), 1 !== l.length || c || s(h)
    }, p.prototype.run = function() {
      this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = g, i.addListener = g, i.once = g, i.off = g, i.removeListener = g, i.removeAllListeners = g, i.emit = g, i.prependListener = g, i.prependOnceListener = g, i.listeners = function(e) {
      return []
    }, i.binding = function(e) {
      throw new Error("process.binding is not supported")
    }, i.cwd = function() {
      return "/"
    }, i.chdir = function(e) {
      throw new Error("process.chdir is not supported")
    }, i.umask = function() {
      return 0
    }
  }, function(e, t) {
    var n;
    n = function() {
      return this
    }();
    try {
      n = n || new Function("return this")()
    } catch (e) {
      "object" == typeof window && (n = window)
    }
    e.exports = n
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || function() {
      return (r = Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e
      }).apply(this, arguments)
    };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.TransportStrategy = void 0;
    var i = n(1),
      o = new(n(28).Http),
      a = [],
      s = function() {
        function e() {}
        return Object.defineProperty(e.prototype, "transport", {
          get: function() {
            return e.getAvailableTransport() || o
          },
          enumerable: !1,
          configurable: !0
        }), e.prototype.send = function(t, n) {
          var r = this;
          e.separateEvents(t).forEach((function(e) {
            i.logger.log(i.LogLevels.Debug, "events chunk sent", e), r.transport.send(r.addSendDate(e), n)
          }))
        }, e.getAvailableTransport = function() {
          for (var e = 0; e < a.length; e++)
            if (a[e].isAvailable) return a[e];
          return null
        }, e.separateEvents = function(e) {
          for (var t = Array(Math.ceil(e.length / 20)).fill(null).map((function(e) {
            return []
          })), n = 0; n < e.length; n++) t[Math.floor(n / 20)].push(e[n]);
          return t
        }, e.prototype.addSendDate = function(e) {
          var t = (new Date).toISOString();
          return e.map((function(e) {
            return r(r({}, e), {
              date: r(r({}, e.date), {
                send: t
              })
            })
          }))
        }, e
      }();
    t.TransportStrategy = s
  }, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || function() {
      return (r = Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e
      }).apply(this, arguments)
    };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.Http = void 0;
    var i = n(4),
      o = n(2),
      a = n(1),
      s = function() {
        function e() {
          this.lastEvents = []
        }
        return e.prototype.getMeasurementHeaders = function() {
          var e = {};
          return o.fingerprint.time > 0 && (e["x-sdk-fingerprint-time"] = o.fingerprint.time), e
        }, e.prototype.send = function(e, t) {
          "fetch" in window ? this.fetch(e, t) : this.xhr(e, t)
        }, e.prototype.xhr = function(e, t) {
          a.logger.log(a.LogLevels.Debug, "sending by XHR");
          var n = new("onload" in new XMLHttpRequest ? XMLHttpRequest : XDomainRequest);
          n.open("POST", i.configManager.config.httpUrl + "/track"), n.setRequestHeader("content-type", "application/json");
          var r = this.getMeasurementHeaders();
          Object.keys(r).forEach((function(e) {
            n.setRequestHeader(e, r[e])
          })), n.ontimeout = 1e4;
          var o = JSON.stringify(e);
          n.send(o), n.onloadend = function() {
            t(JSON.parse(n.responseText))
          }, n.onerror = function() {
            a.logger.log(a.LogLevels.Error, "error sending events by XHR")
          }, n.ontimeout = function() {
            n.abort(), a.logger.log(a.LogLevels.Error, "XHR timeout")
          }, n.onabort = function() {
            a.logger.log(a.LogLevels.Error, "XHR aborted")
          }
        }, e.prototype.fetch = function(e, t) {
          var n = this.getMeasurementHeaders();
          window.fetch(i.configManager.config.httpUrl + "/track", {
            method: "POST",
            headers: r({
              "content-type": "application/json"
            }, n),
            body: JSON.stringify(e)
          }).then((function(e) {})).then(t).catch((function(e) {
            return a.logger.log(a.LogLevels.Error, "error sending data", e)
          }))
        }, Object.defineProperty(e.prototype, "isAvailable", {
          get: function() {
            return !this.httpLimitReach()
          },
          enumerable: !1,
          configurable: !0
        }), e.prototype.httpLimitReach = function() {
          var e = Date.now();
          return this.lastEvents.push(e), this.lastEvents = this.lastEvents.filter((function(t) {
            return e - t <= 6e4
          })), this.lastEvents.length >= 10
        }, e
      }();
    t.Http = s
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.LabelCollection = void 0;
    var r = function() {
      function e() {
        this.collection = [], this.onReadyCallback = null
      }
      return e.prototype.enrich = function(e, t) {
        this.collection = this.collection.map((function(n) {
          return n.name === e && (n.label = t, n.isReady = !0), n
        }))
      }, e.prototype.add = function(e) {
        this.collection.find((function(t) {
          return t.name === e.name
        })) ? this.collection = this.collection.map((function(t) {
          return t.name === e.name ? e : t
        })) : this.collection.push(e)
      }, Object.defineProperty(e.prototype, "requiredLabelsIsReady", {
        get: function() {
          for (var e = 0; e < this.collection.length; e++)
            if (this.collection[e].isRequired && !this.collection[e].isReady) return !1;
          return !0
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(e.prototype, "labelConfigs", {
        get: function() {
          return this.collection
        },
        enumerable: !1,
        configurable: !0
      }), e
    }();
    t.LabelCollection = r
  }, function(e, t, n) {
    "use strict";
    var r, i = this && this.__extends || (r = function(e, t) {
        return (r = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function(e, t) {
            e.__proto__ = t
          } || function(e, t) {
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
          })(e, t)
      }, function(e, t) {
        function n() {
          this.constructor = e
        }
        r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
      }),
      o = this && this.__awaiter || function(e, t, n, r) {
        return new(n || (n = Promise))((function(i, o) {
          function a(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }

          function s(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function u(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
              e(t)
            }))).then(a, s)
          }
          u((r = r.apply(e, t || [])).next())
        }))
      },
      a = this && this.__generator || function(e, t) {
        var n, r, i, o, a = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: s(0),
          throw: s(1),
          return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this
        }), o;

        function s(o) {
          return function(s) {
            return function(o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, r = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                      a.label = i[1], i = o;
                      break
                    }
                    if (i && a.label < i[2]) {
                      a.label = i[2], a.ops.push(o);
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], r = 0
              } finally {
                n = i = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.TrackStore = void 0;
    var s = function(e) {
      function t(t) {
        void 0 === t && (t = "");
        var n = e.call(this) || this;
        return n.namespace = t, n.enabled = Boolean(window.sessionStorage), n.queue = [], n.queue = n.load(), n
      }
      return i(t, e), t.prototype.add = function(e) {
        return o(this, void 0, void 0, (function() {
          var t;
          return a(this, (function(n) {
            return e instanceof Array ? (t = this.queue).push.apply(t, e) : this.queue.push(e), this.flush(), [2]
          }))
        }))
      }, t.prototype.remove = function(e) {
        return o(this, void 0, void 0, (function() {
          var t, n;
          return a(this, (function(r) {
            return t = function(t) {
              return !e.includes(t.id)
            }, n = function(t) {
              return t.id !== e
            }, this.queue = this.queue.filter(e instanceof Array ? t : n), this.flush(), [2]
          }))
        }))
      }, t.prototype.load = function() {
        if (this.enabled) return JSON.parse(sessionStorage.getItem(this.namespace + "_events")) || []
      }, t.prototype.flush = function() {
        if (this.enabled) return sessionStorage.setItem(this.namespace + "_events", JSON.stringify(this.queue))
      }, t.prototype.get = function(e) {
        if (this.enabled) return e ? [this.queue.find((function(t) {
          return t.id === e
        }))] : this.queue
      }, Object.defineProperty(t.prototype, "length", {
        get: function() {
          if (this.enabled) return this.queue.length
        },
        enumerable: !1,
        configurable: !0
      }), t
    }(n(31).Store);
    t.TrackStore = s
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.Store = void 0;
    var r = function() {};
    t.Store = r
  }, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "getCLS", (function() {
      return g
    })), n.d(t, "getFCP", (function() {
      return d
    })), n.d(t, "getFID", (function() {
      return b
    })), n.d(t, "getLCP", (function() {
      return w
    })), n.d(t, "getTTFB", (function() {
      return v
    }));
    var r = function(e, t) {
        return {
          name: e,
          value: void 0 === t ? -1 : t,
          delta: 0,
          entries: [],
          id: "v2-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
        }
      },
      i = function(e, t) {
        try {
          if (PerformanceObserver.supportedEntryTypes.includes(e)) {
            if ("first-input" === e && !("PerformanceEventTiming" in self)) return;
            var n = new PerformanceObserver((function(e) {
              return e.getEntries().map(t)
            }));
            return n.observe({
              type: e,
              buffered: !0
            }), n
          }
        } catch (e) {}
      },
      o = function(e, t) {
        var n = function n(r) {
          "pagehide" !== r.type && "hidden" !== document.visibilityState || (e(r), t && (removeEventListener("visibilitychange", n, !0), removeEventListener("pagehide", n, !0)))
        };
        addEventListener("visibilitychange", n, !0), addEventListener("pagehide", n, !0)
      },
      a = function(e) {
        addEventListener("pageshow", (function(t) {
          t.persisted && e(t)
        }), !0)
      },
      s = "function" == typeof WeakSet ? new WeakSet : new Set,
      u = function(e, t, n) {
        var r;
        return function() {
          t.value >= 0 && (n || s.has(t) || "hidden" === document.visibilityState) && (t.delta = t.value - (r || 0), (t.delta || void 0 === r) && (r = t.value, e(t)))
        }
      },
      l = -1,
      c = function() {
        o((function(e) {
          var t = e.timeStamp;
          l = t
        }), !0)
      },
      f = function() {
        return l < 0 && ((l = self.webVitals.firstHiddenTime) === 1 / 0 && c(), a((function() {
          setTimeout((function() {
            l = "hidden" === document.visibilityState ? 0 : 1 / 0, c()
          }), 0)
        }))), {
          get firstHiddenTime() {
            return l
          }
        }
      },
      d = function(e, t) {
        var n, o = f(),
          l = r("FCP"),
          c = function(e) {
            "first-contentful-paint" === e.name && (h && h.disconnect(), e.startTime < o.firstHiddenTime && (l.value = e.startTime, l.entries.push(e), s.add(l), n()))
          },
          d = performance.getEntriesByName && performance.getEntriesByName("first-contentful-paint")[0],
          h = d ? null : i("paint", c);
        (d || h) && (n = u(e, l, t), d && c(d), a((function(i) {
          l = r("FCP"), n = u(e, l, t), requestAnimationFrame((function() {
            requestAnimationFrame((function() {
              l.value = performance.now() - i.timeStamp, s.add(l), n()
            }))
          }))
        })))
      },
      h = !1,
      p = -1,
      g = function(e, t) {
        h || (d((function(e) {
          p = e.value
        })), h = !0);
        var n, s = function(t) {
            p > -1 && e(t)
          },
          l = r("CLS", 0),
          c = 0,
          f = [],
          g = function(e) {
            if (!e.hadRecentInput) {
              var t = f[0],
                r = f[f.length - 1];
              c && e.startTime - r.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (c += e.value, f.push(e)) : (c = e.value, f = [e]), c > l.value && (l.value = c, l.entries = f, n())
            }
          },
          b = i("layout-shift", g);
        b && (n = u(s, l, t), o((function() {
          b.takeRecords().map(g), n()
        })), a((function() {
          c = 0, p = -1, l = r("CLS", 0), n = u(s, l, t)
        })))
      },
      b = function(e, t) {
        var n, l = f(),
          c = r("FID"),
          d = function(e) {
            e.startTime < l.firstHiddenTime && (c.value = e.processingStart - e.startTime, c.entries.push(e), s.add(c), n())
          },
          h = i("first-input", d);
        n = u(e, c, t), h && o((function() {
          h.takeRecords().map(d), h.disconnect()
        }), !0), h || window.webVitals.firstInputPolyfill(d), a((function() {
          c = r("FID"), n = u(e, c, t), window.webVitals.resetFirstInputPolyfill(), window.webVitals.firstInputPolyfill(d)
        }))
      },
      w = function(e, t) {
        var n, l = f(),
          c = r("LCP"),
          d = function(e) {
            var t = e.startTime;
            t < l.firstHiddenTime && (c.value = t, c.entries.push(e)), n()
          },
          h = i("largest-contentful-paint", d);
        if (h) {
          n = u(e, c, t);
          var p = function() {
            s.has(c) || (h.takeRecords().map(d), h.disconnect(), s.add(c), n())
          };
          ["keydown", "click"].forEach((function(e) {
            addEventListener(e, p, {
              once: !0,
              capture: !0
            })
          })), o(p, !0), a((function(i) {
            c = r("LCP"), n = u(e, c, t), requestAnimationFrame((function() {
              requestAnimationFrame((function() {
                c.value = performance.now() - i.timeStamp, s.add(c), n()
              }))
            }))
          }))
        }
      },
      v = function(e) {
        var t, n = r("TTFB");
        t = function() {
          try {
            var t = performance.getEntriesByType("navigation")[0] || function() {
              var e = performance.timing,
                t = {
                  entryType: "navigation",
                  startTime: 0
                };
              for (var n in e) "navigationStart" !== n && "toJSON" !== n && (t[n] = Math.max(e[n] - e.navigationStart, 0));
              return t
            }();
            if (n.value = n.delta = t.responseStart, n.value < 0) return;
            n.entries = [t], e(n)
          } catch (t) {}
        }, "complete" === document.readyState ? setTimeout(t, 0) : addEventListener("pageshow", t)
      }
  }, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "nanoid", (function() {
      return s
    })), n.d(t, "customAlphabet", (function() {
      return a
    })), n.d(t, "customRandom", (function() {
      return o
    })), n.d(t, "urlAlphabet", (function() {
      return r
    })), n.d(t, "random", (function() {
      return i
    }));
    let r = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
    let i = e => crypto.getRandomValues(new Uint8Array(e)),
      o = (e, t, n) => {
        let r = (2 << Math.log(e.length - 1) / Math.LN2) - 1,
          i = -~(1.6 * r * t / e.length);
        return () => {
          let o = "";
          for (;;) {
            let a = n(i),
              s = i;
            for (; s--;)
              if (o += e[a[s] & r] || "", o.length === +t) return o
          }
        }
      },
      a = (e, t) => o(e, t, i),
      s = (e = 21) => {
        let t = "",
          n = crypto.getRandomValues(new Uint8Array(e));
        for (; e--;) {
          let r = 63 & n[e];
          t += r < 36 ? r.toString(36) : r < 62 ? (r - 26).toString(36).toUpperCase() : r < 63 ? "_" : "-"
        }
        return t
      }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.Action = t.UAParser = t.version = t.track = t.setPage = t.setUtm = t.setUser = t.setBusiness = t.init = t.identify = t.getAb = t.debugMode = t.addLabel = void 0;
    var r = n(8);
    Object.defineProperty(t, "addLabel", {
      enumerable: !0,
      get: function() {
        return r.addLabel
      }
    }), Object.defineProperty(t, "debugMode", {
      enumerable: !0,
      get: function() {
        return r.debugMode
      }
    }), Object.defineProperty(t, "getAb", {
      enumerable: !0,
      get: function() {
        return r.getAb
      }
    }), Object.defineProperty(t, "identify", {
      enumerable: !0,
      get: function() {
        return r.identify
      }
    }), Object.defineProperty(t, "init", {
      enumerable: !0,
      get: function() {
        return r.init
      }
    }), Object.defineProperty(t, "setBusiness", {
      enumerable: !0,
      get: function() {
        return r.setBusiness
      }
    }), Object.defineProperty(t, "setUser", {
      enumerable: !0,
      get: function() {
        return r.setUser
      }
    }), Object.defineProperty(t, "setUtm", {
      enumerable: !0,
      get: function() {
        return r.setUtm
      }
    }), Object.defineProperty(t, "setPage", {
      enumerable: !0,
      get: function() {
        return r.setPage
      }
    }), Object.defineProperty(t, "track", {
      enumerable: !0,
      get: function() {
        return r.track
      }
    }), Object.defineProperty(t, "version", {
      enumerable: !0,
      get: function() {
        return r.version
      }
    }), Object.defineProperty(t, "UAParser", {
      enumerable: !0,
      get: function() {
        return r.UAParser
      }
    }), Object.defineProperty(t, "Action", {
      enumerable: !0,
      get: function() {
        return r.Action
      }
    }), window.analytics = {
      addLabel: r.addLabel,
      debugMode: r.debugMode,
      getAb: r.getAb,
      identify: r.identify,
      init: r.init,
      setBusiness: r.setBusiness,
      setUser: r.setUser,
      setUtm: r.setUtm,
      setPage: r.setPage,
      track: r.track,
      version: r.version,
      app: {},
      ua: new r.UAParser
    }
  }])
}));
