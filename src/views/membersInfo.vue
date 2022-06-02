<template>
<div class="bigBg" @mousewheel.prevent>
  <div class="bgMembersInfo">
    <router-link to="/mainPage">
      <div class="returnBtn">
        <div class="arrowLR"><div>←</div></div>
        <!-- 加动画 -->
        <div>返回主页</div>
      </div>
    </router-link>
    <!-- --------内容 -->
    <div class="showBigBox">
      <!--时间轴-->
      <div class="timeLine" ref="dateBox">
        <ul id="dates" class="dates" ref="dates">
          <li
            v-for="(item, index) in dateORdepartment1"
            :key="index"
            :class="index == active ? 'bigWord' : 'smallWord'"
          >
            <div
              @click="
                changeDateFontSize(index),
                  moveBigMemberBox(index),
                  moveDateList(index),
                  setYear(item.years)
              "
              ref="year"
              class="year"
            >
              <!-- , moveDateList(index) -->
              {{ item.years }}
            </div>
            <!--a的宽度必须要小-->
          </li>
        </ul>
      </div>
      <!-- 对应内容 -->
      <div class="info">
        <ul class="memberList" ref="infos" style="transition: 0.5s">
          <li>
            <div
              class="infoBigBox"
              v-for="(item0, index) in departments"
              :key="index"
            >
              <div class="department">
                <ul id="type" class="type" ref="dateORdepartment">
                  <!-- 一个部门 -->
                  <li
                    v-for="(item1, index) in item0.data"
                    :key="index"
                    :class="index == flag ? 'typeBig' : 'typeSmall'"
                    @mousewheel="scrollDateList($event)"
                  >
                    <div
                      @click="
                        changeTypeFontSize(index, item1.id), setType(item1.id)
                      "
                      class="departmentName"
                    >
                      {{ item1.department }}
                    </div>
                    <!--a的宽度必须要小-->
                  </li>
                </ul>
              </div>
              <!-- 左右分界线 -->
              <div
                class="memberBigBox"
                @mouseenter="showArrow()"
                @mouseleave="removeArrow()"
              >
                <!-- over1 -->
                <div class="arrowTB1">
                  <img
                    src="../assets/箭头上.png"
                    ref="arrowTB"
                    v-show="isShowTopArrow"
                    @click="moveMemberBoxBottom(index)"
                    alt=""
                  />
                </div>
                <div class="memberBox">
                  <div class="memberArray">
                    <!-- 成员滚动盒子边框-->

                    <div
                      class="memberArrayBg"
                      :ref="memberArray"
                      style="transition: 0.5s"
                    >
                      <!-- 成员滚动盒子 -->
                      <div
                        class="member"
                        v-for="(item2, index) in members"
                        :key="index"
                      >
                        <div class="memberPic">
                          <img :src="item2.avatar" alt="" />
                        </div>
                        <div class="memberDetail">
                          <div class="memberName">&nbsp;{{ item2.name }}</div>
                          <div class="memberSaying">{{ item2.motto }}</div>
                        </div>
                      </div>
                      <!-- 此为成员盒子 -->
                    </div>
                  </div>
                </div>
                <div class="arrowTB2">
                  <img
                    src="../assets/箭头下.png"
                    ref="arrowTB"
                    v-show="isShowBottomArrow"
                    @click="moveMemberBoxTop(index)"
                    alt=""
                  />
                </div>
                <!--  -->
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div></div>
</template>
<script>
export default {
  name: "membersInfo",
  components: "",
  data() {
    return {
      old_id: 0,
      //激活项
      active: 0,
      pastID: 0,
      bigWordID: 0,
      flag: 0,
      date: 0, //从后端获取
      typeID: 1, //部门id
      year: 2021,
      type: 1,
      isShowTopArrow: false,
      isShowBottomArrow: false,
      dateORdepartment_length: 0, //用於判斷年份滾動
      memberArray_length: 0, //用於判斷成員滾動
      memberArray_id: 0, //定位memberArray_bg数组
      node: 0, //决定平移距离
      oldBuMenShu: 0,
      newBuMenShu: 0, //记录部门
      page: 0, //记录最大盒子数组的下标，以便重置成员数组滚动
      memberArrays: [], //存放盒子数组
      memberArrayStore: [],
      departments: [],
      members: [
        [
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
        ],
        [
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
        ],
        [
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
        ],
        [
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
        ],
        [
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
          {
            pic: require("../assets/logo.png"),
            name: "咩咩咩",
            saying: "一顿不吃我心刺挠",
          },
        ],
      ],
      dateORdepartment: [
        {
          date: "2004",
          department: ["程序部", "游戏部", "Web部", "UI部", "App部"],
        },
        {
          date: "2005",
          department: ["程序部", "游戏部", "Web部", "UI部", "App部"],
        },
        {
          date: "2006",
          department: ["程序部", "游戏部", "Web部", "UI部", "App部"],
        },
        {
          date: "2007",
          department: ["程序部", "游戏部", "Web部", "UI部", "App部"],
        },
        {
          date: "2008",
          department: ["程序部", "游戏部", "Web部", "UI部", "App部"],
        },
        {
          date: "2009",
          department: ["程序部55", "游戏部", "Web部", "UI部", "App部"],
        },
        {
          date: "2010",
          department: ["程序部", "游戏部", "Web部", "UI部", "App部"],
        },
        {
          date: "2011",
          department: ["程序部", "游戏部", "Web部", "UI部", "App部"],
        },
        {
          date: "2012",
          department: ["程序部", "游戏部", "Web部", "UI部", "App部"],
        },
      ],
      RefFlag: false,
    };
  },
  created() {
    this.$http
      .get("/history/", {
        params: {},
      })
      //回调函数

      .then((res) => {
        this.$data.dateORdepartment = res.data.data;
        if (this.$data.dateORdepartment.length == 11) {
          this.$data.departments = this.$data.dateORdepartment;
        }
        this.$data.dateORdepartment_length = res.data.data.length;
      });
    // -----------------------
    this.$http
      .get("/member/", {
        params: {
          years: 2021,
          department_id: 1,
        },
      })
      //回调函数
      .then((res) => {
        this.$data.members = res.data.data;
        this.$data.memberArray_length = this.$data.members.length;
      });
  },
  //监控部门ID的变化2个
  watch: {
    year(new_id) {
      this.$http
        .get("/member/", {
          params: {
            years: new_id,
            department_id: this.$data.type,
          },
        })
        //回调函数
        .then((res) => {
          this.$data.members = res.data.data;
          this.$data.memberArray_length = this.$data.members.length;
          this.$data.node = 0;
          this.isRightInfo(new_id);
        });
      // ----------------------
    },
    //  ----------------------
    type(new_id) {
      this.$http

        .get("/member/", {
          params: {
            years: this.$data.year,
            department_id: new_id,
          },
        })
        //回调函数
        .then((res) => {
          this.$data.members = res.data.data;
          this.$data.memberArray_length = this.$data.members.length;
          // console.log("返回", this.$data.memberArray_length);
          this.$data.node = 0;
        });
      // ----------------------
    },
  },
  mounted() {
    //&nbsp;切换页面时滚动条自动滚动到顶部
    window.scrollTo(0,0);
    // document.addEventListener("touchmove",mo,false);
    //监听鼠标滚动事件
    window.addEventListener(
      "mousewheel",
      this.debounce(this.scrollDateList, 300),
      false
    ) ||
      window.addEventListener(
        "DOMMouseScroll",
        this.debounce(this.scrollDateList, 300),
        false
      );
  },
  computed: {
    dateORdepartment1: function () {
      return this.sortKey(this.dateORdepartment, "years"); //调用排序方法
    },
  },

  methods: {
    //函数防抖
    debounce(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    },
    // 节流
    throttle(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
          }, wait);
        }
      };
    },
    // 该函数用于将形成ref盒子数组
    memberArray(el) {
      if (!this.RefFlag) {
        // console.log("我push了一个", el);
        this.memberArrayStore.push(el);
        // 为什么每滚动一次就要重新获取
        if (this.memberArrayStore.length == 11) {
          this.memberArrays = this.memberArrayStore;
          this.memberArrayStore = [];
          this.RefFlag = true;
        }
      }
    },
    //鼠标滚轮函数
    scrollDateList(e) {
      e.stopPropagation();
      let direction = e.deltaY > 0 ? "down" : "up"; //deltaY为正则滚轮向下，为负滚轮向上
      if (direction == "down" && e.deltaY > 0) {
        //125为用户一次滚动鼠标的wheelDelta的值
        this.$data.bigWordID++;
        this.$data.year--;
        //原来在这里修改了年份
      } else if (direction == "up" && e.deltaY < 0) {
        this.$data.bigWordID--;
        this.$data.year++;
      }
      // index从0开始
      if (this.$data.bigWordID < 0) {
        this.$data.bigWordID = 0;
        this.$data.year--;
      }
      if (this.$data.bigWordID > this.$data.dateORdepartment_length - 1) {
        this.$data.bigWordID = this.$data.dateORdepartment_length - 1;
        this.$data.year++;
      }

      this.moveBigMemberBox(this.$data.bigWordID);
      this.changeDateFontSize(this.$data.bigWordID);
      this.moveDateList(this.$data.bigWordID);
      for (var i = 0; i < this.$data.dateORdepartment_length; i++) {
        if (this.$data.year == this.$data.dateORdepartment[i].years) {
          this.$data.newBuMenShu = this.$data.dateORdepartment[i].data.length;
          if (this.$data.newBuMenShu - 1 < this.$data.flag)
            this.$data.flag = this.$data.newBuMenShu - 1;
          this.$data.type =
            this.$data.dateORdepartment[i].data[this.$data.flag].id;
          break;
        }
      }
      //  粗略解决滚动时部门对应成员信息问题----滚动时---
    },
    //  粗略解决滚动时部门对应成员信息问题----点击时---
    isRightInfo(newYear) {
      for (var i = 0; i < this.$data.dateORdepartment_length; i++) {
        if (newYear == this.$data.dateORdepartment[i].years) {
          this.$data.newBuMenShu = this.$data.dateORdepartment[i].data.length;
          if (this.$data.newBuMenShu - 1 < this.$data.flag)
            this.$data.flag = this.$data.newBuMenShu - 1;
          this.$data.type =
            this.$data.dateORdepartment[i].data[this.$data.flag].id;
          break;
        }
      }
    },
    // -----------------
    sortKey(array, key) {
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return y - x;
      });
    },
    // 移动部门加成员的大盒子函数
    moveBigMemberBox(id) {
      this.$data.memberArray_id = id;
      this.$refs.infos.style.transform = `translateY(${-43 * id}vw)`;
    },
    // -----------
    //展示上下箭头函数
    showArrow() {
      if (this.$data.memberArray_length > 3) {
        this.$data.isShowBottomArrow = true;
      } else {
        this.$data.isShowBottomArrow = false;
      }
      if (this.$data.node > 0) {
        //上箭頭
        this.$data.isShowTopArrow = true;
      } else {
        this.$data.isShowTopArrow = false;
      }
    },

    // 隐藏箭头函数
    removeArrow() {
      this.$data.isShowTopArrow = false;
      this.$data.isShowBottomArrow = false;
    },
    //node是为了判断滚动的状况，初始为0，向上滚动时 node++  向下滚动时node--
    // 下箭头函数
    moveMemberBoxTop(id) {
      if (this.$data.isShowBottomArrow == true) {
        this.$data.memberArray_length = this.$data.memberArray_length - 3;
        this.$data.node++; //想上移動
      }
      this.memberArrays[id].style.transform = `translateY(${
        -36 * this.$data.node
      }vw)`;
      if (this.$data.isShowBottomArrow == true) {
        this.showArrow();
      }
    },
    // -------------------------
    // 上箭头函数
    moveMemberBoxBottom(id) {
      if (this.$data.isShowTopArrow == true) {
        this.$data.memberArray_length = this.$data.memberArray_length + 3;
        this.$data.node--; //想下移動
      }

      this.memberArrays[id].style.transform = `translateY(${
        -36 * this.$data.node
      }vw)`;
      if (this.$data.isShowTopArrow == true) {
        this.showArrow();
      }
    },
    //  ------------------可以合一
    setYear(YEAR) {
      this.$data.year = YEAR;
    }, //动态年份获取
    setType(TYPE) {
      this.$data.type = TYPE;
      this.memberArrays[this.$data.page].style.transform = `translateY(${-36 * 0}vw)`;
      // 重置成员滚动dates
    }, //动态部门获取
    changeDateFontSize(id) {
      this.$data.active = id;
    }, //时间轴切换函数待修改：取消滚动，直接遍历出整个年份，然后先完成点击事件，点击放大切换，后面在完成鼠标滚轮选择年份
    changeTypeFontSize(id, TYPE) {
      this.$data.flag = id;
      if (id != TYPE) this.setType(TYPE);
      //  防止部门与获取成员不符->>改用其他方法
    },
    // 移动时间轴：高度加边距 ， 同时要初始化成员盒子的滚动，使其变为原来位置
    moveDateList(id) {
      this.$data.page = id;//此时最大数组的下标，以便后面点击部门切换时的成员滚动重置
      this.$refs.dates.style.transform = `translateY(${-3.88 * id}vw)`;
      this.$data.bigWordID = id;
      this.$data.node = 0;
      this.memberArrays[id].style.transform = `translateY(${-36 * 0}vw)`;
    },
  },
};
</script>
<style scoped>
/* 上下滚动动画 */
@keyframes top2bottom {
  0% {
    top: -100%;
  }
  100% {
    top: 0;
  }
}

