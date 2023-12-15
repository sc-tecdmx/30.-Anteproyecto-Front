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
                            <div class="col-2 text-end">
                                <button class="btn btn-danger" @click="back()">
                                    Regresar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <detail-agreement 
                            :agreement="agreement"
                        />
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
import { useRoute, useRouter } from 'vue-router';
import DetailAgreement from '@/components/DetailAgreement.vue';

export default {
    name: 'Detail',
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

        const getAgreement = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/contratos/${route.params.id}`)
                agreement.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        const back = () => {
            router.push('/contratos')
        }

        onMounted(() => {
            getAgreement();
        })

        return {
            agreement,
            back
        }
    }
}

</script>