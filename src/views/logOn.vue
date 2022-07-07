<template>
  <div class="background">
    <div class="back topBtn" @click="toHome()" >
      <div class="move">←</div>
      返回主页
    </div>
    <router-link to="/query" class="routerToQuery"
      ><div class="iquery topBtn">
        <div class="move">←</div>
        查询结果
      </div></router-link
    >
    <div class="main">
      <div class="maintop">
        <div class="logo">
          <img src="../assets/logo_text.png" width="100%" alt="" />
        </div>
        <div class="join">加入我们！</div>
        <div class="us">Join us！</div>
        <div class="blank"></div>
      </div>
      <div class="boss">
        <!-- 学生姓名 -->
        <div class="name">
          <div class="leftone">学生姓名</div>
          <div class="rightone">
            <input
              ref="stuName"
              class="one"
              type="text"
              @blur="nameJudge()"
              v-model="nameValue"
            />
            <img src="../assets/hook.png" class="hook" v-show="nameHook" />
          </div>
        </div>
        <div class="warning">
          <div v-show="warningNameShowIs">输入格式错误,请输入中文名字!</div>
        </div>
        <!-- 性别 -->
        <div class="sex">
          <div class="leftone">性别</div>
          <div class="rightoneSex">
            <div class="sexTurn" @click="manChange()">
              <div v-show="manShowIs">
                <img src="../assets/man.png" alt="" />
              </div>
              <div v-show="!manShowIs">
                <img src="../assets/man2.png" alt="" />
              </div>
            </div>
            <div class="sexTurn" @click="womanChange()">
              <div v-show="womanShowIs">
                <img src="../assets/woman.png" alt="" />
              </div>
              <div v-show="!womanShowIs">
                <img src="../assets/woman2.png" alt="" />
              </div>
            </div>
            <div class="sexTurn" @click="noChange()">
              <div v-show="noShowIs">
                <img src="../assets/secret.png" alt="" />
              </div>
              <div v-show="!noShowIs">
                <img src="../assets/l2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <!-- 专业年级 -->
        <div class="class">
          <div class="leftone">专业年级</div>
          <div class="rightone">
            <input
              class="one"
              ref="stuClass"
              type="text"
              @blur="classJudge()"
              v-model="classValue"
              placeholder="例如:22计算机类"
            />
            <img src="../assets/hook.png" class="hook" v-show="classHook" />
          </div>
        </div>
        <div class="warning">
          <div v-show="warningClassShowIs">
            输入格式错误,请按照如"22计算机类"的格式重新输入
          </div>
        </div>
        <!-- 手机号码 -->
        <div class="phone">
          <div class="leftone">手机号码</div>
          <div class="rightone">
            <input
              ref="stuPhone"
              class="one"
              type="tel"
              @blur="phoneJudge()"
              v-model="phoneValue"
            />
            <img src="../assets/hook.png" class="hook" v-show="phoneHook" />
          </div>
        </div>
        <div class="warning">
          <div v-show="warningPhoneShowIs">请输入合理的手机号码</div>
        </div>
        <!-- 邮箱地址 -->
        <div class="mailbox">
          <div class="leftone">邮箱地址</div>
          <div class="rightone">
            <input
              ref="stuEmail"
              class="one"
              type="email"
              @blur="emailJudge()"
              v-model="emailValue"
            />
            <img src="../assets/hook.png" class="hook" v-show="emailHook" />
          </div>
        </div>
        <div class="warning">
          <div v-show="warningEmailShowIs">请输入合理的邮箱</div>
        </div>
        <!-- 验证码 -->
        <div class="yan">
          <div class="leftone">验证码</div>
          <div class="rightone">
            <input
              class="one"
              type="number"
              placeholder="验证码将发送至您的邮箱。"
              v-model="yanValue"
            />
          </div>
          <div class="click" v-show="codeShowIs" @click="getCode">
            获取验证码
          </div>
          <div class="click getCode" v-show="!codeShowIs">
            {{ count }}s后重新获取
          </div>
        </div>
        <div class="warning">
          <!-- <div v-show="waningClassShowIs">输入格式错误</div> -->
        </div>
        <!-- 意向部门 -->
        <div class="department">
          <div class="leftone">意向部门</div>
          <div class="rightoneDepartment">
            <!-- class="oneDepartment" -->
            <select
              class="oneDepartment"
              v-model="departmentValue"
              @change="change($event)"
            >
              <option
                v-for="(item, index) in productList"
                :key="index"
                :value="item.id"
                v-text="item.val"
              ></option>
            </select>
          </div>
        </div>
        <!-- 你的期待 -->
        <div class="expect">
          <div class="left">你的期待</div>
          <div class="right">
            <textarea
              class="last"
              name=""
              id=""
              cols="30"
              rows="10"
              maxlength="200"
              :placeholder="placeholder"
              v-model="expectValue"
            ></textarea>
          </div>
        </div>
      </div>
      <button class="submit" @click="submitGet()">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "logOn",
  props: {},
  data() {
    return {
      placeholder: "你为什么想要加入爱特？加入爱特你想获得什么?(最多200字)",
      nameValue: "",
      warningNameShowIs: false, //名字格式判断 true 格式错误
      nameHook: false, // 名字后的勾是否显示
      sexValue: null, // 性别数字代号
      manShowIs: true, //性别男是否展示  true 为未选中
      womanShowIs: true, //性别女是否选中  true 为未选中
      noShowIs: true, //性别保密是否选中  true 为未选中
      classValue: "",
      warningClassShowIs: false, //专业年级格式判断 true 格式错误
      classHook: false, // 专业年级后的对勾是否显示
      phoneValue: "",
      warningPhoneShowIs: false, //手机号码格式判断 true 格式错误
      phoneHook: false, // 手机号码对钩是否显示
      emailValue: "",
      emailData: {},
      warningEmailShowIs: false, //邮箱格式判断 true 格式错误
      emailHook: false, // 邮箱对钩是否显示
      codeShowIs: true, //验证码是否发送 true 未发送
      count: "", //倒计时
      timer: null,
      productList: [
        { id: -1, val: "请选择你的意向部门" },
        { id: 0, val: "APP开发" },
        { id: 1, val: "Web开发" },
        { id: 2, val: "程序开发" },
        { id: 3, val: "游戏开发" },
        { id: 4, val: "UI设计" },
      ],
      departmentValue: "-1", //获取被选中的value值， 默认选中的是1
      yanValue: null,
      expectValue: "",
      //学生数据
      stuData: {},
    };
  },
  methods: {
    // 姓名是否为中文
    nameJudge() {
      let pattern = /[^\u4e00-\u9fa5]/; //非中文
      if (!pattern.test(this.nameValue)) {
        this.$refs.stuName.style.border = "0.16vw solid #ededed";
        this.warningNameShowIs = false;
        if (this.nameValue != "") this.nameHook = true;
      } else {
        this.$refs.stuName.style.border = "red 0.16vw solid";
        this.warningNameShowIs = true;
        this.nameHook = false;
      }
      if (this.nameValue == "") this.nameHook = false;
    },

    // 年级专业是否合法
    // 示例 22计算机类
    classJudge() {
      let pattern = /[^\u4e00-\u9fa50-9]/;
      if (!pattern.test(this.classValue)) {
        this.$refs.stuClass.style.border = "0.16vw solid #ededed";
        this.warningClassShowIs = false;
        if (this.classValue != "") this.classHook = true;
      } else {
        this.$refs.stuClass.style.border = "red 0.16vw solid";
        this.warningClassShowIs = true;
        this.classHook = false;
      }
      if (this.classValue == "") this.classHook = false;
    },

    // 手机号码合法判断
    phoneJudge() {
      let pattern =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (pattern.test(this.phoneValue)) {
        this.$refs.stuPhone.style.border = "0.16vw solid #ededed";
        this.warningPhoneShowIs = false; //对
        if (this.phoneValue != "") this.phoneHook = true;
      } else {
        this.$refs.stuPhone.style.border = "red 0.16vw solid";
        this.warningPhoneShowIs = true;
        this.phoneHook = false;
      }
      if (this.phoneValue == "") {
        this.phoneHook = false;
        this.warningPhoneShowIs = false;
        this.$refs.stuPhone.style.border = "0.16vw solid #ededed";
      }
    },

    // 邮箱合法判断
    emailJudge() {
      var pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (pattern.test(this.emailValue)) {
        this.$refs.stuEmail.style.border = "0.16vw solid #ededed";
        this.warningEmailShowIs = false;
        if (this.emailValue != "") this.emailHook = true;
      } else {
        this.$refs.stuEmail.style.border = "red 0.16vw solid";
        this.warningEmailShowIs = true;
        this.emailHook = false;
      }
      if (this.emailValue == "") {
        this.$refs.stuEmail.style.border = "0.16vw solid #ededed";
        this.warningEmailShowIs = false;
        this.emailHook = false;
      }
    },
    expectJudge() {
      if (
        this.expectValue == this.expectValue.replace(/[^\u4E00-\u9FA5]/g, "")
      ) {
        console.log("right");
      } else {
        alert("专业年级输入格式错误");
        this.expectValue = "";
      }
    },

    // -------------------------------------------------------------------------------------------------

    //性别改变
    manChange() {
      this.manShowIs = !this.manShowIs;
      if (this.womanShowIs == false) {
        this.womanShowIs = !this.womanShowIs;
      }
      if (this.noShowIs == false) {
        this.noShowIs = !this.noShowIs;
      }
    },
    womanChange() {
      this.womanShowIs = !this.womanShowIs;
      if (this.manShowIs == false) {
        this.manShowIs = !this.manShowIs;
      }
      if (this.noShowIs == false) {
        this.noShowIs = !this.noShowIs;
      }
    },
    noChange() {
      this.noShowIs = !this.noShowIs;
      if (this.manShowIs == false) {
        this.manShowIs = !this.manShowIs;
      }
      if (this.womanShowIs == false) {
        this.womanShowIs = !this.womanShowIs;
      }
    },
    //-------------------------------------------------------------------------------------------------------
    //倒计时120s和验证码
    getCode() {
      if (this.emailHook == true) {
        // 获取验证码
        this.$http
          .post("/sign_up/verification_code/", {
            email: this.emailValue,
          })
          // 回调函数
          .then((res) => {
            if (res.data.code === 20000) {
              this.$message({
                message: "发送成功~",
                type: "success",
                center: true,
                duration: 2000,
                showClose: true,
              });

              // 120秒倒计时
              const TIME_COUNT = 120;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.codeShowIs = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.codeShowIs = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
            }
          })
          // 捕获错误
          .catch((err) => {
            this.$message({
              message: err.response.data.msg,
              type: "error",
              center: true,
              duration: 2000,
              showClose: true,
            });
          });
      } else {
        this.$message({
          message: "请输入合理的邮箱喔",
          type: "error",
          center: true,
          duration: 2000,
          showClose: true,
        });
      }
    },
    //-------------------------------------------------------------------------------------------------------
    //提交数据
    change(event) {
      this.currentId = event.target.value; //获取option对应的value值
    },

    // 表单总体判断 是否达到了提交的条件
    submitIs() {
      if (
        this.nameHook == true &&
        this.classHook == true &&
        this.phoneHook == true &&
        this.yanValue != "" &&
        (!this.manShowIs || !this.womanShowIs || !this.noShowIs) &&
        this.departmentValue != -1 &&
        this.expectValue != ""
      ) {
        return true;
      } else return false;
    },

    // 表单提交
    submitGet() {
      if (this.submitIs()) {
        let departmentID = this.departmentValue;
        if (!this.manShowIs) this.sexValue = 0;
        else if (!this.womanShowIs) this.sexValue = 1;
        else if (!this.noShowIs) this.sexValue = 2;
        this.$http
          .post("/sign_up/", {
            name: this.nameValue,
            major: this.classValue,
            phone_number: this.phoneValue,
            email: this.emailValue,
            verification_code: this.yanValue,
            department: departmentID,
            expectation: this.expectValue,
            sex: this.sexValue,
          })
          // 回调函数
          .then((res) => {
            this.$message({
              message: res.data.msg,
              type: "success",
              center: true,
              duration: 2000,
              showClose: true,
            });
          })
          .catch((err) => {
            let msg;
            switch (err.response.data.code) {
              case 40000:
                msg = "邮箱验证码过期";
                break;
              case 45031:
                msg = "邮箱验证码错误";
                break;
              case 44032:
                msg = "请先发送验证码";
                break;
              case 43032:
                msg = "该邮箱已存在";
                break;
              case 43033:
                msg = "该手机号码已存在";
                break;
              case 42033:
                msg = "该手机号码不合规";
                break;
              case 42034:
                msg = "姓名过长";
                break;
              case 42035:
                msg = "说的太多啦~";
                break;
              case 42032:
                msg = "邮箱过长";
                break;
              case 44033:
                msg = "请勿频繁发送验证码";
                break;
              case 44036:
                msg = "请输入正确的邮箱格式";
                break;
            }
            this.$message({
              message: msg,
              type: "error",
              center: true,
              duration: 2000,
              showClose: true,
            });
          });
      } else {
        this.$message({
          message: "所填信息不完整或者有错误哦~",
          type: "error",
          center: true,
          duration: 2000,
          showClose: true,
        });
      }
    },
    toHome() {
      this.$router.push({
        path: "/mainPage",
      });
    },
  },
};
</script>

