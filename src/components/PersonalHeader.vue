<!-- Loading.vue -->
<template>
  <div class="row">
    <div class="col-12">
        <p class="text-center h2">ANTEPROYECTO</p>
    </div>
    <div class="col-6">
        <p class="h5 text-center">Ejercicio {{ year }}</p>
    </div>
    <div class="col-6">
        <p class="h5 text-center">Escenario {{ scenario }}</p>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'; 
import { computed, ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'PersonalHeader',
  setup() {
    const store = useStore();
    const year = ref('');

    const exercise = computed(() => store.getters.getExercise);

    const scenario = computed(() => store.getters.getScenario);

    const getExerciseInfo = async () => {
        try {
            console.log(exercise)
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/ejercicios/${exercise.value}`);
            year.value = response.data.ejercicio;
        } catch (error) {
            console.error('Hubo un error al consultar el ejercicio', error);
        }
    }

    onMounted(() => {
        getExerciseInfo();
    });

    return {
      exercise,
      scenario,
      year
    }
  }
};
</script>