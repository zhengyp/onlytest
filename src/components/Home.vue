<template>
<div>
     <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in imgs" :key="item">
       <el-image
      style="height: 300px"
      :src="item"
      fit="fill">
      </el-image>
    </el-carousel-item>
  </el-carousel>

 
</div>
</template>

<script>
import homeImage1 from "../assets/homeimg/1.jpg";
import homeImage2 from "../assets/homeimg/2.jpg";
import homeImage3 from "../assets/homeimg/3.jpg";
import homeImage4 from "../assets/homeimg/4.jpg";
import homeImage5 from "../assets/homeimg/5.jpg";
import homeImage6 from "../assets/homeimg/6.jpg";
export default {
  name:'Home',
  data(){
      return{
          imgs:[homeImage1,homeImage2,homeImage3,homeImage4,homeImage5,homeImage6]
      }
  }
   
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
 

</style>