@keyframes bottom2top {
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 0;
  }
}

/* -------------------------------------------- */
a {
  text-decoration: none;
}
.bigBg {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-attachment: fixed;
  background-image: url(../assets/background3.png);
  background-size: cover;
}
.bgMembersInfo {
  overflow: hidden;
  width: 100vw;
  height: 47.8vw;
  /* 可以铺满 */
background-color: transparent;
  /* background-repeat: no-repeat; */
  /* 上面标签会导致背景无法铺满 */
}
.returnBtn {
  display: flex;
  justify-content: center;
  margin: 2.34vw 0 0.83vw 1.72vw;
  width: 11.2vw;
  height: 2.55vw;
  background: #ffffff;
  border-radius: 1.25vw;

  line-height: 2.55vw;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
  transition: 0.1s;
  cursor: pointer;
}
.returnBtn:hover {
  box-shadow: 0px 0px 0.73vw 0.16vw rgba(2, 0, 0, 0.1);
}
@keyframes moveArrowLR {
  0% {
    right: 0vw;
  }
  44% {
    right: 0.42vw;
  }
  100% {
    right: 0.52vw;
  }
  /* 44% { right: 4px; }
    0% { right: 0px; } */
}
.arrowLR {
  background-color: transparent;
  position: relative;
  width: 1.3vw;
  margin: 0 0.26vw 0 0;
}
.arrowLR > div {
  top: 0px;
  position: absolute;
  animation: moveArrowLR 1s ease-out 0.5s infinite alternate;
}
/* ------------ */

