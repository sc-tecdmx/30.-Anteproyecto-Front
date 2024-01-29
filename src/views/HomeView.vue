<template>
  <div class="home">
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card" style="border-radius: 1rem;">
              <div class="card-body p-5">
                <div class="mt-md-4">
                  <h2 class="fw-bold mb-2 text-center">Iniciar sesión</h2>
                  <p class="text-center">Ingresar usuario y contraseña para continuar</p>
                  <form @submit.prevent="login">
                    <div class="form-outline form-white mb-4">
                      <label class="form-label" for="typeEmailX">Usuario</label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        v-model="credentials.username"
                        label="Email"
                      />
                    </div>
                    <div class="form-outline form-white mb-4">
                      <label class="form-label" for="typePasswordX">Contraseña</label>
                      <input
                        type="password"
                        class="form-control form-control-lg"
                        v-model="credentials.password"
                      />
                    </div>
                    <div class="form-outline form-white mb-4">
                      <label class="form-label" for="exercise">Ejercicio</label>
                      <select v-model="credentials.exercise" class="form-select" id="exercise" @change="getScenarios()">
                          <option :value="null" disabled>Selecciona una opción</option>
                          <option v-for="exercise in exercises" :key="exercise.id" :value="exercise.id">
                              {{ exercise.ejercicio }}
                          </option>
                      </select>
                    </div>
                    <div class="form-outline form-white mb-4">
                      <label class="form-label" for="exercise">Escenario</label>
                      <select v-model="credentials.scenario" class="form-select" id="scenario">
                          <option :value="null" disabled>Selecciona una opción</option>
                          <option v-for="scenario in scenarios" :key="scenario.id" :value="scenario.escenario">
                              {{ scenario.escenario }}
                          </option>
                      </select>
                    </div>
                    <div class="row">
                      <div class="col-12 text-center">
                        <button class="btn btn-azul btn-lg" type="submit">Iniciar sesión</button>
                      </div>
                    </div>
                    <!--<p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">¿Olvidaste tu contraseña?</a></p>-->
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router' ;
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {},
  setup() {
    const credentials = ref({
      username: '',
      password: '',
      exercise: '',
      scenario: '',
    });
    const exercises = ref([]);
    const scenarios = ref([]);

    const store = useStore(); // Obtiene la referencia al store global
    const router = useRouter();

    const getExercises = async () => {
      try {
          const response = await axios.get(`${process.env.VUE_APP_API_URL}/ejercicios/activos`);
          exercises.value = response.data;
      } catch (error) {
          console.log(error);
      }
    };

    const getScenarios = async () => {
      try {
          const response = await axios.get(`${process.env.VUE_APP_API_URL}/ejercicios/${credentials.value.exercise}/escenarios`);
          scenarios.value = response.data;
      } catch (error) {
          console.log(error);
      }
    }

    const login = () => {
      // Llama a la acción 'login' del store Vuex con las credenciales
      store.dispatch('login', credentials.value)
        .then(() => {
          console.log('Inicio de sesión exitoso');
          router.push({ name: 'dashboard' });
        })
        .catch(error => {
          console.error('Error de inicio de sesión:', error);
        });
    };

    onMounted(() => {
      getExercises();
    });

    return {
      credentials,
      exercises,
      scenarios,
      getScenarios,
      login
    };
  }
}
</script>

<style scoped>
.gradient-custom {
  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}
.btn-azul {
  background: #194891;
  color: white;
}
</style>
