<template>
  <div>
    <div class="menu">
      <div ref="menuIcon" class="icon">
        <span/>
        <span/>
        <span/>
      </div>
    </div>
    <ul class="nav">
      <li>
        <nuxt-link @click.native="toggleMenu" to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link @click.native="toggleMenu" to="/lightning">Lightning</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  const ACTIVE_CLASS = 'menu-active';
  export default {
    name: 'MenuComponent',

    mounted() {
      const icon = this.$refs.menuIcon;
      const wrapper = document.querySelector('.wrapper');
      icon.addEventListener('click', () => {
        const isActive = wrapper.classList.contains(ACTIVE_CLASS);
        if(isActive) wrapper.classList.remove(ACTIVE_CLASS);
        else wrapper.classList.add(ACTIVE_CLASS);
      })
    },

    methods: {
      toggleMenu() {
        const wrapper = document.querySelector('.wrapper');
        wrapper.classList.remove(ACTIVE_CLASS);
      }
    },
  }
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  z-index: 99;
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background: transparent;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    > span {
      width: 40px;
      height: 5px;
      background: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      &:nth-child(1) {
        transform: translate(-50%, -15px);
      }
      &:nth-child(3) {
        transform: translate(-50%, 10px);
      }
    }
  }
}
.nav {
  width: 400px;
  height: 100vh;
  background: transparent;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  padding-top: 90px;
  text-align: right;
  li {
    margin: 20px 25px;
    > a {
      color: white;
      font-weight: 500;
      text-decoration: none;
      font-size: 18px;
    }
  }
}
</style>
