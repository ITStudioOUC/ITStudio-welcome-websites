<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  border: 0;
  outline: none;
  list-style: none;
  text-decoration: none;
  /* 禁止选择 */
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}
*::-webkit-scrollbar {
  width: 0;
}
*::before {
  z-index: inherit;
}
a {
  color: black;
}
/* 弹幕动画 */
/* el ui 动态css需要设置为全局样式,原因未知 */
@keyframes right2left {
  0% {
    left: 100%;
  }
  100% {
    left: -130%;
  }
}
.barrage {
  position: absolute;
  animation: right2left 16s cubic-bezier(0.44, 0.4, 1, 1) forwards;
  font-size: 1.35vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #4a4a4a;
  /* 禁止文字换行 */
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.barrage:hover {
  animation-play-state: paused;
  /* border: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px; */
}
</style>
