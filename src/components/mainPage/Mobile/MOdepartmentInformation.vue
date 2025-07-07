<template>
  <div class="bigBg" ref = "bigBg" @mousewheel.prevent>
    <div class="bgInfo">
      <div style="overflow: hidden; width: 27.2vw">
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
              <img class="aiteSignWord" src="../../../assets/IT_STUDIO.png" alt="" />
            </div>
            <!-- 图标 -->
            <div class="infoContentBox">
              <div class="infoContentWord">
                <div class="Chinese">{{ item.department_cn }}</div>
                <div class="English">{{ item.department_en }}</div>
                <div class="scrollbar">
                <el-scrollbar max-height="27vw" always class="scrollbar-wrapper">
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
                  style="width: 55.8vw; height: 50.07vw"
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
      departmentInfo: [
        {
          department_cn: "程序部",
          department_en: "PROGRAM",
          content: "程序部门主要职能为基于Django,ASP.NET,PHP,JSP等技术,应用Python, C#，Java, c+＋等语言开发应用程序，完成与SQL Server，MySQL等数据库的交互，设计对外API接口等。",
          introduction: "程序部，所谓之程序，乃是后端开发的意思，并非常规意义上常见的桌面应用程序，而是更加偏向计算机网络方向的学习核心。主要能够学到的内容有后端接口、数据库以及服务器的相关一系列操作，这也是每一个互联网应用中必要的部分，会比较有挑战性喔，请做好无限学习的准备！",
          background: require("../../../assets/programBg.png"),
        },
        {
          department_cn: "Web开发",
          department_en: "WEBBASED",
          content: "Web开发部门利用html,Css.JavaScript为主要语言来对网站表现层与结构层等前台部分做出完关构造，在实现设计师要带给用户上。的视觉冲击之外还能保证与后台交互实现网站对用户功能,从而让网站突破实用性和吸引力。",
          introduction: "Web开发可以暂时理解成写网页，例如你现在浏览的网页，你所能看到的部分（网页上的文字图片、各种动画效果）都是我们的成员在Web开发部门学习后的作品。\r\n  写网页，我们这里需要用到三部分知识：Html、CSS、Javascript，大家大家可以看到没有涉及C语言、Python等，因此对零基础的同学较为友好。在进入社团前，我们期望你们预习基础的Html知识，掌握基本的标签。在进入社团后，我们每周都会组织授课，按照上述的顺序讲课，在课下我们会布置相关的练习，需要你在上课后，运用学习的知识完成练习。\r\n  因此，虽然Web开发对零基础的同学比较友好，但是大家也可以看到进来之后大家也需要不断的学习，这样才能向写一个网页这一目标不断前进嘛！",
          background: require("../../../assets/webBg.png"),
        },
        {
          department_cn: "UI设计",
          department_en: "DESIGN",
          content: "UI设计部门主要使用Photoshop, Illustrator等软件，对网页、APP等界面进行设计，并负责各类视频制作、剪辑、特效制作的工作。",
          introduction: "UI设计是什么？\r\n这或许是每个萌新都好奇的问题。\r\n(不会就百——)\r\n通俗来讲，\r\nUI就是决定APP界面、网页等长啥样的部门，\r\n重在【设计】\r\n(包含人机交互、操作逻辑、界面美观的整体设计。)\r\n那就不得不说设计师们与Adobe全家桶等不得不说的故事了。\r\n(想听吗？想听就来！报！名！)\r\n\r\n来UI部门，\r\n你可以畅游在Adobe的海洋，\r\n你可以体会格式塔心理的美学，\r\n你可以感受设计之道……\r\n(反正来就vans 加入我们吧！)",
          background: require("../../../assets/uiBg.png"),
        },
        {
          department_cn: "游戏开发",
          department_en: "GAME DEVELOP",
          content: "爱特游戏部门是2018年新成立的部门。专注于2D游戏的开发。游戏以游戏性为本,以社交性为辅，以商业性为底。他们用心为自己的理想开辟道路。",
          introduction: "大一秋季学期期间会教给新生Unity的一些简单的使用，包括场景实例搭建和脚本代码编写，让新生具备自主开发简单的小游戏的能力。期间会有三次项目作业，难度逐步提升。\r\n大一春季学期期间则分组安排进行团队项目开发，每组成员在一学期内多人合作完成一个大型游戏项目的开发。",
          background: require("../../../assets/uiBg.png"),
        },
        {
          department_cn: "APP开发",
          department_en: "APP DEVELOP",
          content: "爱特工作室APP应用部门是在移动端高速发展下，于2017年成立的部门。Android应用开发基于Java等语言，负责编写应用客户端界面，完成客户端与服务端的信息应用开发部门扩展了社团的变量，使工作室的技术力量多样化。",
          introduction: "APP部主要负责移动APP和微信小程序的设计与制作，在一年的学习你将动手实现5个不同类型的APP，拥有自主设计开发APP的能力，加入我们，让我们一起设计一款属于你自己的APP吧。",
          background: require("../../../assets/appBg.png"),
        },
      ], //将获取完后的数组再存放
      pages: [], //存放盒子的数组
      id: "",
      departmentInformation: [],
      DEL_departmentInformation: [
        {
          name1: "程序部",
          name2: "hhh1",
          program: "do you like what you see",
          pic: require("../../../assets/programBg.png"),
        },
        {
          name1: "游戏部",
          name2: "hhh2",
          program: "do you like what you see",
          pic: require("../../../assets/gameBg.png"),
        },
        {
          name1: "WEB部",
          name2: "hhh3",
          program: "do you like what you see",
          pic: require("../../../assets/webBg.png"),
        },
        {
          name1: "UI部",
          name2: "hhh4",
          program: "do you like what you see",
          pic: require("../../../assets/uiBg.png"),
        },
        {
          name1: "APP部",
          name2: "hhh5",
          program: "do you like what you see",
          pic: require("../../../assets/appBg.png"),
        },
      ],
    };
  },
  created() {
    // for (var i = 1; i <= 5; i++) {
    //   this.$http
    //     .get("/department_info/", {
    //       params: {
    //         id: i,
    //       },
    //     })
    //     //回调函数
    //     .then((res) => {
    //       this.$data.departmentInformation.push(res.data.data);
    //       // console.log(this.$data.departmentInformation);  关键试错点
    //       if (this.$data.departmentInformation.length == 5) {
    //         this.$data.departmentInfo = this.$data.departmentInformation;
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
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
    //&nbsp;切换页面时滚动条自动滚动到顶部
    window.scrollTo(0,0);
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
        // console.log(window.getComputedStyle(dom[id], "none").width,"宽");
        if (n > 0) {
          for (i = 0; i < 5; i++) {
            if (window.getComputedStyle(dom[i], "none").zIndex > zindex) {
              this.pages[i].style.zIndex =
                window.getComputedStyle(dom[i], "none").zIndex - 1;
              this.pages[i].style.transform = `translateX(${
                1 * (5 - this.pages[i].style.zIndex)
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
a:-webkit-any-link {
  text-decoration: none;
    width: 23vw;
}
.bigBg {
  width: 100vw;
  height: 100vh;
  /* padding: 0 0 1vw 0; */
  display: flex;
  align-items: center;
  background-attachment: fixed;
  background-image: url(../../../assets/background2.png);
  background-size: cover;
}
.bgInfo {
  width: 100vw;
  height: 90.8vh;
  /* height: 100vh; */
  background-color: transparent;
  /* background-repeat: no-repeat; */
}
.returnBtn {
  display: flex;
  justify-content: center;
  margin: 1.3vw 0 5.83vw 2.72vw;
  width: 23vw;
  height: 6.55vw;
  background: #ffffff;
  border-radius: 3vw;

  line-height: 6.55vw;
  font-size: 3vw;
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
    right: 1vw;
  }
  100% {
    right: 1.5vw;
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
  z-index: 5;
  pointer-events: none;

  width: 86.25vw;
  height: 84vh;
  margin: 0 1.15vw 4.09vw 7.66vw;
  background-color: transparent;
  transition: 0.3s;
}
.infoPage {
  overflow: hidden;
  width: 60.92vw;
  height: 74vh;
  /* 33.2 */
  margin: 0.2vw 0vw 2.69vw 2.76vw;
  padding: 3.86vw 2.08vw 6.2vw 3.96vw;
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
  width: 17.07vw;
  height: 4.55vw;
}
.aiteSignPic {
  width: 4.6vw;
  height: 4.55vw;
}
.aiteSignWord {
  margin: 1.99vw 0 0.73vw 1.57vw;
  width: 10.05vw;
  height: 1.94vw;
}
.infoContentBox {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 2vw 0 0 0;
  overflow: hidden;
}
.infoContentWord {
  width: 56.98vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  letter-spacing: 1px;
}
/* .infoContentPic {

} */
.Chinese {
  width: 56.98vw;
  margin: 0 0 3.56vw 0;
  /* width: 295px; */
  height: 4.80vw;
  line-height: 4.80vw;
  font-size: 4.20vw;
  
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #483029;
}
.English {
  width: 56.98vw;
  margin: 0 0 3.06vw -1vw;
  /* -0.52补正 由于translate导致的移位 是因为子元素继承父元素的属性？ */
  /* width: 245px; */
  line-height: 3.50vw;
  height: 3.50vw;
  font-size: 2.8vw;
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
  width: 56.98vw;
  height: 27vw;
   margin: 0  0 5vw -2vw;
  overflow: hidden;
  pointer-events: auto;
}
.message {
  width: 100%;
}
.departmentInformation {
    width: 98%;
  padding-right: 2%;
  /* margin: 0 0 0 -2vw; */
  /* -1.04补正 由于translate导致的移位 是因为子元素继承父元素的属性？ */
  /* width: 29.74vw; */
  /* height: 5.36vw; */
  font-size: 2.10vw;
  font-family:SimHei;
  font-weight: 600;
  color: rgb(106, 103, 103);
}
.departmentTask {
  margin: 2.04vw 0 2vw -1vw;
  /* -1.56补正 由于translate导致的移位 是因为子元素继承父元素的属性？ */
   width: 98%;
  padding-right: 2%;
  font-size: 2.15vw;
  font-family:SimHei;
  font-weight: bold;
  color: rgb(106, 103, 103);
}
.departmentPic {
  width: 55.8vw;
  height: 50.07vw;
  object-fit: cover;
  border-radius: 1.04vw;
  overflow: hidden;
}
.infoBookmark {
  width: 18vw;
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
  font-size: 2.1vw;
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
  transform: translateX(1vw);
  /* web */
}
.infoBigbox div:nth-of-type(3) {
  z-index: 3;
  transform: translateX(2vw);
  /* app */
}
.infoBigbox div:nth-of-type(4) {
  z-index: 2;
  transform: translateX(3vw);
  /* ui */
}
.infoBigbox div:nth-of-type(5) {
  z-index: 1;
  transform: translateX(4vw);
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
  margin-left: -1vw;
  border: 0.1vw solid #fde1a3;
}
.infoBigbox div:nth-of-type(2) .infoBookmark {
  /* margin-top: calc(4.2vw + calc(7.19vw * calc(n-1))); */
  margin-top: calc(4.2vw + 7.19vw * 1);
  margin-left: -1vw;
  border: 0.1vw solid #a1d8ff;
}
.infoBigbox div:nth-of-type(3) .infoBookmark {
  margin-top: calc(4.2vw + 7.19vw * 2);
  margin-left: -1vw;
  border: 0.1vw solid #ffbfd0;
}
.infoBigbox div:nth-of-type(4) .infoBookmark {
  margin-top: calc(4.2vw + 7.19vw * 3);
  margin-left: -1vw;
  border: 0.1vw solid #ff7b61;
}
.infoBigbox div:nth-of-type(5) .infoBookmark {
  margin-top: calc(4.2vw + 7.19vw * 4);
  margin-left: -1vw;
  border: 0.1vw solid #96ffa2;
}
</style>