<style scoped>
/* hook css */
.hook {
  position: absolute;
  right: -2.5vw;
  top: 1vw;
  width: 2.5vw;
}

.background {
  width: 99.9vw;
  height: 108.33vw;
  background-image: url("../assets/background.png");
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 1.76vw;
  box-sizing: border-box;
  /* 不会撑大盒子 */
}

.back {
  display: inline-block;
  width: 13.6vw;
  height: 3.18vw;
  margin-left: 1.72vw;
  /* padding-top: 0.63vw; */
  padding-left: 3.6vw;
  box-sizing: border-box;
  text-align: center;
  line-height: 3.18vw;
  background: #ffffff;
  border-radius: 1.25vw;
  display: flex;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
  cursor: pointer;
  transition: 0.3s;
}
.back:hover {
  transform: scale(1.1);
  box-shadow: 0vw 0vw 1.07vw 0.16vw rgba(2, 0, 0, 0.1);
}
.move {
  display: inline-block;
  margin-right: 0.7813vw;
  animation: shaking 2s infinite;
}
.routerToQuery {
  display: inline-block;
}
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
.iquery {
  display: inline-block;
  width: 13.6vw;
  height: 3.18vw;
  margin-left: 1.72vw;
  padding-left: 3.6vw;
  box-sizing: border-box;
  /* text-align: center; */
  line-height: 3.18vw;
  margin-top: 0.99vw;
  /* padding-top: 0.63vw;
  padding-left: 2.4vw; */
  background: #ffffff;
  border-radius: 1.25vw;
  display: flex;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
  cursor: pointer;
  transition: all 0.3s;
}
.iquery:hover {
  transform: scale(1.1);
  box-shadow: 0vw 0vw 1.07vw 0.16vw rgba(2, 0, 0, 0.1);
}
.main {
  width: 63.91vw;
  /* height: 91.88vw; */
  margin-top: 1.04vw;
  margin-left: 18.18vw;

  /* border: 0.01vw solid white; */
  background: #ffffff;
  box-shadow: 0vw 0vw 3.07vw 0.16vw rgba(2, 0, 0, 0.1);
  border-radius: 1.04vw;
  box-sizing: border-box;
}
.maintop {
  width: 63.91vw;
  height: 34.48vw;
  padding-top: 1.88vw;
  background-image: url("../assets/photo.png");
  background-size: 63.91vw 34.48vw;
  border-radius: 1.04vw;
  box-sizing: border-box;
}
.logo {
  width: 8.07vw;
  height: 2.55vw;
  margin-left: 6.98vw;
}

