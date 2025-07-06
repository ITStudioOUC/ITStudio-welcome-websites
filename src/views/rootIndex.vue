//createDate:2022-04-22
<template>
  <!-- 根主页 -->
  <div class="rootIndex">
    <!-- 背景图 -->
    <div class="bg">
      <img :src="rootBg" alt="" />
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 导航栏 -->
      <div class="navBox">
        <img class="nav_log" src="../assets/img/logo2.png" alt="" />
      </div>
      <!-- 进入按钮 -->
      <div class="enterBox">
        <div class="enterBtn" ref="enterBtn" @click="enterMainPage()">
          进入主页
        </div>
      </div>
      <!-- 弹幕盒子 -->
      <div class="barrageBox" ref="barrageBox">
        <!-- 箭头盒子 -->
        <div class="arrowBox">
          <img
            class="up"
            src="../assets/img/up.png"
            alt=""
            @click="isUnfold()"
            v-show="isShow"
          />
          <img
            class="up"
            src="../assets/img/down.png"
            alt=""
            @click="isUnfold()"
            v-show="!isShow"
          />
          <img class="line" src="../assets/img/line.png" alt="" />
        </div>
        <!-- 弹幕内容 -->
        <div class="barrageContent" id="barrageContent" ref="barrageContent">
          <!-- 动态生成的span dom -->
        </div>

        <!-- --------------------------- -->

        <!-- 发送弹幕盒子 -->
        <transition name="fade">
          <div
            class="sendBarrageBox"
            :class="{
              animate__fadeInUp: isShow == false,
              animate__fadeOutDown: isShow == true,
            }"
            v-show="!isShow"
          >
            <div class="inputBox">
              <textarea
                type="text"
                placeholder="说点什么吧...(最多50字)"
                maxlength="50"
                v-model="myBarrage"
                @keydown.enter="banEnter($event), sendBarrage()"
              />
            </div>
            <div class="sendBox" @click="sendBarrage()">SEND</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// import func from "vue-editor-bridge"
