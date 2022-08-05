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
    os() {
      var ua = navigator.userAgent,
		 	isWindowsPhone = /(?:Windows Phone)/.test(ua),
		  isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
			isAndroid = /(?:Android)/.test(ua),
			isFireFox = /(?:Firefox)/.test(ua),
				// isChrome = /(?:Chrome|CriOS)/.test(ua),
			isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox &&
					/(?:Tablet)/.test(ua)), 
			isPhone = /(?:iPhone)/.test(ua) && !isTablet,
			isPc = !isPhone && !isAndroid && !isSymbian;
			return {
				isTablet: isTablet, //平板
				isPhone: isPhone,
				isAndroid: isAndroid,
			  isPc: isPc
    }
  },
    pcORmo() {
       if (this.os().isAndroid || this.os().isPhone) {
      //手机端
      this.ismoORpc = "MOmembersInfo";
    } else if(this.os().isPc){
      //pc端
      this.ismoORpc = "PCmembersInfo";
    }
    },
    isTablet() {
      if(this.os().isTablet){
      if(window.screen.width < window.screen.height){
        //竖屏
       this.ismoORpc = "MOmembersInfo";
      }else if(window.screen.width > window.screen.height){
        //横屏
        this.ismoORpc = "PCmembersInfo";
      }
    }
    }
  
  },

  created() {
      this.pcORmo();
      this.isTablet();
  },
  mounted() {
     window.addEventListener("resize", this.isTablet, false)
  },

  beforeUnmount () {
    // 移除监听
    window.removeEventListener("resize", this.isTablet, false)
}
}
</script>

<style scoped>

</style>