import Vue from "vue";
import Parallax from "./Parallax.vue";

export default {
  install(Vue, options) {
    console.log(options);

    const root = new Vue({
      data: () => ({}),
    });

    Vue.component("parallax", Parallax);
  },
};
