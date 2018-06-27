require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  LanguageData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
    "use strict";
    var Polyglot = require("polyglot.min");
    var polyInst = null;
    window.i18n || (window.i18n = {
      languages: {},
      curLang: ""
    });
    false;
    function loadLanguageData(language) {
      return window.i18n.languages[language];
    }
    function initPolyglot(data) {
      data && (polyInst ? polyInst.replace(data) : polyInst = new Polyglot({
        phrases: data,
        allowMissing: true
      }));
    }
    module.exports = {
      init: function init(language) {
        if (language === window.i18n.curLang) return;
        var data = loadLanguageData(language) || {};
        window.i18n.curLang = language;
        initPolyglot(data);
        this.inst = polyInst;
      },
      t: function t(key, opt) {
        if (polyInst) return polyInst.t(key, opt);
      },
      inst: polyInst,
      updateSceneRenderers: function updateSceneRenderers() {
        var rootNodes = cc.director.getScene().children;
        var allLocalizedLabels = [];
        for (var i = 0; i < rootNodes.length; ++i) {
          var labels = rootNodes[i].getComponentsInChildren("LocalizedLabel");
          Array.prototype.push.apply(allLocalizedLabels, labels);
        }
        for (var _i = 0; _i < allLocalizedLabels.length; ++_i) {
          var label = allLocalizedLabels[_i];
          label.updateLabel();
        }
        var allLocalizedSprites = [];
        for (var _i2 = 0; _i2 < rootNodes.length; ++_i2) {
          var sprites = rootNodes[_i2].getComponentsInChildren("LocalizedSprite");
          Array.prototype.push.apply(allLocalizedSprites, sprites);
        }
        for (var _i3 = 0; _i3 < allLocalizedSprites.length; ++_i3) {
          var sprite = allLocalizedSprites[_i3];
          sprite.updateSprite(window.i18n.curLang);
        }
      }
    };
    cc._RF.pop();
  }, {
    "polyglot.min": "polyglot.min"
  } ],
  LocalizedLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
    "use strict";
    var i18n = require("LanguageData");
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function later() {
          timeout = null;
          immediate || func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        callNow && func.apply(context, args);
      };
    }
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        menu: "i18n/LocalizedLabel"
      },
      properties: {
        dataID: {
          get: function get() {
            return this._dataID;
          },
          set: function set(val) {
            if (this._dataID !== val) {
              this._dataID = val;
              false;
              this.updateLabel();
            }
          }
        },
        _dataID: ""
      },
      onLoad: function onLoad() {
        false;
        i18n.inst || i18n.init();
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var label = this.getComponent(cc.Label);
        if (label) {
          this.label = label;
          this.updateLabel();
          return;
        }
      },
      updateLabel: function updateLabel() {
        if (!this.label) {
          cc.error("Failed to update localized label, label component is invalid!");
          return;
        }
        var localizedString = i18n.t(this.dataID);
        localizedString && (this.label.string = i18n.t(this.dataID));
      }
    });
    cc._RF.pop();
  }, {
    LanguageData: "LanguageData"
  } ],
  LocalizedSprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
    "use strict";
    var SpriteFrameSet = require("SpriteFrameSet");
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        inspector: "packages://i18n/inspector/localized-sprite.js",
        menu: "i18n/LocalizedSprite"
      },
      properties: {
        spriteFrameSet: {
          default: [],
          type: SpriteFrameSet
        }
      },
      onLoad: function onLoad() {
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var sprite = this.getComponent(cc.Sprite);
        if (sprite) {
          this.sprite = sprite;
          this.updateSprite(window.i18n.curLang);
          return;
        }
      },
      getSpriteFrameByLang: function getSpriteFrameByLang(lang) {
        for (var i = 0; i < this.spriteFrameSet.length; ++i) if (this.spriteFrameSet[i].language === lang) return this.spriteFrameSet[i].spriteFrame;
      },
      updateSprite: function updateSprite(language) {
        if (!this.sprite) {
          cc.error("Failed to update localized sprite, sprite component is invalid!");
          return;
        }
        var spriteFrame = this.getSpriteFrameByLang(language);
        !spriteFrame && this.spriteFrameSet[0] && (spriteFrame = this.spriteFrameSet[0].spriteFrame);
        this.sprite.spriteFrame = spriteFrame;
      }
    });
    cc._RF.pop();
  }, {
    SpriteFrameSet: "SpriteFrameSet"
  } ],
  SpriteFrameSet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
    "use strict";
    var SpriteFrameSet = cc.Class({
      name: "SpriteFrameSet",
      properties: {
        language: "",
        spriteFrame: cc.SpriteFrame
      }
    });
    module.exports = SpriteFrameSet;
    cc._RF.pop();
  }, {} ],
  button: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6838ab31IxNIItZuh8Iqv8/", "button");
    "use strict";
    cc.Class({
      extends: $cript,
      properties: {
        backgroundSprite: {
          displayName: "Background",
          tooltip: "按鈕背景圖片",
          type: cc.SpriteFrame,
          default: null,
          notify: function notify() {
            var contentNode = this.node.getChildByName("content");
            var maskNode = this.node.getChildByName("mask");
            if (this.backgroundSprite) {
              contentNode.getComponent(cc.Sprite).spriteFrame = this.backgroundSprite;
              maskNode.getComponent(cc.Mask).spriteFrame = this.backgroundSprite;
              this.buttonSize = cc.size(this.backgroundSprite.getRect().width, this.backgroundSprite.getRect().height);
            } else {
              contentNode.getComponent(cc.Sprite).spriteFrame = null;
              maskNode.getComponent(cc.Mask).spriteFrame = null;
              this.buttonSize = cc.size(0, 0);
            }
          },
          executeInEditMode: true
        },
        buttonSize: {
          displayName: "Size",
          tooltip: "按鈕尺寸，直接影響感應區與變色區",
          type: cc.Size,
          default: cc.size(0, 0),
          notify: function notify() {
            var notifySize = cc.size(this.buttonSize.width, this.buttonSize.height);
            var contentNode = this.node.getChildByName("content");
            contentNode.setContentSize(notifySize);
            var maskNode = this.node.getChildByName("mask");
            maskNode.setContentSize(notifySize);
            var colorNode = maskNode.getChildByName("color_area");
            colorNode.setContentSize(notifySize);
            var touchNode = this.node.getChildByName("touch_area");
            touchNode.setContentSize(notifySize);
            var disableMask = maskNode.getChildByName("disable_area");
            disableMask.setContentSize(notifySize);
          },
          executeInEditMode: true
        },
        touchZoomScale: {
          displayName: "Zoom Scale",
          tooltip: "按下的縮放效果比例",
          range: [ .1, 2, .01 ],
          default: .95
        },
        showColorNormal: {
          displayName: "Color Normal",
          tooltip: "編輯一般狀態的按鈕顏色遮罩",
          default: false
        },
        colorNormal: {
          displayName: "Color Normal",
          tooltip: "一般狀態顏色",
          default: cc.Color.WHITE,
          visible: function visible() {
            return this.showColorNormal;
          }
        },
        showColorPressed: {
          displayName: "Color Pressed",
          tooltip: "編輯按下狀態的按鈕顏色遮罩",
          default: false
        },
        colorPressed: {
          displayName: "Color Pressed",
          tooltip: "按下狀態顏色",
          default: cc.Color.WHITE,
          visible: function visible() {
            return this.showColorPressed;
          }
        },
        _colorNode: null,
        _touchNode: null,
        _disableMask: null,
        _touchCallback: []
      },
      onLoad: function onLoad() {
        this._colorNode = this.node.getChildByName("mask").getChildByName("color_area");
        this._colorNode.active = false;
        this._touchNode = this.node.getChildByName("touch_area");
        this._disableMask = this.node.getChildByName("mask").getChildByName("disable_area");
        this._disableMask.active = false;
      },
      initTouch: function initTouch() {
        var _this = this;
        this._touchNode.on(cc.Node.EventType.TOUCH_START, function(event) {
          return _this._onTouchEvent(event);
        });
        this._touchNode.on(cc.Node.EventType.TOUCH_END, function(event) {
          return _this._onTouchEvent(event);
        });
        this._touchNode.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          return _this._onTouchEvent(event);
        });
        this._touchNode.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
          return _this._onTouchEvent(event);
        });
      },
      setTouchEnable: function setTouchEnable(is_enable) {
        if (is_enable) {
          this._touchNode.resumeSystemEvents(false);
          this._disableMask.active = false;
        } else {
          this._touchNode.pauseSystemEvents(false);
          this._colorNode.active = false;
          this._disableMask.active = true;
        }
      },
      addCallback: function addCallback(event, callback) {
        this._touchCallback[event] = callback;
      },
      _onTouchEvent: function _onTouchEvent(event) {
        if (event.type.startsWith("mouse")) cc.log(event.target.name + "::" + event.type + " - {" + event._prevX + "," + event._prevY + "} to {" + event._x + "," + event._y + "}"); else if (event.type === cc.Node.EventType.TOUCH_START) {
          this.node.runAction(cc.scaleTo(.1, this.touchZoomScale));
          this.showColorPressed && this._showColor(this.colorPressed);
        } else if (event.type === cc.Node.EventType.TOUCH_END || event.type === cc.Node.EventType.TOUCH_CANCEL) {
          this.node.runAction(cc.scaleTo(.1, 1));
          this._hideColor();
        } else {
          cc.log("\n                " + event.target.name + "::" + event.type + " - {\n                " + event.touch._prevPoint.x + "," + event.touch._prevPoint.y + "} to {\n                " + event.touch._point.x + "," + event.touch._point.y + "}\n            ");
          cc.log("start point: {" + event.touch._startPoint.x + "," + event.touch._startPoint.y + "}");
        }
        this._touchCallback[event.type] && this._touchCallback[event.type](event);
      },
      _showColor: function _showColor(color) {
        this._colorNode.color = color;
        this._colorNode.active = true;
      },
      _hideColor: function _hideColor() {
        this._colorNode.active = false;
      }
    });
    cc._RF.pop();
  }, {} ],
  common_utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f65day1jv9A8LI5uVC3DW2E", "common_utils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var regularDigital = function regularDigital(num, length) {
      var len = void 0;
      cc.js.isString(length) ? len = Number(length) : cc.js.isNumber(length) || (len = 10);
      var numStr = String(num).split(".")[0];
      var regularNum = numStr.replace(/[^0-9]/g, "");
      var resultNum = "";
      for (var i = 0; i < regularNum.length; i += 3) {
        var findIndex = regularNum.substring(0, regularNum.length - i).search(/\d{3}$/);
        var lastNum = regularNum.substring(findIndex, regularNum.length - i);
        resultNum = lastNum + resultNum;
        regularNum.length - i > 3 && (resultNum = "," + resultNum);
      }
      var unitArr = [ "", "K", "M", "B", "T" ];
      var arr = numStr.match(/[KMBT]$/);
      var unit = arr && arr[0] ? arr[0] : "";
      if (regularNum.length > length && unit !== unitArr[unitArr.length - 1]) {
        unit = unitArr[unitArr.indexOf(unit) + 1];
        resultNum = resultNum.substring(0, resultNum.search(/,\d{3}$/));
        resultNum += unit;
        resultNum = regularDigital(resultNum, len);
      } else resultNum += unit;
      return resultNum;
    };
    exports.default = {
      regularDigital: regularDigital
    };
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "214ccvhy5xCRb4aM76kY56q", "game");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btnStart: {
          displayName: "Btn Start",
          toolstip: "開始按鈕",
          type: cc.Node,
          default: null
        },
        rollerPanel: {
          displayName: "Roller Panel",
          toolstip: "滾輪盤面",
          type: cc.Node,
          default: null
        },
        jackpotCounter: {
          displayName: "Jackpot Counter",
          toolstip: "彩金跑表組件",
          type: cc.Node,
          default: null
        },
        _counter: 0
      },
      start: function start() {
        var _this = this;
        var type = (false, cc.SpriteAtlas);
        cc.loader.loadResDir("symbols", type, function(completed, total, item) {
          cc.log("complete: " + completed + ", total: " + total);
        }, function(err, textures) {
          err && cc.error(err);
          _this.rollerPanel.getComponent($cript).generatePreview();
        });
        if (this.btnStart) {
          this.btnStart.getComponent($cript).initTouch();
          this.btnStart.getComponent($cript).addCallback(cc.Node.EventType.TOUCH_END, this._onStartPressed.bind(this));
        }
        if (true, this.jackpotCounter) {
          this.jackpotCounter.getComponent($cript).setConfig(1e7, 12345678900, 10);
          this.jackpotCounter.getComponent($cript).run();
        }
      },
      _onStartPressed: function _onStartPressed(event) {
        cc.log("dev::_onStartPressed - event: " + event.type);
        if (this.rollerPanel) {
          var panelController = this.rollerPanel.getComponent($cript);
          if (this._counter) {
            this._counter = 0;
            panelController.stopRolling();
          } else {
            this._counter = 1;
            panelController.startRolling();
            this.jackpotCounter.getComponent($cript).setConfig(1e7, 12345678900, 10);
            this.jackpotCounter.getComponent($cript).run();
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  jackpot: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "574a2lCzthJ8rLuxFa25UL8", "jackpot");
    "use strict";
    var _point_counter = require("../utils/point_counter");
    var _point_counter2 = _interopRequireDefault(_point_counter);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: $cript,
      properties: {
        jackpotLabel: {
          description: "Jackpot Label",
          tooltip: "彩金數值 label",
          type: cc.Label,
          default: null
        },
        baseValue: {
          description: "Base Value",
          tooltip: "彩金跑表初始值",
          type: cc.Integer,
          default: 0,
          editorOnly: true
        },
        targetValue: {
          description: "Target Value",
          tooltip: "彩金跑表目標值",
          type: cc.Integer,
          default: 0,
          editorOnly: true
        },
        limitedSeconds: {
          description: "Limited Seconds",
          tooltip: "跑表更新在多少時間內結束 (sec)",
          type: cc.Integer,
          default: 10,
          editorOnly: true
        },
        _counter: null
      },
      onLoad: function onLoad() {
        this._counter = _point_counter2.default.createInstance("jackpot_counter");
        true;
        this._counter.setConfig(this.baseValue, this.targetValue, this.limitedSeconds, this.jackpotLabel);
        this._counter.run();
      },
      update: function update(dt) {
        this._counter.isRunning() && this._counter.update(dt);
      },
      setConfig: function setConfig(base_value, target_value, limited_seconds) {
        this._counter = _point_counter2.default.createInstance("jackpot_counter");
        this._counter.setConfig(base_value, target_value, limited_seconds, this.jackpotLabel);
      },
      run: function run() {
        this._counter ? this._counter.run() : cc.error('You HAVE TO call "setConfig" before "run" a JackpotPointer.');
      }
    });
    cc._RF.pop();
  }, {
    "../utils/point_counter": "point_counter"
  } ],
  point_counter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "86b42+QMftDIJpxkFPQfCl0", "point_counter");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _common_utils = require("./common_utils");
    var _common_utils2 = _interopRequireDefault(_common_utils);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var COUNTER_STATE = cc.Enum({
      IDLE: 0,
      RUNNING: 1
    });
    var PointCounter = cc.Class({
      statics: {
        createInstance: function createInstance(name) {
          var instance = new PointCounter();
          instance.setName(name);
          return instance;
        }
      },
      properties: {
        _name: "",
        _baseValue: 0,
        _targetValue: 0,
        _limitedSec: 10,
        _intervalValue: 0,
        _currentCounter: 0,
        _counterLabel: null,
        _state: COUNTER_STATE.IDLE,
        _animNodeName: "counter_goal"
      },
      update: function update(dt) {
        if (this._state === COUNTER_STATE.RUNNING) {
          var goal = this._counterLabel.node.getChildByName(this._animNodeName);
          this._counterLabel.string = _common_utils2.default.regularDigital(Math.floor(goal.x));
        }
      },
      setName: function setName(name) {
        this._name = name;
      },
      setConfig: function setConfig(base, target, limited_seconds, counter_label) {
        this._baseValue = base;
        this._targetValue = target;
        this._limitedSec = limited_seconds;
        this._counterLabel = counter_label;
        this.reset();
      },
      run: function run() {
        if (this.isRunning()) cc.warn("PointCounter[" + this._name + "] was already started."); else {
          this._setState(COUNTER_STATE.RUNNING);
          var goal = this._counterLabel.node.getChildByName(this._animNodeName);
          goal.setPosition(this._baseValue, 0);
          goal.runAction(cc.moveTo(this._limitedSec, this._targetValue, 0).easing(cc.easeQuadraticActionOut()));
        }
      },
      stop: function stop() {
        this._setState(COUNTER_STATE.IDLE);
      },
      reset: function reset() {
        this._setState(COUNTER_STATE.IDLE);
        var goal = this._counterLabel.node.getChildByName(this._animNodeName);
        if (!goal) {
          goal = new cc.Node(this._animNodeName);
          this._counterLabel.node.addChild(goal, 0, 0);
        }
        goal.stopAllActions();
        this._currentCounter = this._baseValue;
        this._intervalValue = this._targetValue - this._baseValue;
      },
      isRunning: function isRunning() {
        return this._state === COUNTER_STATE.RUNNING;
      },
      _setState: function _setState(new_state) {
        this._state = new_state;
      }
    });
    exports.default = PointCounter;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {
    "./common_utils": "common_utils"
  } ],
  "polyglot.min": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function(e, t) {
      "function" == typeof define && define.amd ? define([], function() {
        return t(e);
      }) : "object" == ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? module.exports = t(e) : e.Polyglot = t(e);
    })(void 0, function(e) {
      function t(e) {
        e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", 
        this.allowMissing = !!e.allowMissing, this.warn = e.warn || c;
      }
      function s(e) {
        var t, n, r, i = {};
        for (t in e) if (e.hasOwnProperty(t)) {
          n = e[t];
          for (r in n) i[n[r]] = t;
        }
        return i;
      }
      function o(e) {
        var t = /^\s+|\s+$/g;
        return e.replace(t, "");
      }
      function u(e, t, r) {
        var i, s, u;
        return null != r && e ? (s = e.split(n), u = s[f(t, r)] || s[0], i = o(u)) : i = e, 
        i;
      }
      function a(e) {
        var t = s(i);
        return t[e] || t.en;
      }
      function f(e, t) {
        return r[a(e)](t);
      }
      function l(e, t) {
        for (var n in t) "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
        return e;
      }
      function c(t) {
        e.console && e.console.warn && e.console.warn("WARNING: " + t);
      }
      function h(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        return t;
      }
      t.VERSION = "0.4.3", t.prototype.locale = function(e) {
        return e && (this.currentLocale = e), this.currentLocale;
      }, t.prototype.extend = function(e, t) {
        var n;
        for (var r in e) e.hasOwnProperty(r) && (n = e[r], t && (r = t + "." + r), "object" == ("undefined" === typeof n ? "undefined" : _typeof(n)) ? this.extend(n, r) : this.phrases[r] = n);
      }, t.prototype.clear = function() {
        this.phrases = {};
      }, t.prototype.replace = function(e) {
        this.clear(), this.extend(e);
      }, t.prototype.t = function(e, t) {
        var n, r;
        return t = null == t ? {} : t, "number" == typeof t && (t = {
          smart_count: t
        }), "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), 
        r = e), "string" == typeof n && (t = h(t), r = u(n, this.currentLocale, t.smart_count), 
        r = l(r, t)), r;
      }, t.prototype.has = function(e) {
        return e in this.phrases;
      };
      var n = "||||", r = {
        chinese: function chinese(e) {
          return 0;
        },
        german: function german(e) {
          return 1 !== e ? 1 : 0;
        },
        french: function french(e) {
          return e > 1 ? 1 : 0;
        },
        russian: function russian(e) {
          return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        czech: function czech(e) {
          return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
        },
        polish: function polish(e) {
          return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        icelandic: function icelandic(e) {
          return e % 10 !== 1 || e % 100 === 11 ? 1 : 0;
        }
      }, i = {
        chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
        german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
        french: [ "fr", "tl", "pt-br" ],
        russian: [ "hr", "ru" ],
        czech: [ "cs" ],
        polish: [ "pl" ],
        icelandic: [ "is" ]
      };
      return t;
    });
    cc._RF.pop();
  }, {} ],
  roller_panel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dbb79/yy9hAJa7Zdtv+rzDU", "roller_panel");
    "use strict";
    cc.Class({
      extends: $cript,
      properties: {
        rollerPrefab: {
          displayName: "Roller Prefab",
          tooltip: "Roller 預置資源",
          type: cc.Prefab,
          default: null
        },
        rollerCount: {
          displayName: "Roller Count",
          tooltip: "盤面上的轉輪數",
          type: cc.Integer,
          range: [ 1, 6, 1 ],
          default: 1
        },
        rollerGap: {
          displayName: "Roller Gap (px)",
          tooltip: "盤面上的轉輪的間距",
          type: cc.Integer,
          range: [ 1, 10, 1 ],
          default: 1
        },
        createRollerTemplate: {
          displayName: "Create Template",
          tooltip: "建立盤面上的轉輪樣板",
          default: false,
          notify: function notify() {
            if (this.createRollerTemplate) {
              this.createRollerTemplate = false;
              if (this.node.getChildByTag(0)) alert("Roller template was already created."); else {
                var roller = cc.instantiate(this.rollerPrefab);
                this.node.addChild(roller, 0, 0);
              }
            }
          },
          editorOnly: true
        },
        createRoller: {
          displayName: "Create Roller",
          tooltip: "建立盤面上的轉輪",
          default: false,
          notify: function notify() {
            if (this.createRoller) {
              this.createRoller = false;
              this._resetMaskSize();
              this._copyTemplate2Roller();
            }
          },
          editorOnly: true
        },
        _rollerList: []
      },
      editor: {
        executeInEditMode: true
      },
      generatePreview: function generatePreview() {
        true;
        var max = cc.Enum.getList(require("symbol_define")).length;
        var getRandomSymbol = function getRandomSymbol() {
          return Math.floor(Math.random() * max);
        };
        this._rollerList.forEach(function(roller) {
          var strip = [];
          for (var i = 0; i < 50; i++) strip.push(getRandomSymbol());
          roller.setRollerStrip(strip.toString());
          roller.setRollerSymbols([ strip[0], strip[1], strip[2] ]);
        });
      },
      startRolling: function startRolling() {
        this._rollerList.forEach(function(roller) {
          return roller.startRolling();
        });
      },
      stopRolling: function stopRolling() {
        this._rollerList.forEach(function(roller) {
          return roller.stopRolling();
        });
      },
      _resetMaskSize: function _resetMaskSize() {
        var template = this.node.getChildByName("roller");
        if (template) {
          var rollerBg = template.getChildByName("background");
          var maskWidth = rollerBg.width * this.rollerCount + this.rollerGap * (this.rollerCount - 1);
          var mask = this.node.getChildByName("mask");
          mask.setContentSize(cc.size(maskWidth, rollerBg.height));
        }
      },
      _copyTemplate2Roller: function _copyTemplate2Roller() {
        var template = this.node.getChildByName("roller");
        if (template) {
          var mask = this.node.getChildByName("mask");
          mask.removeAllChildren(false);
          this._rollerList = [];
          var xPositionAdjust = template.getChildByName("background").width + this.rollerGap;
          var rulerIndex = this.rollerCount % 2 > 0 ? Math.floor(this.rollerCount / 2) : this.rollerCount / 2 - .5;
          for (var i = 0; i < this.rollerCount; i++) {
            var roller = cc.instantiate(template);
            roller.x += (i - rulerIndex) * xPositionAdjust;
            mask.addChild(roller, 1, "roller" + i);
            this._rollerList.push(roller.getComponent($cript));
          }
          this.node.removeChildByTag(0, false);
        } else alert("Warnning: Roller template does not exist.");
      }
    });
    cc._RF.pop();
  }, {
    symbol_define: "symbol_define"
  } ],
  roller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9982evqnG1Lf4xSVFUZU5qH", "roller");
    "use strict";
    var _symbol_define = require("symbol_define");
    var _symbol_define2 = _interopRequireDefault(_symbol_define);
    var _symbol_util = require("symbol_util");
    var _symbol_util2 = _interopRequireDefault(_symbol_util);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var RollerState = cc.Enum({
      STOP: -1,
      START_UP: -1,
      RUNNING: -1,
      SLOW_DOWN: -1,
      BONUCING: -1
    });
    cc.Class({
      extends: $cript,
      properties: {
        symbolPrefab: {
          displayName: "Symbol Prefab",
          tooltip: "Symbol 預置資源",
          type: cc.Prefab,
          default: null
        },
        symbolAtlas: {
          displayName: "Symbol Atlas",
          tooltip: "Symbol 合圖圖集資源",
          type: cc.SpriteAtlas,
          default: null
        },
        symbolDirectory: {
          displayName: "Symbol Directory",
          tooltip: "放置 symbol 圖片資源的路徑\n設定任一張 symbol 圖片之後會自動抓取",
          url: cc.Texture2D,
          default: null,
          notify: function notify() {
            if (this.symbolDirectory.length > 0) {
              var symbolUtil = new _symbol_util2.default();
              symbolUtil.initPath(cc.path.dirname(this.symbolDirectory), _symbol_define2.default);
              this.setSymbolUtil(symbolUtil);
            } else this.setSymbolUtil(null);
            this.symbolCount = this.symbolCount;
          }
        },
        symbolCount: {
          displayName: "Symbol Count",
          tooltip: "轉輪上的 symbol 數量",
          type: cc.Integer,
          range: [ 1, 10, 1 ],
          default: 3,
          notify: function notify() {
            var bgNode = this.node.getChildByName("background");
            bgNode.height = this.symbolCount * this.symbolHeight;
            this._getRollingNode().removeAllChildren(false);
            this._symbolList = [];
            var baseY = Math.floor(this.symbolHeight / 2) - Math.floor(bgNode.height / 2);
            for (var i = 0; i <= this.symbolCount; i++) {
              var symbol = void 0;
              if (this.symbolPrefab) symbol = cc.instantiate(this.symbolPrefab); else {
                symbol = new cc.Node("symbol" + i);
                symbol.addComponent(cc.Sprite);
              }
              this._getRollingNode().addChild(symbol, i, i);
              this._symbolList[i] = symbol;
              symbol.setPosition(0, baseY + this.symbolHeight * (this.symbolCount - i));
              symbol.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame();
            }
          }
        },
        symbolHeight: {
          displayName: "Symbol Height",
          tooltip: "Symbol 圖片高度 (px)",
          type: cc.Integer,
          default: 0,
          notify: function notify() {
            this.symbolCount = this.symbolCount;
            var bgNode = this.node.getChildByName("background");
            bgNode.height = this.symbolCount * this.symbolHeight;
          }
        },
        backgroundSprite: {
          displayName: "Roller Background",
          tooltip: "轉輪背景圖片",
          type: cc.SpriteFrame,
          default: null,
          notify: function notify() {
            var bgNode = this.node.getChildByName("background");
            if (this.backgroundSprite) {
              bgNode.getComponent(cc.Sprite).spriteFrame = this.backgroundSprite;
              bgNode.height = this.symbolCount * this.symbolHeight;
            } else {
              bgNode.getComponent(cc.Sprite).spriteFrame = null;
              bgNode.height = 0;
            }
            bgNode.width = this.rollerWidth;
          }
        },
        rollerWidth: {
          displayName: "Roller Width",
          tooltip: "轉輪圖片寬度 (px)",
          type: cc.Integer,
          default: 0,
          notify: function notify() {
            var bgNode = this.node.getChildByName("background");
            bgNode.height = this.symbolCount * this.symbolHeight;
            bgNode.width = this.rollerWidth;
          }
        },
        speed: {
          displayName: "Roller Speed",
          tooltip: "轉輪速度 (px per frame)",
          type: cc.Integer,
          range: [ 10, 60, 1 ],
          default: 30
        },
        _state: RollerState.STOP,
        _strip: [],
        _symbolList: [],
        _symbolUtil: null,
        _rollerIndex: 0,
        _symbolOnRoller: []
      },
      editor: {
        executeInEditMode: true
      },
      onLoad: function onLoad() {
        this._state = RollerState.STOP;
        if (!(this._symbolUtil instanceof _symbol_util2.default)) {
          var symbolUtil = new _symbol_util2.default();
          symbolUtil.initPath(cc.path.dirname(this.symbolDirectory), _symbol_define2.default);
          this.setSymbolUtil(symbolUtil);
        }
      },
      update: function update() {
        this._state !== RollerState.STOP && this._updateRoller();
      },
      setSymbolUtil: function setSymbolUtil(symbol_util) {
        this._symbolUtil = symbol_util;
      },
      setRollerStrip: function setRollerStrip(strip_string) {
        this._strip = strip_string.split(",");
        this._rollerIndex = this._strip.length - 1;
        for (var i = 0; i < this._symbolList.length; i++) {
          var symbolIndex = this._strip[i];
          this._symbolOnRoller[i] = symbolIndex;
        }
      },
      setRollerSymbols: function setRollerSymbols(symbol_list) {
        symbol_list.unshift(this._strip ? this._strip[this._rollerIndex] : 0);
        this._symbolOnRoller = symbol_list;
        this._updateRollingSymbol();
      },
      startRolling: function startRolling() {
        this._state === RollerState.STOP ? this._state = RollerState.START_UP : cc.log("Roller::startRolling() - roller has already started (" + this._state + ").");
      },
      stopRolling: function stopRolling() {
        this._state === RollerState.START_UP || this._state === RollerState.RUNNING ? this._state = RollerState.SLOW_DOWN : cc.log('Roller::stopRolling() - roller "DOES NOT RUNNING" or "WILL STOP" (' + this._state + ").");
      },
      isRolling: function isRolling() {
        return this._state !== RollerState.STOP;
      },
      _getRollingNode: function _getRollingNode() {
        return this.node.getChildByName("move_node");
      },
      _updateRoller: function _updateRoller() {
        var movePx = 0;
        switch (this._state) {
         case RollerState.START_UP:
          movePx = this.speed;
          break;

         case RollerState.RUNNING:
          break;

         case RollerState.SLOW_DOWN:
          movePx = this.speed;
          break;

         case RollerState.BONUCING:
          break;

         default:
         case RollerState.STOP:
        }
        var rollingNode = this._getRollingNode();
        rollingNode.y -= movePx;
        if (rollingNode.y < -this.symbolHeight) {
          this._updateRollingSymbol();
          rollingNode.y = 0;
          this._state === RollerState.SLOW_DOWN && (this._state = RollerState.STOP);
        }
      },
      _updateRollingSymbol: function _updateRollingSymbol() {
        for (var i = this.symbolCount; i > 0; i--) this._symbolOnRoller[i] = this._symbolOnRoller[i - 1];
        this._rollerIndex = this._rollerIndex - 1 >= 0 ? this._rollerIndex - 1 : this._strip.length - 1;
        this._symbolOnRoller[0] = this._strip[this._rollerIndex];
        var updateSymbol = this._state === RollerState.START_UP || this._state === RollerState.RUNNING ? this._setSymbolBlur.bind(this) : this._setSymbol.bind(this);
        for (var _i = 0; _i < this._symbolOnRoller.length; _i++) updateSymbol(_i, this._symbolOnRoller[_i]);
      },
      _setSymbolBlur: function _setSymbolBlur(position, symbol_index) {
        this._updateOneSymbol(position, this._symbolUtil.getTextureBlur(symbol_index));
      },
      _setSymbolLight: function _setSymbolLight(position, symbol_index) {
        this._updateOneSymbol(position, this._symbolUtil.getTextureLight(symbol_index));
      },
      _setSymbol: function _setSymbol(position, symbol_index) {
        this._updateOneSymbol(position, this._symbolUtil.getTexture(symbol_index));
      },
      _updateOneSymbol: function _updateOneSymbol(position, path) {
        var texture;
        false;
        this._symbolList[position].getComponent(cc.Sprite).spriteFrame = this.symbolAtlas.getSpriteFrame(path);
      }
    });
    cc._RF.pop();
  }, {
    symbol_define: "symbol_define",
    symbol_util: "symbol_util"
  } ],
  symbol_define: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a09b0Ar1dRPM5vSIcy5fBTx", "symbol_define");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = cc.Enum({
      SN_S1: 0,
      SN_S2: 1,
      SN_S3: 2,
      SN_A: 3,
      SN_K: 4,
      SN_Q: 5,
      SN_J: 6,
      SN_T: 7,
      SN_N: 8,
      SN_WD: 9,
      SN_FG: 10
    });
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  symbol_util: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0fbb6ymoKRDqK6ZHg1TGXoD", "symbol_util");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = cc.Class({
      properties: {
        _path: "",
        _symbols: [],
        _symbolsBlur: [],
        _symbolsLight: []
      },
      initPath: function initPath(symbol_dir_path, symbol_enum) {
        var _this = this;
        cc.Enum.getList(symbol_enum).forEach(function(item) {
          false;
          _this._symbols[item.value] = "sym_" + item.name.toLowerCase();
          _this._symbolsBlur[item.value] = "sym_" + item.name.toLowerCase() + "_blur";
          _this._symbolsLight[item.value] = "sym_" + item.name.toLowerCase() + "_light";
        });
      },
      getTexture: function getTexture(symbol_index) {
        return this._symbols[symbol_index];
      },
      getTextureBlur: function getTextureBlur(symbol_index) {
        return this._symbolsBlur[symbol_index];
      },
      getTextureLight: function getTextureLight(symbol_index) {
        return this._symbolsLight[symbol_index];
      }
    });
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ]
}, {}, [ "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min", "game", "symbol_define", "button", "jackpot", "roller", "roller_panel", "symbol_util", "common_utils", "point_counter" ]);