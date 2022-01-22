<template>
  <div class="playBack">
    <el-slider v-model="playBack.active" :max="playBack.data.length"></el-slider>
    <div class="control">
      <div class="left">
        时间：{{ playBack.time }}
      </div>
      <div class="center">
        <i class="iconfont backward" @click="change(0)"></i>
        <i class="iconfont playCircle" v-show="!playBack.isPlay" @click="play(0)"></i>
        <i class="iconfont pauseCircle" v-show="playBack.isPlay" @click="play(1)"></i>
        <i class="iconfont forward" @click="change(1)"></i>
      </div>
      <div class="right">
        <el-radio-group v-model="speed">
          <el-radio-button label="慢速"></el-radio-button>
          <el-radio-button label="正常"></el-radio-button>
          <el-radio-button label="快速"></el-radio-button>
          <el-radio-button label="极快"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script lang='js'>
import { defineComponent, reactive, ref, shallowReadonly, watch } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
    setup (props, context) {
        const playBack = reactive({
            isPlay: false,
            active: 0,
            speed: 100,
            time: '',
            data: []
        })

        const timer = ref()
        // 点击播放或暂停 flag 0 播放 1 暂停
        function play (flag) {
            if (flag) {
                clearInterval(timer.value)
                timer.value = null
            } else {
                timer.value = setInterval(() => {
                    playBack.active++
                    playBack.time = dayjs(playBack.data[playBack.active].gpsTime).format('YYYY-MM-DD HH:mm:ss')
                }, playBack.speed)
            }
            playBack.isPlay = !playBack.isPlay
        }

        watch(() => playBack.active, (val) => {
            if (val === playBack.data.length) {
                play(1)
                playBack.active = 0
                playBack.time = dayjs(playBack.data[0].gpsTime).format('YYYY-MM-DD HH:mm:ss')
                timer.value = null
            } else {
                context.emit('showMarker', val)
            }
        })

        // 改变速度
        const speedTitle = shallowReadonly({
            慢速: 400,
            正常: 200,
            快速: 100,
            极快: 50
        })
        const speed = ref('正常')
        watch(speed, (val) => {
            playBack.speed = speedTitle[val]
            if (playBack.isPlay) {
                play(1)
                play(0)
            }
        })

        // 快进或快退 1 快进 0 快退
        function change (flag) {
            if (flag) {
                if (playBack.active <= playBack.data.length - 10) {
                    playBack.active += 10
                }
            } else if (playBack.active >= 10) {
                playBack.active -= 10
            }
        }
        return {
            playBack,
            speed,
            play,
            change
        }
    }
})
</script>

<style scoped lang="scss">

.playBack {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 98%;
  display: flex;
  flex-direction: column;
  height: 80px;
  padding: 0 20px;
  border-radius: 5px;
  background-color: #fff;
  z-index: 2;

  .control {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      font-size: 12px;
    }

    .center {
      i {
        font-size: 30px;
        padding: 0 5px;
        cursor: pointer;
        &:hover {
          color: #0066ff;
        }
      }
    }
  }
}
</style>
