<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12" v-for="(card, index) in cards" :key="index">
            <card
              :title="card.title"
              :value="card.value"
              :iconClass="card.iconClass"
              :iconBackground="card.iconBackground"
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-lg-6 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <div class="card">
                <div class="pb-0 card-header mb-0">
                  <h6>Costo por Capítulo</h6>
                </div>
                <div class="p-3 card-body">
                  <table class="table mb-0">
                    <tbody>
                        <tr v-for="(chapter, index) in chapters" :key="index">
                            <td>
                                <p class="text-xs font-weight-bold mb-0">
                                  <button type="button" class="btn btn-link" @click="getAgreements(chapter.capitulo)">
                                    {{ chapter.capitulo }}
                                  </button> 
                                  - {{ chapter.descripcion }}
                                </p>
                            </td>
                            <td class="numbers">
                                <p class="text-xs font-weight-bold mb-0">${{ new Intl.NumberFormat('es-mx', { maximumSignificantDigits: 2 }).format(chapter.costo_total) }}</p>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card mt-3" v-if="showDetail">
                <div class="card-header pb-0">
                  <div class="row mb-2">
                    <div class="col-6">
                      <h6 class="agreement-title">Contratos del capítulo {{ detail.capitulo }}</h6>
                    </div>
                    <div class="col-6 text-end">
                      <button type="button" class="btn btn-danger text-right" @click="closeDetail()"> Cerrar</button>
                    </div>
                  </div>
                </div>
                <div class="p-3 card-body">
                  <table class="table mb-0">
                    <thead>
                      <tr>
                        <th>Clave Programatica</th>
                        <th class="text-end">Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(agreement, index) in detail.contratos" :key="index">
                            <td>
                                <p class="text-xs font-weight-bold mb-0">{{ agreement.clave }}</p>
                            </td>
                            <td class="numbers">
                                <p class="text-xs font-weight-bold mb-0">${{ new Intl.NumberFormat('es-mx', { maximumSignificantDigits: 2 }).format(agreement.importe) }}</p>
                            </td>
                        </tr>
                        <tr>
                          <td>
                            <p class="text-xs font-weight-bold mb-0">Total</p>
                          </td>
                          <td class="numbers">
                            <p class="text-xs font-weight-bold mb-0">${{ new Intl.NumberFormat('es-mx', { maximumSignificantDigits: 2 }).format(detail.total) }}</p>
                          </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-lg">
            <div class="card z-index-2">
              <div class="card">
                <div class="pb-0 card-header mb-0">
                  <h6>Costo por Capítulo</h6>
                </div>
                <div class="p-3 card-body">
                  <canvas id="myChart" width="400" height="400"></canvas>
                </div>
              </div>
          </div>
        </div>
        <!-- Agregar por URG, agregar por proyecto, por programa, validar el nuevo escenario NO LO COPIO BIEN -->
        <div class="row mt-3">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Costo por URG
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div class="row" v-for="(urg, index) in urgs" :key="index" :class="urg.cerrado ? 'closed' : ''">
                    <div class="col-8">
                      <p class="text-xs font-weight-bold mb-0">{{ urg.numero }} - {{ urg.nombre }}</p>
                    </div>
                    <div class="col-4 text-end">
                      <p class="text-xs font-weight-bold mb-0">${{ new Intl.NumberFormat('es-mx', { maximumSignificantDigits: 2 }).format(urg.total) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Costo por programa
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <table class="table mb-0">
                    <tbody>
                        <tr v-for="(program, index) in programs" :key="index">
                            <td>
                                <p class="text-xs font-weight-bold mb-0">{{ index }}</p>
                            </td>
                            <td class="numbers">
                                <p class="text-xs font-weight-bold mb-0">${{ new Intl.NumberFormat('es-mx', { maximumSignificantDigits: 2 }).format(program) }}</p>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Costo por mes
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <table class="table mb-0">
                    <tbody>
                        <tr v-for="(month, index) in months" :key="index">
                            <td>
                                <p class="text-xs font-weight-bold mb-0">{{ index }}</p>
                            </td>
                            <td class="numbers">
                                <p class="text-xs font-weight-bold mb-0">${{ new Intl.NumberFormat('es-mx', { maximumSignificantDigits: 2 }).format(month) }}</p>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import Card from '@/components/Card.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
    name: 'DashboardView',
    components: { Card },
    setup(props, context) {
        const cards = ref([]);
        const urgs = ref([]);
        const months = ref([]);
        const programs = ref([]);
        const chapters = ref([]);
        const detail = ref({
          capitulo: '',
          contratos: [],
          total: 0
        });
        const showDetail = ref(false);
        const loading = ref(false);

        const getDataCards = async () => {
            try {
                context.emit('loading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/dashboard`)
                cards.value = response.data
            } catch (error) {
                console.log(error);
            } finally {
              context.emit('loading', false);
            }
        }

        const getUrgsCost = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/dashboard/urgs`)
                urgs.value = response.data
            } catch (error) {
                console.log(error);
            }
        }

        const getMonthsCost = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/dashboard/meses`)
                months.value = response.data
            } catch (error) {
                console.log(error);
            }
        }

        const getProgramsCost = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/dashboard/programas`)
                programs.value = response.data
            } catch (error) {
                console.log(error);
            }
        }

        const getChaptersCost = async () => {
            try {
              context.emit('loading', true);
              const response = await axios.get(`${process.env.VUE_APP_API_URL}/dashboard/capitulos`)
              chapters.value = response.data
              // chapters.value = Object.entries(response.data).map(([capitulo, valor]) => ({ capitulo, valor }));
              getChart();
            } catch (error) {
                console.log(error);
            } finally {
              context.emit('loading', false);
            }
        }

        const getChart = () => {
          const ctx = document.getElementById('myChart');

          const data = {
            labels: chapters.value.map((chapter) => chapter.capitulo),
            datasets: [{
              label: 'Gasto por capítulo',
              data: chapters.value.map((chapter) => chapter.costo_total),
              hoverOffset: 4
            }]
          };

          const myChart = new Chart(ctx, {
            type: 'pie',
            data: data
          });
        }

        const getAgreements = async (chapter) => {
          try {
            context.emit('loading', true);
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/dashboard/capitulos/${chapter}`)
            detail.value = response.data
            showDetail.value = true
          } catch (error) {
            console.log(error);
          } finally {
            context.emit('loading', false);
          }
        }

        const closeDetail = () => {
          showDetail.value = false
        }

        onMounted(() => {
            getDataCards();
            getChaptersCost();
            getUrgsCost();
            getMonthsCost();
            getProgramsCost();
        })

        return {
            cards,
            urgs,
            months,
            programs,
            chapters,
            detail,
            showDetail,
            loading,
            getAgreements,
            closeDetail
        };
    }
}
</script>

<style scoped>
.numbers {
  text-align: right;
}
.agreement-title {
  padding-top: 10px;
}
.closed {
    background-color: green;
    color: white;
}
</style>