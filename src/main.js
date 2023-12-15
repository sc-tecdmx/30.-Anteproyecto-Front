import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFather from 'vue-feather'
import axios from 'axios'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { 
    faMagnifyingGlass,
    faFileExcel,
    faFilePdf,
    faPrint,
    faCopy,
    faGauge,
    faFileLines,
    faFileExport,
    faArrowsSplitUpAndLeft,
    faArrowsToCircle,
    faUsers,
    faGear,
    faBookmark,
    faBars,
    faRightFromBracket,
    faUser,
    faInfo,
    faCodeBranch,
    faFileCirclePlus,
    faCirclePlay,
    faDollarSign,
    faListCheck,
    faBook,
    faChartSimple,
    faDownload,
    faWeightScale,
    faPenToSquare,
    faCheck,
    faSquareCheck,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret)
library.add(faMagnifyingGlass)
library.add(faFileExcel)
library.add(faFilePdf)
library.add(faPrint)
library.add(faCopy)
library.add(faGauge)
library.add(faFileLines)
library.add(faFileExport)
library.add(faArrowsSplitUpAndLeft)
library.add(faArrowsToCircle)
library.add(faUsers)
library.add(faGear)
library.add(faBookmark)
library.add(faBars)
library.add(faRightFromBracket)
library.add(faUser)
library.add(faInfo)
library.add(faCodeBranch)
library.add(faFileCirclePlus)
library.add(faCirclePlay)
library.add(faDollarSign)
library.add(faListCheck)
library.add(faBook)
library.add(faChartSimple)
library.add(faDownload)
library.add(faWeightScale)
library.add(faPenToSquare)
library.add(faCheck)
library.add(faSquareCheck)
library.add(faXmark)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import Multiselect from 'vue-multiselect'

createApp(App)
    .use(store)
    .use(router)
    .component(VueFather.name, VueFather)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('EasyDataTable', Vue3EasyDataTable)
    .component('multiselect', Multiselect)
    .mount('#app');

const token = localStorage.getItem('token')
const ejercicio = localStorage.getItem('ejercicio')
const responsables = localStorage.getItem('responsables')
const escenario = localStorage.getItem('escenario')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
axios.defaults.headers.common['ejercicio'] = ejercicio
axios.defaults.headers.common['Responsables'] = responsables
axios.defaults.headers.common['escenario'] = escenario

import "bootstrap/dist/js/bootstrap.min";