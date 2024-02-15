<template>
    <div class="dropdown text-end dropMenu">
        <a
            href="javascript:;"
            id="ddluser"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            class="btn dropdown-toggle btn-icon-only user nav-link">
                <img src="@/assets/images/tecdmx/profile_90x90.png" width="28" height="28" alt="avatar" />
        </a>
        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="ddluser">
            <!--<li role="presentation">
                <router-link to="#" class="dropdown-item">
                    <font-awesome-icon icon="user" />
                    Perfil
                </router-link>
            </li>
            <li role="presentation">
                <router-link to="#" class="dropdown-item">
                    <vue-feather type="message-square"></vue-feather>
                    Mensajes
                </router-link>
            </li> -->
            <li role="presentation">
                <button @click="logout()" class="dropdown-item">
                    <font-awesome-icon icon="right-from-bracket" />
                    Salir
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router' ;

export default {
  name: 'Perfil',
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = () => {
        store.dispatch('logout')
        .then(() => {
          console.log('Cierre de sesión exitoso');
          router.push({ path: '/' })
        })
        .catch(error => {
            router.push({ path: '/' })
            console.error('Error de cierre de sesión:', error);
        });
    }

    return {
        logout
    }
  }
}
</script>

<style scoped>
.dropMenu {
    color: white;
}
</style>