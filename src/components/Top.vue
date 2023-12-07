<template>
    <div class="top"  :class="{ close: valor }">
        <button id="sidebarToggle" @click="valor = !valor"> 
            <i class="ri-menu-line sidebar-toggle"></i>
        </button> 

        <div class="search-box">
            <i class="ri-search-2-line"></i>
            <input type="text" id="searchField" placeholder="Buscar (Ctrl + k)">
        </div>

        <img src="../assets/profile3.png" alt="imagen de perfil">
    </div>
</template>
<script setup>

import {reactive} from 'vue'

const top = reactive({
        claseNav: ''
    });


    const valor = () =>{
        return false
    }
</script>

