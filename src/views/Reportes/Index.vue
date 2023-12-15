<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="row">
                            <div class="col-12 d-flex align-items-center">
                                <h4 class="mb-0">Reportes</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="row mt-3">
                            <div class="col-10">
                                <p>Reporte de contratos</p>
                            </div>
                            <div class="col-2">
                                <button @click.stop="exportAgreement">
                                    <font-awesome-icon icon="download" />
                                </button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-10">
                                <p>Reporte de ejecución de contratos</p>
                            </div>
                            <div class="col-2">
                                <button @click.stop="exportExecution">
                                    <font-awesome-icon icon="download" />
                                </button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-10">
                                <p>Reporte de integración por Capítulo de Gasto</p>
                            </div>
                            <div class="col-2">
                                <button @click.stop="exportIntegration">
                                    <font-awesome-icon icon="download" />
                                </button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-10">
                                <p>Reporte de Integración por Capítulo y Concepto de Gasto</p>
                            </div>
                            <div class="col-2">
                                <button @click.stop="exportChapterConcept">
                                    <font-awesome-icon icon="download" />
                                </button>
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

export default {
    name: 'Index',
    components: { },
    setup() {
        const router = useRouter();

        /**
         *
         * @param headers
         * @param defaultName
         * @returns {string}
         */
        const getFileNameFromHeader = (headers, defaultName) => {
            let filename = defaultName
            const contentDisposition = headers['content-disposition'] || ''
            if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
                const matches = filenameRegex.exec(contentDisposition)
                if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '')
                }
            }

            return filename
        }


        const exportAgreement = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/reportes/contratos`, {
                    responseType: 'blob'
                })

                // this.downloadFileContents(window, document, response, 'flights.xlsx')
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', getFileNameFromHeader(response.headers, 'contratos.xlsx'))
                document.body.appendChild(link)
                link.click()
            } catch (e) {
                console.log(e);
                Swal.fire(
                    'Error!',
                    'Hubo un error al exportar el archivo, por favor intentalo mas tarde.',
                    'error'
                )
            }
        }

        const exportExecution = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/reportes/contratos/ejecucion`, {
                    responseType: 'blob'
                })

                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', getFileNameFromHeader(response.headers, 'contratos_ejecucion.xlsx'))
                document.body.appendChild(link)
                link.click()
            } catch (e) {
                console.log(e);
                Swal.fire(
                    'Error!',
                    'Hubo un error al exportar el archivo, por favor intentalo mas tarde.',
                    'error'
                )
            }
        }

        const exportIntegration = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/reportes/contratos/capitulos`, {
                    responseType: 'blob'
                })

                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', getFileNameFromHeader(response.headers, 'cap.xlsx'))
                document.body.appendChild(link)
                link.click()
            } catch (e) {
                console.log(e);
                Swal.fire(
                    'Error!',
                    'Hubo un error al exportar el archivo, por favor intentalo mas tarde.',
                    'error'
                )
            }
        }

        const exportChapterConcept = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/reportes/contratos/capitulos-conceptos`, {
                    responseType: 'blob'
                })

                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', getFileNameFromHeader(response.headers, 'capyconcepto.xlsx'))
                document.body.appendChild(link)
                link.click()
            } catch (e) {
                console.log(e);
                Swal.fire(
                    'Error!',
                    'Hubo un error al exportar el archivo, por favor intentalo mas tarde.',
                    'error'
                )
            }
        }

        onMounted(() => {

        })

        return {
            exportAgreement,
            exportExecution,
            exportIntegration,
            exportChapterConcept
        }
    }
}

</script>