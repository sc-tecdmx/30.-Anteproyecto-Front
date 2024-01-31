<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="row mb-2">
                            <div class="col-6 d-flex align-items-center">
                                <h6 class="mb-0">Contratos</h6>
                            </div>
                            <div class="col-3 text-end">
                                <button class="btn btn-primary" color="dark" variant="gradient" @click="importar()">
                                    <i class="fas fa-plus me-2"></i>
                                    Importar Contratos
                                </button>
                            </div>
                            <div class="col-3 text-end">
                                <button class="btn btn-primary" color="dark" variant="gradient" @click="add()">
                                    <i class="fas fa-plus me-2"></i>
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2" style="margin-left: 2%; margin-right: 2%;">
                        <div class="row mb-3">
                            <div class="col-6">
                                <label for="searchField" class="form-label">Columna</label>
                                <select v-model="searchField" class="form-select" id="searchField">
                                    <option :value="null" disabled>Selecciona una opción</option>
                                    <option value="urg">URG</option>
                                    <option value="partida">Partida</option>
                                    <option value="capitulo">Capítulo</option>
                                    <option value="concepto">Concepto</option>
                                    <option value="clave">Clave</option>
                                </select>
                            </div>
                            <div class="col-6">
                                <label for="example-text-input" class="form-label">Valor a buscar</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="searchValue"
                                    id="searchValue"
                                    v-model="searchValue"
                                    placeholder="Valor a buscar"
                                    required
                                />
                            </div>
                        </div>
                        <div class="table-responsive p-0">
                            <EasyDataTable
                                :headers="headers"
                                :items="agreements"
                                :search-field="searchField"
                                :search-value="searchValue"
                                :sort-by="sortBy"
                                :sort-type="sortType"
                                multi-sort
                            >
                                <template #item-operation="item">
                                    <div class="row">
                                        <div class="col-3" v-if="user.rol == 1 || user.rol == 3">
                                            <button class="btn btn-secondary" @click="createDetail(item.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar Detalle">
                                                <font-awesome-icon icon="fa-solid fa-file-circle-plus" />
                                            </button>
                                        </div>
                                        <div class="col-3">
                                            <button class="btn btn-info" @click="detail(item.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver Información">
                                                <font-awesome-icon icon="fa-solid fa-info" />
                                            </button>
                                        </div>
                                        <div class="col-3">
                                            <button class="btn btn-primary" @click="edit(item.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar">
                                                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                            </button>
                                        </div>
                                        <div class="col-3">
                                            <button class="btn btn-success" @click="execution(item.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar ejecución">
                                                <font-awesome-icon icon="fa-solid fa-circle-play" />
                                            </button>
                                        </div>
                                    </div>
                                </template>
                            </EasyDataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>0101010102

<style>
    .ancho-fijo {
        width: 50px !important;
    } 
</style>

<script>
import axios from 'axios';
import { ref, onMounted, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';
import { useStore } from 'vuex'; 

export default {
    name: 'Index',
    components: {},
    setup(props, context) {
        const agreements = ref([]);
        const searchField = ref('');
        const searchValue = ref('');
        const store = useStore();

        const user = computed(() => store.getters.userLogged);

        const sortBy = ["urg", "partida", "capitulo", "concepto", "clave"];
        const sortType = ["desc", "asc"];

        const headers= [
            { text: "URG", value: "urg", sortable: true },
            { text: "PARTIDA", value: "partida", sortable: true},
            { text: "CAPÍTULO", value: "capitulo", sortable: true},
            { text: "CONCEPTO", value: "concepto", sortable: true},
            { text: "DESCRIPCIÓN", value: "descripcion"},
            // { text: "IMPORTE", value: "importe"},
            { text: "CLAVE", value: "clave", sortable: true},
            { text: "ACCIONES", value: "operation" },
        ];

        // Vue 3 datatable
        const loading = ref(true);
        const total_rows = ref(0);

        const params = reactive({ current_page: 1, pagesize: 10 });
        const router = useRouter();

        const getAgreements = async () => {
            try {
                context.emit('loading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos`)
                agreements.value = response.data;
            } catch (error) {
                console.error(error);
            } finally {
                context.emit('loading', false);
            }
        }

        const add = () => {
            router.push('/contratos/crear')
        }

        const detail = (id) => {
            router.push(`/contratos/${id}/detalle`)
        }

        const execution = (id) => {
            router.push(`/contratos/${id}/ejecucion`)
        }
        
        /*const versions = (id) => {
            router.push(`/contratos/${id}/versiones`)
        } */

        const edit = (id) => {
            router.push(`/contratos/${id}/editar`)
        }

        const createDetail = (id) => {
            router.push(`/contratos/${id}/detalle/crear`)
        }

        const importar = () => {
            router.push('/contratos/importar')
        }

        onMounted(() => {
            getAgreements();
        })

        return {
            agreements,
            headers,
            searchField,
            searchValue,
            add,
            detail,
            execution,
            edit,
            createDetail,
            importar,
            user
        }
    }
}

</script>