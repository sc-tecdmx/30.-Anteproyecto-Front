<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Importar</p>
                        </div>
                    </div>
                     <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-12 text-start">
                                    <p>En caso de que necesites subir contratos multiples, descarga el template desde este enlace: <button type="btn btn-text" @click.prevent="downloadTemplate()">template</button></p>
                                </div>
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label"
                                    >Archivo</label>
                                    <input type="file" class="form-control" @change="uploadFile" />
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-6">
                                    <button class="btn btn-danger" color="primary" @click="cancel">
                                        Cancelar
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-primary" type="submit" color="primary">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export default {
    name: 'Create',
    components: { },
    setup(props, context) {
        const file = ref();
        const templateFile = ref('/templateImport.xlsx');

        const route = useRouter();

        const store = async () => {
            let data = new FormData();
            data.append('file', file.value);
            context.emit('loading', true);
            await axios.post(`${process.env.VUE_APP_API_URL}/contratos/importar`, data)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'Los contratos se han importado correctamente',
                        'success'
                    );
                    route.push('/contratos');
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire(
                        'Error!',
                        'Hubo un error al importar la información',
                        'error'
                    );
                })
                .finally(() => {
                    context.emit('loading', false);
                })
        }

        const cancel = () => {
            route.push('/contratos');
        }

        const uploadFile = (event) => {
            file.value = event.target.files[0];
        }

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

        const downloadTemplate = async () => {
            try {
                context.emit('loading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/plantilla`, {
                    responseType: 'blob'
                })

                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', getFileNameFromHeader(response.headers, 'plantilla.xlsx'))
                document.body.appendChild(link)
                link.click()
            } catch (e) {
                console.log(e);
                Swal.fire(
                    'Error!',
                    'Hubo un error al descargar el archivo, por favor intentalo mas tarde.',
                    'error'
                )
            } finally {
                context.emit('loading', false);
            }
        }

        onMounted(() => {});

        return {
            file,
            templateFile,
            store,
            cancel,
            uploadFile,
            downloadTemplate
        }
    }
}
</script>

<style>

</style>