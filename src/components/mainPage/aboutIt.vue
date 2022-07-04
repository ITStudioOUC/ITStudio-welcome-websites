//createDate:2022-04-23

<template>
  <div class="aboutIt">
    <!-- 左侧内容部分 -->
    <div class="contentBox">
      <div class="titleBox">
        <div class="title" data-aos="fade-up">关于爱特</div>
        <div class="titleBg">01</div>
      </div>
      <p class="info" data-aos="fade-up">
        爱特工作室成立于2002年,是一个在中国海洋大学信息科学与工程学部领导主持下,以计算机技术人才培养,网络开发为特色的技术性团体。
      </p>
    </div>
    <!-- 轮播图部分 -->
    <el-carousel trigger="click" class="slideshow">
      <el-carousel-item v-for="(item, index) in slideshowList" :key="index">
        <div class="imgBox">
          <img :src="item.imgSrc" alt="" />
        </div>
        <div class="textBox">
          <h3 class="partTitle">{{ item.title }}</h3>
          <p class="content">{{ item.content }}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "aboutIt",
  data() {
    return {
      slideshowList: [
        {
          imgSrc:require("../../assets/img/photo.png"),
          title: "团队文化01",
          content:
            "爱特一直以凝聚和培养计算机人才为己任,发掘技术潜力,感受合作乐趣,让代码高效执行,让大家更进一步。",
        },
        {
          imgSrc: require("../../assets/img/photo2.png"),
          title: "团队文化02",
          content:
            "爱特一直以凝聚和培养计算机人才为己任,发掘技术潜力,感受合作乐趣,让代码高效执行,让大家更进一步。",
        },
        {
          imgSrc: require("../../assets/img/photo3.png"),
          title: "团队文化03",
          content:
            "爱特一直以凝聚和培养计算机人才为己任,发掘技术潜力,感受合作乐趣,让代码高效执行,让大家更进一步。",
        },
      ],
    }
  },
  methods: {
    nextPage() {
      let width = this.$refs.li.offsetWidth
      this.$refs.ul.style.transform = "translateX(-" + width + "px)"
    },
    prePage() {
      let width = this.$refs.li.offsetWidth
      this.$refs.ul.style.transform = "translateX(" + width + "px)"
    },
  },
}
</script>

<style scoped>
/* .el-carousel__item {
  background-color: #cbe2fb;
} */
.el-carousel__item {
  height: 44.01vw;
}
.el-carousel__container {
  height: 100%;
}
.el-carousel__arrow--left {
  position: absolute;
  left: 0;
  bottom: 0;
}

.aboutIt {
  display: flex;
  justify-content: space-between;
  width: 84.98vw;
  height: 44.01vw;
  padding-bottom: 5vw;
  padding-right: 3vw;
  padding-top: 2vw;
}
.contentBox {
  width: 26.04vw;
}
.slideshow {
  overflow: hidden;
  width: 53.49vw;
  height: 44.01vw;
  background: #ffffff;
  box-shadow: 0px 10px 35px 3px rgba(0, 0, 0, 0.2);
  border-radius: 1.56vw;
  position: relative;
}
ul {
  display: flex;
  transition: transform 0.5s;
}
/* 箭头样式 */
.slideshow span {
  position: absolute;
  bottom: 7vw;
  z-index: 999;
}
.slideshow span img {
  width: 3.85vw;
  height: 3.85vw;
  cursor: pointer;
  transition: transform 0.3s;
}
.slideshow span img:hover {
  transform: scale(1.2);
}
/* 左箭头 */
.left {
  left: 1vw;
}
/* 右箭头 */
.right {
  right: 1vw;
}
.titleBox {
  margin-top: 2vw;
  position: relative;
}
.title {
  font-size: 3.13vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
}
.titleBg {
  position: absolute;
  left: 0;
  top: -2.5vw;
  z-index: -1;
  font-size: 7.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #eff0f2;
}
.info {
  line-height: 2.5vw;
  font-size: 1.46vw;
  color: #4a4a4a;
  margin-top: 4vw;
}
.imgBox {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* vw 单位无法撑出盒子 */
.imgBox img {
  width: 53.49vw;
  height: 30vw;
}
.textBox {
  width: 33.28vw;
  margin: 0 auto;
}
.partTitle {
  font-size: 2.08vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  margin: 1.5vw 0;
}
.textBox .content {
  line-height: 2vw;
  font-size: 1.25vw;
  color: #4a4a4a;
}
</style>
