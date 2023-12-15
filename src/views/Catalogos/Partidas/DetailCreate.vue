<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Asociar capítulo a partida</p>
                        </div>
                    </div>
                     <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="mySelect" class="form-label">Capítulo</label>
                                    <select v-model="split.capitulo_id" class="form-select" id="capitulo_id">
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option v-for="chapter in chapters" :key="chapter.id" :value="chapter.id">
                                            {{ chapter.capitulo }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Número</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="description"
                                        id="description"
                                        v-model="split.numero"
                                        placeholder="Número"
                                        required
                                    />
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
                            </div>
                            <div class="mt-3">
                                <argon-button type="submit" color="primary">
                                    Guardar
                                </argon-button>
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
import ArgonButton from "@/components/ArgonButton.vue";
import Swal from 'sweetalert2';
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'DetailCreate',
    components: { ArgonButton },
    setup() {
        const route = useRoute();
        const split = ref({
            partida_id: route.params.id,
            capitulo_id: '',
            numero: '',
            descripcion: ''
        });
        const chapters = ref([]);

        const router = useRouter();

        const getChapters = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/capitulos`);
                chapters.value = response.data;
            } catch (error) {
                console.log(error);
            }
        }

        const store = async () => {
            await axios.post(`${process.env.VUE_APP_API_URL}/capitulos-partidas`, split.value)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'La partida ha sido guardada correctamente',
                        'success'
                    );
                    router.push('/catalogos/partidas');
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

        onMounted(() => {
            getChapters();
        });

        return {
            split,
            store,
            chapters
        }
    }
}
</script>

<style>

</style>