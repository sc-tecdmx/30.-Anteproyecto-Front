<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-2">
                        <div class="row">
                            <div class="col-6 d-flex align-items-center">
                                <h6 class="mb-0">Capítulos</h6>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2 px-3 mt-2">
                        <div class="table-responsive p-0">
                            <DataTable :data="chapters" :columns="columns" class="table table-striped table-bordered display"
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
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No.</th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Capítulo
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Descripción
                                        </th>
                                    </tr>
                                </thead>
                            </DataTable>
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
    name: 'Capitulos',
    components: { DataTable },
    setup(props, context) {
        const chapters = ref([]);
        const columns = ref([
            { data: null, render: function(data, type, row, meta)
            { return `${meta.row + 1}`}},
            { data: 'capitulo' },
            { data: 'descripcion' }
            // caso de moneda: { data: null, render: function(data, type, row, meta)
            // { return (`$` + new Intl.NumberFormat('es-mx).format(chapter.importe)) } }
        ]);
        const buttons = ref([
            {
                title: 'Reporte de capítulos',
                extend: 'excelHtml5',
                text: '<font-awesome-icon icon="fa-solid fa-file-excel" /> Excel',
                className: 'btn btn-success'
            },
            {
                title: 'Reporte de capítulos',
                extend: 'pdfHtml5',
                text: '<i class="fa-solid fa-file-pdf"></i> PDF',
                className: 'btn btn-danger'
            },
            {
                title: 'Reporte de capítulos',
                extend: 'print',
                text: '<i class="fa-solid fa-print"></i> Imprimir',
                className: 'btn btn-dark'
            },
            {
                title: 'Reporte de capítulos',
                extend: 'copy',
                text: '<i class="fa-solid fa-copy"></i> Copiar texto',
                className: 'btn btn-light'
            }
        ]);
        const router = useRouter();

        const getChapters = async () => {
            try {
                context.emit('loading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/capitulos`)
                chapters.value = response.data;
            } catch (error) {
                console.error(error);
            } finally {
                context.emit('loading', false);
            }
        }

        const addChapter = () => {
            router.push('/catalogos/capitulos/crear')
        }

        onMounted(() => {
            getChapters();
        })

        return {
            chapters,
            columns,
            buttons,
            addChapter
        }
    }
}

</script>
<style scoped>
@import 'datatables.net-bs5';
</style>