<template>
<div class="bigBg"   @touchmove.prevent="touchMove">
  <div class="bgWorksShow">
    <router-link to="/mainPage">
      <div class="returnBtn">
        <div class="arrow"><div>←</div></div>
        <div>返回主页</div>
      </div>
    </router-link>
    <!-- --------内容 -->
    <div class="showBigBox">
      <div class="timeLine" ref="dateBox">
        <ul
          id="dates"
          class="dates"
          ref="dates"
          @touchstart="getTouchstartY($event)"
          @touchmove="scrollDateList($event)"
        >
          <li
            v-for="(item, index) in dateORwork"
            :key="index"
            class="year"
          >
            <div
              @click="
                changeFontSize(index), changeWorkBox(index), moveDateList(index)
              "
              ref="year"
               :class="index == active ? 'bigWord' : 'smallWord'"
             
            >
              {{ item.grade }}
            </div>
            <!--a的宽度必须要小-->
          </li>
        </ul>
      </div>
      <!-- 对应内容 -->
      <div class="worksBigBox">
        <div class="workBox" ref="works">
          <!-- 作品 -->
          <div
            class="contentBox"
            :id="item1.date"
            v-for="(item1, index) in dateORwork"
            :key="index"
          >
            <div class="work" v-for="(item2, index) in item1.data" :key="index">
              <div class="workName" >
                <div @touchstart="showWorkPic(item2.img, index)" @touchend="removeWorkPic()">{{ item2.name }}</div>
                <div>{{ item2.description }}</div>
              </div>
              <div class="workPic" :class="index == isShowWorkPic ? 'show' : 'unshow'"  >
                <!--控制图片显现 -->
                <img :src="item2.img" style="object-fit: cover" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></div>
