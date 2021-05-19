(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uniApp","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uniApp","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"uniApp","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"uniApp","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uniApp","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************!*\
  !*** D:/meven/uniApp/pages.json ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/*!*******************************************!*\
  !*** D:/meven/uniApp/static/swiper/1.jpg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAF3Au4DASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAYBAwQFBwII/8QAVRAAAQMDAgMFBQQGBgUICAcAAQACAwQFEQYSITFBBxMiUWEUMnGBkUJSobEVFiNiwdEkM3KSsvCCk6LS4QgXNFNUVcLxJTdDVmNzlLMnNkRFRnWD/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAMEAQIFBv/EADYRAAIBAwMCAwcDAwQDAQAAAAABAgMEERIhMRNBBVFhInGBkaGx8BQy0SPB4RUzQvEGUnIW/9oADAMBAAIRAxEAPwC2iIvNnHCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCoVVUKAqiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCoVVUKAqiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiALAu12prNQuqql3Dkxg5vd5BZ65l2gVkk18ZSkkRwRNwM8y7iT+Q+Snt6XVqaXwSUoa54ZZrddXiokzTyMpWZ4NjaCfmTzVy3a8ulNIBVllXFnxBwDXD4EKJIux0KWMaUdDpQxjB261XWlvFE2qpX5byc0+8x3kVnLj+mL06y3VkjnYp5SGTj93z+S7ACCMg5HmFybmh0pYXDKFal05egRFh3W4xWq2T1svERt8LfvO6BV0m3hESWXhGBqHUtNYomtcBNVP4shDscPvO8h+agdTre+Ty746ltO3oyNgx+OVo62rmrqySpnfulkducVjLs0bWEFuss6NOhGK33ZNbVr6shkZHcmNqITwL2ja8evkV0OGaOogjmheHxSNDmuHUFcIHNdL7Pa589pqKN5J9nkBafJrun1B+qgvLeMY64rBFcUYpaokwREXMKYREQBERAEREAREQBUKqqFAVREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEReXvEbHPd7rQSVkFuerpqYtFRUwwl3u95IG5+qrBUwVLSaeeKYA4JjeHY+i5zarJd+0bVEopRtjzukmkzsp4+g/kBzPzKmk3YZcqKI1Fv1HB7QziN0ToQB1O4E44eilrfpqLUKtTEvIvxsZSjlG3RQ46om09WSW68zU1xdFkCqt8rZA7jyPL18v4rZWm63zUlHU1VkskT4KZ2JZqisYxrRjPHOOnHmkqMorU8Y884X1K/6arq0pG/Wpr79DS1goaeCatrnDPcQDO0ebj06fVRF/aHXxyOZ7DRnaSMtc4jh5HKlVlzYNJyXuqhlqquqAqZywBziHcvkGnK2nQdJZmueF5l/w/wAMdxUfUeIpZZdt98jrKx9DPTT0dawZME7cEjzaeqzpq2kpn7J6qCJ547ZJWtOPmVFNTXJmpe4Gn6arqKqlAkNVAC3u2uHueefy9VjWbQNpv9AyeLWdDFXSROe+kqo9j2PHMOJd59fnhZcKcY66j0+mG8fx8Ta58MjCq1TlmPZk3hnhqI98MscrM43MeHD8FcXL9OVz9PaldRSVVPLSvk7mSSKQOid5Pa7yXS31METtslRCx3k+RrT+a1rUXTlhbpnMq0nTlgurlGum41TP/YjP+yF02S5UMTN762ma3z71v81zvXc9DV3CmqqKrhnzGWSCM5IweBP1/BTWSaq8G9tlTIiiIuudALrmjLga/TsIecyU57lx9B7v4LkamvZ9Xsp66rppZGMZJGHhz37Rlp9fj+Cq3kNVJvyILiOqHuOjqA9olyPeUtuaeAHfPH4N/IqcMqqeRwayohe48g2VpK5Fqer9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"

/***/ }),
/* 25 */
/*!*******************************************!*\
  !*** D:/meven/uniApp/static/swiper/2.jpg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 26 */
