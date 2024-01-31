<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="row mb-3">
                            <div class="col-6 d-flex align-items-center">
                                <h4 class="mb-0">Usuarios</h4>
                            </div>
                            <div class="col-6 text-end">
                                <button class="btn btn-info" variant="gradient" @click="add()">
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
                                    <option value="nombre">Nombre</option>
                                    <option value="apellido_paterno">Ap. Paterno</option>
                                    <option value="apellido_materno">Ap. Materno</option>
                                    <option value="usuario">Usuario</option>
                                    <option value="clave">Correo</option>
                                    <option value="rol">Rol</option>
                                    <option value="area">Área</option>
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
                                :items="users"
                                :search-field="searchField"
                                :search-value="searchValue"
                                :sort-by="sortBy"
                                :sort-type="sortType"
                                multi-sort
                            >
                                <template #item-operation="item">
                                    <div class="row">
                                        <div class="col-4">
                                            <button class="btn btn-info" @click="detail(item.id)">
                                                <font-awesome-icon icon="fa-solid fa-info" />
                                            </button>
                                        </div>
                                        <div class="col-4">
                                            <button class="btn btn-primary" @click="edit(item.id)">
                                                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                            </button>
                                        </div>
                                        <div class="col-4" v-if="item.rol != 'Administrador' && item.rol != 'Superadministrador' && item.rol != 'Contador'">
                                            <button class="btn btn-primary" @click="assign(item.id)">
                                                <font-awesome-icon icon="fa-solid fa-list-check" />
                                            </button>
                                        </div>
                                    </div>
                                </template>
                            </EasyDataTable>
                            <!--<DataTable :data="users" :columns="columns" class="table table-striped table-bordered display"
                                :options="{ responsive: true, autoWidth: false, dom: 'Bfrtip', language: {
                                    search: 'Buscar',
                                    zeroRecords: 'No hay registros para mostrar',
                                    info: 'Mostrando del _START_ a _END_ de _TOTAL_ registros',
                                    infoFilterd: '(Filtrados de _MAX_ registros.)',
                                    paginate: { first: 'Primero', previous: 'Anterior', next: 'Siguiente', last: 'Último' }
                                }, buttons }"
                            >
                                <thead>
                                    <tr>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No.</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Nombre
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Apellido Paterno</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Apellido Materno</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Usuario</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Correo</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Rol</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Área</th>
                                    </tr>
                                </thead>
                            </DataTable>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';

export default {
    name: 'Index',
    components: { },
    setup(props, context) {
        const users = ref([]);
        const searchField = ref('');
        const searchValue = ref('');

        const sortBy = ["nombre", "apellido_paterno", "apellido_materno", "usuario", "correo", "rol", "area"];
        const sortType = ["desc", "asc"];

        const headers= [
            { text: "NOMBRE", value: "nombre", sortable: true },
            { text: "AP. PATERNO", value: "apellido_paterno", sortable: true},
            { text: "AP. MATERNO", value: "apellido_materno", sortable: true},
            { text: "USUARIO", value: "usuario", sortable: true},
            { text: "CORREO", value: "email"},
            // { text: "IMPORTE", value: "importe"},
            { text: "ROL", value: "rol", sortable: true},
            { text: "ÁREA", value: "area", sortable: true},
            { text: "ACCIONES", value: "operation" },
        ];

        const columns = ref([
            { data: null, render: function(data, type, row, meta)
            { return `${meta.row + 1}`}},
            { data: 'nombre' },
            { data: 'apellido_paterno' },
            { data: 'apellido_materno' },
            { data: 'usuario' },
            { data: 'email' },
            { data: 'rol' },
            { data: 'area' },
            // caso de moneda: { data: null, render: function(data, type, row, meta)
            // { return (`$` + new Intl.NumberFormat('es-mx).format(chapter.importe)) } }
        ]);
        const buttons = ref([
            {
                title: 'Reporte de usuarios',
                extend: 'excelHtml5',
                text: '<i class="fa-solid fa-file-excel"></i> Excel',
                className: 'btn btn-success'
            },
            {
                title: 'Reporte de usuarios',
                extend: 'pdfHtml5',
                text: '<i class="fa-solid fa-file-pdf"></i> PDF',
                className: 'btn btn-danger'
            },
            {
                title: 'Reporte de usuarios',
                extend: 'print',
                text: '<i class="fa-solid fa-print"></i> Imprimir',
                className: 'btn btn-dark'
            },
            {
                title: 'Reporte de usuarios',
                extend: 'copy',
                text: '<i class="fa-solid fa-copy"></i> Copiar texto',
                className: 'btn btn-light'
            }
        ]);
        const router = useRouter();

        const getUsers = async () => {
            try {
                context.emit('loading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/usuarios`)
                users.value = response.data;
            } catch (error) {
                console.error(error);
            } finally {
                context.emit('loading', false);
            }
        }

        const add = () => {
            router.push('/usuarios/crear')
        }

        const detail = (id) => {
            router.push(`/usuarios/${id}/info`)
        }

        const edit = (id) => {
            router.push(`/usuarios/${id}/editar`)
        }

        const assign = (id) => {
            router.push(`/usuarios/${id}/asignar`)
        }

        onMounted(() => {
            getUsers();
        })

        return {
            users,
            headers,
            searchField,
            searchValue,
            sortBy,
            sortType,
            detail,
            edit,
            add,
            assign
        }
    }
}

</script>