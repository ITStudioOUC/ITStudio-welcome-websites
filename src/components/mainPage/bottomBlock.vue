//createDate:2022-05-15
<template>
  <div class="bottomBlock">
    <div class="iconBox">
      <img src="../../assets/logo1.png" alt="" />
    </div>
    <div class="titleBox">IT STUDIO</div>
    <div class="infoBox">
      中国海洋大学 | 信息科学与工程学院B505 | @ITStudio All Rights Reserved |
      备案号:鲁ICP备18019527号-2
    </div>
  </div>
</template>

<script>
export default {
  name: "bottomBlock",
}
</script>

<style scoped>
.bottomBlock {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 22.66vw;
  background: #e8e8e8;
}
.iconBox{
  margin-top: 1vw;
}
img {
  width: 9.53vw;
  height: 10.16vw;
}
.titleBox {
  font-size: 1.56vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #1a0d10;
  letter-spacing: 0.1vw;
}
.infoBox {
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  color: #666666;
  margin-bottom: 1vw;

}
</style>