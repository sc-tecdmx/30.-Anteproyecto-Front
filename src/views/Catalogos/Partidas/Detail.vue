<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="row">
                            <div class="col-6 d-flex align-items-center">
                                <h6 class="mb-0">Partidas</h6>
                            </div>
                            <div class="col-6 text-end">
                                <argon-button color="dark" variant="gradient" @click="add()">
                                    <i class="fas fa-plus me-2"></i>
                                    Agregar
                                </argon-button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                            <thead class="text-center">
                                <tr>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No.</th>
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                >Capítulo</th>
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                >
                                    Número
                                </th>
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                >
                                    Descripción
                                </th>
                                <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(split, index) in splits" :key="index">
                                    <td class="text-center">
                                        <p class="text-xs font-weight-bold mb-0">{{ split.id }}</p>
                                    </td>
                                    <td>
                                        <p class="text-xs font-weight-bold mb-0">{{ split.capitulos.capitulo }}</p>
                                    </td>
                                    <td class="text-center">
                                        <p class="text-xs font-weight-bold mb-0">{{ split.numero }}</p>
                                    </td>
                                    <td class="text-center">
                                        <p class="text-xs font-weight-bold mb-0">{{ split.descripcion }}</p>
                                    </td>
                                    <td class="align-middle">
                                        <div class="row">
                                            <div class="col-4">
                                                <button class="p-0 btn btn-link text-dark fixed-plugin-close-button" @click="edit(split.id)">
                                                    <i class="fa fa-pencil"></i>
                                                </button>
                                            </div>
                                            <div class="col-4">
                                                <button class="p-0 btn btn-link text-dark fixed-plugin-close-button" @click="del(agreement.id)">
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
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

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'Detail',
    components: { ArgonButton },
    setup() {
        const splits = ref([]);
        const router = useRouter();
        const route = useRoute();

        const getSplits = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/capitulos-partidas/detalle/${route.params.id}`)
                splits.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        const add = (id) => {
            router.push(`/catalogos/partidas/${id}/capitulos/crear`)
            // console.log('add')
        }
        
        const edit = (id) => {
            // router.push(`/catalogos/partidas/${id}/editar`)
            console.log(id)
        }

        const del = (id) => {
            // router.push('/catalogos/partidas/crear')
            console.log(id)
        }

        onMounted(() => {
            getSplits();
        })

        return {
            splits,
            add,
            edit,
            del
        }
    }
}

</script>