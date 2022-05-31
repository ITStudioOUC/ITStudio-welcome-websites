//createDate:2022-04-24

<template>
  <div class="historyTeam">
    <div class="textBox">
      <div class="titleBox">
        <h3 class="title" data-aos="fade-up">历史团队</h3>
        <div class="titleBg">03</div>
      </div>
      <div class="content" data-aos="fade-up">
        共同的目标，良好的沟通，共同的价值观和行为规范，都是一个优秀团队不可或缺的，团队精神是一只无形的手，推动每次 项目的顺利完成。
      </div>
      <div id="more">
        <span data-aos="fade-up"
          ><router-link class="more_btn" to = "/membersInfo">了解更多</router-link><img class="arrow" src="../../assets/img/arrow_r.png" alt=""
        /></span>
      </div>
    </div>
    <div class="imgBox">
      <img src="../../assets/img/team.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "historyTeam",
}
</script>

<style scoped>
.historyTeam {
  width: 82vw;
  height: 28.85vw;
  display: flex;
  justify-content: space-between;
}
img {
  width: 47.55vw;
  height: 28.85vw;
}
.textBox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.titleBox {
  position: relative;
}
.title {
  font-size: 3.13vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
}
.titleBg {
  font-size: 7.81vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #eff0f2;
  position: absolute;
  top: -3vw;
  left: 0;
  z-index: -1;
}
.content {
  letter-spacing: 0.2vw;
  font-size: 1.4vw;
  font-family: Microsoft YaHei UI;
  color: #4a4a4a;
  line-height: 2.3vw;
}
#more {
  margin-bottom: 2vw;
}
#more span {
  display: flex;
  align-items: center;
  font-size: 1.5vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #515050;
 
  transition: color 0.3s;
}
#more .more_btn:hover {
  color: #e19f73;
}
#more .more_btn{
   cursor: pointer;
   transition: 0.3s;
}
.arrow {
  width: 2vw;
  height: 1.5vw;
  margin-left: 1vw;
  animation: unfold_box 1.3s ease-in-out 2.7s infinite alternate;
}

@keyframes unfold_box {
  from {
    transform: translate(-0.26vw, 0);
  }
  to {
    transform: translate(0.26vw, 0);
  }
}
</style>
