<template>
  <div id="app">
    <Loading :loading="loading" />
    <Header v-if="isLoggedIn" :isSidebarOpen="isSidebarOpen" :onClick="toggleSidebar"></Header>
    <Menu v-if="isLoggedIn" :isSidebarOpen="isSidebarOpen"></Menu>
    <div class="content-container" v-if="isLoggedIn">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-xxl-12 col-12">
            <router-view :loading="loading" @loading="setLoading"/>
          </div>
        </div>
      </div>
    </div>
    <router-view v-else></router-view>
    <Footer v-if="isLoggedIn" />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';
import Loading from './components/Loading.vue';
import { useStore } from 'vuex'; 

export default {
  components: {
    Header,
    Menu,
    Footer,
    Loading
  },
  setup() {
    const store = useStore();

    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    const isSidebarOpen = computed(() => store.getters.isSidebarOpen);

    const loading = ref(false);
    
    const toggleSidebar = () => {
      store.commit('toggleSidebar');
    }

    const setLoading = (value) => {
      loading.value = value;
    };

    return {
      isLoggedIn,
      isSidebarOpen,
      loading,
      toggleSidebar,
      setLoading
    }
  }
}
</script>

<style scoped>
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.content-container {
  margin-left: 250px; /* Ajusta según el ancho del menú lateral */
  padding-top: 100px; /* Ajusta según la altura del encabezado */
}
</style>
