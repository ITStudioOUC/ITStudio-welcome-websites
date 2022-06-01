//createDate:2022-04-23
<template >
  <div class="mainPage">
    <!-- 背景图部分 -->
    <div class="bgBlock">
      <!-- 顶部背景图 -->
      <div class="topBg">
        <img class="topBgImg" src="../assets/img/topBg.jpg" alt="" />
      </div>
      <!-- 下方背景图 -->
      <div class="bottomBg">
        <div class="circleBox yellowBox">
          <img class="yellow" src="../assets/img/yellow.png" alt="" />
        </div>
        <div class="circleBox blueBox">
          <img class="blue" src="../assets/img/blue.png" alt="" />
        </div>
        <div class="circleBox redBox">
          <img class="red" src="../assets/img/red.png" alt="" />
        </div>
        <div class="circleBox greenBox">
          <img class="green" src="../assets/img/green.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="contentBlock">
      <!-- 导航栏部分 -->
      <div class="navBlock">
        <it-nav />
      </div>
      <!-- 爱特简介部分以及报名入口 -->
      <div class="itInfoBlock">
        <it-info />
      </div>
      <!-- 部门部分 -->
      <div class="departmentBlock">
        <department />
      </div>
      <!-- 关于爱特部分 -->
      <div class="aboutItBox">
        <about-it />
      </div>
      <!-- 历史作品部分 -->
      <div class="historyWorksBlock">
        <history-works />
      </div>
      <!-- 历史团队部分 -->
      <div class="historyTeamBlock">
        <history-team />
      </div>
      <!-- 底部栏 -->
      <div class="bottomBlock">
        <bottom-block />
      </div>
    </div>
  </div>
</template>

<script>
import itNav from "../components/mainPage/itNav.vue";
import itInfo from "../components/mainPage/itInfo.vue";
import department from "../components/mainPage/department.vue";
import aboutIt from "../components/mainPage/aboutIt.vue";
import historyWorks from "../components/mainPage/historyWorks.vue";
import historyTeam from "../components/mainPage/historyTeam.vue";
import bottomBlock from "../components/mainPage/bottomBlock.vue";
export default {
  components: {
    itNav,
    itInfo,
    department,
    aboutIt,
    historyWorks,
    historyTeam,
    bottomBlock,
  },
  name: "mainPage",

  created() {},
  methods: {},
};
</script>

<style scoped>
*{
  overflow-x: hidden;
}
.mainPage {
  width: 100vw;
  overflow: hidden;
}
.bgBlock {
  width: 100vw;
  position: absolute;
}
/* 上方背景 */
.topBg {
  width: 100vw;
  display: flex;
  justify-content: center;
  position: relative;
}
.topBg::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 101vw;
  background: rgba(24, 24, 24, 0.36);
  margin-left: -10px;
}
.topBgImg {
  width: 101vw;
  margin-left: -2px;
  filter: blur(0.1vw);
}
/* 下方背景 */
.bottomBg {
  margin-top: -1vw;
  width: 100vw;
}
.yellow {
  width: 100vw;
}
.blueBox {
  width: 100vw;
  position: relative;
}
.blueBox .blue {
  position: absolute;
  right: 0;
  width: 40.94vw;
  height: 49.79vw;
  transform: translateY(-43vw);
}
.redBox {
  transform: translateY(-5vw);
}
.red {
  width: 100vw;
}
.greenBox {
  transform: translateY(-10vw);
}
.green {
  width: 100vw;
}

/* 内容部分 */

.contentBlock {
  width: 100vw;
  position: relative;
  float: left;
  z-index: 999;
}
.contentBlock > div {
  width: 100vw;
  display: flex;
  justify-content: center;
}
/* 导航栏部分 */
.navBlock {
  position: fixed;
  z-index: 999;
  /* margin-bottom: 1vw; */
}
/* 简介以及报名入口部分 */
.itInfoBlock {
  margin-top: 13vw;
}

/* 部门部分 */
.departmentBlock {
  margin-top: 9vw;
}
/* 关于爱特部分 */
.aboutItBox {
  margin-top: 4vw;
  
}
/* 历史作品部分 */
.historyWorksBlock {
  margin-top: 15vw;
}
/* 历史团队部分 */
.historyTeamBlock {
  margin-top: 15vw;
}
/* 底部栏部分 */
.bottomBlock {
  margin-top: 5vw;
}
</style>
