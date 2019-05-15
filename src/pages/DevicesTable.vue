<template>
  <VmTable title="刷脸设备管理" 
           type="edit" 
           :columns="dataColumns" 
           :data="dataTable"
           v-on:add-ok="add"
           v-on:edit-ok="edit"
           v-on:delete-ok="deletefn"
           class="vm-margin">
  </VmTable>
</template>

<script>
  import VmTable from '@/components/vm-table'
  export default {
    name: 'DevicesTable',
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
            width: 220,
            title: '设备ID',
            key: 'id'
          },
          {
            id: '20156542',
            title: '名称',
            key: 'name'
          },
          {
            id: '20156543',
            title: '属性',
            key: 'props'
          },
          {
            id: '20156544',
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
            id: '65416s843154',
            name: '王小明',
            props: 18,
            description: '安装时间，安装位置',
            createdAt: '2019-05-14'
          },
           {
            id: '65416s843154',
            name: '王小明',
            props: 18,
            description: '安装时间，安装位置',
            createdAt: '2019-05-14'
          },
        ]
      }
    }
  }
</script>
