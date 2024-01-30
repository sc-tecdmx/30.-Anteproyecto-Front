<template>
    <div class="row px-4 mt-3">
        <div class="col-4 text-start">
            <p><b>Unidad responsable del gasto</b><br>
            {{ agreement.urg }} - {{ agreement.urg_nombre }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Capítulo</b><br>
            {{ agreement.capitulo }} - {{ agreement.capitulo_descripcion }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Concepto</b><br>
            {{ agreement.concepto }} - {{ agreement.concepto_descripcion }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Partida</b><br>
            {{ agreement.partida }} - {{ agreement.descripcion_partida }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Clave</b><br>
            {{ agreement.clave }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Descripción</b><br>
            {{ agreement.descripcion }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Importe</b><br>
            ${{ new Intl.NumberFormat('es-mx').format(agreement.importe) }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Parcialidad</b><br>
            {{ agreement.parcialidad }}</p>
        </div>
        <div class="col-4 text-start">
            <p><b>Tipo</b><br>
            {{ agreement.tipo }}</p>
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