</template>
<script  type="text/javascript">
export default {
  name: "worksShow",
  oldID: 0,
  components: "",
  data() {
    return {
      oldID: 0,
      isShowWorkPic: -1, //控制图片显现：-1不显现，
      dateORwork: [
        {
          date: "2004",
          works: [
            { work: "5", pic: require("../../../assets/works.png") },
            { work: "5", pic: require("../../../assets/works.png") },
            { work: "5", pic: require("../../../assets/works.png") },
          ],
        },
        {
          date: "2005",
          works: [
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
          ],
        },
        {
          date: "2006",
          works: [
            { work: "7", pic: require("../../../assets/works.png") },
            { work: "7", pic: require("../../../assets/works.png") },
            { work: "7", pic: require("../../../assets/works.png") },
          ],
        },
        {
          date: "2007",
          works: [
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
          ],
        },
        {
          date: "2008",
          works: [
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
          ],
        },
        {
          date: "2009",
          works: [
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
          ],
        },
        {
          date: "2010",
          works: [
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
          ],
        },
        {
          date: "2011",
          works: [
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
          ],
        },
        {
          date: "2012",
          works: [
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
            { work: "6", pic: require("../../../assets/works.png") },
          ],
        },
      ],
      // 激活项
      active: 0,
      pastID: 0,
      bigWordID: 0,
      moveID: 0,
      dateORwork_length: 0,
      startY: 0, //触控起始位置
      timeOutEvent: 0, //时间种子
    };
  },
  created() {
    this.$http
      .get("/work/", {
        params: {},
      })
      //回调函数

      .then((res) => {
        this.$data.dateORwork = res.data.data;
        this.$data.dateORwork_length = res.data.data.length;
      });
  },
  mounted() {
    //&nbsp;切换页面时滚动条自动滚动到顶部(实际存在滚动条)
    window.scrollTo(0,0);
    //监听鼠标滚动事件
   window.addEventListener(
      "touchmove",
      this.debounce(this.scrollDateList, 300),
      false
    ) ||
      window.addEventListener(
        "DOMTouchMove",
        this.debounce(this.scrollDateList, 300),
        false
      );
  },
  methods: {
    //函数防抖
     debounce(func, wait) {
      let timeout;
      
      return function () {
        let context = this;
        let args = arguments;
        console.log("启动");
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
    //
    getTouchstartY(e) {
      this.$data.startY = e.changedTouches[0].pageY  //将手指对应的y轴坐标赋值给data中的startY
},
    //判断滚动方向
    scrollDateList(e) {
      e.preventDefault() //阻止默认事件（长按的时候出现复制）不成功？？
      let moveEndY = e.changedTouches[0].pageY
      let Y = moveEndY - this.$data.startY  //如果值为正,则代表手指下滑,反则则为上滑,为0则表示点击
      if (Y > 50) {
        console.log('下滑')
  this.$data.bigWordID--;
      } else if (Y < -50) {
        console.log('上滑')
 this.$data.bigWordID++;
      } else {
        // console.log('just touch')
      }
      if (this.$data.bigWordID < 0) this.$data.bigWordID = 0;
      if (this.$data.bigWordID > this.$data.dateORwork_length - 1) {
        this.$data.bigWordID = this.$data.dateORwork_length - 1;
      }

      this.changeWorkBox(this.$data.bigWordID);
      this.changeFontSize(this.$data.bigWordID);
      this.moveDateList(this.$data.bigWordID);
    },

    changeFontSize(id) {
      this.$data.active = id;
    },
    changeWorkBox(id) {
      this.$refs.works.style.transform = `translateY(${-50 * id}vh)`;
    },
    moveDateList(id) {
      this.$refs.dates.style.transform = `translateY(${-9 * id}vw)`;
      this.$data.bigWordID = id;
    },
    showWorkPic(pic_addition, id) {   
       if(pic_addition != null) {
          this.$data.isShowWorkPic = id;//决定是否展示图片
          this.$data.timeOutEvent = setTimeout(()=>{
                    this.$data.timeOutEvent = 0;
                    //真正长按后应该执行的内容
                    this.$data.isShowWorkPic = -1;
                },1500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
       }
      //  else if(pic_addition == null) {
      //     this.$data.isShowWorkPic = false;
      //  }
     }, 
     removeWorkPic() {
      clearTimeout(this.$data.timeOutEvent);//清除定时器
                this.$data.timeOutEvent = 0;
          this.$data.isShowWorkPic = -1;
    },
   },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.bigBg {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-attachment: fixed;
  background-image: url(https://cdn.lmark.cc/it/static/background3.png);
  background-size: cover;
}
.bgWorksShow {
  overflow: hidden;
  width: 100vw;
  height: 74vh;
  background-color: transparent;
  /* background-repeat: no-repeat; */
}
.returnBtn {
  display: flex;
  justify-content: center;
  margin: 2.34vw 0 5.83vw 2.72vw;
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
}
.arrow {
  background-color: transparent;
  position: relative;
  width: 1.3vw;
  height: 2.55vw;
  margin: 0 0.26vw 0 0;
}
.arrow > div {
  top: 0vw;
  position: absolute;
  animation: moveArrow 1s ease-out 0.5s infinite alternate;
}
/* ------------ */
.showBigBox {
  display: flex;
  width: 82.29vw;
  height: 50vh;
  margin: 1.04vw 8.85vw 2.71vw 8.85vw;
  overflow: hidden;
}
.timeLine {
  width: 22.76vw;
  height: 30.5vh;
  /* 56 50 */
  margin: 20vw 9vw 0 0;
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
  width: 23vw;
  margin-top: 12.5vh;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
  overscroll-behavior: contain;
  transition: 0.5s;
  overflow: hidden;
}

/* -------------------- */
.dates > li {
  cursor: pointer;
}
.year {
  display: flex;
  justify-content: center;
  margin: 2.5vw auto;
}
.smallWord { 
  width: 22.76vw;
  height: 4vw;
  line-height: 4vw;
  font-size: 4vw;
  color: #634f49;
  transition: 1.2s;
  text-align: center;
}

.smallWord :hover {
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
  height: 9.42vw;
  line-height: 9.42vw;
  font-size: 9.3vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  transition: 1.2s;
  text-align: center;
  
  background: linear-gradient(
    90deg,
    rgba(244, 209, 84, 0.74),
    rgba(211, 186, 94, 0.74),
    rgba(216, 137, 85, 0.74)
  );
  background: -moz-linear-gradient(
    90deg,
    rgba(244, 209, 84, 0.741),
    rgba(211, 186, 94, 0.741),
    rgba(216, 137, 85, 0.741)
  );
  background: -webkit-linear-gradient(
    90deg,
    #f4d154bd,
    #d3ba5ebd,
    #d88955bd
  ); 
  background-clip: text;
  -moz-background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
/* ----------------------- */
.worksBigBox {
  height: 50vh;
  width: 50.14vw;
  overflow: hidden;
} /**边界 */
.workBox {
  /* height: 56.56vw; */
  width: 50.14vw;
  transition: 1s;
} /**整体盒子 */
.contentBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50vh;
  width: 50.14vw;
  overflow: hidden; /**防止网页加载使下图片显现超出 */
} /**一个内容盒子 */
.work {
  width: 40vw;
  position: relative;
  margin: 0 0 5vw 0;
  transition: 0.5s;
}

.work div{
  font-size: 3.5vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #634f49;
}
.workName > div {
  cursor: pointer;
}

.workName {
  display: flex;
  flex-direction: column;
}
/* 控制图片显现 */
.show {
  display: block;
}
.unshow {
  display: none;
}
/**下为作品名的样式 */
.workName div:nth-of-type(1) {
  width: 24vw;
  transition: all 0.3s;
}
.workName div:nth-of-type(2) {
  width: 40vw;
  font-size: 2.5vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  transition: 0.5s;
  cursor: pointer;
  margin-top: 1.5vw;
}

.workPic {
  position: absolute;
cursor: pointer;
  left: 14vw;
  top: -5vw;
  width: 33.7vw;
  height: 18.07vw;
  transition: 0.3s;
  overflow: hidden;
  box-shadow: 0.2vw 1.0vw 2vw 0.43vw rgba(0, 0, 0, 0.43);
  border-radius: 2.67vw;
  transition: 0.3s;
  /* 调节透明度使图片显现 */
  /* opacity: 0; */
  transition: opacity 0.5s linear;
}
.workPic > img {
  width: 33.7vw;
  height: 18.07vw;
}
/* .workName:hover ~ .workPic {
  opacity: 1;
  
  display: block;
} */
/* 调节透明度使图片显现 */
/* .work .workName:hover div:nth-of-type(1) {
  background: linear-gradient(
    90deg,
    rgba(244, 209, 84, 0.74),
    rgba(211, 186, 94, 0.74),
    rgba(216, 137, 85, 0.74)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
} */
</style>
