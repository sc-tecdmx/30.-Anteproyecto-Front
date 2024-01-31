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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(month, index) in months" :key="index">
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0 text-center">{{ month.mes.descripcion }}</p>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" v-model="months[index].costo">
                                        </td>                                    
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12 text-end">
                                <button class="btn btn-success" @click="updateExecution()">
                                    Guardar
                                </button>
                            </div>
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
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DetailAgreement from '@/components/DetailAgreement.vue';
import Swal from 'sweetalert2';

export default {
    name: 'Index',
    components: { DetailAgreement },
    setup(props, context) {
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
                context.emit('loading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}`)
                agreement.value = response.data;
            } catch (error) {
                console.error(error);
            } finally {
                context.emit('loading', false);
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

        const updateExecution = async () => {
            context.emit('loading', true);
            await axios.put(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}/ejecucion`, months.value)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'La ejecución del contrato ha sido guardada correctamente',
                        'success'
                    );
                    router.push(`/contratos/${route.params.id}/ejecucion`);
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire(
                        'Error!',
                        'Hubo un error al guardar la información',
                        'error'
                    );
                })
                .finally(() => {
                    context.emit('loading', false);
                })
        }

        const add = () => {
            router.push(`/contratos/${route.params.id}/ejecucion/crear`)
        }

        const back = () => {
            router.push('/contratos')
        }

        watch(months, (newMonths, oldMonths) => {
            calculateTotal();
        }, { deep: true });

        const calculateTotal = () => {
            let totalValue = 0;
            months.value.forEach(month => {
                totalValue += parseFloat(month.costo) || 0;
            });

            total.value = totalValue.toFixed(2);
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