<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Crear versión</p>
                        </div>
                    </div>
                     <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Importe</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="importe"
                                        id="importe"
                                        v-model="version.importe"
                                        placeholder="Importe"
                                        required
                                    />
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

export default {
    name: 'Create',
    components: { },
    setup() {
        const version = ref({
            importe: 0.0
        });

        const route = useRoute();
        const router = useRouter();

        const store = async () => {
            await axios.post(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}/version`, version.value)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'La versión del contrato ha sido guardado correctamente',
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

        const cancel = () => {
            router.push(`/contratos/${route.params.id}/versiones`)
        }

        onMounted(() => {});

        return {
            version,
            store,
            cancel
        }
    }
}
</script>

<style>

</style>