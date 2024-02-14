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
                        <ul class="nav nav-tabs mt-3" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">General</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Específica</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
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
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="row mt-3">
                                    <div class="col-6 text-center">
                                        <button class="btn btn-success" @click="scenario()">
                                            Cerrar Escenario
                                        </button>
                                    </div>
                                    <div class="col-6 text-center">
                                        <button class="btn btn-primary" @click="add()">
                                            Seleccionar Escenario
                                        </button>
                                    </div>
                                </div>
                                <div class="table-responsive p-0 mt-2">
                                    <EasyDataTable
                                        :headers="headersURG"
                                        :items="urgs"
                                    >
                                        <template #item-operation="item">
                                            <div class="row">
                                                <div class="col-4">
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" :checked="item.cerrado" @change="changeState(item.id, $event)">
                                                    </div>
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
    setup(props, context) {
        const exercises = ref([]);
        const urgs = ref([]);

        const headers= [
            { text: "EJERCICIO", value: "ejercicio", sortable: true },
            { text: "ACTIVO", value: "activo_anteproyecto", sortable: true},
            { text: "ACCIONES", value: "operation" },
        ];

        const headersURG = [
            { text: "NUMERO", value: "numero", sortable: true },
            { text: "URG", value: "nombre", sortable: true},
            { text: "ACCIONES", value: "operation" },
        ];
        
        const getExercises = async () => {
            try {
                context.emit('loading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/ejercicios`);
                exercises.value = response.data;
            } catch (error) {
                console.log(error);
            } finally {
                context.emit('loading', false);
            }
        };

        const getUrgs = async () => {
            try {
                context.emit('loading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/unidades-responsables-gastos/cerrada`);
                urgs.value = response.data;
            } catch (error) {
                console.log(error);
            } finally {
                context.emit('loading', false);
            }
        }

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

        const changeState = (id, event) => {
            let message = "Estas por cerrar el escenario para esta unidad responsable del gasto.";
            let confirm = "¡Sí, cierralo!";
            if(!event.target.checked) {
                message = "Estas por abrir el escenario para esta unidad responsable del gasto.";
                confirm = "¡Sí, abrelo!";
            }
            Swal.fire({
                title: "¿Estas seguro?",
                text: message,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: confirm
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.post(`${process.env.VUE_APP_API_URL}/unidades-responsables-gastos/${id}/estatus`, { state: event.target.checked })
                            Swal.fire({
                                title: "¡Hecho!",
                                text: "La unidad responsable del gasto ha sido actualizado correctamente",
                                icon: "success"
                            });
                            getUrgs();
                        } catch (error) {
                            console.error(error);
                        }
                    }
                });
        }

        onMounted(() => {
            getExercises();
            getUrgs();
        })

        return {
            exercises,
            headers,
            headersURG,
            urgs,
            activate,
            deactivate,
            add,
            scenario,
            changeState
        }
    }
}

</script>