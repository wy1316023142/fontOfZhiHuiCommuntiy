import 'animate.css'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import filter from '@/common/filter.js'
Vue.use(ElementUI)
Vue.use(filter)
Vue.config.productionTip = false


;(function (doc, win) {
    var docEl = doc.documentElement,
        //resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=1280){
                docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
            }else {
                docEl.style.fontSize = 100 * (1280 / 1920) + 'px';
            }

        };
    if (!doc.addEventListener) return;
    win.addEventListener('resize', recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
