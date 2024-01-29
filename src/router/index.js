import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
// sección de catalogos
import Partida from '../views/Catalogos/Partidas/Index.vue';
import CrearPartida from '../views/Catalogos/Partidas/Create.vue';
import EditarPartida from '../views/Catalogos/Partidas/Edit.vue';
import Concepto from '../views/Catalogos/Conceptos/Index.vue';
import CrearConcepto from '../views/Catalogos/Conceptos/Create.vue';
import Capitulo from '../views/Catalogos/Capitulos/Index.vue';
import UnidadesMedida from '../views/Catalogos/UnidadesMedida/Index.vue';
import UnidadesMedidaCrear from '../views/Catalogos/UnidadesMedida/Create.vue';
// Sección de contratos
import Contrato from '../views/Contratos/Index1.vue';
import ContratoCrear from '../views/Contratos/Create.vue';
import ContratoEditar from '../views/Contratos/Update.vue';
import DetalleContrato from '../views/Contratos/Detail.vue';
import DetalleContratoCrear from '../views/Contratos/CreateDetail.vue';
import VersionesContrato from '../views/Contratos/Versiones/Versions.vue';
import VersionesContratoCrear from '../views/Contratos/Versiones/Create.vue';
import VersionesContratoEditar from '../views/Contratos/Versiones/Edit.vue';
import DetalleEjecucionContrato from '../views/Contratos/Ejecucion/Execution.vue';
import EjecucionContratoCrear from '../views/Contratos/Ejecucion/CreateExecution.vue';
import EjecucionContratoEditar from '../views/Contratos/Ejecucion/Update.vue';
import ContratoImportar from '../views/Contratos/Import.vue';
// Usuarios
import Usuarios from '../views/Usuarios/Index.vue';
import UsuariosCrear from '../views/Usuarios/Create.vue';
import UsuariosInfo from '../views/Usuarios/Info.vue';
import UsuariosAsignar from '../views/Usuarios/Assign.vue';
import UsuariosEditar from '../views/Usuarios/Edit.vue';
// Sección de reportes
import Reportes from '../views/Reportes/Index.vue';
// Configuración
import Configuracion from '../views/Configuraciones/Index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  // contratos
  {
    path: '/contratos',
    name: 'Contratos',
    component: Contrato
  },
  {
    path: '/contratos/crear',
    name: 'ContratosCrear',
    component: ContratoCrear
  },
  {
    path: "/contratos/:id/detalle",
    name: "DetalleContrato",
    component: DetalleContrato
  },
  {
    path: "/contratos/:id/editar",
    name: "ContratosEditar",
    component: ContratoEditar
  },
  {
    path: "/contratos/:id/versiones",
    name: "VersionesContrato",
    component: VersionesContrato
  },
  {
    path: "/contratos/:id/versiones/crear",
    name: "VersionesContratoCrear",
    component: VersionesContratoCrear
  },
  {
    path: "/contratos/:id/versiones/editar",
    name: "VersionesContratoEditar",
    component: VersionesContratoEditar
  },
  {
    path: "/contratos/:id/ejecucion",
    name: "EjecucionContrato",
    component: DetalleEjecucionContrato
  },
  {
    path: "/contratos/:id/ejecucion/crear",
    name: "EjecucionContratoCrear",
    component: EjecucionContratoCrear
  },
  {
    path: "/contratos/ejecucion/:id/editar",
    name: "EjecucionContratoEditar",
    component: EjecucionContratoEditar
  },
  {
    path: "/contratos/:id/detalle/crear",
    name: "DetalleContratoCrear",
    component: DetalleContratoCrear
  },
  {
    path: "/contratos/importar",
    name: "ContratosImportar",
    component: ContratoImportar,
  },
  // catalogos 
  {
    path: "/catalogos/partidas",
    name: "Partidas",
    component: Partida,
  },
  {
    path: "/catalogos/partidas/crear",
    name: "CrearPartidas",
    component: CrearPartida,
  },
  {
    path: "/catalogos/partidas/:id/editar",
    name: "EditarPartidas",
    component: EditarPartida,
  },
  {
    path: "/catalogos/conceptos",
    name: "Conceptos",
    component: Concepto,
  },
  {
    path: "/catalogos/conceptos/crear",
    name: "CrearConcepto",
    component: CrearConcepto,
  },
  {
    path: "/catalogos/capitulos",
    name: "Capitulos",
    component: Capitulo,
  },
  {
    path: "/catalogos/unidades-medida",
    name: "UnidadesMedida",
    component: UnidadesMedida,
  },
  {
    path: "/catalogos/unidades-medida/crear",
    name: "UnidadesMedidaCrear",
    component: UnidadesMedidaCrear,
  },
  // fin de sección catalogos
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios
  },
  {
    path: '/usuarios/crear',
    name: 'UsuariosCrear',
    component: UsuariosCrear
  },
  {
    path: '/usuarios/:id/info',
    name: 'UsuariosInfo',
    component: UsuariosInfo
  },
  {
    path: '/usuarios/:id/asignar',
    name: 'UsuariosAsignar',
    component: UsuariosAsignar
  },
  {
    path: '/usuarios/:id/editar',
    name: 'UsuariosEditar',
    component: UsuariosEditar
  },
  // Reportes
  {
    path: '/reportes',
    name: 'Reportes',
    component: Reportes
  },
  {
    path: '/configuracion',
    name: 'Configuracion',
    component: Configuracion
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
