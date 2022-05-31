//createDate:2022-04-24
<template>
  <div class="historyWorks">
    <div class="imgBox">
      <img src="../../assets/img/works.png" alt="" />
    </div>
    <div class="textBox">
      <div class="titleBox">
        <h3 class="title" data-aos="fade-up">历史作品</h3>
        <div class="titleBg">02</div>
      </div>
      <div class="content" data-aos="fade-up">
        爱特工作室相信，只有不断提高要求，延迟满足感，持续的学习和成长，才有可能不断进步，因此，爱特每年都会有新的作品产生。
      </div>
      <div class="more" id="more">
        <span data-aos="fade-up"
          ><router-link class="more_btn" to="/worksShow">了解更多</router-link><img class="arrow" src="../../assets/img/arrow_r.png" alt=""
        /></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "historyWorks",
}
</script>

<style scoped>
.historyWorks {
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
