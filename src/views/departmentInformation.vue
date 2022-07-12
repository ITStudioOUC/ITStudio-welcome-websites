<template>
    <div><component :is="ismoORpc"/></div>
</template>
<script>
import MOdepartmentInfo from "../components/mainPage/Mobile/MOdepartmentInformation.vue";
import PCdepartmentInfo from "../components/mainPage/Pc/PCdepartmentInformation.vue"
export default {
   name: 'departmentInfomation',
   components: {
      MOdepartmentInfo,
      PCdepartmentInfo,
   },
   data () {
       return {
           ismoORpc: 'PCdepartmentInfo',
       }
   },
   methods: {
    //判断
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      },
     
  },
created(){
    if (this._isMobile()) {
        //手机端
        this.ismoORpc = 'MOdepartmentInfo'
      } else {
        //pc端
        this.ismoORpc = 'PCdepartmentInfo'
      }
},
}
</script>

<style scoped>

</style>