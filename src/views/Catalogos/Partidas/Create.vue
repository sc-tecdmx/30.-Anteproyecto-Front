<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Crear partida</p>
                        </div>
                    </div>
                     <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="mySelect" class="form-control-label">Concepto</label>
                                    <select v-model="split.concepto_id" class="form-select" id="concepto_id">
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option v-for="concept in concepts" :key="concept.id" :value="concept.id">
                                            {{ concept.numero }} - {{ concept.descripcion }}
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
                                        v-model="split.descripcion"
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
                                        v-model="split.numero"
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
import { useRouter } from 'vue-router';

export default {
    name: 'Create',
    components: { },
    setup(props, context) {
        const concepts = ref([]);
        const split = ref({
            concepto_id: '',
            descripcion: '',
            numero: ''
        });

        const route = useRouter();

        const getConcepts = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/conceptos`);
                concepts.value = response.data
            } catch (e) {
                Swal.fire(
                    'Error!',
                    'Hubo un error al guardar la información',
                    'error'
                );
            }
        }

        const store = async () => {
            context.emit('loading', true);
            await axios.post(`${process.env.VUE_APP_API_URL}/partidas`, split.value)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'La partida ha sido guardada correctamente',
                        'success'
                    );
                    route.push('/catalogos/partidas');
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
            route.push('/catalogos/partidas');
        }

        onMounted(() => {
            getConcepts();
        })

        return {
            concepts,
            split,
            store,
            cancel
        }
    }
}
</script>

<style>

</style>