<template>
  <div :class="[type === 'horizantal' ? 'vm-card-horizantal' : 'vm-card-vertical' , 'vm-panel']">
    <div class="card-img">
      <img :src="img" alt="">
      <div v-if="editable && type == 'vertical'" class="control">
        <!-- <span class="edit">
          <a :href="editUrl">
            <i class="fa fa-pencil"></i>
          </a>     
        </span> -->
        <span class="delete">
          <i class="fa fa-trash" @click="modalDelete=true"></i>
        </span>
      </div>
    </div>
    <div class="card-desc panel-body" style="padding-bottom: 10px">
      <h2>{{ title }}</h2>
      <p>{{ desc }}</p>
      <!-- <a :href="detailUrl">
        more >
      </a> -->
    </div>
    <Modal
        v-model="modalDelete"
        title="Delete"
        ok-text="OK"
        cancel-text="Cancel"
        v-on:on-ok="deleteOk">
        你确定要删除这张人脸数据吗？
    </Modal>
  </div>
</template>
<script>
//  import mqtt from 'mqtt'
//   import { MQTT_SERVICE, MQTT_USERNAME, MQTT_PASSWORD } from '../../config/sysconstant.js'
//   var client
//   const options = {
//     connectTimeout: 40000,
//     clientId: 'mqtitId-Home111',
//     username: MQTT_USERNAME,
//     password: MQTT_PASSWORD,
//     clean: true
//   }
//   client = mqtt.connect(MQTT_SERVICE, options)

  export default {
    name: 'VmCard',
    props: {
      type: {
        type: String,
        default: 'vertical'
      },
      editable: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '陌生人'
      },
      img: {
        type: String,
        default: require('@/assets/img/img-1.jpg')
      },
      desc: {
        type: String,
        default: ''
      },
      detailUrl: {
        type: String,
        default: '#'
      },
      editUrl: {
        type: String,
        default: '#'
      }
    },
    data: function () {
      return {
       
        modalDelete: false
      }
    },
    methods: {
      deleteOk: function () {
        this.$emit('delete-ok')
      },
    //    mqttMSG () {
    //   // mqtt连接
    //   client.on('connect', (e) => {
    //     console.log('连接成功:')
    //     client.subscribe('/CAPTAIN/IPC/eaf915e30f8044c88db97c7e01f915e2/#', { qos: 1 }, (error) => {
    //       if (!error) {
    //         console.log('订阅成功')
    //       } else {
    //         console.log('订阅失败')
    //       }
    //     })
    //   })
    //   // 接收消息处理
    //   client.on('message', (topic, message) => {
    //     console.log('收到来自', topic, '的消息', message.toString())
    //     this.msg = JSON.parse(message)
    //     console.log(this.msg)
    //     if(this.msg.data.faceId!==''){
    //       this.img = this.msg.data.facePicUrl
    //       console.log(this.img)
    //       this.name = this.msg.data.name
          
    //     }
    //   })
    //   // 断开发起重连
    //   // client.on('reconnect', (error) => {
    //   //   console.log('正在重连:', error)
    //   // })
    //   // 链接异常处理
    //   client.on('error', (error) => {
    //     console.log('连接失败:', error)
    //   })
    // }

    },
    // created () {
    //   this.mqttMSG()
    // },
  }
</script>