export default {
  name: "rootIndex",
  data() {
    return {
      isShow: true, //true 为未展开
      // 弹幕列表
      // barrageList: ["这是第一条弹幕", "这是第二条弹幕", "这是第三条弹幕"],
      barrageList: [], //弹幕列表
      myBarrage: "", //用户发送的弹幕
      barrageTimer: null, //创建弹幕的定时器
      oldPosition: 50, //上次弹幕的位置
      enterLoop: "1111",
      rootBg: require("../assets/img/rootBg.png"),
    };
  },
  getBarrageList(){
    return [
      'wc',
    ];
  },
  /**
   * Fetches and initializes the barrage list when the component is created.
   * Currently uses a local method `getBarrageList()` instead of API call (commented out).
   */
  created() {
    // this.$http.get("/comment/").then((res) => {
    //   this.barrageList = res.data.data;
    // });
    // this.barrageList = this.getBarrageList();
  },
  mounted() {
    // 创建监听标签页变化的函数
    window.addEventListener("visibilitychange",this.stopInterval);
    //自动开始定时器,播放弹幕
    //创建弹幕span的定时器
    this.barrageTimer = setInterval(() => {
      if (this.barrageList.length) {
        let first = this.barrageList.shift();
        this.createBarrage(first);
      } else {
        // barrageListCopy = this.barrageList
        // 弹幕播放完成后摧毁定时器
        // clearInterval(this.barrageTimer)
        //循环播放
        // this.$http.get("/comment/").then((res) => {
        //   this.barrageList = res.data.data;
        // });
        // this.barrageList = this.getBarrageList();
      }
    }, 2500);
  },
  unmounted() {
    //清除指定定时器
    if (this.barrageTimer) {
      clearInterval(this.barrageTimer);
      this.barrageTimer = null;
    }
  },
  methods: {
    // 展开弹幕
    isUnfold() {
      var w = document.documentElement.clientWidth; //返回值不包含滚动条的宽度
      if (this.isShow) {
        if (w > 1200) {
          this.$refs.barrageBox.style.height = 33.85 + "vw";
          this.$refs.enterBtn.style.transform = "translateY(-" + 2.6 + "vw)";
          this.$refs.enterBtn.style.transform = "scale(0.8)";
        } else {
          this.$refs.barrageBox.style.height = 60 + "vh";
          this.$refs.enterBtn.style.transform = "translateY(-" + 4 + "vh)";
          this.$refs.enterBtn.style.transform = "scale(0.9)";
        }
      } else {
        this.$refs.enterBtn.style.transform = "scale(1)";
        if (w > 1200) {
          this.$refs.barrageBox.style.height = 15.63 + "vw";
        } else {
          this.$refs.barrageBox.style.height = 30 + "vh";
        }
      }
      this.isShow = !this.isShow;
    },

    // 进入主页
    enterMainPage() {
      this.$router.push("/mainPage");
    },

    // 生成随机数  范围: [min,max]
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    // 随机生成六位十六进制数
    getColors() {
      const arr = "0123456789abcdef";
      let color = "#";
      let n = 6;
      while (n--) color += arr[this.getRandom(0, 15)];
      return color;
    },

    // 随机三个位置
    getPosition() {
      //展开时增加至五个弹幕轨道
      var flag = -1; //位置标识符
      if (this.isShow) {
        flag = this.getRandom(1, 3);
        if (flag == 1) return 0;
        else if (flag == 2) return 50;
        else if (flag == 3) return 100;
      } else {
        flag = this.getRandom(1, 5);
        if (flag == 1) return 0;
        else if (flag == 2) return 25;
        else if (flag == 3) return 50;
        else if (flag == 4) return 75;
        else if (flag == 5) return 100;
      }
    },

    // 创建弹幕dom对象
    createBarrage(item) {
      const barrageContent = this.$refs.barrageContent; //获取span的父元素
      const barrageSpan = document.createElement("span"); //创建span dom
      barrageSpan.style.color = this.getColors(); //设置随机颜色
      barrageSpan.innerHTML = item.content; //将弹幕列表的内容赋值给弹幕盒子
      barrageSpan.className = "barrage"; //动态绑定类名
      //避免前后两次在同一轨道
      var positionRand;
      while (this.enterLoop) {
        positionRand = this.getPosition();
        if (this.oldPosition != positionRand) {
          barrageSpan.style.top = positionRand + "%";
          this.oldPosition = positionRand;
          break;
        }
      }
      // barrageSpan.style.top = this.getPosition() + "%" //设置随机高度

      //弹幕内容过长时提高弹幕速度
      if (item.content.length > 25 && item.content.length < 35)
        barrageSpan.style.animationDuration = "13s";
      else if (item.content.length >= 35)
        barrageSpan.style.animationDuration = "8s";

      barrageContent.appendChild(barrageSpan); //在barrageContent下创建子盒子

      //监听动画结束,回调函数中移除dom元素
      barrageSpan.addEventListener("animationend", function () {
        barrageSpan.remove();
      });
    },

    // 开始定时器
    startInterval() {
      //创建弹幕span的定时器
      // var barrageListCopy = this.barrageList //创建弹幕副本,以便循环使用
      this.barrageTimer = setInterval(() => {
        if (this.barrageList.length) {
          let first = this.barrageList.shift();
          this.createBarrage(first);
        } else {
          // 弹幕播放完成后摧毁定时器
          // clearInterval(this.barrageTimer)
          // this.barrageTimer = null
          this.getBarrage(); //循环播放
        }
      }, 2500);
    },

    // 停止播放弹幕
    stopInterval() {
      if (document.visibilityState == "hidden") {
        // 清除定时器
        clearInterval(this.barrageTimer);
        this.barrageTimer = null;
      } else if (document.visibilityState == "visible") {
        console.log("已进入目标页");
        this.barrageTimer = setInterval(() => {
          if (this.barrageList.length) {
            let first = this.barrageList.shift();
            this.createBarrage(first);
          } else {
            // 弹幕播放完成后摧毁定时器
            // clearInterval(this.barrageTimer)
            // this.barrageTimer = null
            this.getBarrage(); //循环播放
          }
        }, 2500);
      }
    },

    //发送弹幕
    sendBarrage() {
      if (this.myBarrage != "") {
        var myBarrage = { content: this.myBarrage };
        this.createBarrage(myBarrage);
        this.postBarrage();
        if (this.barrageTimer == null) {
          this.startInterval();
        }
        this.$message({
          message: "发送成功",
          type: "success",
          center: true,
          duration: 2000,
          showClose: true,
        });
        this.myBarrage = "";
      } else if (this.myBarrage == "") {
        this.$message({
          message: "弹幕不能为空喔~",
          type: "error",
          center: true,
          duration: 2000,
          showClose: true,
        });
      }
    },
    // 禁止回车换行
    banEnter(e) {
      e.preventDefault();
    },

    //获取弹幕方法
    getBarrage() {
      // this.$http.get("/comment/").then((res) => {
      //   this.barrageList = res.data.data;
      // });
      this.barrageList = this.getBarrageList();
    },
    //发送弹幕方法
    postBarrage() {
      // this.$http
      //   .post("/comment/", {
      //     content: this.myBarrage,
      //   })
      //   .catch(function (error) {
      //     if (error.response.status == 42001) {
      //       this.$message({
      //         message: "弹幕含有非法字符哦~",
      //         type: "error",
      //         center: true,
      //         duration: 2000,
      //         showClose: true,
      //       });
      //     } else if (error.response.status == 42002) {
      //       this.$message({
      //         message: "弹幕过长了哦~",
      //         type: "error",
      //         center: true,
      //         duration: 2000,
      //         showClose: true,
      //       });
      //     } else if (error.response.status == 42003) {
      //       this.$message({
      //         message: "弹幕不能为空哦~",
      //         type: "error",
      //         center: true,
      //         duration: 2000,
      //         showClose: true,
      //       });
      //     }
      //   });
    },
  },
};
</script>