.join {
  width: 32.89vw;
  height: 4.69vw;
  font-size: 4.69vw;
  margin-left: 19.56vw;
  margin-top: 2.81vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
}
.us {
  width: 14.79vw;
  height: 2.14vw;
  margin-left: 24.38vw;
  margin-top: 1.98vw;
  font-size: 2.5vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
}
.blank {
  width: 54.74vw;
  height: 12.03vw;
  margin-left: 4.38vw;
  margin-top: 6.46vw;
  background: #ffffff;
  border-radius: 1.04vw 1.04vw 0vw 0vw;
}
.boss {
  width: 48.13vw;
  /* height: 54.22vw; */
  margin: 0 auto;
  margin-top: -10.59vw;
  background-color: white;
}
/* 姓名 */
.name {
  width: 48.13vw;
  height: 5.16vw;
  /* background-color: rgba(155, 14, 226, 0.911); */
  justify-content: space-between;
  display: flex;
  margin-top: 2vw;
}
.leftone {
  width: 7.92vw;
  height: 5.16vw;
  line-height: 5.16vw;
  font-size: 1.98vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #666666;
}
.rightone {
  position: relative;
  width: 38.44vw;
  /* margin-left: 1.72vw; */
  height: 4.9vw;

  /* background-color: rgb(209, 30, 30); */
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #999999;
}
.one {
  width: 38.13vw;
  height: 4.84vw;
  padding-left: 1.82vw;
  border: 0.16vw solid #ededed;
  border-radius: 1.04vw;
  box-sizing: border-box;
  /* outline-style: dotted; */
  outline-color: #fbcb6a;
  font-size: 1.56vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #999999;
}
.warning {
  height: 2.4vw;
  line-height: 2.4vw;
  /* text-align: center; */
  margin-left: 10.6vw;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #fe6d5a;
}
/* 性别 */
.sex {
  width: 48.13vw;
  height: 5.16vw;
  /* margin-top: 2.6vw; */
  /* background-color: rgba(155, 14, 226, 0.911); */
  justify-content: space-between;
  display: flex;
}
.rightoneSex {
  width: 38.44vw;
  /* margin-left: 1.72vw; */
  background-repeat: no-repeat;
  background-size: contain;
  height: 5.16vw;
  display: flex;
  justify-content: space-between;
  /* background-color: rgb(209, 30, 30); */
}

