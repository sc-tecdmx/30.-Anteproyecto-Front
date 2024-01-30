<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Crear detalle</p>
                        </div>
                    </div>
                     <div class="card-body">
                        <detail-agreement 
                            :agreement="agreement"
                        />
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Cantidad</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="cantidad"
                                        id="cantidad"
                                        v-model="detail.cantidad"
                                        placeholder="Cantidad"
                                        required
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Costo Unitario</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="costo_unitario"
                                        id="costo_unitario"
                                        v-model="detail.costo_unitario"
                                        placeholder="Costo Unitario"
                                        required
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="mySelect" class="form-label">Unidad de medida</label>
                                    <select v-model="detail.unidad_medida_id" class="form-select" id="measurement_unit_id">
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option v-for="measurement in measurements" :key="measurement.id" :value="measurement.id">
                                            {{ measurement.descripcion }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-6 text-start">
                                    <button class="btn btn-danger" @click="cancel()">
                                        Cancelar
                                    </button>
                                </div>
                                <div class="col-6 text-end">
                                    <button class="btn btn-primary" type="submit">
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
import { useRoute, useRouter } from 'vue-router';
import DetailAgreement from '@/components/DetailAgreement.vue';

export default {
    name: 'CreateDetail',
    components: { DetailAgreement },
    setup() {
        const detail = ref({
            cantidad: '',
            costo_unitario: 0.0,
            unidad_medida_id: ''
        });
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
        const detailExists = ref(false);
        const measurements = ref([]);

        const route = useRoute();
        const router = useRouter();

        const getAgreement = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}`)
                if (response.data.cantidad) {
                    detailExists.value = true;
                    detail.cantidad = response.data.cantidad;
                    detail.costo_unitario = response.data.costo_unitario;
                    detail.unidad_medida_id = response.data.unidad_medida_id;
                }
                agreement.value = response.data
            } catch (error) {
                console.error(error);
            }
        }

        const getMeasurementsUnits = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/unidades-medida`);
                measurements.value = response.data;
            } catch (error) {
                console.log(error);
            }
        }

        const store = async () => {
            if (detailExists) {
                await axios.put(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}/detalle`, detail.value)
                    .then(() => {
                        Swal.fire(
                            '¡Éxito!',
                            'El detalle ha sido guardado correctamente',
                            'success'
                        );
                        router.push('/contratos');
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire(
                            'Error!',
                            'Hubo un error al guardar la información',
                            'error'
                        );
                    })
            } else {
                await axios.post(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}/detalle`, detail.value)
                    .then(() => {
                        Swal.fire(
                            '¡Éxito!',
                            'El detalle ha sido guardado correctamente',
                            'success'
                        );
                        router.push('/contratos');
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
        }

        const cancel = () => {
            router.push('/contratos')
        }

        onMounted(() => {
            getMeasurementsUnits();
            getAgreement();
        });

        return {
            detail,
            measurements,
            agreement,
            store,
            cancel
        }
    }
}
</script>

<style>

</style>