/*
boss main page router component
*/


import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/Actions'
import UserList from '../../components/user-list/user-list'

class Boss extends React.Component {
    // 初始化就有一个ajax请求
    componentDidMount () {
        // request getting userlist
        this.props.getUserList('pro') //要获取的面板为pro
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
  )(Boss)