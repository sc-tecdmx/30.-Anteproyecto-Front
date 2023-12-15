<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="row">
                            <div class="col-8 text-start">
                                <h3>Ejecución del contrato</h3>
                            </div>
                            <div class="col-2 text-end">
                                <button class="btn btn-danger" @click="back()">
                                    Regresar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2" style="margin-left: 2%; margin-right: 2%;">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="ml-md">Información del contrato</h6>
                            </div>
                        </div>
                        <detail-agreement 
                            :agreement="agreement"
                        />
                        <div class="row mt-3">
                            <div class="col-6">
                                <p><b>Total Contrato: </b>${{ new Intl.NumberFormat('es-mx').format(agreement.importe) }}</p>
                            </div>
                            <div class="col-6">
                                <p><b>Total Ejecutado: </b>${{ new Intl.NumberFormat('es-mx').format(total) }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 d-flex align-items-center ml-10">
                                <h6 class="mb-0">Ejecución</h6>
                            </div>
                            <!--<div class="col-6 text-end">
                                <button class="btn btn-dark" color="dark" variant="gradient" @click="add()">
                                    <i class="fas fa-plus me-2"></i>
                                    Agregar
                                </button>
                            </div>-->
                        </div>
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Mes</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Costo</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(month, index) in months" :key="index">
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0 text-center">{{ month.mes.descripcion }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0 text-center">${{ new Intl.NumberFormat('es-mx').format(month.costo) }}</p>
                                        </td>                                    
                                        <td>
                                            <button class="p-0 btn btn-link text-dark fixed-plugin-close-button" @click="updateExecution(month.id)">
                                                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .ancho-fijo {
        width: 50px !important;
    } 
</style>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DetailAgreement from '@/components/DetailAgreement.vue';

export default {
    name: 'Index',
    components: { DetailAgreement },
    setup() {
        const route = useRoute();
        const agreement = ref({
            id: '',
            urg: '',
            urg_nombre: '',
            partida: '',
            descripcion_partida: '',
            concepto: '',
            concepto_descripcion: '',
            capitulo: '',
            capitulo_descripcion: '',
            clave: '',
            descripcion: ''
        });
        const total = ref();
        const months = ref([]);
        const router = useRouter();

        const getExecution = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}/ejecucion`)
                months.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        const getAgreement = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}`)
                agreement.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        const getTotalExecuted = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}/total`)
                total.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        const updateExecution = async (execution) => {
            router.push(`/contratos/ejecucion/${execution}/editar`)
        }

        const add = () => {
            router.push(`/contratos/${route.params.id}/ejecucion/crear`)
        }

        const back = () => {
            router.push('/contratos')
        }

        onMounted(() => {
            getExecution();
            getAgreement();
            getTotalExecuted();
        })

        return {
            months,
            agreement,
            total,
            add,
            back,
            updateExecution
        }
    }
}

</script>