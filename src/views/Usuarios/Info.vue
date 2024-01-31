<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="row">
                            <div class="col-8 text-start">
                                <h3>Detalle del usuario</h3>
                            </div>
                            <div class="col-4 text-end">
                                <button class="btn btn-danger" @click="back()">
                                    Regresar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2" style="margin-left: 2%; margin-right: 2%">
                        <user-info
                            :user="user"
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
import UserInfo from '@/components/UserInfo.vue';

export default {
    name: 'Info',
    components: { UserInfo },
    setup(props, context) {
        const route = useRoute();
        const router = useRouter();
        const user = ref({
            id: '',
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            genero: '',
            usuario: '',
            email: '',
            roles: [],
            areas: [],
            responsables_operativos: []
        });

        const getUser = async () => {
            try {
                context.emit('loading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/usuarios/${route.params.id}`)
                user.value = response.data;
            } catch (error) {
                console.error(error);
            } finally {
                context.emit('loading', false);
            }
        }

        const back = () => {
            router.push('/usuarios')
        }

        onMounted(() => {
            getUser();
        })

        return {
            user,
            back
        }
    }
}

</script>