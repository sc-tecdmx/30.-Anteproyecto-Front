<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Crear concepto</p>
                        </div>
                    </div>
                     <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="mySelect" class="form-control-abel">Capítulo</label>
                                    <select v-model="concept.capitulo_id" class="form-select" id="capitulo_id">
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option v-for="chapter in chapters" :key="chapter.id" :value="chapter.id">
                                            {{ chapter.capitulo }} - {{ chapter.descripcion }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Descripción</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="descripcion"
                                        id="descripcion"
                                        v-model="concept.descripcion"
                                        placeholder="Descripción"
                                        required
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Número</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="numero"
                                        id="numero"
                                        v-model="concept.numero"
                                        placeholder="Número"
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
    setup(props, context) {
        const concept = ref({
            capitulo_id: '',
            descripcion: '',
            numero: ''
        });
        const chapters = ref([]);
        const measurements = ref([]);

        const route = useRouter();

        const getChapters = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/capitulos`);
                chapters.value = response.data;
            } catch (error) {
                console.log(error);
            }
        };

        const store = async () => {
            context.emit('loading', true);
            await axios.post(`${process.env.VUE_APP_API_URL}/conceptos`, concept.value)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'El concepto ha sido guardado correctamente',
                        'success'
                    );
                    route.push('/catalogos/conceptos');
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

        const cancel = () => {
            route.push('/catalogos/conceptos');
        }

        onMounted(() => {
            getChapters();
        });

        return {
            concept,
            chapters,
            measurements,
            store,
            cancel
        }
    }
}
</script>

<style>

</style>