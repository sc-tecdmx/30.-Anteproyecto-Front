<template>
  <div>
    <!-- Header Fijo -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" @click="toggleSidebar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Menú Desplegable en el Header -->
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ username }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#" @click="viewProfile">Ver Perfil</a></li>
                <li><a class="dropdown-item" href="#" @click="logout">Cerrar Sesión</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenido Principal con Margen Superior para el Header Fijo -->
    <div class="main-content" :class="{ 'sidebar-reduced': sidebarReduced }">
      <div class="container-fluid">
        <!-- Menú Lateral -->
        <aside class="sidebar">
          <div class="logo-container">
            <!-- Logo de la Empresa -->
            <img src="path/to/logo.png" alt="Logo" class="logo" />
          </div>
          <div class="menu-toggle" @click="toggleSidebar">
            <!-- Icono de Menú de Hamburguesa -->
            <i class="bi bi-list"></i>
          </div>
          <!-- Opciones del Menú Lateral -->
          <ul class="menu">
            <li><i class="bi bi-house-door"></i> Inicio</li>
            <li><i class="bi bi-file-earmark-text"></i> Documentos</li>
            <!-- Agrega más opciones según sea necesario -->
          </ul>
        </aside>

        <!-- Contenido Principal -->
        <div class="content">
          <!-- Contenido de la Página -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarReduced: false,
      username: "Usuario Demo", // Reemplaza con el nombre de usuario real
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarReduced = !this.sidebarReduced;
    },
    viewProfile() {
      // Lógica para ver el perfil del usuario
      console.log("Ver Perfil");
    },
    logout() {
      // Lógica para cerrar sesión
      console.log("Cerrar Sesión");
    },
  },
};
</script>

<style scoped>
/* Estilos del Menú Lateral */
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #343a40; /* Color de fondo del menú lateral */
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 60px; /* Altura del Header Fijo */
  transition: width 0.3s;
}

/* Estilos del Logo de la Empresa */
.logo-container {
  text-align: center;
  padding: 20px 0;
}

.logo {
  width: 80px; /* Ajusta según el tamaño del logo */
}

/* Estilos del Menú Hamburguesa */
.menu-toggle {
  cursor: pointer;
  text-align: center;
  padding: 10px;
  font-size: 20px;
  background-color: #343a40; /* Color de fondo del icono de hamburguesa */
}

/* Estilos de la Lista de Opciones del Menú Lateral */
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  padding: 10px;
  cursor: pointer;
}

/* Estilos del Contenido Principal con Margen Superior */
.content {
  margin-top: 60px; /* Altura del Header Fijo */
  transition: margin-left 0.3s;
}

/* Estilos cuando el Menú Lateral está Reducido */
.sidebar-reduced .sidebar {
  width: 80px;
}

.sidebar-reduced .content {
  margin-left: 80px;
}

.sidebar-reduced .menu-toggle {
  font-size: 24px;
}

/* Estilos del Menú Desplegable en el Header */
.navbar-nav .dropdown-menu {
  background-color: #343a40; /* Color de fondo del menú desplegable */
  border: none;
}

.navbar-nav .dropdown-menu a {
  color: white;
}

.navbar-nav .dropdown-menu a:hover {
  background-color: #202529; /* Color de fondo al pasar el mouse sobre una opción */
}
</style>
