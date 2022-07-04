<template>
  <div class="query">
    <!-- 中间内容盒子 -->
    <div class="content">
      <!-- 上方图片加内容部分 -->
      <div class="topImgBox">
        <div class="textBox">
          <h1>加入我们!</h1>
          <h3>Join us!</h3>
        </div>
        <div class="iconBox">
          <img src="../assets/logo.png" alt="" />
          <span class="logoText">IT STUDIO</span>
        </div>
        <!-- 输入框部分 -->
        <div class="inputBox">
          <div class="inputDiv">
            <input
              ref="input"
              type="text"
              class="input"
              placeholder="请输入报名邮箱或手机号码以获取录取进度."
              v-model="emailORphone"
              maxlength="30"
              @blur="leaveInput()"
            />
            <img src="../assets/hook.png" class="hook" v-show="hookShowIs" />
            <div class="errTip" v-show="errTipShowIs">
              请输入合理的手机号码或邮箱!
            </div>
          </div>
          <div class="submitBtn" @click="submit()">提交</div>
        </div>
      </div>
      <!-- 下方录取进度展示 -->
      <div class="bottomBlock">
        <div class="nameBox" v-show="nameShowIs">{{ stuName }}同学:</div>
        <ul class="statusUl">
          <li
            v-for="(item, index) in statusList"
            :key="index"
            class="everyStep"
          >
            <div class="imgBox">
              <img :src="item.statusImg" class="statusImg" />
              <img :src="item.line" class="lineImg" />
            </div>
            <div class="textBox">
              <p>STEP {{ index + 1 }}</p>
              <h4
                v-show="-status != index + 1 || status >= 0"
                :class="{
                  isGreen:
                    (index < status && status > 0) || index < -status - 1,
                }"
              >
                {{ item.stepDes }}
              </h4>
              <h4
                :class="{ isRed: index + 1 == -status }"
                v-show="-status == index + 1 && status < 0"
              >
                未录取
              </h4>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 左上角切换按钮部分 -->
    <div class="btnBox">
      <router-link to="/mainPage" class="btnLink"
        ><span class="shaking">←</span>返回主页</router-link
      >
      <router-link to="/logOn" class="btnLink"
        ><span class="shaking">←</span>立即报名</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "query",
  data() {
    return {
      emailORphone: "", // 报名邮箱
      hookShowIs: false, // 对钩是否显示
      errTipShowIs: false, // 错误提示是否显示
      status: 0, // 用户当前录取进度 ,负数说明在某一阶段被淘汰
      stuName: "xxx", // 学生姓名
      stuEmail: "", // 学生邮箱
      // 录取状态信息数组
      statusList: [
        {
          statusImg: require("../assets/wait.png"),
          line: require("../assets/line.png"),
          stepDes: "初审",
        },
        {
          statusImg: require("../assets/wait.png"),
          line: require("../assets/line.png"),
          stepDes: "面试",
        },
        {
          statusImg: require("../assets/wait.png"),
          line: require("../assets/line.png"),
          stepDes: "笔试",
        },
        {
          statusImg: require("../assets/wait.png"),
          line: require("../assets/line.png"),
          stepDes: "录取结果",
        },
      ],
      nameShowIs: false, // 是否显示学生姓名
      isRed: false, // 未录取是否显示
    };
  },
  methods: {
    // input脱离聚焦
    leaveInput() {
      // 判断邮箱
      let patternEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      // 判断手机号
      let patternPhone =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (
        patternEmail.test(this.emailORphone) ||
        patternPhone.test(this.emailORphone)
      ) {
        this.hookShowIs = true;
        this.errTipShowIs = false;
      }
      if (
        !patternEmail.test(this.emailORphone) &&
        !patternPhone.test(this.emailORphone)
      ) {
        this.errTipShowIs = true;
        this.hookShowIs = false;
      }
      if (this.emailORphone == "") {
        this.$refs.input.style.border = "none";
        this.errTipShowIs = false;
        this.hookShowIs = false;
      }
    },

    // 提交查询信息
    submit() {
      if (this.hookShowIs == true && this.emailORphone != "") {
        this.$http
          .get("/sign_up/", {
            params: {
              string: this.emailORphone,
            },
          })
          .then((res) => {
            if (res.data.code == 40000) {
              this.$message({
                message: res.data.msg,
                type: "error",
                center: true,
                duration: 2000,
                showClose: true,
              });
            }
            if (res.data.code == 20000) {
              this.$message({
                message: res.data.msg,
                type: "success",
                center: true,
                duration: 2000,
                showClose: true,
              });
              this.status = res.data.data.status;
              this.stuName = res.data.data.name;
              this.nameShowIs = true;
              this.chang(this.status);
            }
          });
      } else {
        this.$message({
          message: "请填写或填写正确的格式喔~",
          type: "error",
          center: true,
          duration: 2000,
          showClose: true,
        });
      }
    },

    // 更改状态信息
    chang(status) {
      let passImg = "assets/pass.png";
      let line1Img = "assets/line1.png";
      for (let i = 0; i < Math.abs(status); i++) {
        this.statusList[i].statusImg = require("@/" + passImg);
        if (i < Math.abs(status) - 1) {
          this.statusList[i].line = require("@/" + line1Img);
        }
      }
      let errorImg = "assets/error.png";
      if (status < 0) {
        this.statusList[-status - 1].statusImg = require("@/" + errorImg);
      } else if (status > 0) {
        this.statusList[status - 1].statusImg = require("@/" + passImg);
      }
    },
  },
};
</script>