<style scoped>
/* 动画 */

.animate__fadeInUp {
  animation-duration: 0.5s;
  animation-iteration-count: 1;
}
.animate__fadeOutDown {
  animation-duration: 0.5s;
}

/* 元素样式 */

.rootIndex {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.bg {
  width: 100vw;
  margin: 0 auto;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.bg > img {
  width: 110vw;
  height: 100vh;
  margin-left: -5px;
}
.bg::after {
  position: absolute;
  content: "";
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 7, 12, 0.4);
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  float: left;
  position: relative;
  z-index: 999;
}
.navBox {
  width: 80vw;
  margin: 0 auto;
  display: flex;
  justify-content: start;
}
.navBox .nav_log {
  width: 10vw;
  margin-top: 0.5vw;
}
.enterBox {
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.enterBox .enterBtn {
  display: inline-block;
  width: 19vw;
  height: 4.38vw;
  line-height: 4.38vw;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(255, 223, 105, 0.84),
    rgba(225, 159, 115, 0.84)
  );
  border-radius: 2.19vw;
  font-size: 1.63vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  transition: 0.5s;
}
.enterBtn:hover {
  transform: scale(1.2);
  box-shadow: 0.1vw 0.2vw 1.08vw 0px rgba(2, 0, 0, 0.1);
}
.arrowBox {
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
}
.arrowBox .line {
  position: absolute;
  top: -4vh;
  height: 1.67vw;
}
.arrowBox .up {
  position: absolute;
  width: 2vw;
  top: -4.69vw;
  cursor: pointer;
  animation: unfold_box 1.3s ease-in-out 2.7s infinite alternate;
}
/* 上下悬浮动画 */
@keyframes unfold_box {
  from {
    transform: translate(0, -0.26vw);
  }
  to {
    transform: translate(0, 0.26vw);
  }
}
.barrageBox {
  width: 100vw;
  height: 15.63vw;
  min-height: 100px;
  background: rgba(255, 252, 248, 0.72);
  box-shadow: 0.21vw 0.31vw 2.08vw 0px rgba(2, 0, 0, 0.3);
  border-radius: 3.13vw 3.13vw 0px 0px;
  transition-property: height;
  transition: height 0.5s;
}

/* 弹幕样式 */

.barrageContent {
  position: relative;
  height: 55%;
  margin-top: 1.5vw;
  margin-bottom: 1.5vw;
}

/* ---------------------------------------- */

/* 发送弹幕样式 */

.sendBarrageBox {
  width: 100vw;
  height: 10.42vw;
  min-height: 80px;
  background: rgba(255, 255, 255, 0.38);
  box-shadow: 0.21vw 0.31vw 2.08vw 0px rgba(2, 0, 0, 0.3);
  border-radius: 3.13vw 3.13vw 0px 0px;
  position: absolute;
  bottom: 0;
  transition-property: height;
  transition: height 0.5s;
}
/* ---------------------------------- */
.inputBox {
  height: 10.42vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inputBox textarea {
  outline: none;
  border: 0;
  display: inline-block;
  width: 77vw;
  height: 6.77vw;
  background: rgba(255, 255, 255, 0);
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  color: #666666;
  /* 禁止拖拽 */
  resize: none;
  /* ios input失效 */
  -webkit-user-select: text !important;
  user-select: text !important;
}
.sendBox {
  display: inline-block;
  position: absolute;
  text-align: center;
  line-height: 2.71vw;
  right: 5vw;
  bottom: 1.56vw;
  width: 6.1vw;
  height: 2.71vw;
  background: #ffaf66;
  border-radius: 1.35vw;
  font-size: 1.15vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffefe0;
  cursor: pointer;
  transition: transform 0.3s;
}
.sendBox:hover {
  transform: scale(1.1);
}

/* 平板  1024 1366为例*/
@media screen and (max-width: 1200px) and (min-width: 768px) {
  .bg > img {
    object-fit: fill;
  }
  .enterBox .enterBtn {
    width: 25vw;
    height: 7vw;
    line-height: 7vw;
    font-size: 2.5vw;
    border-radius: 5vw;
  }
  .navBox .nav_log {
    width: 15vw;
    margin-top: 1vw;
  }
  .arrowBox .line {
    top: -4.5vh;
    height: 4vw;
  }
  .arrowBox .up {
    position: absolute;
    width: 4vw;
    top: -8.5vw;
  }
  /* 上下悬浮动画 */
  @keyframes unfold_box {
    from {
      transform: translate(0, -0.5vw);
    }
    to {
      transform: translate(0, 0.5vw);
    }
  }
  .barrageBox {
    height: 35vh;
    background: rgba(255, 252, 248, 0.72);
    border-radius: 3.13vw 3.13vw 0px 0px;
  }

  .sendBarrageBox {
    height: 20vh;
    background: rgba(255, 255, 255, 0.38);
    box-shadow: 0.21vw 0.31vw 2.08vw 0px rgba(2, 0, 0, 0.3);
    border-radius: 3.13vw 3.13vw 0px 0px;
    position: absolute;
    bottom: 0;
    transition-property: height;
    transition: height 0.5s;
  }
  #barrageContent {
    height: 50%;
    margin: 2vw;
  }
  .inputBox textarea {
    font-size: 2.5vw;
  }
  .sendBox {
    line-height: 4vw;
    bottom: 3vw;
    width: 12vw;
    height: 4vw;
    border-radius: 2vw;
    font-size: 2vw;
  }
}

/* 手机 768以下 */

@media screen and (max-width: 768px) {
  .bg {
    width: 100vw;
    height: 100vh;
  }
  .bg img {
    object-fit: cover;
  }
  .enterBox .enterBtn {
    width: 35vw;
    height: 10vw;
    line-height: 10vw;
    font-size: 3.5vw;
    border-radius: 5vw;
  }
  .navBox .nav_log {
    width: 25vw;
    margin-top: 5vw;
  }
  .arrowBox .line {
    top: -4vh;
    height: 4vh;
  }
  .arrowBox .up {
    position: absolute;
    width: 8vw;
    top: -9vh;
  }
  /* 上下悬浮动画 */
  @keyframes unfold_box {
    from {
      transform: translate(0, -1vw);
    }
    to {
      transform: translate(0, 1vw);
    }
  }
  .barrageBox {
    height: 40vh;
    border-radius: 5vw 5vw 0px 0px;
  }

  .sendBarrageBox {
    height: 25vh;
    border-radius: 5vw 5vw 0px 0px;
  }
  #barrageContent {
    height: 46%;
    margin: 5vw;
  }
  .inputBox textarea {
    font-size: 4vw;
  }
  .sendBox {
    line-height: 6vw;
    bottom: 3vh;
    width: 20vw;
    height: 6vw;
    border-radius: 3vw;
    font-size: 4vw;
  }
}
</style>
