<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="row">
                            <div class="col-8 text-start">
                                <h3>Detalle del contrato</h3>
                            </div>
                            <div class="col-4 text-end">
                                <button class="btn btn-danger" @click="back()">
                                    Regresar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2" style="margin-left: 2%; margin-right: 2%">
                        <detail-agreement
                            :agreement="agreement"
                        />
                        <div class="row">
                            <div class="col-8 text-start">
                                <p class="fs-3">Versiones</p>
                            </div>
                            <div class="col-4 text-end">
                                <button class="btn btn-info" @click="add()">
                                    Agregar
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="table-responsive p-0">
                                <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                            >Versión</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                            >Importe</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                            >Seleccionado</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                            >Aprobado</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(version, index) in versions" :key="index">
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0 text-center">{{ index + 1}}</p>
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0 text-center">${{ new Intl.NumberFormat('es-mx').format(version.importe) }}</p>
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0 text-center">{{ version.seleccionado ? 'Si' : ' No' }}</p>
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0 text-center">{{ version.aprobado ? 'Si' : ' No' }}</p>
                                            </td>
                                            <td>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <button class="p-0 btn btn-link text-dark fixed-plugin-close-button" @click="edit(version.id)">
                                                            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                                        </button>
                                                    </div>
                                                    <div class="col-4" v-if="!isSelected && !isApproved && (user.rol == 1 || user.rol == 2 || user.rol == 3 || user.rol == 5)">
                                                        <button class="p-0 btn btn-link text-dark fixed-plugin-close-button" @click="select(version.id)">
                                                            <font-awesome-icon icon="fa-solid fa-check" />
                                                        </button>
                                                    </div>
                                                    <div class="col-4" v-if="isSelected && !isApproved && (user.rol == 1 || user.rol == 2 || user.rol == 3)" >
                                                        <button class="p-0 btn btn-link text-dark fixed-plugin-close-button" @click="approve(version.id)">
                                                            <font-awesome-icon icon="fa-solid fa-square-check" />
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
    </div>
</template>

<style>
    .ancho-fijo {
        width: 50px !important;
    } 
</style>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DetailAgreement from '@/components/DetailAgreement.vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';

export default {
    name: 'Versions',
    components: { DetailAgreement },
    setup() {
        const route = useRoute();
        const router = useRouter();
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
        const isSelected = ref(false);
        const isApproved = ref(false);
        const versions = ref([]);

        const store = useStore();

        const user = computed(() => store.getters.userLogged);

        const getAgreement = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}`)
                agreement.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        const getVersions = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}/versiones`)
                versions.value = response.data;
                isSelected.value = versions.value.some(registro => registro.seleccionado);
                isApproved.value = versions.value.some(registro => registro.aprobado);
                console.log(isSelected.value)
                console.log(isApproved.value)
            } catch (error) {
                console.error(error);
            }
        }

        const add = () => {
            router.push(`/contratos/${route.params.id}/versiones/crear`)
        }

        const back = () => {
            router.push('/contratos')
        }

        const edit = (id) => {
            router.push(`/contratos/${id}/versiones/editar`)
        }

        const select = (id) => {
            Swal.fire({
                title: "¿Estas seguro?",
                text: "Estas por seleccionar esta versión para ser tratada al final.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Si, seleccionala!"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.get(`${process.env.VUE_APP_API_URL}/contratos/${id}/seleccionar`)
                            Swal.fire({
                                title: "Seleccionado!",
                                text: "La versión ha sido seleccionada correctamente",
                                icon: "success"
                            });
                        } catch (error) {
                            console.error(error);
                        }
                    }
                });
        }

        const approve = (id) => {
            Swal.fire({
                title: "¿Estas seguro?",
                text: "Estas por aprobar esta versión para ser tratada al final.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Si, apruebala!"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.get(`${process.env.VUE_APP_API_URL}/contratos/${id}/aprobar`)
                            Swal.fire({
                                title: "¡Aprobado!",
                                text: "La versión ha sido aprobada correctamente",
                                icon: "success"
                            });
                        } catch (error) {
                            console.error(error);
                        }
                    }
                });
        }

        onMounted(() => {
            getAgreement();
            getVersions();
        })

        return {
            agreement,
            isSelected,
            isApproved,
            versions,
            back,
            add,
            edit,
            select,
            approve,
            user
        }
    }
}

</script>