.sexTurn {
  width: 11.72vw;
  height: 5.2083vw;
  text-align: center;
  font-size: 1.98vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #999999;
  box-sizing: border-box;
  cursor: pointer;
}
.sexTurn div img {
  width: 11.72vw;
  height: 5.16vw;
  /* border: 0.16vw solid #ededed; */
  border-radius: 1.04vw;
}
/* 专业年级 */
.class {
  width: 48.13vw;
  height: 5.16vw;
  margin-top: 1.6vw;
  /* background-color: rgba(155, 14, 226, 0.911); */
  justify-content: space-between;
  display: flex;
}
/* 手机号码 */
.phone {
  width: 48.13vw;
  height: 5.16vw;
  /* margin-top: 2.6vw; */
  /* background-color: rgba(155, 14, 226, 0.911); */
  justify-content: space-between;
  display: flex;
}
/* 你的邮箱 */
.mailbox {
  width: 48.13vw;
  height: 5.16vw;
  /* margin-top: 2.6vw; */
  /* background-color: rgba(155, 14, 226, 0.911); */
  justify-content: space-between;
  display: flex;
}

/* 验证码 */
.yan {
  width: 48.13vw;
  height: 5.16vw;
  /* margin-top: 2.6vw; */
  /* background-color: rgba(155, 14, 226, 0.911); */
  justify-content: space-between;
  display: flex;
  position: relative;
  left: 0;
  top: 0;
}
.click {
  position: absolute;
  left: 37vw;
  top: 0.82vw;
  width: 10vw;
  height: 3.13vw;
  line-height: 3.13vw;
  text-align: center;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
  border-radius: 1.56vw;
  background: linear-gradient(
    90deg,
    rgba(255, 223, 105, 0.74),
    rgba(225, 159, 115, 0.74)
  );
  cursor: pointer;
  transition: all 0.3s;
}
.click:hover {
  transform: scale(1.1);
  box-shadow: 0vw 0vw 1.07vw 0.16vw rgb(2 0 0 / 5%);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

input[type="number"] {
  -moz-appearance: textfield; /* firefox */
}
/* 意向部门 */
.department {
  width: 48.13vw;
  height: 5.16vw;
  justify-content: space-between;
  display: flex;
}
.rightoneDepartment {
  width: 38.44vw;
  /* margin-left: 1.72vw; */
  height: 5.16vw;
  /* background-color: rgb(209, 30, 30); */
}

.oneDepartment {
  width: 100%;
  height: 4.84vw;
  padding-left: 1.82vw;
  border: 0.16vw solid #ededed;
  outline: none;
  border-radius: 1.04vw;
  box-sizing: border-box;
  font-size: 1.56vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #999999;
  line-height: 4.84vw;
  vertical-align: middle;
  /* border: 1px solid #94c1e7; */
  /* -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px; */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: SimHei;
  color: RGBA(102, 102, 102, 0.7);
  cursor: pointer;
  outline: none;
}
div#Department {
  position: relative;
  display: inline-block;
}