/*!*******************************************!*\
  !*** D:/meven/uniApp/static/swiper/3.jpg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/*!************************************************!*\
  !*** D:/meven/uniApp/static/tabbar/person.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAoCAYAAAB0HkOaAAAEzklEQVRYR+2YTWhcVRTHz7lvkkxCEiJk0YUdGiyYkha6qFApBWfuHSaSBlPagIUUW1AQdFHQguJGQdBFwbooIggKKhUaSSSGJJP73lQMWKlSxASzUPKhYBYBAwnJhJm5R87wXngZ582bN8nSu0vePf/87jn3fNwgRFy2bT8BAM8T0VlEPAkAx3wSy0Q0j4g/IeJ4KpX6JYo81rvZhbgFAEP12hDRfSHE66lU6ud6bOqCcRznOSL6AgDa6xGt2FMkoleVUh+H2YbCOI4jiWgaAGKeGBHNAcCoMea7Uqm0EY/H1/P5fLdlWV1CiHMAcAER+/1/nIheDgOqCTMxMdHd1tb2GwB0u8JrRHRVKaXDTpnNZk9blnUXAHrdvUVEPFsrZDVhbNv+AABueCCFQuF8f3//72Eg3nc+TGtr6ywinubf8R1SSiWD7ANhcrlcuzHmb++eENEVpdRX9YJ4+2ZmZk7GYrFHXpiNMU+n0+kH1XQCYbTWQ4g45hotSyl7ooJ4+23bvgcAl92f35dSvhkJpiJEt6SUNxuF0VqPIOLnbqjmlFLnI8E4jjNFROWMaDREvlD1xmIxTgReG1LKxyLBaK0feRfPGJNMp9P3G/VMLpeLG2N2PHspZdXrEXhnbNte8kr9QWEYwrZtOgjMrwDAvQcOCjM2NtbV2dn5T8MwFXdmRCn1ZaNhymazZyzLehiWmbXC9B4AvOEKfCKlfKlRGK31a4jITZbXqJRyOOoFVog46xqtCyGOJpPJfCNAWusfuBW4mclN804kmFwuFzPG8CV+3BW5oZT6MCqM4zjn3MbKpsV8Pn90YGBgLRKMmwFvAcC7nne2t7dPDA4OrtcLxAcqlUrfe14BgHEp5cUg+5qN0s0CLlZHXO9MW5Y1mEwmi/UAVVTxYqFQOFGr0YbOM1rry4jIvaW8iGhUKVX1AvoBK0D409tSyndqHSIUho211g8R8YwnVCwWT2Uymfkg4cnJySPxeJw7vrcWhRCnwjxaE8a9xB8BwIs+4XkhxFO1Msst/zw2eIMVm98WQtysBVRznimVSncR8YIvRHM7OzsX67nE7J2WlpYJv0c5xJZlXU8mk1t1Z1M1IS5WQoirUWqNO6Dx6LnvQLu7u8PV0vs/nnEc50ki+hYAjvvoQ10cdH8CQr3IgFLKP/x2+2DcAjXuG8A5ewKL3cLCQntHR8c9IupFxMXNzc3hvr6+qiGwbdtfs5hhDRGHUqnUjx7QHozjOJeI6DPf24jfOzz3jgademVlZW+Cc/dcSSQSgXOyO/F96nv2bCHiSCqV+obtyzBa61cQ8bZv04YxZjCdTvP7KHCtrq5eAwAW99b1RCLBBwpcs7OzzwghJioOzd6/g7lc7gVjjF/gr2KxmM5kMhzXmqsRGBZ0XwzchMuVnZcQ4hratv2n1wwBYD6fz6eDGlklWaMwrOMWRgYqD3AAsMwwe+OgEKIjqAZUc9FBYFjPTf1NT3sfTNCgHBSrg8Kwrt8Z/8P4PX1onllaWuJs8DfDxZ6enqpTXLVQV3b3A4UpLPXDvk9NTR1rbm7m0ba89sHwABQmcMjfu3z/cgH0P2MP+Q9FkiOiB1ilPEcSOaTNW8aYZ8u9aXp6+nhTU9MlAIgfkngUmXyhUPiaB/V/AWkOY9v+xPsuAAAAAElFTkSuQmCC"

/***/ }),
/* 35 */
/*!*********************************************!*\
  !*** D:/meven/uniApp/static/tabbar/bag.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAEXElEQVRYR82ZW4hWVRTHf3+EBjKawso0sDAysDKdSNLA7KGwoJiCwl7KiEwMynooMTCHoqwemiCwLGiihzQoC7oYFBldnK6aJd1Ju1pU2E1EohX/z31m9nyd+cLPM55ZTx/r7LP276y999prrU9kEhF3ABcCk4EfgfeBayT9nI+r+ndEjAMeBGYCRwCfA+sl3VzMpeJHRDwOzC+B+ADolrStakDbi4jjgKeAGSX210pqMDVAI2IJcG8LkD5JV44Q6CPAgha2b5DUW4C+DZyeDb4UOL/JwARJO6qEjYij0hYrzPYBG9M2KHSbJHUVoH8CY9MT78nVEXEk8FMGNktSf8Wgdo6dVMg4Sb9GxCXAE0m5S9JYRcQY4O9s8BxJr6UtEZn+bEkbKgadC7wycGCkwnFnAq9nc3UYtAPYnSlnS7L7vXfrAj0NeDdj6jSol9xLX8hMSe+UgVbpzcxWmUdPAj7Kxow3aCewM1N2SdpUAjpCnINmNbj0xwNfZBMea1AH2zygT5P0Yc2gxwDfZqAnGnQ8kIedqZI+rhm02XnTDToR+C6jnyLJV1htUnJuzjDoJGB7RjVZ0le1Ue6NNs0hc65BnYB8mYFNkvRNnaBp2zlkOnRa5hl0CvBpBjZR0g/DgUbEYYAD9fQ2P8YxeqOk31u9HxG/AYemMd0GnQpsHRKzpPzqHHgUESuAqwHv6/2R74HVknpaOMRppnMBy3yDTgOcyhXSuG+bDUTEncDS/aEreXeZJNv9j0SEz43Pj2WBQbuA97KRnc3LUnIpVMl7uKT8wmnYjghvR29LyyKDOqt+K5t5rKRdOUlEnAJsqZIuszVD0uaSFfQqe7UtSww6G3gjG9ghac8oALXz7ETLUoPOAV7NwMZI+qcJtDkfqNK5wy29mcxm6THoucCLSbFHUhG7hsBEhIuvhVUSAoslrSqzGRFmMptlpUEvBp5Mil8kuQoslRSebq0Idp0kzz3cXM+kitjPew16BeBaxbJdkqvCYSUizgGchh3dJrDDzteSXv6fedYCrt0sDxj0WuD+pNgq6eQ2ASp9LSIeBS5PRvsM6iJ/ZVL0S5pV6YxtGms6E2sMejtwS7L3kiQvbe0SEfcB1yWQpw3aC1w/oJAuqp1y7810F3BTYllv0IeBq5LiMUnFvqiVNyKcsCxPEBsMmp+uVZIW10qYJo8IJ0BFwtJv0OdS+8ZD7pFUuLtW3qZ+2GaD5lfVckm31Uo46NFFQHFrfWJQ90CLlt+Nklp19Q7YN0SEO3zu9Fm2GfQz4ISkWCjpoQNG02KiiHBf1D1byw6DuiyYkBSXSVozSkC7gXWJZadB/wAOSYoLJD07SkDnAS8klt0GHdGOXbsfHRFDW5IR8TxwXjK4RdKp7Rqv8r2IcNXh6sPSCPgugfMc883s7q9y7n2x5Xu+qJf8XiPDPxj4a1+s1DC2o2hFN3u1BpZhp+yRtCL/n+kgYBlwVmrZ1Anr0+4/Ie4uSvd/AcOD6nIwK2r8AAAAAElFTkSuQmCC"

/***/ }),
/* 36 */
/*!***************************************************!*\
  !*** D:/meven/uniApp/static/tabbar/backstage.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map