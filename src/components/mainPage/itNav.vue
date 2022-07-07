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
    }
  },
  methods: {
    returnTop() {
      this.currentIdx = -1
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    },
    scrollbarMove(index) {
      var windowWidth = document.documentElement.clientWidth
      this.currentIdx = index
      switch (index) {
        case 0:
          window.scrollTo({
            top: 0.53 * windowWidth,
            behavior: "smooth",
          })
          break
        case 1:
          window.scrollTo({
            top: 0.871 * windowWidth,
            behavior: "smooth",
          })
          break
        case 2:
          window.scrollTo({
            top: 1.435 * windowWidth,
            behavior: "smooth",
          })
          break
        case 3:
          window.scrollTo({
            top: 1.896 * windowWidth,
            behavior: "smooth",
          })
          break
        default:
          break
      }
    },
  },
}
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

/* 手机 */
@media screen and (max-width: 768px){
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
