<template>
  <Row class="vm-table vm-panel">
    <div class="panel-heading">
      {{ title }}
    </div>
    <div class="panel-body">
      <Row type="flex" justify="space-between" class="control">
        <div class="table-style">
          <h3>Stripe</h3>
          <i-switch v-model="showStripe" style="margin: 0 30px 0 10px"></i-switch>
          <h3>Size</h3>
          <Radio-group v-model="tableSize" type="button" style="margin-left: 10px">
            <Radio label="large">Large</Radio>
            <Radio label="default">Default</Radio>
            <Radio label="small">Small</Radio>
          </Radio-group>
        </div>
        <div class="search-bar">
          <i-input placeholder="Please enter ..." v-model="keyword" style="width: 300px"></i-input>
          <Button type="ghost" @click="search"><i class="fa fa-search"></i></Button>
        </div>
      </Row>
      <div class="edit" v-if="type === 'edit'">
        <Button @click="clickAdd" ><i class="fa fa-plus"></i> 添加</Button>
        <Button  :disabled="deleteDisabled" @click="modalDelete = true"><i class="fa fa-trash"></i> 删除</Button>
      </div>
      <Table :stripe="showStripe" :size="tableSize" :columns="showColumns" :data="dataShow" @on-selection-change="selectChange"></Table>
      <Row type="flex" justify="space-between" class="footer">
        <div class="info-bar">
          显示<Input-number class="input-number" v-model="showNum" :max="data.length" :min="1" @on-change=" updateDataShow ">{{ showNum }}</Input-number>/ 页
        </div>
        <div class="page">
          <span class="total">Total {{ data.length }}</span>
          <Page :total="data.length" :current="currentPage" :page-size="showNum" @on-change="pageChange"></Page>
        </div>
      </Row>
    </div>
    <Modal
      v-model="modalEdit"
      title="编辑"
      ok-text="OK"
      cancel-text="Cancel"
      v-on:on-ok="editOk">
      <Form :label-width="50">
        <Form-item v-for="(value, key) in dataEdit" :label="convertKey(key)" :key="dataEdit.id">
          <i-input v-model="dataEdit[key]" :placeholder="'请输入' + key"></i-input>
        </Form-item>
      </Form>
    </Modal>
    <Modal
      v-model="modalAdd"
      title="添加"
      ok-text="OK"
      cancel-text="Cancel"
      v-on:on-ok="addOk">
      <Form :label-width="50">
        <Form-item v-for="item in columns" :label="item.title" :key="item.id">
          <i-input v-model="dataAdd[item.key]" :placeholder="'请输入' + item.title"></i-input>
        </Form-item>
        <Form-item label="人脸上传">
          <input type="file" ref="upload-img" v-if="!imgBase64Data" @change="handleImg">
          <img :src=imgBase64Data alt="人脸图片" v-else style="width: 200px;">
        </Form-item>
<!--        <Button type="primary" @click="handleImg">点击</Button>-->
        <!-- <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload> -->
      </Form>
    </Modal>
    <Modal
      v-model="modalDelete"
      title="删除"
      ok-text="OK"
      cancel-text="Cancel"
      v-on:on-ok="deleteOk">
      你确定要删除这条数据吗？
    </Modal>
  </Row>
</template>

<script>
  export default {
    name: 'VmTable',
    props: {
      title: {
        type: String,
        default: 'Basic Table'
      },
      type: String,
      columns: Array,
      data: Array
    },
    data () {
      return {
        deleteDisabled: true,
        dataShow: [],
        showNum: 10,
        showStripe: false,
        tableSize: 'default',
        currentPage: 1,
        keyword: '',
        modalEdit: false,
        modalAdd: false,
        modalDelete: false,
        dataEdit: {},
        dataDelete: [],
        dataAdd: {},
        formData: [],
        uploadList: [],
        imgBase64Data: ""
      }
    },
    methods: {
      clickAdd () {
        this.modalAdd = true
        this.imgBase64Data = null
      },
      handleImg  () {
        const imgFile = new FileReader()
        imgFile.readAsDataURL(this.$refs['upload-img'].files[0])
        let _this = this
        imgFile.onload = function () {
          console.log(this)
           _this.imgBase64Data = this.result; //base64数据
        }
      },
      editOk: function () {
        this.$emit('edit-ok', this.dataEdit)
      },
      addOk: function () {
        this.dataAdd.facePicUrl = this.imgBase64Data
        console.log(this.dataAdd)
        this.$emit('add-ok', this.dataAdd)
      },
      deleteOk: function () {
        this.$emit('delete-ok', this.dataDelete)
      },
      pageChange: function (page) {
        this.currentPage = page
        this.updateDataShow()
      },
      updateDataShow: function () {
        let startPage = (this.currentPage - 1) * this.showNum
        let endPage = startPage + this.showNum
        this.dataShow = this.data.slice(startPage, endPage)
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
      selectChange: function (data) {
        this.dataDelete = data
      },
      remove: function (index) {
        this.dataShow.splice(index, 1)
      },

      renderOperate: function (h, params) {
        return h('div', [
          h('Button', {
            props: {
              type: 'info',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                for (let i in params.row) {
                  if (i !== '_index' && i !== '_rowKey') {
                    this.dataEdit[i] = params.row[i]
                  }
                }
                this.modalEdit = true
              }
            }
          }, '编辑'),
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            on: {
              click: () => {
                this.dataDelete.push(params.row)
                this.modalDelete = true
              }
            }
          }, '删除')
        ])
      },
      convertKey: function (value) {
        let returnValue = value
        this.columns.forEach(function (elem) {
          for (let i in elem) {
            if (i === 'key' && elem[i] === value) {
              returnValue = elem.title
            }
          }
        })
        return returnValue
      }
    },
    computed: {
      showColumns: function () {
        let showColumn = this.columns.slice()
        showColumn.forEach(function (elem) {
          elem.sortable = true
        })
        if (this.type === 'edit') {
          showColumn.unshift({
            type: 'selection',
            width: 60,
            align: 'center'
          })
          showColumn.push({
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: this.renderOperate
          })
        }
        return showColumn
      }
    },
    watch: {
      data: function () {
        this.dataShow = this.data.slice(0, this.showNum)
      },
      dataDelete: function () {
        if (this.dataDelete.length === 0) {
          this.deleteDisabled = true
        } else {
          this.deleteDisabled = false
        }
      }
    },
    mounted: function () {
      this.dataShow = this.data.slice(0, this.showNum)
    }
  }
</script>
