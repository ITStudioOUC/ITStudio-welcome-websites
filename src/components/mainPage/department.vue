//createDate:2022-04-23
<template>
  <div class="department">
    <div class="title">
      <div class="line"></div>
      <h3>五大部门</h3>
      <div class="line"></div>
    </div>
    <div class="fiveDepartment">
      <li
        v-for="(item, index) in departmentList"
        :key="index"
        data-aos="zoom-in-up"
      >
        <span class="imgBox"><img :src="item.icon" alt="" /></span>
        <span class="name">{{ item.department_cn }} </span>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "department",
  data() {
    return {
      departmentList: [],
    }
  },
  created(){
    this.$http.get("/department/").then((res)=>{
      this.departmentList = res.data.data
      
    })
  }
}
</script>

<style scoped>
.department {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 81.98vw;
  height: 23.85vw;
  background: #ffffff;
  box-shadow: 0.52vw 1.35vw 2.76vw 0.47vw rgba(0, 0, 0, 0.38);
  border-radius: 1.56vw;
}
.line {
  width: 12.14vw;
  height: 2px;
  background: #3b2719;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vw;
  width: 33vw;
}
h3 {
  font-size: 1.88vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #3b2719;
}
.fiveDepartment {
  width: 68.59vw;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4.69vw;
}
.fiveDepartment li {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}
li:hover span img {
  transform: scale(1.2);
  box-shadow: 0 2px 6px 0 rgb(31 35 41 / 20%);
}
li:hover span {
  color: rgba(251, 169, 128);
}
li span {
  /* transition:fontsize 0.3s; */
  font-size: 1.58vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #4a4a4a;
  margin-top: 1.46vw;
  transition: color 0.3s;
}
li span img {
  width: 8.13vw;
  height: 8.13vw;
  background: linear-gradient(
    90deg,
    rgba(255, 220, 143, 0.84),
    rgba(251, 169, 128, 0.84)
  );
  border-radius: 50%;
  transition: transform 0.3s;
}
</style>
