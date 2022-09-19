<template>
  <div id="app">
    <div class="icon-container">
      <svg class="!hidden" width="320" height="320">
        <circle
          class="comm-transition-style"
          fill="none"
          stroke="#68e534"
          stroke-width="20"
          cx="160"
          cy="160"
          r="150"
          ref="success_circle"
          stroke-linecap="round"
          transform="rotate(-90)"
          transform-origin="160 160"
        ></circle>
        <polyline
          class="comm-transition-style"
          ref="success_tick"
          fill="none"
          stroke="#68e534"
          stroke-width="20"
          points="60,154 140,214 260,118"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></polyline>
      </svg>
      <el-button @click="showSuccessIcon">click-show-success</el-button>
    </div>


    <div class="icon-container">
      <svg width="320" height="320">
        <circle
          fill="none"
          class="comm-transition-style"
          stroke="#68e534"
          stroke-width="20"
          cx="160"
          cy="160"
          r="150"
          ref="fail_circle"
          stroke-linecap="round"
          transform="rotate(-90)"
          transform-origin="160 160"
        ></circle>
        <path 
          d="M 90 90 L 230 230"
          stroke-width="20"
          stroke-linecap="round"
          class="comm-transition-style"
          stroke="#68e534"
          ref="fail_left_line"
        />
        <path 
          d="M 230 90 L 90 230"
          stroke-width="20"
          stroke-linecap="round"
          class="comm-transition-style"
          stroke="#68e534"
          ref="fail_right_line"
        />
      </svg>
      <el-button @click="showFailIcon">click-show-Fail</el-button>
    </div>
    <Loading></Loading>
  </div>
</template>

<script>
import Loading from './components/loading.vue'
export default {
  name: "App",
  components: {
    Loading,
  },
  data() {
    return {
      transitionEndEvent: '',
    };
  },
  created() {
    
  },  
  mounted() {
    this.initFailIcon()
    this.initSuccessIcon()
    this.transitionEndEvent = this.whichTransitionEvent();
  },
  methods: {
    initSuccessIcon() {
      this.$refs.success_circle.style.strokeDashoffset = Math.PI * 150 * 2
      this.$refs.success_circle.style.strokeDasharray = Math.PI * 150 * 2
      this.$refs.success_tick.style.strokeDashoffset = 300
      this.$refs.success_tick.style.strokeDasharray = 300
    },
    showSuccessIcon() {
      this.$refs.success_circle.style.strokeDashoffset = 0;
      //解决多次触发事件  http://www.wjhsh.net/qianduanjingying-p-6812660.html
      let flag = true
      this.$refs.success_circle.addEventListener(this.transitionEndEvent, (e) => {
        if(e.target === e.currentTarget && flag) {
          console.log('end');
          flag = false
          this.$refs.success_tick.style.strokeDashoffset = 0;
        }
      })
      let flag_tick = true
      this.$refs.success_tick.addEventListener(this.transitionEndEvent, (e) => {
        if(e.target === e.currentTarget && flag_tick) {
          console.log('end');
          flag_tick = false
          this.$refs.success_circle.style.stroke = '#326de6';
          this.$refs.success_tick.style.stroke = '#326de6';
        }
      })
    },
    initFailIcon() {
      this.$refs.fail_circle.style.strokeDashoffset = Math.PI * 150 * 2
      this.$refs.fail_circle.style.strokeDasharray = Math.PI * 150 * 2
      this.$refs.fail_left_line.style.strokeOpacity = 0
      this.$refs.fail_right_line.style.strokeOpacity = 0
    },
    showFailIcon() {
      this.$refs.fail_circle.style.strokeDashoffset = 0
      this.$refs.fail_circle.addEventListener(this.transitionEndEvent, ()=> {
        this.$refs.fail_left_line.style.strokeOpacity = 1
        this.$refs.fail_right_line.style.strokeOpacity = 1
        this.$refs.fail_circle.style.stroke = 'red';
        this.$refs.fail_left_line.style.stroke = 'red';
        this.$refs.fail_right_line.style.stroke = 'red';
      })
    },
    whichTransitionEvent() {
      //https://blog.csdn.net/weixin_42510567/article/details/117853819
      var t;
      var el = document.createElement('fakeelement')
      var transitions = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd",
        animationstart: "animationend",
        webkitAnimationStart: "webkitAnimationEnd",
        MSAnimationStart: "MSAnimationEnd",
      };
      for (t in transitions) {
        if (el.style[t] !== undefined) {
          return transitions[t];
        }
      }
    },
  },
};
</script>
<style scoped>
.hidden {
  display: none!important;;
}
.icon-container {
  width: 320px;
  height: auto;
  float: left;
  text-align: center;
  margin: 30px;
}
.icon-container svg {
  display: block;
  margin: 10px auto;
}
.icon-container button {
  display: block;
  margin: auto;
}
@keyframes circle_loading{
  100%{transform:rotate(360deg);}
}
.circle_loading {
  animation:circle_loading 2s infinite;
  animation-timing-function: linear;
}
p {
  font-size: 1.25rem /* 20/16 */;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.circle {
  /* stroke-dasharray用于创建虚线 */
  /* 190 * 2 * Math.PI = 1194*/
  /* 这个值表示两个虚线之间的距离 */
  stroke-dasharray: 1194;
  stroke-dashoffset: 1194;
  transition: 0.6s all 0s linear;
}
.tick {
  stroke-dasharray: 350;
  stroke-dashoffset: 350;
  transition: 0.6s all 0s linear;
}
.comm-transition-style {
  transition: 0.6s all 0s linear;
}
</style>