<template>
  <div class="vm-image-list">
    <Row class="image-list-heading vm-panel">
      <div class="panel-heading">
        {{ title }}
      </div>
      <Row type="flex" align="middle" justify="space-between" class="panel-body">
       <div class="search-bar">
          <i-input placeholder="请输入..." v-model="keyword" style="width: 300px"></i-input>
          <Button type="ghost" @click="search"><i class="fa fa-search"></i></Button>
        </div>
        <Row type="flex" align="middle" class="page">
          <span>显示</span>
          <i-input :max="40" :min="1" :number="true" v-model="showNum" class="input-number" @on-change=" updateDataShow "></i-input>
          <span class="margin-end">/ 每页</span>
          <span class="total">总人数 {{ data.length }}</span>
          <Page :total="data.length" :current="currentPage" :page-size="showNum" @on-change="pageChange"></Page>
        </Row>
      </Row>
    </Row>
    <Row class="image-list" :gutter="16">
      <i-col :lg="3" :sm="6" class="vm-margin" v-for="item in dataShow" :key="item.id">
        <VmCard :editable="true" :title="item.title" :img="item.img" :desc="item.desc" :detailUrl="item.detailUrl" :editUrl="item.editUrl" @delete-ok=" deleteOk(item) "></VmCard>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import VmCard from '@/components/vm-card'
  export default {
    name: 'VmImageList',
    components: {
      VmCard,
    },
    props: {
      title: {
        type: String,
        default: '识别列表'
      },
      // origin data
      data: {
        type: Array,
        default: function () {
          return [
            {
              id: '19920805',
              title: 'Title',
              img: require('@/assets/img/1.jpg'),
              desc: '陌生人',
              to: '#'
            }
          ]
        }
      }
    },
    data: function () {
      return {
        keyword: '', // keyword for search
        dataShow: [], // data for showing
        showNum: 8, // number of item per page
        currentPage: 1,
         
      }
    },
    methods: {
      updateDataShow: function () {
        let startPage = (this.currentPage - 1) * this.showNum
        let endPage = startPage + this.showNum
        this.dataShow = this.data.slice(startPage, endPage)
      },
      pageChange: function (page) {
        this.currentPage = page
        this.updateDataShow()
      },
      search: function () {
        let that = this
        let tempData = that.data
        that.dataShow = []
        tempData.forEach(function (elem) {
          for (let i in elem) {
            if (elem[i].toString().indexOf(that.keyword) > -1) {
              that.dataShow.push(elem)
              return
            }
          }
        })
      },
      deleteOk: function (data) {
        this.$emit('delete-ok', data)
      }
    },
    watch: {
      data: function () {
        this.dataShow = this.data.slice(0, this.showNum) // update dataShow once data changed
      }
    },
    mounted: function () {
      this.dataShow = this.data.slice(0, this.showNum)
    }
  }
</script>
<style>

</style>

