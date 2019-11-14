<template>
  <div class="lake">

  </div>
</template>

<script>
  export default {
    name: 'SurfaceLakes',

    mounted() {
      import('@/assets/js/Lake').then(res => {
        const Lake = res.default;
        let lake = new Lake({
          width: 1000,
          height: 800,
          surface: require('@/assets/images/surface.jpg'),
          displacement: require('@/assets/images/displacement.jpg')
        });
        this.$el.appendChild(lake.view);
      });
    },
  }
</script>

<style lang="scss" scoped>
.lake {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  canvas {
    display: block;
    max-width: 100%;
  }
}
</style>
