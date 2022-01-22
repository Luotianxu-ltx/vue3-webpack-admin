<template>
  <div class="tools">
    <div class="toolsBox" @click="isShowDrawContent = true">
      <i class="iconfont gongju"></i>画图
    </div>
    <transition name="slide-fade">
      <div class="content" v-show="isShowDrawContent">
        <div class="top" id="top">
          画图
          <div class="closeBtn">
            <i class="iconfont guanbiyuan close" @click="isShowDrawContent = false"></i>
          </div>
        </div>
        <div class="shapeChoose">
          <el-radio-group v-model="shapeType" size="small" class='choose'>
            <el-radio-button label="线"></el-radio-button>
            <el-radio-button label="矩形"></el-radio-button>
            <el-radio-button label="多边形"></el-radio-button>
            <el-radio-button label="圆形"></el-radio-button>
          </el-radio-group>

          <div class="btn">
            <div class="shape_item">
              颜色: &nbsp;<el-color-picker v-model="lineColor"/>
            </div>
            <div class="shape_item" v-show="shapeType !== '线'">
              填充色: &nbsp;<el-color-picker v-model="fillColor"/>
            </div>
            <div class="shape_item all">
              <div class="title">宽度:</div> &nbsp;<el-input-number v-model="lineWidth" :min="0" :step="0.1" />
            </div>
            <div class="shape_item all">
              <div class="title">边框透明度:</div> &nbsp;<el-input-number v-model="opacity" :min="0" :max="1" :step="0.1" />
            </div>
            <div class="shape_item all" v-show="shapeType !== '线'">
              <div class="title">填充透明度:</div> &nbsp;<el-input-number v-model="fillOpacity" :min="0" :max="1" :step="0.1" />
            </div>
          </div>
          <div class="btn">
            <el-button type="primary" class="btn_item" @click="beginDraw">开始绘制</el-button>
            <el-button type="primary" class="btn_item" @click="edit" v-show="!isOpenEditShape">修改样式</el-button>
            <el-button type="info" class="btn_item" @click="save" v-show="isOpenEditShape">保存</el-button>
            <el-button type="primary" class="btn_item" @click="deleteShape" v-show="!isOpenDelete">删除图形</el-button>
            <el-button type="info" class="btn_item" @click="save" v-show="isOpenDelete">保存</el-button>
            <el-button type="primary" class="btn_item" @click="changeShape" v-show="!isOpenEdit">修改图形</el-button>
            <el-button type="info" class="btn_item" @click="save" v-show="isOpenEdit">保存</el-button>
            <el-button type="primary" class="btn_item" @click="clear">删除所有</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, reactive, ref, toRefs } from 'vue'
