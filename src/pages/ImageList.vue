<template>
  <VmImageList :data="dataImageList" @delete-ok="deletefn" class="vm-margin"></VmImageList>
</template>

<script>
  import VmImageList from '@/components/vm-image-list'
  export default {
    name: 'ImageList',
    components: {
      VmImageList
    },
    methods: {
      deletefn: function (data) {
        for (let i = 0; i < this.dataImageList.length; i++) {
          if (this.dataImageList[i].id === data.id) {
            this.dataImageList.splice(i, 1)
          }
        }
      }
    },
    data: function () {
      return {
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
          }
        ]
      }
    }
  }
</script>
