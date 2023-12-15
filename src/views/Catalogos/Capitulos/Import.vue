<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Importar</p>
                        </div>
                    </div>
                     <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label"
                                    >Archivo</label>
                                    <input
                                        type="file"
                                        class="form-control"
                                        name="archivo"
                                        id="archivo"
                                        placeholder="Archivo"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-6">
                                    <button class="btn btn-danger" color="primary" @click="cancel">
                                        Cancelar
                                    </button>
                                </div>
                                <div class="col-6">
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
import { useRouter } from 'vue-router';

export default {
    name: 'Create',
    components: { },
    setup() {
        const file = ref();

        const route = useRouter();

        const store = async () => {
            // const data = new FormData()
            // data.append(file) = file;
            await axios.post(`${process.env.VUE_APP_API_URL}/contratos/importar`, file)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'El concepto ha sido guardado correctamente',
                        'success'
                    );
                    route.push('/catalogos/capitulos');
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
            route.push('/catalogos/capitulos');
        }

        onMounted(() => {});

        return {
            file,
            store,
            cancel
        }
    }
}
</script>

<style>

</style>