import L from '@/lib/leaflet'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'MapDraw',
    setup () {
    // 工具箱是否弹出
        const isShowDrawContent = ref(false)

        // 初始化
        let drawControl = ''
        let _map = ''
        function initMapDraw (map) {
            _map = map
            // 初始化绘制控件
            drawControl = new L.Control.Draw({
                draw: false,
                edit: false
            })
        }

        // 绘制形状
        const shapeType = ref('线')
        let drawObj = null
        const shape = reactive({
            lineColor: '#3388ff',
            lineWidth: 4,
            opacity: 0.5,
            fillColor: '#3388ff',
            fillOpacity: 0.2
        })
        // 开始绘制
        function beginDraw () {
            save()
            _map.on(L.Draw.Event.CREATED, drawCreatedBack)
            // eslint-disable-next-line default-case
            switch (shapeType.value) {
            case '线': {
                drawObj = new L.Draw.Polyline(_map, {
                    shapeOptions: {
                        color: shape.lineColor,
                        weight: shape.lineWidth,
                        opacity: shape.opacity
                    }
                })
                break
            }
            case '多边形': {
                drawObj = new L.Draw.Polygon(_map, {
                    shapeOptions: {
                        color: shape.lineColor,
                        weight: shape.lineWidth,
                        opacity: shape.opacity,
                        fillColor: shape.fillColor,
                        fillOpacity: shape.fillOpacity
                    }
                })
                break
            }
            case '矩形': {
                drawObj = new L.Draw.Rectangle(_map, {
                    shapeOptions: {
                        color: shape.lineColor,
                        weight: shape.lineWidth,
                        opacity: shape.opacity,
                        fillColor: shape.fillColor,
                        fillOpacity: shape.fillOpacity
                    }
                })
                break
            }
            case '圆形': {
                drawObj = new L.Draw.Circle(_map, {
                    shapeOptions: {
                        color: shape.lineColor,
                        weight: shape.lineWidth,
                        opacity: shape.opacity,
                        fillColor: shape.fillColor,
                        fillOpacity: shape.fillOpacity
                    }
                })
                break
            }
            }
            drawObj.enable()
        }
        // 绘画图层
        let drawLayerGrounp = ''
        // 交互绘制回调
        function drawCreatedBack (e) {
            // 绘制的图形图层对象
            const drawLayer = e.layer
            // 判断当前没有图层组，需先添加
            if (!drawLayerGrounp) {
                // 图层组
                drawLayerGrounp = new L.FeatureGroup()
                // 添加
                _map.addLayer(drawLayerGrounp)
            }
            // 添加到图层组
            drawLayerGrounp.addLayer(drawLayer)
            getLocation(e)
        }

        // 获取绘制图形的信息
        function getLocation (e) {
            const type = e.layerType
            const drawLayer = e.layer
            // eslint-disable-next-line default-case
            switch (type) {
            case 'polyline': {
                if (drawLayer.editing.latlngs[0].length > 0) {
                    for (let latlngslength = 0; latlngslength < drawLayer.editing.latlngs[0].length; latlngslength++) {
                        console.log(drawLayer.editing.latlngs[0][latlngslength].lat + ',' + drawLayer.editing.latlngs[0][latlngslength].lng)
                    }
                }
                break
            }
            case 'polygon': {
                if (drawLayer._latlngs[0].length > 0) {
                    for (let latlngslength = 0; latlngslength < drawLayer._latlngs[0].length; latlngslength++) {
                        console.log(drawLayer._latlngs[0][latlngslength].lat + ',' + drawLayer._latlngs[0][latlngslength].lng)
                    }
                }
                break
            }
            case 'rectangle': {
                if (drawLayer._latlngs[0].length) {
                    for (let latlngslength = 0; latlngslength < drawLayer._latlngs[0].length; latlngslength++) {
                        console.log(drawLayer._latlngs[0][latlngslength].lat + ',' + drawLayer._latlngs[0][latlngslength].lng)
                    }
                }
                break
            }
            case 'circle': {
                if (drawLayer._latlng !== '' && drawLayer._latlng !== null) {
                    console.log('圆心：' + drawLayer._latlng.lat + ',' + drawLayer._latlng.lng)
                    console.log('半径：' + drawLayer._mRadius)
                }
                break
            }
            case 'marker': {
                if (drawLayer._latlng !== '' && drawLayer._latlng !== null) {
                    console.log(drawLayer._latlng.lat + ',' + drawLayer._latlng.lng
                    )
                }
            }
            }
        }

        // 修改样式
        const isOpenEditShape = ref(false)
        function edit () {
            save()
            if (drawLayerGrounp && Object.keys(drawLayerGrounp._layers).length !== 0) {
                drawLayerGrounp.on('click', editShapeBack)
                isOpenEditShape.value = true
            } else {
                ElMessage.warning('请先绘制图形!')
            }
        }
        // 修改样式回调
        function editShapeBack (e) {
            e.sourceTarget.setStyle({
                color: shape.lineColor,
                weight: shape.lineWidth,
                opacity: shape.opacity,
                fillColor: shape.fillColor,
                fillOpacity: shape.fillOpacity
            })
        }

        // 清除全部图形
        function clear () {
            save()
            // 删除全部绘制的图层
            if (drawLayerGrounp) {
                drawLayerGrounp.clearLayers()
            } else {
                ElMessage.warning('请先绘制图形!')
            }
        }

        // 删除指定图形
        let deleteObj = null
        const isOpenDelete = ref(false)
        function deleteShape () {
            save()
            if (drawLayerGrounp && Object.keys(drawLayerGrounp._layers).length !== 0) {
                deleteObj = new L.EditToolbar.Delete(_map, {
                    featureGroup: drawLayerGrounp
                })
                isOpenDelete.value = true
                deleteObj.enable()
            } else {
                ElMessage.warning('请先绘制图形!')
            }
        }

        // 修改图形
        let editObj = null
        const isOpenEdit = ref(false)
        function changeShape () {
            save()
            if (drawLayerGrounp && Object.keys(drawLayerGrounp._layers).length !== 0) {
                editObj = new L.EditToolbar.Edit(_map, {
                    featureGroup: drawLayerGrounp,
                    selectedPathOptions: drawControl.options.edit.selectedPathOptions
                })
                editObj.enable()
                isOpenEdit.value = true
            } else {
                ElMessage.warning('请先绘制图形!')
            }
        }

        // 保存修改
        function save () {
            if (drawObj) {
                drawObj.disable()
            }
            if (deleteObj) {
                deleteObj.disable()
                isOpenDelete.value = false
            }
            if (editObj) {
                editObj.disable()
                isOpenEdit.value = false
            }
            if (drawLayerGrounp) {
                drawLayerGrounp.off('click', editShapeBack)
                isOpenEditShape.value = false
            }
        }

        onBeforeUnmount(() => {
            drawControl = null
            drawObj = null
            editObj = null
            deleteObj = null
            // 删除全部绘制的图层
            // 取消绘制完监听事件，避免其它地方也监听了 CREATED 事件
            _map.off(L.Draw.Event.CREATED, drawCreatedBack)
            if (drawLayerGrounp) {
                drawLayerGrounp.off('click', editShapeBack)
                drawLayerGrounp.clearLayers()
            }
        })

        return {
            isShowDrawContent,
            initMapDraw,
            shapeType,
            ...toRefs(shape),
            beginDraw,
            edit,
            clear,
            deleteShape,
            changeShape,
            save,
            isOpenDelete,
            isOpenEdit,
            isOpenEditShape
        }
    }
})
</script>

