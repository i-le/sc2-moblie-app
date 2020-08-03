/*
personal profile(boss/pro) router component
*/

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/Actions'


const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {
  logout = () => {
    // 点击事件不响应。底部nav-footer样式高度为100%，遮挡了其他元素
    // alert('test------')
    Modal.alert('Sign Out', 'ARE YOU SURE??？', [
      {
        text: 'NO !!!'
      },
      {
        text: 'YES !!!',
        onPress: () => {
          Cookies.remove('userid') // clear user in cookie
          this.props.resetUser()
        }
      }
    ])
  }

  render() {
    const {username, info, avatar, company, post, salary} = this.props.user
    return(
      <div style={{marginTop: 40}}>
        <Result img={<img src={require(`../../assets/sc2avatars/${avatar}.png`)} alt='No face?' style={{width: 50}} />}
          title={username}
          message={company}
        >
        </Result>
        <List renderHeader={() => 'Personal Info'}>
          <Item multipleLine>
            <Brief>Race：{post}</Brief>
            <Brief>Summary：{info}</Brief>
            {
              salary ? <Brief>Salary：{salary}</Brief> : null
            }
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Button type='warning' onClick={this.logout}>Sign Out（/TДT)/</Button>
        </List>
      </div>
    )
  }
}


export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal)