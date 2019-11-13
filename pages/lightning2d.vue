<template>
  <div class="lightning">
    <canvas id="lightning"></canvas>
  </div>
</template>

<script>
import Lightning from '../assets/js/Lightning';

export default {
  name: "LightningPage",

  mounted() {
    const ln = new Lightning('#lightning');
    if(ln.isCanvasSupported) {
      ln.setupRAF();
      ln.init();
    }
  },
}
</script>

<style lang="scss" scoped>
.lightning {
  background: url('~assets/images/lightning_bg.jpg') center top no-repeat;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, #000, #151515);
    opacity: 0.7;
  }
  canvas {
    position: relative;
    display: block;
    z-index: 2;
  }
}
</style>
