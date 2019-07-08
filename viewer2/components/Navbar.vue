<template>
  <nav class="navbar is-white" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <Logo/>
      <div class="navbar-burger" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu" id="navMenu">
      <div class="navbar-end">
        <nuxt-link to="/" class="navbar-item">トップ</nuxt-link>
        <nuxt-link to="/about" class="navbar-item">About</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>
