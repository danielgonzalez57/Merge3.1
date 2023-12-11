<script setup>
import Nav from '../components/Nav.vue';

import axios from 'axios';
//import { ref } from 'vue';
import Swal from 'sweetalert2'

import {  useRoute, useRouter } from 'vue-router'
const router = useRouter()

// LIBRERIAS
import { ref, onMounted } from 'vue';
const route = useRoute()

// URL
const id = ref('')
id.value = route.params.key 


const data = ref({
    id: "",
    nombre: "",
    email: "", 
    password: "",
    password2: "",
    rol: ""
});

async function getUser() {
    try {
        // CONSULTAR LA TABLA DE USUARIOS
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/getUser/${id.value}`);
        data.value.id = response.data[0].id;
        data.value.nombre = response.data[0].nombre;
        data.value.email = response.data[0].email;
        data.value.password = response.data[0].password;
        data.value.rol = response.data[0].rol;
    } catch (error) {
        alert("Error no controlado.!");
    }
}

onMounted(async () => {
    await getUser();
});

// axios.put(`http://localhost:3001/api/v1/update/user/${id.value}`, data.value )
// const handleSubmit = async () => {
//     // // Usando promesas
//         .then(response => {
//             let rtaFromMysqlDb = Object.keys(response.data)
//             let error = rtaFromMysqlDb.includes("errors");
//             if(error){
//                 // EL DATO HA FALLADO AL CREARSE
//                 alert(response.data.errors[0].message);
//             }else {
//                 // REGISTRO CREADO EXITOSAMENTE
//                 Swal.fire({
//                 icon: 'question',
//                 title: 'Alerta!',
//                 text: '¿Deseas guardar los datos?',
//                 background: '#3A3B3C',  
//                 color: '#fff',
//                 confirmButtonText: 'Guardar',
//             }).then((result) => {
//                 if (result.isConfirmed) {

//                 // REDIRECCIONA AL TABLE PRINCIPAL
//                 router.push('/usuario');

//                 }
//             })

//             }
        
//         })
//         .catch(error => {
//             // Hacer algo con el error
//             //console.log(error);
//             alert('Error no controlado.')
//         });
// }

async function UpdateTUser(jsonTA, id){
    
    try{
        const response = await axios.put(`http://149.50.131.95:3001/api/v1/update/user/${id.value}`, data.value)
        
        if(response.data.status === 'ok'){

            Swal.fire({

                icon: 'question',
                title: 'Alerta!',
                text: '¿Deseas editar los datos?',
                background: '#3A3B3C',  
                color: '#fff',
                confirmButtonText: 'Editar',

            }).then((result) => {
                if (result.isConfirmed) {

                // REDIRECCIONA AL TABLE PRINCIPAL
                router.push('/usuario');

                }
            })

            }
        

    } catch(error){
        console.log(error)

    }
}

const handleIconClick = (node, e) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

function UpdateData(){

const jsonTA = {
    id:data.nombre, 
    email:data.email,
    password:data.password, 
    rol:data.rol 
}

UpdateTUser(jsonTA, id)

}
</script>

<template>
    <Nav :class="{ close: valor }" />
    <section class="dashboard">

        <div class="top">
            <button id="sidebarToggle" class="boton_burguer" @click="valor = !valor">
                <i class="ri-menu-line sidebar-toggle"></i>
            </button>

            <div class="search-box">
                <i class="ri-search-2-line"></i>
                <input type="text" id="searchField" placeholder="Buscar (Ctrl + k)" disabled>
            </div>

            <img src="../assets/profile3.png" alt="imagen de perfil">
        </div>

        <div class="dash-content">

            <div class="overview">
                <!-- NAVBAR -->
                <div class="title">
                    <i class="ri-pie-chart-box-line icono-dash"></i>
                    <span class="text">Editar usuario</span>
                </div>
                <router-link to="/usuario">
                    <v-btn prepend-icon="mdi-arrow-left" color="green-accent-4">
                        Volver
                    </v-btn>
                </router-link>
                
            </div>
            <br>

            <div class="activity">
                <section class="container_form1">
                    <div class="container_form">
                        <FormKit type="form" #default="{ value }" @submit="UpdateData" :value="data"
                            submit-label="Registrar" method="post" action="/ta_relacion_laboral">

                            <FormKit v-model="data.nombre" type="text" label="Nombre" prefix-icon="text"
                                placeholder="Nombre y apellido" help="Ingresa tu nombre completo." />

                            <FormKit v-model="data.email" type="text" label="Correo electronico" name="email"
                                prefix-icon="email" placeholder="email@tiendasdaka.com" validation="required|email"
                                :validation-messages="{
                                    required: 'Debes colocar un correo electronico.',
                                    email: 'Debe tener @ y .com'
                                }" help="Ingresa tu correo electronico." />

                            <FormKit v-model="data.password" type="password" label="Contraseña" name="password"
                                prefix-icon="password" placeholder="Ej. Daka2023*" validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar una contraseña.',
                                }" @suffix-icon-click="handleIconClick" help="Ingresa tu contraseña."
                                suffix-icon="eyeClosed" />

                            <FormKit v-model="data.rol" type="select" label="Tipo de rol:" name="favorite_food"
                                placeholder="Permiso de usuario" prefix-icon="select" :options="[
                                    { label: 'Administrador de usuarios', value: 'admin' },
                                    { label: 'Administrsdor de maestros', value: 'admaster' },
                                    { label: 'Investigador', value: 'inves' },
                                    { label: 'Redes sociales', value: 'rrss' }
                                ]" validation="required" :validation-messages="{
    required: 'Debes escoger un rol.',
}" help="Asigna los permisos a este usuario." />

                            <!-- <FormKit type="date" label="Fecha de nacimiento"
                                validation="required|date_between:1990-01-01 00:00:00,1999-12-31 23:59:59"
                                :validation-messages="{
                                    date_between: 'Solos para los nacidos en los años 90s.',
                                    required: 'debe colocar una fecha de nacimiento.'
                                }" /> -->
                            <!-- 
                            <FormKit type="textarea" name="instructions" label="Descripcion del usuario"
                                placeholder="Usuario de tienda daka, 2023"
                                :help="`${value.instructions ? value.instructions.length : 0} / 120`"
                                validation="length:0,120" validation-visibility="live" :validation-messages="{
                                    length: 'Debe contener menos de 120 caracteres.',
                                }" /> -->

                            <!-- <pre wrap>{{ value }}</pre> -->
                        </FormKit>
                    </div>
                </section>
            </div>
        </div>
        <br>
        <br>
    </section>
</template>

<style>
[data-invalid] .formkit-inner {
    border-color: red;
    box-shadow: 0 0 0 1px red;
}
</style> 