.showBigBox {
  display: flex;
  width: 88.29vw;
  height: 43vw;
  margin: 1.04vw 4.85vw 2.71vw 6.85vw;
  overflow: hidden;
}
.timeLine {
  width: 24.76vw;
  height: 42vw;
  margin: 0 0 0 0;
  /* font-size: 200px; */
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
  overflow: hidden;
}
.dates {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24.76vw;
  /* height: 29.95px; */
  margin-top: 15vw;
  font-size: 1.88vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
  transition: 0.5s;
}

/* -------------------- */
.dates > li {
  transition: 0.8s;
  cursor: pointer;
}
.smallWord {
  display: flex;
  justify-content: center;
  width: 22.76vw;
  height: 1.88vw;
  margin: 1vw auto;
  line-height: 1.88vw;
  font-size: 1.88vw;
  color: #634f49;
  transition: 1.2s;
}
.smallWord > .year {
  text-align: center;
  /* width: 6vw; */
}
.smallWord > .year:hover {
  background: linear-gradient(
    90deg,
    rgba(244, 209, 84, 0.74),
    rgba(211, 186, 94, 0.74),
    rgba(216, 137, 85, 0.74)
  );
  background-clip: text;
  color: transparent;
}
.bigWord {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24.76vw;
  height: 9.42vw;
  margin: 1vw auto;
  line-height: 9.42vw;
  font-size: 9.42vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  background: linear-gradient(
    90deg,
    rgba(244, 209, 84, 0.74),
    rgba(211, 186, 94, 0.74),
    rgba(216, 137, 85, 0.74)
  );
  background-clip: text;
  color: transparent;
    transition: 1.2s;
}
/* -- */

