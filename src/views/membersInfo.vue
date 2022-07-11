<template>
    <div><component :is="ismoORpc"/></div>
</template>
<script>
import MOmembersInfo from "../components/mainPage/Mobile/MOmembersInfo.vue";
import PCmembersInfo from "../components/mainPage/Pc/PCmembersInfo.vue"
export default {
   name: 'worksShow',
   components: {
      MOmembersInfo,
      PCmembersInfo,
   },
   data () {
       return {
           ismoORpc: 'PCmembersInfo',
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
        this.ismoORpc = 'MOmembersInfo'
        //设置rem

      } else {
        //pc端
        this.ismoORpc = 'PCmembersInfo'
      }
},
}
</script>

<style scoped>

</style>