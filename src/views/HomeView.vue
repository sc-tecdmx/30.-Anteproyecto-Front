<template>
  <div class="home">
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">anteproyecto</h2>
                  <form @submit.prevent="login">
                    <div class="form-outline form-white mb-4">
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        v-model="credentials.username"
                        label="Email"
                      />
                      <label class="form-label" for="typeEmailX">Usuario</label>
                    </div>
                    <div class="form-outline form-white mb-4">
                      <input
                        type="password"
                        class="form-control form-control-lg"
                        v-model="credentials.password"
                      />
                      <label class="form-label" for="typePasswordX">Password</label>
                    </div>
                    <div class="form-outline form-white mb-4">
                      <select v-model="credentials.exercise" class="form-select" id="exercise" @change="getScenarios()">
                          <option :value="null" disabled>Selecciona una opción</option>
                          <option v-for="exercise in exercises" :key="exercise.id" :value="exercise.id">
                              {{ exercise.ejercicio }}
                          </option>
                      </select>
                      <label class="form-label" for="exercise">Ejercicio</label>
                    </div>
                    <div class="form-outline form-white mb-4">
                      <select v-model="credentials.scenario" class="form-select" id="scenario">
                          <option :value="null" disabled>Selecciona una opción</option>
                          <option v-for="scenario in scenarios" :key="scenario.id" :value="scenario.id">
                              {{ scenario.escenario }}
                          </option>
                      </select>
                      <label class="form-label" for="exercise">Escenario</label>
                    </div>
                    <!--<p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">¿Olvidaste tu contraseña?</a></p>-->
                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
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
</style>
