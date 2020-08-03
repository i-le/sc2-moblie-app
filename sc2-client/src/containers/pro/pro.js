/*
pro main page router component
*/


import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/Actions'
import UserList from '../../components/user-list/user-list'

class Pro extends React.Component {
    // 初始化就有一个ajax请求
    componentDidMount () {
        // request getting userlist
        this.props.getUserList('boss') //要获取的用户类型面板为boss
    }
    render () {
        return (
            <div>
                <UserList userList={this.props.userList} />
            </div>
        )
    }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
  )(Pro)