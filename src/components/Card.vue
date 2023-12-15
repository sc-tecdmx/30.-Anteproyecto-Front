<template>
  <div class="card text-white mb-3" :class="iconBackground" style="max-width: 18rem;">      
    <div class="card-body">
      <div class="row">
        <div class="col-2">
          <font-awesome-icon :icon="iconClass" size="2xl" class="pt-3"/>
        </div>
        <div class="col-10">
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text">
            <span class="fs-4">{{ value }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  data() {
    return {
      reverseDirection: "flex-row-reverse justify-content-between",
    };
  },
  props: {
    directionReverse: Boolean,
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    titleColor: {
      type: String,
    },
    value: {
      required: true,
    },
    valueColor: {
      type: String,
    },
    percentage: String,
    iconClass: {
      type: String,
      required: true,
    },
    percentageColor: {
      type: String,
      default: "text-success",
    },
    iconBackground: {
      type: String,
      default: "bg-white",
    },
    contentClass: {
      type: String,
    },
  },
};
</script>
