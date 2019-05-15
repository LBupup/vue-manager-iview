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

  <VmImageList :data="dataImageList" @delete-ok="deletefn" class="vm-margin"></VmImageList>
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
      // initWebSocket(){ //初始化weosocket
      //   const wsuri = "ws://127.0.0.1:8080";        
      //   this.websock = new WebSocket(wsuri);        
      //   this.websock.onmessage = this.websocketonmessage;        
      //   this.websock.onopen = this.websocketonopen;        
      //   this.websock.onerror = this.websocketonerror;        
      //   this.websock.onclose = this.websocketclose;
      // },
      // websocketonopen(){ //连接建立之后执行send方法发送数据
      //   let actions = {"test":"12345"};        
      //   this.websocketsend(JSON.stringify(actions));
      // },
      // websocketonerror(){//连接建立失败重连
      //   this.initWebSocket();
      // },
      // websocketonmessage(e){ //数据接收
      //   const redata = JSON.parse(e.data);
      // },
      // websocketsend(Data){//数据发送
      //   this.websock.send(Data);
      // },
      // websocketclose(e){  //关闭
      //   console.log('断开连接',e);
      // },
    },
    //  created() {      
    //    this.initWebSocket();
    // },
    // destroyed() {      
    //   this.websock.close() //离开路由之后断开websocket连接
    // }, 
    data: function () {
      return {
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
                   src: 'rtmp://58.200.131.2:1935/livetv/hunantv'
            
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
        //人脸列表
        dataImageList: [
          {
            id: '201707101552',
            title: 'Lable1',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101553',
            title: 'Lable2',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101554',
            title: 'Lable3',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101555',
            title: 'Lable4',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101556',
            title: 'Lable5',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101557',
            title: 'Lable6',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101558',
            title: 'Lable7',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101559',
            title: 'Lable8',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '2017071015510',
            title: 'Lable9',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '2017071015511',
            title: 'Lable10',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '2017071015512',
            title: 'Lable11',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101513',
            title: 'Lable12',
            img: require('@/assets/img/2.gif'),
            desc: '陌生人',
            detailUrl: '#',
            editUrl: '#'
          },
        ]
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
</style>