.info {
  display: flex;
  flex-direction: column;
  width: 62.58vw;
  height: 43vw;
  margin: -2vw 0 0 0;
  overflow: hidden;
  /* transition: 12s; */
}
.memberlist{

}
.infoBigBox {
  display: flex;
  width: 62.58vw;
  height: 42vw;
  align-items: center;
  margin: 1.04vw 0 0.29vw 0;
  /* overflow: hidden; */
  /* 此处出错 */
}
.department {
  width: 18.83vw;
  /* height: 52.56vw; */
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  align-items: center;
}
.type {
  width: 11.98vw;
  margin: -3.88vw 2.02vw 0 0;
  /* height: 46.56vw; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.type > li {
  transition: 0.3s;
}
.typeSmall {
  width: 11.93vw;
  /* height: 38px; */
  margin: 3.63vw 0 0 0;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #88746e;
  font-size: 1.88vw;
  transition: 0.1s;
  text-align: center;
}
.typeSmall:hover {
  color: transparent;
  background: linear-gradient(
    90deg,
    rgba(244, 209, 84, 0.74),
    rgba(211, 186, 94, 0.74),
    rgba(216, 137, 85, 0.74)
  );
  background-clip: text;
}
.typeBig {
  width: 13vw;
  margin: 3.63vw 0 0 0;
  font-size: 2.92vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
  color: transparent;
  background: linear-gradient(
    90deg,
    rgba(244, 209, 84, 0.74),
    rgba(211, 186, 94, 0.74),
    rgba(216, 137, 85, 0.74)
  );
  background-clip: text;
}
.departmentName {
  cursor: pointer;
  text-align: center;
  /* transition: all 0.3s; */
}
/* -- */
.memberBigBox {
  position: relative;
  width: 43.75vw;
  height: 36.52vw;
  padding: 2.04vw 0 2.04vw 0;
  margin: 0.5vw 0 0 0;
  /* padding: 2.08vw 0; */
  background: rgba(255, 255, 255, 0.66);
  border-radius: 1.04vw;
  overflow: hidden;
}
.arrowTB1 {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 43.75vw;
  height: 1.2vw;
  padding: 0.3vw 0 0 0;
  text-align: center;
  animation: moveArrowTop 0.75s ease-out 0.5s infinite alternate;
  cursor: pointer;
}
.arrowTB1 > img {
  width: 2.08vw;
  height: 2.08vw;
  /* display: none; */
}
.arrowTB2 {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  width: 43.75vw;
  height: 1.2vw;
  padding: 0 0 0.54vw 0;
  animation: Bottom 1s ease-out 0.5s infinite alternate;
  animation: moveArrowBottom 0.75s ease-out 0.5s infinite alternate;
  cursor: pointer;
}
.arrowTB2 > img {
  /* display: none; */
  width: 2.08vw;
  height: 2.08vw;
}
/* 
 */
