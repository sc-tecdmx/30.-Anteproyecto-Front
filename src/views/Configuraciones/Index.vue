<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="row">
                            <div class="col-12 d-flex align-items-center">
                                <h4 class="mb-0">Configuración</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2" style="margin-left: 2%; margin-right: 2%;">
                        <div class="row mt-3">
                            <div class="col-8 text-start">
                                <p>Ejercicios actualmente registrados en el sistema.</p>
                            </div>
                            <div class="col-2 text-end">
                                <button class="btn btn-success" @click="scenario()">
                                    Nuevo escenario
                                </button>
                            </div>
                            <div class="col-2 text-end">
                                <button class="btn btn-primary" @click="add()">
                                    Nuevo ejercicio
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive p-0 mt-2">
                            <EasyDataTable
                                :headers="headers"
                                :items="exercises"
                            >
                                <template #item-activo_anteproyecto="item">
                                    {{ item.activo_anteproyecto ? 'Si' : 'No' }}
                                </template>
                                <template #item-operation="item">
                                    <div class="row">
                                        <div class="col-4" v-if="!item.activo_anteproyecto">
                                            <button class="btn btn-success" @click="activate(item.id)">
                                                <font-awesome-icon icon="fa-solid fa-check" />
                                            </button>
                                        </div>
                                        <div class="col-4" v-if="item.activo_anteproyecto">
                                            <button class="btn btn-danger" @click="deactivate(item.id)">
                                                <font-awesome-icon icon="fa-solid fa-xmark" />
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
</template>

<style>
    .ancho-fijo {
        width: 50px !important;
    } 
</style>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';

export default {
    name: 'Index',
    components: { },
    setup() {
        const exercises = ref([]);

        const headers= [
            { text: "EJERCICIO", value: "ejercicio", sortable: true },
            { text: "ACTIVO", value: "activo_anteproyecto", sortable: true},
            { text: "ACCIONES", value: "operation" },
        ];
        
        const getExercises = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/ejercicios`);
                exercises.value = response.data;
            } catch (error) {
                console.log(error);
            }
        };

        const activate = (id) => {
            Swal.fire({
                title: "¿Estas seguro?",
                text: "Estas por activar este ejercicio para ser consultado en el anteproyecto.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Si, activalo!"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.get(`${process.env.VUE_APP_API_URL}/ejercicios/${id}/activar`)
                            Swal.fire({
                                title: "¡Hecho!",
                                text: "El ejercicio ha sido activado correctamente",
                                icon: "success"
                            });
                            getExercises();
                        } catch (error) {
                            console.error(error);
                        }
                    }
                });
        }

        const add = async () => {
            try {
                await axios.get(`${process.env.VUE_APP_API_URL}/configuracion/ejercicio`)
                Swal.fire({
                    title: "¡Hecho!",
                    text: "El ejercicio ha sido creado correctamente",
                    icon: "success"
                });
                getExercises();
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "¡Hubo un problema al activar un nuevo ejercicio"
                });
            }
        }

        const scenario = async () => {
            try {
                await axios.get(`${process.env.VUE_APP_API_URL}/configuracion/escenario`)
                Swal.fire({
                    title: "¡Hecho!",
                    text: "El ejercicio ha sido creado correctamente",
                    icon: "success"
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "¡Hubo un problema al activar un nuevo ejercicio"
                });
            }
        }

        const deactivate = (id) => {
            Swal.fire({
                title: "¿Estas seguro?",
                text: "Estas por desactivar este ejercicio para ser consultado en el anteproyecto.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Si, desactivalo!"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.get(`${process.env.VUE_APP_API_URL}/ejercicios/${id}/desactivar`)
                            Swal.fire({
                                title: "¡Hecho!",
                                text: "El ejercicio ha sido desactivado correctamente",
                                icon: "success"
                            });
                            getExercises();
                        } catch (error) {
                            console.error(error);
                        }
                    }
                });
        }

        onMounted(() => {
            getExercises();
        })

        return {
            exercises,
            headers,
            activate,
            deactivate,
            add,
            scenario
        }
    }
}

</script>