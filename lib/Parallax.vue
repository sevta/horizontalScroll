<template>
  <div class="app-wrapper">
    <button class="btn-theme" @click="setTheme()">{{ theme }}</button>
    <div class="moto" :class="direction"></div>
    <div class="bg-layer layer-1">
      <div class="layer" v-for="(item, i) in 30" :key="i">
        <img :src="getImage('layer_02_1920 x 1080')" alt="" />
      </div>
    </div>
    <div class="bg-layer layer-2">
      <div class="layer" v-for="(item, i) in 30" :key="i">
        <img :src="getImage('layer_03_1920 x 1080')" alt="" />
      </div>
    </div>
    <div class="bg-layer layer-3">
      <div class="layer" v-for="(item, i) in 30" :key="i">
        <img :src="getImage('layer_04_1920 x 1080')" alt="" />
      </div>
    </div>
    <div class="bg-layer layer-4">
      <div class="layer" v-for="(item, i) in 30" :key="i">
        <img :src="getImage('layer_05_1920 x 1080')" alt="" />
      </div>
    </div>
    <div class="bg-layer layer-5">
      <div class="layer" v-for="(item, i) in 30" :key="i">
        <img :src="getImage('layer_06_1920 x 1080')" alt="" />
      </div>
    </div>
    <div class="bg-layer layer-6">
      <div class="layer" v-for="(item, i) in 30" :key="i">
        <img :src="getImage('layer_07_1920 x 1080')" alt="" />
      </div>
    </div>
    <div class="scroll-wrapper">
      <div class="content">
        <div class="main-layer layer-1">
          <div class="layer-bg" v-for="(item, i) in 30" :key="i">
            <img :src="getImage('layer_01_1920 x 1080')" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scrollbar from "smooth-scrollbar";
import lottie from "lottie-web";
import images from "./img/*/**.png";
import motoJson from "./moto.json";

class HorizontalScrollPlugin extends Scrollbar.ScrollbarPlugin {
  static pluginName = "horizontalScroll";

  transformDelta(delta, fromEvent) {
    if (!/wheel/.test(fromEvent.type)) {
      return delta;
    }

    const { x, y } = delta;

    return {
      y: 0,
      x: Math.abs(x) > Math.abs(y) ? x : y,
      // x: Math.sign(x || y) * Math.sqrt(x*x + y*y),
    };
  }
}

Scrollbar.use(HorizontalScrollPlugin);

export default {
  data: () => ({
    scrollbarInstance: null,
    x: 0,
    direction: "",
    theme: "night",
    imgFolder: "",
    folder: "PARALLAX_NIGHT",
    moto: null,
    scrollPercent: 0,
  }),
  watch: {
    theme(theme) {
      theme == "night"
        ? (this.folder = "PARALLAX_NIGHT")
        : (this.folder = "PARALLAX_DAY");
    },
    x(x) {
      let frames = this.moto.totalFrames;
      let speed = 0.8;
      let calc = ((this.scrollPercent % speed) / speed) * frames;

      this.moto.goToAndStop(Math.round(calc), true);
    },
  },
  created() {
    this.images = images;
  },
  mounted() {
    this.initSmoothScrollbar();
    this.initLottie();
    this.setTheme("night");
  },
  methods: {
    initSmoothScrollbar() {
      this.scrollbarInstance = Scrollbar.init(
        document.querySelector(".scroll-wrapper"),
        {
          damping: 0.03,
        }
      );
      this.scrollbarInstance.addListener(this.listener);
    },
    initLottie() {
      this.moto = lottie.loadAnimation({
        container: document.querySelector(".moto"),
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: "/halloween.json",
      });
    },
    listener({ offset }) {
      if (offset.x >= this.x) {
        this.direction = "right";
      } else {
        this.direction = "left";
      }
      this.scrollPercent =
        (100 * this.scrollbarInstance.scrollLeft) /
        document.querySelector(".main-layer").getBoundingClientRect().width;
      this.x = offset.x;
      this.parallax(document.querySelector(".layer-1"), offset.x, -0.2, 1);
      this.parallax(document.querySelector(".layer-2"), offset.x, -0.4, 1);
      this.parallax(document.querySelector(".layer-3"), offset.x, -0.6, 1);
      this.parallax(document.querySelector(".layer-4"), offset.x, -0.8, 1);
      this.parallax(document.querySelector(".layer-5"), offset.x, -0.03, 1);
    },
    parallax(el, x, value, scale) {
      el.style.transform = `translate3d(${x * value}px, 0, 0) scale(${scale})`;
    },
    move(direction) {
      let that = this;
      direction == "right" ? (this.x += 240) : (this.x -= 240);
      TweenMax.to(option, 1, {
        x: this.x,
        ease: Power4.easeOut,
        onUpdate() {
          that.scrollbarInstance.scrollTo(option.x, 0);
        },
      });
    },
    setTheme(theme) {
      if (theme) {
        this.theme = theme;
      } else {
        this.theme = this.theme == "night" ? "day" : "night";
      }
    },
    getImage(key) {
      return this.images[this.folder][key];
    },
    importAll(r) {
      var imgs = {};
      r.keys().forEach((key) => (imgs[key] = r(key)));
      console.log(imgs);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-theme {
  padding: 5px 20px;
  background-color: deepskyblue;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 0;
  z-index: 100;
  font-weight: bold;
  text-transform: uppercase;
}
.moto {
  width: 400px;
  height: 400px;
  /* width: 300px;
  height: 300px; */
  position: absolute;
  /* bottom: 100px; */
  bottom: 99px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  &.left {
    transform: translateX(-50%) scaleX(-1);
  }
  &.right {
    transform: translateX(-50%) scaleX(1);
  }
}
img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}
.app-wrapper {
  .bg-layer {
    width: auto;
    height: 100%;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    &.layer-5 {
      z-index: 2;
    }
    &.layer-4 {
      z-index: 6;
    }
    &.layer-3 {
      z-index: 5;
    }
    &.layer-2 {
      z-index: 4;
    }
    &.layer-1 {
      z-index: 3;
    }
    .layer {
      width: 100vw;
      height: 100vh;
    }
  }
  .people {
    width: 70px;
    height: 120px;
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  .cloud {
    position: fixed;
    top: 30px;
    left: 100px;
    width: 120px;
    height: 70px;
    background-color: white;
    z-index: 10;
  }
  .scroll-wrapper {
    width: 100%;
    height: 100vh;
    z-index: 50;
    .content {
      display: flex;
      position: relative;
      width: auto;
      height: 100vh;
      .main-layer {
        width: auto;
        height: 100%;
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        z-index: 10;
        .layer-bg {
          /* padding: 20px; */
          /* flex: 0 0 1067px; */
          width: 100vw;
          height: 100vh;
          /* background-image: url("./img/PALALLAX_NIGHT/layer_01_1920 x 1080.png");
          background-size: auto 100%; */
        }
      }
    }
  }
}
</style>
