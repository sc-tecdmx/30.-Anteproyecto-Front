<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Crear usuario</p>
                        </div>
                    </div>
                     <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Nombre</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="nombre"
                                        id="nombre"
                                        v-model="user.nombre"
                                        placeholder="Nombre"
                                        required
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Apellido Paterno</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="apellido_paterno"
                                        id="apellido_paterno"
                                        v-model="user.apellido_paterno"
                                        placeholder="Apellido Paterno"
                                        required
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Apellido Materno</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="apellido_materno"
                                        id="apellido_materno"
                                        v-model="user.apellido_materno"
                                        placeholder="Apellido Materno"
                                        required
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="mySelect" class="form-label">Genero</label>
                                    <select v-model="user.genero" class="form-select" id="genero">
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option value="Hombre">Hombre</option>
                                        <option value="Mujer">Mujer</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Usuario</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="usuario"
                                        id="usuario"
                                        v-model="user.usuario"
                                        placeholder="Usuario"
                                        required
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Email</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="email"
                                        id="email"
                                        v-model="user.email"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="example-text-input" class="form-control-label"
                                    >Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        id="password"
                                        v-model="user.password"
                                        placeholder="Password"
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="mySelect" class="form-label">Rol</label>
                                    <select v-model="user.rol_id" class="form-select" id="rol_id">
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option v-for="rol in roles" :key="rol.id" :value="rol.id">
                                            {{ rol.descripcion }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="mySelect" class="form-label">Área</label>
                                    <select v-model="user.area_id" class="form-select" id="are_id">
                                        <option :value="null" disabled>Selecciona una opción</option>
                                        <option v-for="area in areas" :key="area.id" :value="area.id">
                                            {{ area.nombre }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-6">
                                    <button class="btn btn-danger" @click="cancel()">
                                        Cancelar
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-success" type="submit" color="primary">
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
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'Edit',
    components: { },
    setup(props, context) {
        const user = ref({
            nombre: '',
            apellido_paterno: '',
            genero: '',
            usuario: '',
            password: '',
            email: '',
            rol_id: '',
            area_id: ''
        });
        const roles = ref([]);
        const areas = ref([]);

        const router = useRouter();
        const route = useRoute();

        const getUser = async () => {
            try {
                context.emit('loading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/usuarios/${route.params.id}`);
                // user.value = response.data
                user.value = {
                    ...response.data,
                    rol_id: response.data.roles[0].id,
                    area_id: response.data.areas[0].id
                };
            } catch (error) {
                console.log(error);
            } finally {
                context.emit('loading', false);
            }
        }

        const getRoles = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/roles`);
                roles.value = response.data;
            } catch (error) {
                console.log(error);
            }
        };

        const getAreas = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/areas`);
                areas.value = response.data;
            } catch (error) {
                console.log(error);
            }
        }

        const store = async () => {
            context.emit('loading', true);
            await axios.put(`${process.env.VUE_APP_API_URL}/usuarios/${route.params.id}`, user.value)
                .then(() => {
                    Swal.fire(
                        '¡Éxito!',
                        'El usuario ha sido actualizado correctamente',
                        'success'
                    );
                    router.push('/usuarios');
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire(
                        'Error!',
                        'Hubo un error al guardar la información',
                        'error'
                    );
                })
                .finally(() => {
                    context.emit('loading', false);
                })
        }
        
        const cancel = () => {
            router.push('/usuarios')
        }

        onMounted(() => {
            getUser();
            getRoles();
            getAreas();
        });

        return {
            user,
            roles,
            areas,
            store,
            cancel
        }
    }
}
</script>

<style>

</style>