div#Department::after {
  content: "\25bc";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 1.04vw;
  line-height: 2.08vw;
  font-size: 1.56vw;

  font-weight: bold;
  vertical-align: middle;
  text-align: center;
  background: #94c1e7;
  color: #2984ce;
  -moz-border-radius: 0 0.31vw 0.31vw 0;
  -webkit-border-radius: 0 0.31vw 0.31vw 0;
  border-radius: 0 0.31vw 0.31vw 0;
  pointer-events: none;
}
/* 你的期望 */
.expect {
  margin-top: 1.45vw;
  width: 48.13vw;
  height: 11.93vw;
  /* background-color: aqua; */
  justify-content: space-between;
  display: flex;
}
.left {
  width: 7.92vw;
  height: 5.16vw;
  line-height: 5.16vw;
  font-size: 1.98vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #666666;
}
.right {
  width: 38.44vw;
  /* margin-left: 1.72vw; */
  height: 11.93vw;
  /* background-color: rgb(209, 30, 30); */
}
.last {
  width: 38.13vw;
  height: 11.62vw;
  border: 0.16vw solid #ededed;
  border-radius: 1.04vw;
  box-sizing: border-box;
  /* padding-top: 0.52vw;
  padding-left: 1.61vw;
  padding-right: 2.3vw; */
  padding: 00.52vw 1.61vw;
  font-size: 1.56vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #999999;
  resize: none;
  outline-color: #fbcb6a;
}
.submit {
  width: 12.45vw;
  height: 3.13vw;
  margin-left: 26.25vw;
  margin-top: 1.81vw;
  margin-bottom: 2.64vw;
  background: linear-gradient(
    90deg,
    rgba(255, 223, 105, 0.74),
    rgba(225, 159, 115, 0.74)
  );
  border-radius: 1.56vw;
  line-height: 3.13vw;
  text-align: center;
  font-size: 1.3vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
  border: 1px solid transparent;
  /* outline: none; */
  cursor: pointer;
  transition: all 0.3s;
}
.submit:hover {
  transform: scale(1.1);
  box-shadow: 0vw 0vw 1.07vw 0.16vw rgb(2 0 0 / 5%);
}

/* 平板 */
@media screen and (max-width: 1200px) and (min-width: 768px) {
  .background {
    width: 100vw;
    height: 100vh;
    background-size: 100vw 100vh;
    padding-top: 1.76vw;
  }
  .main {
    margin-top: 10vw;
    border-radius: 2vw;
  }
  .topBtn {
    width: 15vw;
    height: 4vw;
    margin-left: 2vw;
    padding-left: 4vw;
    line-height: 4vw;
    border-radius: 2vw;
    font-size: 1.6vw;
  }
}

/* 手机 */
@media screen and (max-width: 768px) {
  .background {
    width: 100vw;
    height: 100vh;
    background-size: 100vw 100vh;
    padding-top: 1.76vw;
  }
  .main {
    margin-top: 10vw;
    border-radius: 2vw;
  }
   .topBtn {
    width: 20vw;
    height: 6vw;
    margin-left: 5vw;
    padding-left: 5vw;
    line-height: 6vw;
    border-radius: 3vw;
    font-size: 1.8vw;
  }
}
</style>
