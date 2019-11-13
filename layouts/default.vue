<template>
  <div>
    <MenuComponent />
    <div class="wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
import MenuComponent from '@/components/Menu';
export default {
  components: {
    MenuComponent
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.wrapper {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  transition: 500ms;
  position: relative;
  z-index: 1;
  background: black;
  &.menu-active {
    transform: translateX(-400px);
    transform-origin: left;
    perspective: 400;
    perspective-origin: 100% 100%;
  }
}
</style>
