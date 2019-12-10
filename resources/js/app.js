/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import dashboard from "./components/dashboard";
require('./bootstrap');


window.Vue = require('vue');
import VueProgressBar from 'vue-progressbar';
import moment from 'moment';
import { Form, HasError, AlertError } from 'vform';

import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);


import Swal from 'sweetalert2'
window.Swal = Swal;

const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
//
window.toast = toast;

window.Fire = new Vue();

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.component('pagination', require('laravel-vue-pagination'));

import VueRouter from 'vue-router'
import developer from "./components/developer";
import profile from "./components/profile";
import user from "./components/user";
Vue.use(VueRouter)

/*let routes = [
    { path : '/dashboard', components : require('./components/dashboard.vue')},
    { path : '/profile', components: require('./components/profile.vue')}
]

const require = new VueRouter({
    routes
})*/
const router = new VueRouter({
    mode : 'history',
    routes : [
        {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboard
        },
        {
            path: '/developer',
            name: 'developer',
            component: developer
        },
        {
            path: '/profile',
            name: 'profile',
            component: profile
        },
        {
            path: '/user',
            name: 'user',
            component: user
        }
    ]
})

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('myDate', function (created) {
    return moment(created).format('MMMM Do YYYY, h:mm:ss a');
})

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
})
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

Vue.component(
    'not-found',
    require('./components/NotFound.vue').default
);

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    data:{
        search: ''
    },
    methods: {
        searchit: _.debounce(() =>  {
            Fire.$emit("searching");
        },1000),

        printme() {
            window.print();
        }
    }
});
