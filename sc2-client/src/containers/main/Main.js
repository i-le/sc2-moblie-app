/*
main page router componete
*/

import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import BossInfo from '../boss-info/boss-info'
import ProInfo from '../pro-info/pro-info'
import Cookies from 'js-cookie'
import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/Actions'
import Boss from '../boss/boss'
import Pro from '../pro/pro'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import { NavBar } from 'antd-mobile'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'


class Main extends React.Component {

  // 导航组件的相关信息数据
  navList = [ 
    {
      path: '/boss', 
      component: Boss,
      title: 'Pro List _(:3」∠)_',
      icon: 'pro',
      text: 'Pro List',
    },
    {
      path: '/pro',
      component: Pro,
      title: 'Boss List _(:3」∠)_',
      icon: 'boss',
      text: 'Boss List',
    },
    {
      path: '/message',
      component: Message,
      title: 'Message (ﾟДﾟ≡ﾟдﾟ)!?',
      icon: 'message',
      text: 'Message',
    },
    {
      path: '/personal',
      component: Personal,
      title: 'My Profile (｡･ω･｡)',
      icon: 'personal',
      text: 'Me',
    }
  ]

   

//  in cookie have userid(&& redux user doent have _id)，send request get user's info
componentDidMount() {
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if (userid && !_id) {
      // send asyn request get user
      console.log('----');
      this.props.getUser()
    }
  }



    render() {

        // check if loged 
    /* const {user} = this.props
    if (!user._id) {
      return <Redirect to='/login' />
    } */

    // read cookie userid if !，return back to log in page
    const userid = Cookies.get('userid')
    // debugger
    if (!userid) {
      return <Redirect to='/login' />
    }
    // if user => read state
    const {user} = this.props
    // 
    if (!user) {
      return null
    } else {
      // if user has _id
      // then redirecting based on type and avatar s value
      let path = this.props.location.pathname
      if (path === '/') {
        path = getRedirectTo(user.type, user.avatar)
        return <Redirect to={path} />
      }
    }
 
    const {navList} = this
    const path = this.props.location.pathname // request path
    const currentNav = navList.find(nav => nav.path === path)

   
    // hide boss/pro 's footer navbar
    if (currentNav) {
      if (user.type === 'boss') {
        navList[1].hide = true
      } else {
        navList[0].hide = true
      }
    }
   
  

        return (
            <div>
            {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                      navList.map((nav, index) => <Route key={index} path={nav.path} component={nav.component} />)
                    }
                    <Route path='/bossinfo' component={BossInfo} />
                    <Route path='/proinfo' component={ProInfo} />
                    <Route path='/chat/:userid' component={Chat} />
                    <Route component={NotFound} />
                </Switch>
                {currentNav ? <NavFooter navList={navList}></NavFooter> : null}
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Main)

/* 
1.自动登录
  - cookie中有userid(且redux中user没有_id)，发请求获取对应的user信息
  - 没有userid，自动进入登录界面
2.已经登录，当请求根路径时
  - 根据user中type和 avatar 计算出重定向的路径并跳转
*/