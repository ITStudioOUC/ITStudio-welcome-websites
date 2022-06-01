//createDate:2022-04-23
<template>
  <div class="itInfo">
    <div class="infoText">
      <h2>爱特工作室</h2>
      <h3 data-aos="fade-up">IT&nbsp;STUDIO</h3>
      <p data-aos="fade-up">
        &nbsp; &nbsp;&nbsp;
        &nbsp;爱特工作室成立于2002年，是一个在中国海洋大学信息科学与工程学部领导主持下，以计算机技术人才培养，网络开发为特色的技术性团体。<br />
        &nbsp; &nbsp;&nbsp;
        &nbsp;自成立以来，爱特以发现人才，培养人才，输送人才为最终目的，现已拥有UI设计、Web开发、程序设计、
        Android开发、游戏设计五大类方向，具有一定规模的技术团队。优秀的团队文化与良好的技术氛围使爱特能够脱颖而出，经过多年的发展，现已成为海大网络技术的中坚力量!
      </p>
    </div>
    <div class="btnBox">
      <div id="Btn" class="apply" data-aos="zoom-in-up">立即报名</div>
      <div id="Btn" class="query" data-aos="zoom-in-up">进度查询</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "itInfo",
};
</script>

<style scoped>
/* 动画 */
/* 1. 打字效果的光标闪烁 */
@keyframes blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

/* 2. 打字动画 */
@keyframes typing {
  0% {
    width: 0;
  }
  100% {
    width: 36vw;
  }
  /* 100% {
    width: 0;
  } */
}
.itInfo {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 auto;
  width: 80vw;
  height: 38vw;
}
.infoText {
  width: 42vw;
  height: 31vw;
  background: rgba(245, 254, 255, 0.8);
  border-radius: 1.56vw;
  padding: 3vw 3vw;
}
h2 {
  letter-spacing: 0.5vw;
  width: 35vw;
  font-size: 6.67vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #3b2719;
  margin-bottom: 1.5vw;
  position: relative;

  /* 打字动画实现  */
  white-space: nowrap;
  overflow: hidden;
  animation: typing 2s steps(5) forwards;
  /* animation-delay: 0.5s; */
}
h2::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0.4vw;
  height: 100%;
  background: #3b2719;
  animation: blink 1s linear infinite;
  animation-delay: 2.5s;
}
h3 {
  font-size: 4.69vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #3b2719;
  margin-bottom: 1.2vw;
}
p {
  font-size: 1.2vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  letter-spacing: 0.1vw;
  line-height: 2vw;
}
.btnBox {
  margin-right: 3vw;
}
.btnBox #Btn {
  width: 16.46vw;
  height: 3.75vw;
  background: linear-gradient(
    90deg,
    rgba(255, 223, 105, 0.9),
    rgba(225, 159, 115, 0.9)
  );
  border-radius: 1.88vw;
  /* 字体 */
  line-height: 3.75vw;
  font-size: 1.56vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  margin-bottom: 2.14vw;
  transition: transform 0.3s;
}
.btnBox >div:hover{
  transform: scale(1.1);
}
</style>
