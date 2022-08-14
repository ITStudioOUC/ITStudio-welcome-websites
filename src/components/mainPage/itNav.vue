//createDate:2022-04-23
<template>
  <div class="itNavBg"></div>
  <div class="itNav">
    
    <div class="logBox">
      <img
        @click="returnTop()"
        class="logo"
        src="../../assets/img/logo2.png"
        alt=""
      />
    </div>
    <div class="content">
      <span class="qqGroup" v-show="isPC">
        
        <a
          target="blank"
          href="https://qm.qq.com/cgi-bin/qm/qr?k=QCHusRvSWhuXRVydCnLIBR4XjThzsYmI&jump_from=webapi"
          ><img
            border="0"
            src="//pub.idqqimg.com/wpa/images/group.png"
            alt="2022爱特工作室纳新群&lt;$"
            title="2022爱特工作室纳新群&lt;$"
        /></a>
      </span>
      <li
        :class="{ choose: currentIdx == index }"
        id="li"
        v-for="(item, index) in navList"
        :key="index"
        @click="scrollbarMove(index)"
      >
        {{ item.name }}
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "itNav",
  data() {
    return {
      navList: [
        { name: "部门介绍" },
        { name: "关于爱特" },
        { name: "历史作品" },
        { name: "历史团队" },
      ],
      currentIdx: -1, //当前位置的下标
      isPC: false, //是否为电脑端
      isAndroid: Boolean,
      isIOS: Boolean,
    };
  },
  created() {
    let u = navigator.userAgent;
    this.isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //判断是否是 android终端
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 iOS终端
    if (!this.isAndroid && !this.isIOS) {
      this.isPC = true;
    }
    console.log("是否是Android：", this.isAndroid); //true,false
    console.log("是否是iOS：", this.isIOS);
    console.log("是否是pc：", this.isPC);
  },
  methods: {
    returnTop() {
      this.currentIdx = -1;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    scrollbarMove(index) {
      var windowWidth = document.documentElement.clientWidth;
      this.currentIdx = index;
      switch (index) {
        case 0:
          window.scrollTo({
            top: 0.53 * windowWidth,
            behavior: "smooth",
          });
          break;
        case 1:
          window.scrollTo({
            top: 0.871 * windowWidth,
            behavior: "smooth",
          });
          break;
        case 2:
          window.scrollTo({
            top: 1.435 * windowWidth,
            behavior: "smooth",
          });
          break;
        case 3:
          window.scrollTo({
            top: 1.896 * windowWidth,
            behavior: "smooth",
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.itNavBg {
  width: 100vw;
  height: 3.91vw;
  margin: 0 auto;
  position: absolute;
  float: left;
  background: #000;
  opacity: 0.3;
  z-index: -1;
}
.itNav {
  width: 80vw;
  height: 3.91vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  cursor: pointer;
  width: 10vw;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30.6vw;
}
li {
  font-size: 1.2vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s;
}
li:hover {
  color: #e19f73;
}
.choose {
  color: #e19f73;
}
.qqGroup {
  display: flex;
  justify-content: center;
  align-items: center;
  /* transform: scale(1.2); */
}
/* 手机 */
@media screen and (max-width: 768px) {
  .itNavBg {
    height: 8vw;
  }
  .itNav {
    width: 80vw;
    height: 8vw;
  }
  .logo {
    width: 20vw;
    margin-top: 5px;
  }
  .content {
    width: 50vw;
  }
  li {
    font-size: 2.5vw;
  }
}
</style>
