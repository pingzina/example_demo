<template>
    <div class="main-container">
        <!-- demo头部 -->
        <header-title></header-title>

    </div>
</template>


<script>
import Header from '@/components/header.vue'

export default {
    components:{
        "header-title":Header
    },
    created(){
        console.log(this.$route)
    },
    data(){
        return{

        }
    },
    method:{

    }
}
</script>



<style lang="less" scoped>
    .main-container{
        padding-top: 60px;
    }
    
</style>