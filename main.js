import Vue from 'vue'
import App from './App'
import adVideoUtils from "./api/ad.js";

Vue.prototype.$utils = {
  ...adVideoUtils,
};

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
