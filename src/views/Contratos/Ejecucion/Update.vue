<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Ejecución contrato</p>
                        </div>
                    </div>
                     <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="mySelect" class="form-label">Mes</label>
                                    <select v-model="execution.mes_id" class="form-select" id="split_id" disabled>
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option v-for="month in months" :key="month.id" :value="month.id">
                                            {{ month.abreviatura }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Costo</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="costo"
                                        id="costo"
                                        v-model="execution.costo"
                                        placeholder="Costo"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-6 text-start">
                                    <button class="btn btn-danger" @click.prevent="cancel()">
                                        Cancelar
                                    </button>
                                </div>
                                <div class="col-6 text-end">
                                    <button class="btn btn-primary" type="submit" color="primary">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'CreateExecution',
    components: {  },
    setup() {
        const route = useRoute();
        const execution = ref({
            contrato_id: route.params.id,
            mes_id: '',
            costo: 0.0
        });
        const months = ref([]);

        const router = useRouter();

        const getMonths = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}/ejecucion/meses`);
                months.value = response.data;
            } catch (error) {
                console.log(error);
            }
        };

        const getExecution = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/ejecucion/${route.params.id}`);
                execution.value = response.data;
            } catch (error) {
                console.log(error);
            }
        }

        const store = async () => {
            await axios.put(`${process.env.VUE_APP_API_URL}/contratos/ejecucion/${route.params.id}`, execution.value)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'La ejecución del contrato ha sido actualizada correctamente',
                        'success'
                    );
                    router.push(`/contratos`);
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire(
                        'Error!',
                        'Hubo un error al guardar la información',
                        'error'
                    );
                })
        }

        const cancel = () => {
            router.push(`/contratos`)
        }

        onMounted(() => {
            getMonths();
            getExecution();
        });

        return {
            execution,
            months,
            store,
            cancel
        }
    }
}
</script>

<style>

</style>