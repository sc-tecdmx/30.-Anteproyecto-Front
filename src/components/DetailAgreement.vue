<template>
    <div class="row">
        <div class="col-12 text-start mt-3">
            <p class="fw-lighter">Unidad Responsable del Gasto</p>
        </div>
        <div class="col-2 text-start">
            <p><b>Número: </b>{{ agreement.urg }}</p>
        </div>
        <div class="col-10 text-start">
            <p><b>Descripción: </b>{{ agreement.urg_nombre }}</p>
        </div>
        <div class="col-12 text-start">
            <p class="fw-lighter">Partida</p>
        </div>
        <div class="col-2 text-start">
            <p><b>Número: </b>{{ agreement.partida }}</p>
        </div>
        <div class="col-10 text-start">
            <p><b>Descripción: </b>{{ agreement.descripcion_partida }}</p>
        </div>
        <div class="col-12 text-start">
            <p class="fw-lighter">Concepto</p>
        </div>
        <div class="col-2 text-start">
            <p><b>Número: </b>{{ agreement.concepto }}</p>
        </div>
        <div class="col-10 text-start">
            <p><b>Descripción: </b>{{ agreement.concepto_descripcion }}</p>
        </div>
        <div class="col-12 text-start">
            <p class="fw-lighter">Capítulo</p>
        </div>
        <div class="col-2 text-start">
            <p><b>Número: </b>{{ agreement.capitulo }}</p>
        </div>
        <div class="col-10 text-start">
            <p><b>Descripción: </b>{{ agreement.capitulo_descripcion }}</p>
        </div>
        <div class="col-12 text-start">
            <p class="fw-lighter">Detalle del contrato</p>
        </div>
        <div class="col-3 text-start">
            <p><b>Clave: </b>{{ agreement.clave }}</p>
        </div>
        <div class="col-6 text-start">
            <p><b>Descripción: </b>{{ agreement.descripcion }}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "DetailAgreement",
  data() {},
  props: {
    agreement: {
      type: Object,
      required: true
    }
  },
};
</script>
