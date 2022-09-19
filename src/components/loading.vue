<template>
    <div class="icon-container">
        <svg id="loading"  :width="width" :height="height">
            <defs>
                <linearGradient id="grad_loading" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#68e534;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#68e534;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path
                ref="loading_path"
                d="M 160 10 a 150 150 0 0 1 0 300 a 150 150 0 0 1 -150 -150"
                stroke="url(#grad_loading)"
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                fill="none"
                class="circle_loading"
                transform="rotate(90)"
                :transform-origin="transformOrigin"
            />
            <circle
                class="comm-transition-style"
                fill="none"
                stroke="#68e534"
                :stroke-width="strokeWidth"
                cx="160"
                cy="160"
                r="150"
                ref="success_circle"
                stroke-linecap="round"
                transform="rotate(-90)"
                :transform-origin="transformOrigin"
            ></circle>
            <polyline
                class="comm-transition-style"
                ref="success_tick"
                fill="none"
                stroke="#68e534"
                :stroke-width="strokeWidth"
                points="60,154 140,214 260,118"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></polyline>

            <circle
                fill="none"
                class="comm-transition-style"
                stroke="#68e534"
                :stroke-width="strokeWidth"
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
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                class="comm-transition-style"
                stroke="#68e534"
                ref="fail_left_line"
            />
            <path 
                d="M 230 90 L 90 230"
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                class="comm-transition-style"
                stroke="#68e534"
                ref="fail_right_line"
            />
        </svg>
        <el-button @click="showSuccessIcon" :disabled="action_id_done">Success</el-button>
        <el-button @click="showFailIcon" :disabled="action_id_done">Fail</el-button>
        <el-button @click="reset" :disabled="!action_id_done">Reset</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            path: "M 160 10 a 150 150 0 0 1 0 300 a 150 150 0 0 1 -150 -150",
            transformOrigin: "160 160",
            transitionEndEvent: '',
            iterationCallBack: '',
            eventAddedForSuccessCircle: false,
            eventAddedForSuccessTick: false,
            eventAddedForFailCircle: false,
            action_id_done: false,
        }
    },
    props: {
        width: {
            type: Number,
            default: 320,
        },
        height: {
            type: Number,
            default: 320
        },
        strokeWidth: {
            type: Number,
            default: 20,
        }
    },
    created() {
        let halfWidth = this.width / 2
        let halfHeight = this.height / 2
        let halfStrokeWidth = this.strokeWidth / 2
        let r = Math.min(this.width, this.height) / 2  - halfStrokeWidth
        this.path = `M ${halfWidth} ${halfHeight - r} a ${r} ${r} 0 0 1 0 ${2 * r} a ${r} ${r} 0 0 1 ${0 - r} ${0 - r}`
        this.transformOrigin = `${halfWidth} ${halfHeight}`
    },
    mounted() {
        this.transitionEndEvent = this.whichTransitionEvent()
        this.initFailIcon()
        this.initSuccessIcon()
        console.log(this.transitionEndEvent)
        this.$refs.loading_path.addEventListener('animationiteration', this.eventHandlerForLoadingPath)
    },
    methods: {
        eventHandlerForLoadingPath(e) {
            console.log(e.target === e.currentTarget, e.type)
            if(this.iterationCallBack) {
                this.iterationCallBack()
                this.iterationCallBack = null
                this.$nextTick(()=> {
                    //https://blog.csdn.net/huangfengnt/article/details/125073807
                    console.log('remove')
                    this.$refs.loading_path.removeEventListener('animationiteration', this.eventHandlerForLoadingPath)
                })
            }
        },
        _removeEventListenerHandler() {
            console.log('test')
        },
        initSuccessIcon() {
            this.$refs.success_circle.style.strokeDashoffset = Math.PI * 150 * 2
            this.$refs.success_circle.style.strokeDasharray = Math.PI * 150 * 2
            this.$refs.success_tick.style.strokeDashoffset = 300
            this.$refs.success_tick.style.strokeDasharray = 300
            this.$refs.success_tick.style.stroke = '#68e534'
            this.$refs.success_circle.style.stroke = '#68e534'
        },
        showSuccessIcon() {
            this.iterationCallBack = this._showSuccessIcon
            this.action_id_done = true
        },
        _showSuccessIcon() {
            this.$refs.success_circle.style.strokeDashoffset = 0;
            this.$refs.success_circle.addEventListener(this.transitionEndEvent, this.successCircleEventHandler)
        },
        successCircleEventHandler(e) {
            if(e.target === e.currentTarget && !this.eventAddedForSuccessCircle) {
                //解决多次触发事件  http://www.wjhsh.net/qianduanjingying-p-6812660.html
                this.eventAddedForSuccessCircle = true
                this.$refs.success_tick.style.strokeDashoffset = 0;
                this.$refs.success_tick.addEventListener(this.transitionEndEvent, this.successTickEventHandler)
                this.$nextTick(()=> {
                    this.$refs.success_circle.removeEventListener(this.transitionEndEvent, this.successCircleEventHandler)
                })
            }
        },
        successTickEventHandler(e) {
            if(e.target === e.currentTarget && !this.eventAddedForSuccessTick) {
                this.eventAddedForSuccessTick = false
                this.$refs.success_circle.style.stroke = '#326de6';
                this.$refs.success_tick.style.stroke = '#326de6';
                this.$nextTick(()=> { 
                    this.$refs.success_tick.removeEventListener(this.transitionEndEvent, this.successTickEventHandler)
                })
            }
        },
        initFailIcon() {
            this.$refs.fail_circle.style.strokeDashoffset = Math.PI * 150 * 2
            this.$refs.fail_circle.style.strokeDasharray = Math.PI * 150 * 2
            this.$refs.fail_left_line.style.strokeOpacity = 0
            this.$refs.fail_right_line.style.strokeOpacity = 0
            this.$refs.fail_circle.style.stroke = '#68e534';
            this.$refs.fail_left_line.style.stroke = '#68e534'
            this.$refs.fail_right_line.style.stroke = '#68e534'
            
        },
        showFailIcon() {
            this.iterationCallBack = this._showFailIcon
            this.action_id_done = true
        },
        _showFailIcon() {
            this.$refs.fail_circle.style.strokeDashoffset = 0
            this.$refs.fail_circle.addEventListener(this.transitionEndEvent, this.failCircleEventHandler)
        },
        failCircleEventHandler(e) {
            if(e.target === e.currentTarget && !this.eventAddedForFailCircle) {
                this.eventAddedForFailCircle = false
                this.$refs.fail_left_line.style.strokeOpacity = 1
                this.$refs.fail_right_line.style.strokeOpacity = 1
                this.$refs.fail_circle.style.stroke = 'red';
                this.$refs.fail_left_line.style.stroke = 'red';
                this.$refs.fail_right_line.style.stroke = 'red';
                this.$nextTick(()=> {
                    this.$refs.fail_circle.removeEventListener(this.transitionEndEvent, this.failCircleEventHandler)
                })
            }
        },
        reset() {
            // window.location.reload()
            this.initFailIcon()
            this.initSuccessIcon()
            this.$refs.loading_path.addEventListener('animationiteration', this.eventHandlerForLoadingPath)
            this.action_id_done = false
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
    }


}
</script>
<style scoped>
@keyframes circle_loading{
  100%{transform:rotate(450deg);}
}
.circle_loading {
  animation:circle_loading 2s infinite;
  animation-timing-function: linear;
}
.comm-transition-style {
  transition: 0.6s all 0s linear;
}
</style>