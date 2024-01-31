<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="row mb-3">
                            <div class="col-6 d-flex align-items-center">
                                <h4 class="mb-0">Conceptos</h4>
                            </div>
                            <div class="col-6 text-end">
                                <button class="btn btn-info" variant="gradient" @click="addConcept()">
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2 px-3 mt-2">
                        <div class="table-responsive p-0">
                            <DataTable :data="concepts" :columns="columns" class="table table-striped table-bordered display"
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
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >No.</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Capítulo</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Descripción</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Numero</th>
                                    </tr>
                                </thead>
                            </DataTable>
                            <!--<table class="table align-items-center mb-0">
                            <thead class="text-center">
                                <tr>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                    >Capítulo</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                    >Descripción</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                    >Numero</th>
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(concept, index) in concepts" :key="index">
                                    <td>
                                        <p class="text-xs font-weight-bold mb-0">{{ concept.capitulo }}</p>
                                    </td>
                                    <td>
                                        <p class="text-xs font-weight-bold mb-0">{{ concept.descripcion }}</p>
                                    </td>
                                    <td>
                                        <p class="text-xs font-weight-bold mb-0">{{ concept.numero }}</p>
                                    </td>
                                    <td class="align-middle">
                                        <div class="row">
                                            <div class="col-6">
                                                <i class="fa fa-pencil"></i>
                                            </div>
                                            <div class="col-6">
                                                <i class="fa fa-trash"></i>
                                            </div>
                                        </div>
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
    setup(props, context) {
        const concepts = ref([]);
        const columns = ref([
            { data: null, render: function(data, type, row, meta)
            { return `${meta.row + 1}`}},
            { data: 'capitulo' },
            { data: 'descripcion' },
            { data: 'numero' },
            // caso de moneda: { data: null, render: function(data, type, row, meta)
            // { return (`$` + new Intl.NumberFormat('es-mx).format(chapter.importe)) } }
        ]);
        const buttons = ref([
            {
                title: 'Reporte de conceptos',
                extend: 'excelHtml5',
                text: '<i class="fa-solid fa-file-excel"></i> Excel',
                className: 'btn btn-success'
            },
            {
                title: 'Reporte de conceptos',
                extend: 'pdfHtml5',
                text: '<i class="fa-solid fa-file-pdf"></i> PDF',
                className: 'btn btn-danger'
            },
            {
                title: 'Reporte de conceptos',
                extend: 'print',
                text: '<i class="fa-solid fa-print"></i> Imprimir',
                className: 'btn btn-dark'
            },
            {
                title: 'Reporte de conceptos',
                extend: 'copy',
                text: '<i class="fa-solid fa-copy"></i> Copiar texto',
                className: 'btn btn-light'
            }
        ]);
        const router = useRouter();

        const getConcepts = async () => {
            try {
                context.emit('loading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/conceptos`)
                concepts.value = response.data;
            } catch (error) {
                console.error(error);
            } finally {
                context.emit('loading', false);
            }
        }

        const addConcept = () => {
            router.push('/catalogos/conceptos/crear')
        }

        onMounted(() => {
            getConcepts();
        })

        return {
            concepts,
            columns,
            buttons,
            addConcept
        }
    }
}

</script>