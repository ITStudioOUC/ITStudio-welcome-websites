<template>
    <div><component :is="ismoORpc"/></div>
</template>
<script>
import MOworksShow from "../components/mainPage/Mobile/MOworksShow.vue";
import PCworksShow from "../components/mainPage/Pc/PCworksShow.vue"
export default {
   name: 'worksShow',
   components: {
      MOworksShow,
      PCworksShow,
   },
   data () {
       return {
           ismoORpc: 'PCworksShow',
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
        this.ismoORpc = 'MOworksShow'
        //设置rem

      } else {
        //pc端
        this.ismoORpc = 'PCworksShow'
      }
},
}
</script>

<style scoped>

</style>