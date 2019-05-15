import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import BasicTable from '@/pages/BasicTable'
import ProjectTable from '@/pages/ProjectTable'
import AclTable from '@/pages/AclTable'
import LocksTable from '@/pages/LocksTable'
import DevicesTable from '@/pages/DevicesTable'
import EditableTable from '@/pages/EditableTable'
import Widget from '@/pages/Widget'
import Panels from '@/pages/Panels'
import Editor from '@/pages/Editor'
import ImageList from '@/pages/ImageList'
import Charts from '@/pages/Charts'
import Login from '@/pages/Login'
import LockScreen from '@/pages/LockScreen'
import Loading from '@/pages/Loading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'imageList',
          name: '识别记录',
          component: ImageList
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'widget',
          name: 'Widget',
          component: Widget
        },
        {
          path: 'panels',
          name: 'Panels',
          component: Panels
        },
        {
          path: 'editor',
          name: 'Editor',
          component: Editor
        },
        {
          path: 'basic-table',
          name: 'BasicTable',
          component: BasicTable
        },

        {
          path: 'project-table',
          name: 'ProjectTable',
          component: ProjectTable
        },
        {
          path: 'acl-table',
          name: 'AclTable',
          component: AclTable
        },
        {
          path: 'locks-table',
          name: 'LocksTable',
          component: LocksTable
        },
        {
          path: 'devices-table',
          name: 'DevicesTable',
          component: DevicesTable
        },

        {
          path: 'editable-table',
          name: 'EditableTable',
          component: EditableTable
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        blank: Login
      }
    },
    {
      path: '/lockscreen',
      name: 'Lockscreen',
      components: {
        blank: LockScreen
      }
    },
    {
      path: '/loading',
      name: 'Loading',
      components: {
        blank: Loading
      }
    }
  ]
})
