<template>
    <div class="header-container fixed-top bg-blue">
        <header class="header navbar navbar-expand-sm">
            <BrandLogo />

            <ul class="navbar-nav ms-md-4 ms-auto">
                <li class="nav-item theme-logo">
                    <button
                        class="sidebarCollapse nav-link"
                        data-placement="bottom"
                        @click="onClick"
                    >
                        <font-awesome-icon icon="bars" style="color: #ffffff" size="lg"/>
                    </button>
                </li>
            </ul>

            <div class="navbar-item flex-row ms-md-auto perfil">
                <Perfil />
            </div>
        </header>
    </div>
</template>

<script>
import BrandLogo from "@/components/BrandLogo.vue";
import Buscar from "@/components/Buscar.vue";
import Perfil from "@/components/Perfil.vue";

export default {
  name: 'Header',
  components: { BrandLogo, Buscar, Perfil },
  props: {
    isSidebarOpen: Boolean,
    toogleSidebar: Function
  },
  setup() {},
}
</script>

<style scoped>
.bg-blue {
    background-color: #194891;
}
/* Ajustes de estilo para el perfil */
.perfil {
    margin-right: 100px;
}
</style>