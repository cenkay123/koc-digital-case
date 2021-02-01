<template>
  <div class="wrap">
    <div class="loading">
      <div class="bounceball"></div>
      <div class="text">NOW LOADING</div>
    </div>
  </div>
</template>

<script>
export default {
name: "Loading"
}
</script>

<style scoped>
.wrap {
  position: fixed;
  right: 0;
  width: 100%;
  bottom: 0;
  height: calc(100% - 55px);
  z-index: 99999999;
  background: #fffffff0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.text {
  color: #35495e;
  display: inline-block;
  margin-left: 5px;
}

.bounceball {
  position: relative;
  display: inline-block;
  height: 37px;
  width: 15px;
}
.bounceball:before {
  position: absolute;
  content: "";
  display: block;
  top: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #3fb983;
  transform-origin: 50%;
  -webkit-animation: bounce 500ms alternate infinite ease;
  animation: bounce 500ms alternate infinite ease;
}

@-webkit-keyframes bounce {
  0% {
    top: 30px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }
  35% {
    height: 15px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0;
  }
}

@keyframes bounce {
  0% {
    top: 30px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }
  35% {
    height: 15px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0;
  }
}
</style>
