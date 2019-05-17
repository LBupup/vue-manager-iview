<template>
  <div class="container" id="main">
        <div class="player1">
        <video-player class="vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
        ></video-player> 
         <!-- <video-player class="video-player vjs-custom-skin player2"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
        ></video-player>  -->
       </div>
        <div class="player2">
         <Row :gutter="16">
          <i-col span="12">
             <div class="vm-chart-bar vm-panel person">
               <div class="panel-body">
                 <h3 class="title">总人流量统计</h3>
              </div>
              <VmStateOverView color="#41b883" icon="fa fa-user" title="New Users" count="996" class="num"></VmStateOverView>
            </div>
          </i-col>
          </Row>
          <Row :gutter="16">
          <i-col span="12">
            <VmChartPie title="男女比例" :data="dataPie">
            </VmChartPie>
         </i-col>
         </Row>
         <Row :gutter="16">
          <i-col span="12">
            <VmChartBarLine title="年龄段" :xAxisData="dataBar1.xAxisData" :series="dataBar1.series">
            </VmChartBarLine>
          </i-col>
          </Row>
          <Row :gutter="16">
          <i-col span="12">
            <VmChartBarLine title="时间段" :xAxisData="dataLine1.xAxisData" :series="dataLine1.series">
            </VmChartBarLine>
          </i-col>
         </Row>
        </div>

  <VmImageList :data="dataImageList" @delete-ok="deletefn" class="vm-margin" v-if="show">
  </VmImageList>
   <div>
    
 </div>
    
 </div>
</template>

<script>
  import VmImageList from '@/components/vm-image-list'
  import VideoPlayer from 'vue-video-player'
  require('video.js/dist/video-js.css')
  require('vue-video-player/src/custom-theme.css')
  import VmChartBarLine from '@/components/vm-chart-bar-line'
  import VmChartPie from '@/components/vm-chart-pie'
  import VmChartRadar from '@/components/vm-chart-radar'
  import VmStateOverView from '@/components/vm-state-overview.vue'
  import 'videojs-flash'
  import 'videojs-contrib-hls'
  import mqtt from 'mqtt'
  import { MQTT_SERVICE, MQTT_USERNAME, MQTT_PASSWORD } from '../../config/sysconstant.js'
  var client
  const options = {
    connectTimeout: 40000,
    clientId: 'mqtitId-Home111',
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    clean: true
  }
  client = mqtt.connect(MQTT_SERVICE, options)

  export default {
    name: 'ImageList',
    components: {
      VmImageList,
      VmChartBarLine,
      VmChartPie,
      VmChartRadar,
      VmStateOverView,
    },
    methods: {
      deletefn: function (data) {
        for (let i = 0; i < this.dataImageList.length; i++) {
          if (this.dataImageList[i].id === data.id) {
            this.dataImageList.splice(i, 1)
          }
        }
      },
      mqttMSG () {
      // mqtt连接
      client.on('connect', (e) => {
        console.log('连接成功:')
        client.subscribe('/CAPTAIN/IPC/eaf915e30f8044c88db97c7e01f915e2/#', { qos: 1 }, (error) => {
          if (!error) {
            console.log('订阅成功')
          } else {
            console.log('订阅失败')
          }
        })
      })
      // 接收消息处理
      client.on('message', (topic, message) => {
        this.show = false
        console.log('收到来自', topic, '的消息', message.toString())
        this.msg = JSON.parse(message)
        console.log(this.msg)
        if(this.msg.data.faceId !==""){
          this.msg.data.title = this.msg.data.name
          this.msg.data.img = 'http://192.168.20.49:8686' + this.msg.data.facePicUrl
          // this.dataImageList = [this.msg.data]
          // console.log(typeof this.dataImageList)
          this.dataImageList.unshift(this.msg.data)
          console.log(this.dataImageList)
          this.show = true
        }
        else{
          this.dataImageList.title = '陌生人'
          this.msg.data.img = require('@/assets/img/2.gif')
          this.dataImageList.unshift(this.msg.data)
          this.show = true
        }
      })
      // 断开发起重连
      // client.on('reconnect', (error) => {
      //   console.log('正在重连:', error)
      // })
      // 链接异常处理
      client.on('error', (error) => {
        console.log('连接失败:', error)
      })
    }

    },
    mounted(){
      // this.MQTTconnect();
            this.mqttMSG()
    },
     created () {
      // this.mqttMSG()
    },
    
    data: function () {
      return {
          show: true,
          msg:'',
          img:'',
          title:'陌生人',
          dataImageList:[],
        	playerOptions: {
                //playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                techOrder: ['flash', 'html5'],      // 兼容顺序
          　　　 flash: {
                   hls: { withCredentials: false },
                   // swf: './static/media/video-js.swf'         // 引入静态文件swf
                 },
                 html5: { hls: { withCredentials: false } },
                 sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
                   type: 'rtmp/hls',
                   src: 'rtmp://192.168.50.164:1935/live/1'
            
                 }],
                // poster: "poster.jpg", //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                //  controlBar: {
                //   timeDivider: true,
                //   durationDisplay: true,
                //   remainingTimeDisplay: false,
                //   fullscreenToggle: true //全屏按钮
                //  }
            },
        dataBar1: {
          xAxisData: ['小孩', '成人', '老人'],
          series: [
            {
              name: '年龄',
              type: 'bar',
              data: [50, 200, 100]
            }
          ]
        },
        dataLine1: {
          xAxisData: ['8点', '12点', '16点', '20点', '24点'],
          series: [
            {
              name: '人流量',
              type: 'line',
              data: [50, 290, 360, 100, 100, 200]
            }
          ]
        },
        dataPie: [
          {
            name: '男',
            value: 14
          },
          {
            name: '女',
            value: 7
          }
        ],
        // 人脸列表
        // dataImageList: [
        //   {
        //     id: '201707101552',
        //     title: '111',
        //     img: require('@/assets/img/2.gif'),
        //     desc: '陌生人',
        //     detailUrl: '#',
        //     editUrl: '#'
        //   }
        // ]
      }
    }
  }
</script>
<style scoped>
.player1{
  margin-top: 17px;
}
.vm-margin{
  width: 75%;
}
.video-player{
  width: 75%;
}
.player2{
  height: 470px;
  width: 48%;
  position: absolute;
  right: -400px;
  top: 65px;
}
.person{
  margin-top: 10px;
  height: 260px;
  background-color: #fff;
}
.vm-state-overview{
  min-height: 140px;
  margin-top: 15px;
}
.title{
  font-size: 19px;
  color: #363636;
}
.num{
  font-size: 26px;
}


</style>
<style>
.video-js{
	height: 470px !important;
  /* width: 50%!important; */
}
#main .player2 .vm-panel .panel-body{
  margin-top: 11px;
}
#main .person .ivu-col-span-14{
  width: 40%;
  margin-left: 30px;
}
#main .person .ivu-col-span-10{
  margin-left: 15px;
}
.vm-state-overview .value{
  color: #1f1f1f !important;
}
#main .vm-card-vertical .card-desc h2{
  margin-top: 20px;
}
#main .vm-card-vertical .card-img{
  height: 100px;
}
#main .container{
  width: 1066px !important;
}
</style>

