<template>
  <div class="text-start" :class="{ 'sidebar-container': true, 'collapsed': !isSidebarOpen }">
    <nav class="nav flex-column" v-if="isSidebarOpen">
      <router-link to="/dashboard" class="nav-link">
        <font-awesome-icon icon="gauge" />
        Dashboard
      </router-link>
      <router-link to="/contratos" class="nav-link">
        <font-awesome-icon icon="file-lines" />
        Contratos
      </router-link>
      <router-link to="/reportes" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <font-awesome-icon icon="file-export" />
        Reportes
      </router-link>
      <router-link to="/catalogos/capitulos" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <font-awesome-icon icon="bookmark" />
        Capítulos
      </router-link>
      <router-link to="/catalogos/conceptos" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <font-awesome-icon icon="arrows-to-circle" />
        Conceptos
      </router-link>
      <router-link to="/catalogos/partidas" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <font-awesome-icon icon="arrows-split-up-and-left" />
        Partidas
      </router-link>
      <!--<router-link to="/catalogos/unidades-medida" class="nav-link" v-if="user.rol != 2">
        <font-awesome-icon icon="weight-scale" />
        Unidades de Medida
      </router-link>-->
      <router-link to="/usuarios" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <font-awesome-icon icon="users" />
        Usuarios
      </router-link>
      <router-link to="/configuracion" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <font-awesome-icon icon="gear" />
        Configuración
      </router-link>
    </nav>
    <nav class="nav flex-column" v-else>
      <router-link to="/dashboard" class="nav-link" data-bs-toggle="tooltip" data-bs-placement="right" title="Tooltip on right">
        <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" title="Dashboard">
          <font-awesome-icon icon="gauge" />
        </span>
      </router-link>
      <router-link to="/contratos" class="nav-link">
        <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" title="Contratos">
          <font-awesome-icon icon="file-lines" />
        </span>
      </router-link>
      <router-link to="/reportesCosas" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" title="Reportes">
          <font-awesome-icon icon="file-export" />
        </span>
      </router-link>
      <router-link to="/catalogos/capitulos" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" title="Capítulos">
          <font-awesome-icon icon="bookmark" />
        </span>
      </router-link>
      <router-link to="/catalogos/conceptos" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" title="Conceptos">
          <font-awesome-icon icon="arrows-to-circle" />
        </span>
      </router-link>
      <router-link to="/catalogos/partidas" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" title="Partidas">
          <font-awesome-icon icon="arrows-split-up-and-left" />
        </span>
      </router-link>
      <!--<router-link to="/catalogos/unidades-medida" class="nav-link" v-if="user.rol != 2">
        <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" title="Unidades de medida">
          <font-awesome-icon icon="weight-scale" />
        </span>
      </router-link>-->
      <router-link to="/usuarios" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" title="Usuarios">
          <font-awesome-icon icon="users" />
        </span>
      </router-link>
      <router-link to="/configuracion" class="nav-link" v-if="user.rol == 1 || user.rol == 2 || user.rol == 3">
        <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" title="Configuración">
          <font-awesome-icon icon="gear" />
        </span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import { useStore } from 'vuex'; 
import { computed } from 'vue';
export default {
  name: 'Menu',
  props: {
    isSidebarOpen: Boolean,
  },
  setup(props) {
    const store = useStore();

    const user = computed(() => store.getters.userLogged);

    return {
      user
    }
  }
}
</script>

<style scoped>
.sidebar-container {
  width: 250px;
  height: 100vh;
  background-color: #194891;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 90px; /* Ajusta según la altura del encabezado */
}

.menu-section {
  font-size: 14px;
  font-weight: bold;
  color: #888;
  padding: 10px 20px;
}

.nav-link {
  color: white;
  padding: 10px;
}

.nav-link:hover {
  background-color: #fff;
}

.collapsed {
  width: 50px;
}
</style>