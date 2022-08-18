<template>
  <div class="bigBg" ref="bigBg">
     <!-- @mousewheel.prevent -->
    <div class="bgInfo">
      <div style="overflow: hidden; width: 14.2vw">
        <router-link to="/mainPage">
          <div class="returnBtn">
            <div class="arrow"><div>←</div></div>
            <!-- 加动画 -->
            <div>返回主页</div>
          </div>
        </router-link>
      </div>
      <!-- --- -->
      <div class="infoBigbox">
        <!-- v-for -->
        <div
          class="infoBox"
          :ref="page"
          v-for="(item, index) in departmentInfo1"
          :key="index"
        >
          <div class="infoPage">
            <div class="aiteSign">
              <img class="aiteSignPic" src="../../../assets/logo.png" alt="" />
              <img
                class="aiteSignWord"
                src="../../../assets/IT_STUDIO.png"
                alt=""
              />
            </div>
            <!-- 图标 -->
            <div class="infoContentBox">
              <div class="infoContentWord">
                <div class="Chinese">{{ item.department_cn }}</div>
                <div class="English">{{ item.department_en }}</div>
                <div class="scrollbar">
                <el-scrollbar max-height="20.05vw" always class="scrollbar-wrapper">
                  <div class="message">
                    <div class="departmentInformation">{{ item.content }}</div>
                    <div class="departmentTask">{{ item.introduction }}</div>
                  </div>
                </el-scrollbar>
                </div>
              </div>
              <!--左边-->
              <div class="departmentPic">
                <img
                  :src="item.background"
                  style="width: 33.8vw; height: 28.07vw"
                  alt=""
                />
              </div>
              <!--右边-->
            </div>
          </div>
          <div class="infoBookmark" @click="changePage(index)">
            <!-- 循环  @click="print()"-->
            {{ item.department_cn }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "departmentinformation",
  components: "",
  data() {
    return {
      departmentInfo: [], //将获取完后的数组再存放
      pages: [], //存放盒子的数组
      id: "",
      departmentInformation: [],
      DEL_departmentInfo: [
        {
          department_cn: "程序部",
           department_en: "hhhh",
          content: "do you like what you see",
          introduction: "红红火火恍恍惚惚或或或红红火火恍恍惚惚或或或或红红火火恍恍惚惚或或或或红红火火恍恍惚惚或或或或红红恍恍惚惚或或或或红红恍恍惚惚或或或或红红恍恍惚惚或或或或红红恍恍惚惚或或或或红红恍恍惚惚或或或或红红恍恍惚惚或或或或红红恍恍惚惚或或或或红红恍恍惚惚或或恍恍惚惚或或或或红红恍恍惚惚或或或或红红恍恍惚惚或或或或红红恍恍惚惚或或或或红红或或红红火火恍恍惚惚或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或红红火火恍恍惚惚或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或",
          background: require("../../../assets/programBg.png"),
        },
        // {
        //   name1: "游戏部",
        //   name2: "hhh2",
        //   program: "do you like what you see",
        //   pic: require("../../../assets/gameBg.png"),
        // },
        // {
        //   name1: "WEB部",
        //   name2: "hhh3",
        //   program: "do you like what you see",
        //   pic: require("../../../assets/webBg.png"),
        // },
        // {
        //   name1: "UI部",
        //   name2: "hhh4",
        //   program: "do you like what you see",
        //   pic: require("../../../assets/uiBg.png"),
        // },
        // {
        //   name1: "APP部",
        //   name2: "hhh5",
        //   program: "do you like what you see",
        //   pic: require("../../../assets/appBg.png"),
        // },
      ],
    };
  },
  created() {
    for (var i = 1; i <= 5; i++) {
      this.$http
        .get("/department_info/", {
          params: {
            id: i,
          },
        })
        //回调函数
        .then((res) => {
          this.$data.departmentInformation.push(res.data.data);
          // console.log(this.$data.departmentInformation);  关键试错点
          if (this.$data.departmentInformation.length == 5) {
            this.$data.departmentInfo = this.$data.departmentInformation;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  // 监听数组变化，路由传参后执行预操作
  watch: {
    departmentInfo1: {
      handler() {
        // console.log("newValue", newValue);
        // 调用以下函数，页面渲染完毕后执行里面内容
        this.$nextTick(() => {
          this.changePage(this.$route.query.code - 1);
        });
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    // 
    window.scrollTo(0, 0);
  },
  computed: {
    departmentInfo1: function () {
      return this.sortKey(this.departmentInfo, "id"); //调用排序方法
    },
  },
  methods: {
    page(el) {
      this.pages.push(el);
    },
    sortKey(array, key) {
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x - y;
      });
    },
    //  --------
    // 切换介绍名片
    changePage(id) {
      let max_zindex = 5;
      let i;
      let dom = document.querySelectorAll(".infoBox");
      let zindex = window.getComputedStyle(dom[id], "none").zIndex;
      //  ---------------------------------------------------
      let n = max_zindex - zindex;
      if (n > 0) {
        for (i = 0; i < 5; i++) {
          if (window.getComputedStyle(dom[i], "none").zIndex > zindex) {
            this.pages[i].style.zIndex =
              window.getComputedStyle(dom[i], "none").zIndex - 1;
            this.pages[i].style.transform = `translateX(${
              0.52 * (5 - this.pages[i].style.zIndex)
            }vw)`;
          }
          //  translate不能积累，改：用zindex绑定translate
        }
        this.pages[id].style.zIndex = max_zindex;
        this.pages[id].style.transform = "translateX(0vw)";
      }
    },
  },
};
</script>
<style scoped>
.bigBg {
  width: 100vw;
  height: 100vh;
  /* padding: 0 0 1vw 0; */
  display: flex;
  align-items: center;
  background-attachment: fixed;
  background-image: url(https://cdn.lmark.cc/it/static/background2.png);
  background-size: 100vw 100vh;
}
.bgInfo {
  width: 100vw;
  height: 47.8vw;
  /* height: 100vh; */
  background-color: transparent;
  /* background-repeat: no-repeat; */
}
.returnBtn {
  display: flex;
  justify-content: center;
  margin: 1.3vw 0 0.83vw 1.72vw;
  width: 11.2vw;
  height: 2.55vw;
  background: #ffffff;
  border-radius: 1.25vw;
  line-height: 2.55vw;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
  cursor: pointer;
  transition: 0.1s;
}
.returnBtn:hover {
  box-shadow: 0px 0px 0.73vw 0.16vw rgba(2, 0, 0, 0.1);
}
@keyframes moveArrow {
  0% {
    right: 0vw;
  }
  50% {
    right: 0.42vw;
  }
  100% {
    right: 0.52vw;
  }
  /* 50% { right: 4px; }
    0% { right: 0px; } */
}
.arrow {
  background-color: transparent;
  position: relative;
  width: 1.3vw;
  margin: 0 0.26vw 0 0;
}
.arrow > div {
  top: 0px;
  position: absolute;
  animation: moveArrow 1s ease-out 0.5s infinite alternate;
}
/* -----------书签部分 */
.infoBigbox {
  display: flex;
  position: relative;
}
.infoBox {
  position: absolute;
  display: flex;
  /* overflow: hidden; */
  z-index: 5;
  pointer-events: none;

  width: 86.25vw;
  height: 45.38vw;
  margin: 0 1.15vw 4.09vw 7.66vw;
  background-color: transparent;
  transition: 0.3s;
}
.infoPage {
  overflow: hidden;
  width: 67.92vw;
  height: 33.2vw;
  margin: 0.2vw 0vw 2.69vw 2.76vw;
  padding: 1.86vw 2.08vw 6.2vw 3.96vw;
  z-index: 5;

  background: #ffffff;
  border: 0.1vw solid #fde1a3; /**要修改 */
  box-shadow: -0.42vw 1.35vw 2.76vw 0.47vw rgba(0, 0, 0, 0.1);
  border-radius: 1.04vw;
  background-color: #fff;
}
.aiteSign {
  display: flex;
  /* align-items: center; */
  width: 8.07vw;
  height: 2.55vw;
}
.aiteSignPic {
  width: 2.6vw;
  height: 2.55vw;
}
.aiteSignWord {
  margin: 0.99vw 0 0.73vw 0.57vw;
  width: 5.05vw;
  height: 0.94vw;
}
.infoContentBox {
  display: flex;
  justify-content: space-between;
  margin: 2vw 0 0 0;
  overflow: hidden;
}
.infoContentWord {
  width: 30.98vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
/* .infoContentPic {

} */
.Chinese {
  width: 30.98vw;
  margin: 0 0 1.56vw 0;
  /* width: 295px; */
  height: 3.8vw;
  line-height: 3.8vw;
  font-size: 3.7vw;

  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #483029;
}
.English {
  width: 30.98vw;
  margin: 0 0 2.06vw -0.52vw;
  /* -0.52补正 由于translate导致的移位 是因为子元素继承父元素的属性？ */
  /* width: 245px; */
  line-height: 2.5vw;
  height: 2.5vw;
  font-size: 2.2vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #56433d;
}
/* 滚动条 */
.scrollbar-wrapper {
  overflow-x: hidden;
}
.scrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.scrollbar {
  width: 30.98vw;
  height: 20.05vw;
   margin: 0 0 0 -1.04vw;
  overflow: hidden;
  pointer-events: auto;
}
.message {
  width: 100%;
}
.departmentInformation {
  width: 98%;
  padding-right: 2%; 
  /* margin: 0 0 0 -0.52vw; */
  /* -1.04补正 由于translate导致的移位 是因为子元素继承父元素的属性？ */
  font-size: 1.1vw;
  font-family: SimHei;
  font-weight: 600;
  color: rgb(106, 103, 103);
}
.departmentTask {
  margin: 2.04vw 0 0 -0.52vw;
  /* -1.56补正 由于translate导致的移位 是因为子元素继承父元素的属性？ */
  width: 98%;
  padding-right: 2%;
  font-size: 1.15vw;
  font-family: SimHei;
  font-weight: bold;
  color: rgb(106, 103, 103);
}
.departmentPic {
  width: 33.8vw;
  height: 28.07vw;
  object-fit: cover;
  border-radius: 1.04vw;
  overflow: hidden;
}
.infoBookmark {
  width: 7.6vw;
  height: 5.26vw;
  /* margin: 5.26vw 0 0 0; */
  background: rgba(255, 255, 255, 0.95);
  border: 0.1vw solid #fde1a3;
  /* box-shadow: 1.56vw 0px 1.51vw 0px rgba(0, 0, 0, 0.07); */
  border-radius: 0vw 1.04vw 1.04vw 0vw;
  pointer-events: auto;
  /* width: 91px;
height: 24px; */
  text-align: center;
  line-height: 5.26vw;
  font-size: 1.1vw;
  font-family: SimHei;
  font-weight: bold;
  color: #666666;
  cursor: pointer;
}
/* 子代选择器 */
.infoBigbox div:nth-of-type(1) {
  z-index: 5;
  transform: translateX(0);
  /* 程序 */
}
.infoBigbox div:nth-of-type(2) {
  z-index: 4;
  transform: translateX(0.52vw);
  /* web */
}
.infoBigbox div:nth-of-type(3) {
  z-index: 3;
  transform: translateX(1.04vw);
  /* app */
}
.infoBigbox div:nth-of-type(4) {
  z-index: 2;
  transform: translateX(1.56vw);
  /* ui */
}
.infoBigbox div:nth-of-type(5) {
  z-index: 1;
  transform: translateX(2.08vw);
  /* 游戏 */
}
/* ----------------------------- */
.infoBigbox div:nth-of-type(1) .infoPage {
  border: 0.1vw solid #fde1a3;
  /* 程序 */
}
.infoBigbox div:nth-of-type(2) .infoPage {
  border: 0.1vw solid #a1d8ff;
  /* web */
}
.infoBigbox div:nth-of-type(3) .infoPage {
  border: 0.1vw solid #ffbfd0;
  /* app */
}
.infoBigbox div:nth-of-type(4) .infoPage {
  border: 0.1vw solid #ff7b61;
  /* ui */
}
.infoBigbox div:nth-of-type(5) .infoPage {
  border: 0.1vw solid #96ffa2;
  /* 游戏 */
}
.infoBigbox div:nth-of-type(1) .infoBookmark {
  margin-top: calc(4.2vw);
  margin-left: -0.52vw;
  border: 0.1vw solid #fde1a3;
}
.infoBigbox div:nth-of-type(2) .infoBookmark {
  /* margin-top: calc(4.2vw + calc(7.19vw * calc(n-1))); */
  margin-top: calc(4.2vw + 7.19vw * 1);
  margin-left: -0.52vw;
  border: 0.1vw solid #a1d8ff;
}
.infoBigbox div:nth-of-type(3) .infoBookmark {
  margin-top: calc(4.2vw + 7.19vw * 2);
  margin-left: -0.52vw;
  border: 0.1vw solid #ffbfd0;
}
.infoBigbox div:nth-of-type(4) .infoBookmark {
  margin-top: calc(4.2vw + 7.19vw * 3);
  margin-left: -0.52vw;
  border: 0.1vw solid #ff7b61;
}
.infoBigbox div:nth-of-type(5) .infoBookmark {
  margin-top: calc(4.2vw + 7.19vw * 4);
  margin-left: -0.52vw;
  border: 0.1vw solid #96ffa2;
}
</style>
