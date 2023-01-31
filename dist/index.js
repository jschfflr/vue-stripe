var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// package.json
var require_package = __commonJS({
  "package.json"(exports, module2) {
    module2.exports = {
      name: "@vue-stripe/vue-stripe",
      version: "5.0.0",
      description: "Stripe Checkout & Elements for Vue.js",
      author: "jofftiquez@gmail.com",
      main: "dist/index.js",
      type: "commonjs",
      scripts: {
        build: "esbuild src/index.js --bundle --format=cjs --outfile=dist/index.js",
        "build:rollup": "rollup --config",
        lint: "eslint --fix --ext .js,.vue ./"
      },
      dependencies: {
        "@stripe/stripe-js": "^1.13.2"
      },
      devDependencies: {
        "@babel/core": "^7.20.12",
        "@babel/eslint-parser": "^7.13.14",
        "@babel/plugin-proposal-optional-chaining": "^7.20.7",
        "@babel/preset-env": "^7.20.2",
        "@rollup/plugin-babel": "^6.0.3",
        "@rollup/plugin-commonjs": "^24.0.1",
        "@rollup/plugin-node-resolve": "^15.0.1",
        "@rollup/plugin-terser": "^0.4.0",
        esbuild: "^0.17.5",
        eslint: "^8.10.0",
        "eslint-config-standard": "^17.0.0",
        "eslint-plugin-import": "^2.19.1",
        "eslint-plugin-n": "^15.0.0",
        "eslint-plugin-promise": "^6.0.0",
        "eslint-plugin-vue": "^9.0.0",
        "eslint-webpack-plugin": "^3.1.1",
        rimraf: "^4.1.2",
        rollup: "^3.12.0"
      },
      peerDependencies: {
        vue: "^3.2.45"
      },
      bugs: {
        url: "https://github.com/vue-stripe/vue-stripe/issues"
      },
      gitHooks: {
        "pre-commit": "lint-staged"
      },
      homepage: "https://github.com/vue-stripe/vue-stripe#readme",
      keywords: [
        "vue",
        "vuejs",
        "stripe",
        "checkout",
        "payment"
      ],
      license: "MIT",
      repository: {
        type: "git",
        url: "git@github.com:vue-stripe/vue-stripe.git"
      },
      typings: "typings/index.d.ts",
      engines: {
        node: "16"
      }
    };
  }
});

// src/index.js
var src_exports = {};
__export(src_exports, {
  VueStripePlugin: () => plugins_default,
  useVueStripe: () => useVueStripe
});
module.exports = __toCommonJS(src_exports);

// node_modules/@stripe/stripe-js/dist/stripe.esm.js
var V3_URL = "https://js.stripe.com/v3";
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
var findScript = function findScript2() {
  var scripts = document.querySelectorAll('script[src^="'.concat(V3_URL, '"]'));
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (!V3_URL_REGEX.test(script.src)) {
      continue;
    }
    return script;
  }
  return null;
};
var injectScript = function injectScript2(params) {
  var queryString = params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
  var script = document.createElement("script");
  script.src = "".concat(V3_URL).concat(queryString);
  var headOrBody = document.head || document.body;
  if (!headOrBody) {
    throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  }
  headOrBody.appendChild(script);
  return script;
};
var registerWrapper = function registerWrapper2(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }
  stripe._registerWrapper({
    name: "stripe-js",
    version: "1.46.0",
    startTime
  });
};
var stripePromise = null;
var loadScript = function loadScript2(params) {
  if (stripePromise !== null) {
    return stripePromise;
  }
  stripePromise = new Promise(function(resolve, reject) {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }
    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }
    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }
    try {
      var script = findScript();
      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      }
      script.addEventListener("load", function() {
        if (window.Stripe) {
          resolve(window.Stripe);
        } else {
          reject(new Error("Stripe.js not available"));
        }
      });
      script.addEventListener("error", function() {
        reject(new Error("Failed to load Stripe.js"));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise;
};
var initStripe = function initStripe2(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }
  var stripe = maybeStripe.apply(void 0, args);
  registerWrapper(stripe, startTime);
  return stripe;
};
var stripePromise$1 = Promise.resolve().then(function() {
  return loadScript(null);
});
var loadCalled = false;
stripePromise$1["catch"](function(err) {
  if (!loadCalled) {
    console.warn(err);
  }
});
var loadStripe = function loadStripe2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  loadCalled = true;
  var startTime = Date.now();
  return stripePromise$1.then(function(maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};

// src/constants/index.js
var VUE_STRIPE_VERSION = require_package().version;
var STRIPE_PARTNER_DETAILS = {
  name: "vue-stripe",
  version: VUE_STRIPE_VERSION,
  url: "https://vuestripe.com",
  partner_id: "pp_partner_IqtOXpBSuz0IE2"
};

// src/stripe/index.js
var useVueStripe = (pk, options) => {
  let stripe = null;
  if (options?.disableAdvancedFraudDetection)
    loadStripe.setLoadParameters({ advancedFraudSignals: false });
  const stripeOptions = {
    stripeAccount: options?.stripeAccount,
    apiVersion: options?.apiVersion,
    locale: options?.locale
  };
  async function init() {
    stripe = await loadStripe(pk, stripeOptions);
    stripe.registerAppInfo(STRIPE_PARTNER_DETAILS);
  }
  async function redirectToCheckout(options2) {
    try {
      if (options2?.sessionId) {
        stripe.redirectToCheckout({
          sessionId: options2.sessionId
        });
        return;
      }
      if (options2?.lineItems?.length && !options2?.mode) {
        throw new Error("Error: Property 'mode' is required when using 'lineItems'. See https://stripe.com/docs/js/checkout/redirect_to_checkout#stripe_checkout_redirect_to_checkout-options-mode");
      }
      if (!options2?.successUrl || !options2?.cancelUrl) {
        throw new Error("Error: successUrl and cencelUrl is required.");
      }
      const checkoutOptions = {
        billingAddressCollection: options2?.billingAddressCollection,
        cancelUrl: options2.cancelUrl,
        clientReferenceId: options2?.clientReferenceId,
        customerEmail: options2?.customerEmail,
        items: options2?.items,
        lineItems: options2?.lineItems,
        locale: options2?.locale,
        mode: options2?.mode,
        shippingAddressCollection: options2?.shippingAddressCollection,
        submitType: options2?.submitType,
        successUrl: options2.successUrl
      };
      stripe.redirectToCheckout(checkoutOptions);
    } catch (e) {
      console.error(e);
    }
  }
  init();
  return {
    stripe,
    redirectToCheckout
  };
};

// src/plugins/index.js
var plugins_default = {
  async install(app, { pk, stripeAccount, apiVersion, locale }) {
    if (!pk)
      throw new Error("Publishable key is required");
    const stripeOptions = {};
    if (stripeAccount)
      stripeOptions.stripeAccount = stripeAccount;
    if (apiVersion)
      stripeOptions.apiVersion = apiVersion;
    if (locale)
      stripeOptions.locale = locale;
    const stripe = await loadStripe(pk, stripeOptions);
    stripe.registerAppInfo(STRIPE_PARTNER_DETAILS);
    app.mixin({
      computed: {
        $stripe() {
          return stripe;
        }
      }
    });
    app.provide("$stripe", stripe);
  }
};
