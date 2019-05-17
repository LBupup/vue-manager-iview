<template>
  <div>
    <VmTable title="人员管理"
             type="edit"
             :columns="dataColumns"
             :data="dataTable"
             v-on:add-ok="add"
             v-on:edit-ok="edit"
             v-on:delete-ok="deletefn"
             class="vm-margin">
    </VmTable>
    <Upload action="//jsonplaceholder.typicode.com/posts/">
      <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
  </div>
</template>

<script>
  import VmTable from '@/components/vm-table-upload'
  export default {
    name: 'EditableTable',
    components: {
      VmTable
    },
    methods: {
      add: function (data) {
        this.dataTable.unshift(data)
      },
      edit: function (data) {
        this.dataTable.forEach(function (elem) {
          if (elem.id === data.id) {
            for (let i in data) {
              elem[i] = data[i]
            }
          }
        })
      },
      deletefn: function (data) {
        for (let i = 0; i < this.dataTable.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (this.dataTable[i].id === data[j].id) {
              this.dataTable.splice(i, 1)
            }
          }
        }
      }
    },
    data () {
      return {
        dataColumns: [
          {
            id: '20156541',
            width: 120,
            title: '人脸ID',
            key: 'faceId'
          },
          // {   title: '人脸',
          //     key: 'facePicUrl',
          //               width: 220,
          //               render:(h,params) => {
          //                   return h('div',[
          //                       h('img',{
          //                           style:{
          //                               'margin-top':'10px',
          //                               'margin-bottom':'10px',
          //                               'border-radius':'4px',
          //                               width:'80px',
          //                               height:'50px',
          //                               cursor: 'pointer',
          //                           },
          //                           attrs:{
          //                               'src': '',
          //                               onerror:'this.src="https://goss.veer.com/creative/vcg/veer/800water/veer-133632476.jpg"'
          //                           },
          //                           on:{
          //                               click:(e)=>{
          //                                   this.handleView(e.srcElement.currentSrc)
          //                               }
          //                           }
          //                       }),
          //                   ]
          //               )}
          //           },
          {
            id: '20156542',
            title: '名称',
            key: 'name'
          },
          {
            id: '20156543',
            title: '描述',
            key: 'description'
          },
          {
            id: '20156544',
            title: '创建时间',
            key: 'createdAt'
          }
        ],
        dataTable: [
          {
            faceId: '65416s843154',
            name: '王小明',
            description: '描述信息',
            createdAt: '2019-05-14'
          },
          {
            faceId: '65416s843153',
            name: '王小明',
            description: '描述信息',
            createdAt: '2019-05-14'
          },
        ]
      }
    }
  }
</script>