@keyframes moveArrowTop {
  0% {
    top: 0px;
  }
  44% {
    top: 8px;
  }
  100% {
    top: 10px;
  }
  /* 44% { right: 4px; }
    0% { right: 0px; } */
}
@keyframes moveArrowBottom {
  0% {
    bottom: 0px;
  }
  44% {
    bottom: 8px;
  }
  100% {
    bottom: 10px;
  }
}
.memberBox {
  width: 43.75vw; /*高不能限死*/
  /* height: 45.52vw; */
  background: transparent;
  border-radius: 20px;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
}
.memberArray {
  height: 36.52vw;
  overflow: hidden;
}
.memberArrayBg {
  transform: translate(0);
  width: 43.75vw;
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
}
.member {
  width: 40vw; /**19 */
  height: 11vw;
  display: flex;
  padding: 1vw 0 0 0;
  /* align-items: center; */
  margin: 0 0 0 1.93vw;
  
overflow-x: hidden; /*禁止横向的滚动条*/
overflow-y: scroll; /*总是显示纵向滚动条*/
}
.memberDetail {
  width: 25vw;     /**10 */
  margin: 0 0 0 3vw;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.memberPic {
  width: 8.33vw;
  height: 8.33vw;
  background: #f2f2f2;
  border-radius: 50%;
  overflow: hidden;
}
.memberPic > img {
  width: 8.33vw;
  height: 8.33vw;
}
.memberName {
  /* width: 39px; */
  height: 0.78vw;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  margin: 1.04vw 0;
}
.memberSaying {
  width: 25vw;
  /* height: 19px; */
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #999999;
}
</style>
