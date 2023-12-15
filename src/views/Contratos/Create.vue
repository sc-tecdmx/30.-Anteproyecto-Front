<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Crear contrato</p>
                        </div>
                    </div>
                     <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="mySelect" class="form-control-label">Partida</label>
                                    <select v-model="agreement.partida_id" class="form-select" id="partida_id">
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option v-for="split in splits" :key="split.id" :value="split.id">
                                            {{ split.numero }} - {{ split.descripcion }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Clave</label>
                                    <select v-model="agreement.clave" class="form-select" id="clave">
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option v-for="key in keys" :key="key.clave" :value="key.clave">
                                            {{ key.clave }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Descripción</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="description"
                                        id="description"
                                        v-model="agreement.descripcion"
                                        placeholder="Descripción"
                                        required
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Importe</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="importe"
                                        id="importe"
                                        v-model="agreement.importe"
                                        placeholder="Costo"
                                        required
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="mySelect" class="form-control-label">Parcialidad</label>
                                    <select v-model="agreement.parcialidad" class="form-select" id="parcialidad">
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option value="Una sola exhibicion">Una sola exhibición</option>
                                        <option value="Mensual">Mensual</option>
                                        <option value="Bimestral">Bimestral</option>
                                        <option value="Trimestral">Trimestral</option>
                                        <option value="Cuatrimestral">Cuatrimestral</option>
                                        <option value="Semestral">Mensual</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="mySelect" class="form-control-label">Tipo</label>
                                    <select v-model="agreement.tipo" class="form-select" id="tipo">
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option value="F">Fijo</option>
                                        <option value="V">Variable</option>
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
import { useRouter } from 'vue-router';

export default {
    name: 'Create',
    components: { },
    setup() {
        const agreement = ref({
            partida_id: '',
            descripcion: '',
            importe: 0.0,
            clave: '',
            parcialidad: '',
            tipo: ''
        });
        const splits = ref([]);
        const keys = ref([]);

        const route = useRouter();

        const getSplits = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/partidas`);
                splits.value = response.data;
            } catch (error) {
                console.log(error);
            }
        };

        const getKeys = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/claves-programaticas`);
                keys.value = response.data;
            } catch (error) {
                console.log(error);
            }
        }

        const store = async () => {
            await axios.post(`${process.env.VUE_APP_API_URL}/contratos`, agreement.value)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'El contrato ha sido guardado correctamente',
                        'success'
                    );
                    route.push('/contratos');
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
            route.push('/contratos')
        }

        onMounted(() => {
            getSplits();
            getKeys();
        });

        return {
            agreement,
            splits,
            keys,
            store,
            cancel
        }
    }
}
</script>

<style>

</style>