<template>
    <div class="row">
        <div class="col-12 text-start mt-3">
            <p class="fw-lighter">Información</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Nombre: </b>{{ user.nombre }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Apellido Paterno: </b>{{ user.apellido_paterno }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Apellido Materno: </b>{{ user.apellido_materno }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Genero: </b>{{ user.genero }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Usuario: </b>{{ user.usuario }}</p>
        </div>
        <div class="col-4 text-start" v-if="user.roles && user.roles.length > 0">
            <p><b>Rol: </b>{{ user.roles[0].descripcion }}</p>
        </div>
        <div class="col-6 text-start">
            <p><b>Correo: </b>{{ user.email }}</p>
        </div>
        <div class="col-6 text-start" v-if="user.areas && user.areas.length > 0">
            <p><b>Área: </b>{{ user.areas[0].nombre }}</p>
        </div>
        <div class="col-12 text-start" v-if="user.responsables_operativos.length > 0">
            <p><b>Responsables Operativos: </b></p>
            <ul v-for="(responsable, index) in user.responsables_operativos" :key="index">
                <li>{{ responsable.numero }} - {{ responsable.nombre }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {},
  props: {
    user: {
      type: Object,
      required: true
    }
  },
};
</script>