<style scoped>
/* 动画部分 */
@keyframes shaking {
  0% {
    transform: translateX(0vw);
  }
  60% {
    transform: translateX(-1.02vw);
  }
  100% {
    transform: translateX(0vw);
  }
}

.query {
  width: 100vw;
  height: 120.33vw;
  background: url("../assets/background.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.content {
  width: 63.91vw;
  height: 95.63vw;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 3.07vw 0.16vw rgba(2, 0, 0, 0.1);
  border-radius: 1.04vw;
  margin-top: -6vw;
}
.btnBox {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 1.7vw;
  top: 1.8vw;
}
.btnBox .btnLink {
  display: flex;
  justify-content: center;
  width: 13.6vw;
  height: 3.18vw;
  background: #ffffff;
  border-radius: 1.25vw;
  font-size: 1.25vw;
  line-height: 3.18vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
  margin-bottom: 1vw;
  cursor: pointer;
  transition: 0.3s;
}
.btnBox .btnLink:hover {
  transform: scale(1.1);
  box-shadow: 0vw 0vw 1.07vw 0.16vw rgba(2, 0, 0, 0.1);
}
.shaking {
  animation: shaking 2s infinite;
  margin-right: 0.9vw;
}

.topImgBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 63.91vw;
  height: 34.48vw;
  border-radius: 1.04vw;
  background-image: url("../assets/photo.png");
  background-size: 63.91vw 34.48vw;
  position: relative;
}
.textBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
  margin-top: -10vw;
}
h1 {
  font-size: 4.69vw;
}
h3 {
  font-size: 2.5vw;
}
.iconBox {
  display: flex;
  align-content: center;
  position: absolute;
  left: 6.98vw;
  top: 2.03vw;
  height: 3.5vw;
}
.iconBox img {
  width: 3vw;
  height: 3.5vw;
}
.iconBox .logoText {
  display: inline-block;
  height: 0.83vw;
  font-size: 0.99vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
  line-height: 3.5vw;
  margin-left: 1vw;
}
.inputBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 46.3vw;
  height: 15.47vw;
  background: #ffffff;
  box-shadow: 0.16vw 0.42vw 1.77vw 0.31vw rgba(0, 0, 0, 0.1);
  border-radius: 1.04vw;
  bottom: -5vw;
  z-index: 1;
}
.input {
  width: 35.28vw;
  height: 5vw;
  box-shadow: 0vw 0vw 2.5vw 0.16vw rgba(2, 0, 0, 0.1);
  border-radius: 2.5vw;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #999999;
  padding-left: 3vw;
  margin-bottom: 2.5vw;
}
input::-webkit-input-placeholder {
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #999999;
}
.submitBtn {
  text-align: center;
  line-height: 3.31vw;
  width: 10.05vw;
  height: 3.13vw;
  background: linear-gradient(
    90deg,
    rgba(255, 223, 105, 0.74),
    rgba(225, 159, 115, 0.74)
  );
  border-radius: 1.56vw;
  font-size: 1.3vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s;
}
.submitBtn:hover {
  transform: scale(1.1);
  box-shadow: 0vw 0vw 1.07vw 0.16vw rgba(2, 0, 0, 0.1);
}
.inputDiv {
  position: relative;
}
.hook {
  position: absolute;
  right: -2.5vw;
  top: 1vw;
  width: 2.5vw;
}
.errTip {
  position: absolute;
  font-size: 0.8vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #fe6d5a;
  bottom: 0.5vw;
  margin-left: 3vw;
}
.bottomBlock {
  height: 60.99vw;
  width: 63.91vw;
  position: relative;
}
.nameBox {
  position: absolute;
  left: 9vw;
  top: 7vw;
  font-size: 1.98vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
}
.statusUl {
  width: 17vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  padding-top: 7vw;
}
.statusUl .imgBox {
  height: 11vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.statusUl .statusImg {
  width: 5.42vw;
  height: 5.42vw;
}
.statusUl .lineImg {
  width: 0.36vw;
  height: 4.79vw;
}
.statusUl li .textBox {
  width: 8vw;
  height: 11vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 0;
}

li {
  display: flex;
  justify-content: space-between;
  width: 17vw;
  height: 11vw;
  align-items: center;
  margin-bottom: 1vw;
}
li:nth-child(4) .lineImg {
  display: none;
}
p {
  font-size: 1.56vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #666666;
  margin-bottom: 0.5vw;
}
h4 {
  font-size: 1.88vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
}
.isRed {
  color: #fe6d5a;
}
.isGreen {
  color: #65bc6d;
}
</style>