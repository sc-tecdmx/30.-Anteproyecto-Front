<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="row">
                            <div class="col-6 d-flex align-items-center">
                                <h6 class="mb-0">Contratos</h6>
                            </div>
                            <div class="col-6 text-end">
                                <button class="btn btn-primary" color="dark" variant="gradient" @click="add()">
                                    <i class="fas fa-plus me-2"></i>
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <DataTable :data="agreements" :columns="columns" class="table table-striped table-bordered display"
                                :options="{ responsive: true, autoWidth: false, dom: 'Blftrip', paging: true, pageLength: 10, language: {
                                    search: 'Buscar',
                                    zeroRecords: 'No hay registros para mostrar',
                                    info: 'Mostrando del _START_ a _END_ de _TOTAL_ registros',
                                    infoFilterd: '(Filtrados de _MAX_ registros.)',
                                    paginate: { first: 'Primero', previous: 'Anterior', next: 'Siguiente', last: 'Último' },
                                    lengthMenu: 'Mostrar _MENU_ registros por página'
                                }, buttons }"
                            >
                                <thead>
                                    <tr>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >No.</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >URG</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Partida</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Capítulo</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Concepto</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Descripción</th>
                                        <!--<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center ancho-fijo">
                                            Importe
                                        </th>-->
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Clave</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Acciones</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(agreement, index) in agreements" :key="index">
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.id }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.urg }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.partida }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.capitulo }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.concepto }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.descripcion }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.importe }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.clave }}</p>
                                        </td>
                                        <td>
                                            <button class="btn btn-info" @click="detail(agreement.id)">
                                                <vue-feather type="eye"></vue-feather>
                                                Detalle
                                            </button>
                                            <button class="btn btn-primary" @click="versions(agreement.id)">
                                                <vue-feather type="eye"></vue-feather>
                                                Versiones
                                            </button>
                                            <button class="btn btn-success" @click="execution(agreement.id)">
                                                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                                                Ejecución
                                            </button>
                                            <button class="btn btn-secondary" @click="createDetail(agreement.id)">
                                                Detalle
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </DataTable>
                            <!--<table class="table align-items-center mb-0 agreements">
                                <thead>
                                    <tr>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >No.</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >URG</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Partida</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Capítulo</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Concepto</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Descripción</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center ancho-fijo">
                                            Importe
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Clave</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center"
                                        >Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(agreement, index) in agreements" :key="index">
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.id }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.urg }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.partida }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.capitulo }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.concepto }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.descripcion }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.importe }}</p>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">{{ agreement.clave }}</p>
                                        </td>
                                        <td>
                                            <button class="btn btn-info" @click="detail(agreement.id)">
                                                <vue-feather type="eye"></vue-feather>
                                                Detalle
                                            </button>
                                            <button class="btn btn-primary" @click="versions(agreement.id)">
                                                <vue-feather type="eye"></vue-feather>
                                                Versiones
                                            </button>
                                            <button class="btn btn-success" @click="execution(agreement.id)">
                                                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                                                Ejecución
                                            </button>
                                            <button class="btn btn-secondary" @click="createDetail(agreement.id)">
                                                Detalle
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>-->
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
import DataTable from 'datatables.net-vue3';
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import print from 'datatables.net-buttons/js/buttons.print';
import pdfmake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfmake.vfs = pdfFonts.pdfMake.vfs;

import 'datatables.net-responsive-bs5';
import JsZip from 'jszip';

window.JSZip = JsZip;

DataTable.use(DataTableLib);
DataTable.use(pdfmake);
DataTable.use(ButtonsHtml5);

export default {
    name: 'Index',
    components: { DataTable },
    setup() {
        const agreements = ref([]);
        const columns = ref([
            { data: null, render: function(data, type, row, meta)
            { return `${meta.row + 1}`}},
            { data: 'urg' },
            { data: 'partida' },
            { data: 'capitulo' },
            { data: 'concepto' },
            { data: 'descripcion' },
            { data: 'importe' },
            { data: 'clave' },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-info" to="/contratos/${row.id}/detalle">
                            <vue-feather type="eye"></vue-feather>
                            Detalle
                        </button>
                        <button class="btn btn-primary" @click="versions(${row.id})">
                            <vue-feather type="eye"></vue-feather>
                            Versiones
                        </button>
                        <button class="btn btn-success" @click="execution(${row.id})">
                            Ejecución
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                        </button>
                        <button class="btn btn-secondary" @click="createDetail(${row.id})">
                            Detalle
                        </button>
                    `;
                },
                orderable: false,
                searchable: false,
                className: 'text-center'
            }
            // caso de moneda: { data: null, render: function(data, type, row, meta)
            // { return (`$` + new Intl.NumberFormat('es-mx).format(chapter.importe)) } }
        ]);
        const buttons = ref([
            {
                title: 'Reporte de contratos',
                extend: 'excelHtml5',
                text: '<font-awesome-icon icon="fa-solid fa-file-excel" /> Excel',
                className: 'btn btn-success'
            },
            {
                title: 'Reporte de contratos',
                extend: 'pdfHtml5',
                text: '<i class="fa-solid fa-file-pdf"></i> PDF',
                className: 'btn btn-danger'
            },
            {
                title: 'Reporte de contratos',
                extend: 'print',
                text: '<i class="fa-solid fa-print"></i> Imprimir',
                className: 'btn btn-dark'
            },
            {
                title: 'Reporte de contratos',
                extend: 'copy',
                text: '<i class="fa-solid fa-copy"></i> Copiar texto',
                className: 'btn btn-light'
            }
        ]);
        const router = useRouter();

        const getAgreements = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos`)
                agreements.value = response.data;
            } catch (error) {
                console.error(error);
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
        const versions = (id) => {
            router.push(`/contratos/${id}/versiones`)
        }

        const createDetail = (id) => {
            router.push(`/contratos/${id}/detalle/crear`)
        }

        onMounted(() => {
            getAgreements();
        })

        return {
            agreements,
            columns,
            buttons,
            add,
            detail,
            execution,
            versions,
            createDetail
        }
    }
}

</script>