<style scoped lang="scss">

.tools {
  position: relative;

  .toolsBox {
    width: 70px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ccc;
    cursor: pointer;

    &:hover {
      color: #0066ff;
    }
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-inter, .slide-fade-inter-to {
    transform: translateX(-250px);
  }

  .slide-fade-inter-to {
    transform: translateX(0);
  }

  .slide-fade-enter-active {
    transition: all .4s ease;
  }

  .slide-fade-leave-active {
    transition: all .4s ease;
  }

  .slide-fade-leave-to {
    transform: translateX(250px);
  }

  .content {
    position: absolute;
    width: 230px;
    left: -135px;
    top: 0;
    background-color: #fff;
    border-radius: 10px;

    .top {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      border-bottom: 1px solid #ccc;

      .closeBtn {
        display: flex;
        align-items: center;

        .close {
          cursor: pointer;
          font-size: 24px;

          &:hover {
            color: #0066ff;
          }
        }
      }
    }

    .shapeChoose {
      padding: 5px 10px;

      .choose {
        margin-left: 10px;
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-top: 5px;
        font-size: 14px;

        .btn_item {
          width: 100px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2px;
          border-radius: 5px;
        }

        .shape_item {
          width: 100px;
          height: 30px;
          display: flex;
          align-items: center;
          margin: 2px;
          border-radius: 5px;

          .title {
            width: 100px;
          }
        }

        .all {
          width: 100%;
        }
      }
    }
  }

  .el-input-number--mini {
    width: 100px!important;
  }
}

</style>
