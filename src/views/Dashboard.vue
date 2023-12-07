<script >
    import Nav from '../components/Nav.vue'
    // import Top from '../components/Top.vue'
    import {ref, reactive} from 'vue'
    import axios from 'axios';
    export default {
        components: {
            Nav,
            // Top
        },
        data(){
            return{ 
                products:null,
                pagina: 1, 
                valor: false}
        }, 
    } 

</script>

<template>
    <Nav 
    :class="{ close: valor }"
    />
    <section class="dashboard">

        <div class="top"  >
        <button id="sidebarToggle" class="boton_burguer" @click="valor = !valor"> 
            <i class="ri-menu-line sidebar-toggle"></i>
        </button> 

        <div class="search-box">
            <i class="ri-search-2-line"></i>
            <input type="text" id="searchField" placeholder="Buscar (Ctrl + k)">
        </div>

        <img src="../assets/profile3.png" alt="imagen de perfil">
    </div>
        <div class="dash-content">

            <div class="overview">
                
                <div>
                    <img src="../assets/MERGE.png" alt="Merge" width="100%">
                </div>
                <!-- NAVBAR -->
                <div class="title">
                    
                    <span class="text"></span>
                </div>

             
        </div>
    </div>
    </section>
</template>

