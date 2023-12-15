<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Crear unidad de medida</p>
                        </div>
                    </div>
                     <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-12">
                                    <label for="example-text-input" class="form-control-label"
                                    >Descripción</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="descripcion"
                                        id="descripcion"
                                        v-model="measurement.descripcion"
                                        placeholder="Descripción"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-6">
                                    <button class="btn btn-danger" @click="cancel()">
                                        Cancelar
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-dark" type="submit" color="primary">
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
        const measurement = ref({
            descripcion: ''
        });

        const route = useRouter();

        const store = async () => {
            await axios.post(`${process.env.VUE_APP_API_URL}/unidades-medida`, measurement.value)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'La unidad de medida ha sido guardada correctamente',
                        'success'
                    );
                    route.push('/catalogos/unidades-medida');
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
            route.push('/catalogos/unidades-medida')
        }

        onMounted(() => {})

        return {
            measurement,
            store,
            cancel
        }
    }
}
</script>

<style>

</style>