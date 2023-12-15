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
                        <div class="row mt-3">
                            <form @submit.prevent="store">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="responsables" class="form-label">Responsables Operativos</label>
                                        <select v-model="userManagers.responsables" class="form-select" id="responsables" multiple>
                                            <option :value="null" disabled>Selecciona una opción</option>
                                            <option v-for="manager in managers" :key="manager.id" :value="manager.id">
                                                {{ manager.numero }} - {{ manager.nombre }}
                                            </option>
                                        </select>
                                        <!--<multiselect 
                                            v-model="userManagers.responsables" 
                                            :options="managers"
                                            :multiple="true"
                                            :close-on-select="false"
                                            placeholder="Responsables Operativos"
                                            label="numero"
                                            track-by="numero"
                                            :custom-label="customLabel"
                                        />-->
                                        <!--<Multiselect
                                            v-model="userManagers.responsables"
                                            mode="multiple"
                                            :close-on-select="false"
                                            :options="managers"
                                            :create-option="true"
                                        >
                                            <template v-slot:multiplelabel="{ values }">
                                                <div class="multiselect-multiple-label">
                                                {{ values.length }} characters selected
                                                </div>
                                            </template>
                                            <template v-slot:tag="{ option }">
                                                <div>
                                                    {{ option.numero }} - {{ option.nombre }}
                                                </div>
                                            </template>
                                        </Multiselect>-->
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6 text-start">
                                        <button class="btn btn-danger" @click.prevent="cancel()">
                                            Cancelar
                                        </button>
                                    </div>
                                    <div class="col-6 text-end">
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
// import Multiselect from 'vue-multiselect';
import Multiselect from '@vueform/multiselect'
import Swal from 'sweetalert2';

export default {
    name: 'Assign',
    components: { UserInfo, Multiselect },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const managers = ref([]);
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

        const userManagers = ref({
            responsables: []
        });

        const getUser = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/usuarios/${route.params.id}`)
                user.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        const getManagers = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/responsables-operativos`);
                managers.value = response.data;
            } catch (error) {
                console.error(error)
            }
        }

        const customLabel = (option) => {
            return `${option.numero} - ${option.nombre}`;
        }

        const store = async () => {
            // console.log(JSON.stringify(userManagers.value.responsables));
            const responsables = {
                responsables: JSON.stringify(userManagers.value.responsables)
            }
            console.log(responsables);
            await axios.post(`${process.env.VUE_APP_API_URL}/usuarios/${route.params.id}`, responsables)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'El usuario fue asignado correctamente a los responsables operativos.',
                        'success'
                    );
                    router.push(`/usuarios`);
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire(
                        'Error!',
                        'Hubo un error al guardar la información',
                        'error'
                    );
                })
        }

        const back = () => {
            router.push('/usuarios')
        }

        onMounted(() => {
            getUser();
            getManagers();
        })

        return {
            user,
            managers,
            userManagers,
            back,
            store,
            customLabel
        }
    }
}

</script>