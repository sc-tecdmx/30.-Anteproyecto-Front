<template>
  <ul class="navbar-nav theme-brand flex-row justify-content-center brandLogo">
    <li class="nav-item theme-logo">
        <router-link to="/dashboard">
            <img
                width="110"
                height="40"
                src="@/assets/images/tecdmx/logo_tecdmx.png"
                class="navbar-logo"
                alt="TECDMX"
            >
        </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BrandLogo',
}
</script>

<style scoped>
.brandLogo {
  width: 240px;
}
</style>