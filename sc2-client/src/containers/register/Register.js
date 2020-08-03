/*
注册路由组件
*/

import React from 'react';
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/Actions'
import {Redirect} from 'react-router-dom'
import Logo from '../../components/logo/Logo'


const ListItem = List.Item

class Register extends React.Component {
    state = {
      // 用户名
      username: '',
      // 密码
      password: '',
      // 确认密码
      password2: '',
      // 用户类型：pro/boss
      type: 'boss'
    }

    register = () => {
        this.props.register(this.state)
    }

//事件回调函数, 事件：点击按钮以后 去login页面 函数：toLogin
    toLogin = () => {
        this.props.history.replace('/login')
    }

// 处理输入数据的改变： 更新对应的状态 改变name值
    handlerChange = (name, val) => {

        this.setState ({
            [name]: val //属性名不是name,而是name这个变量的值
        })
    }

    


    render() {
        const {msg, redirectTo} = this.props.user
        if(redirectTo) {
            return <Redirect to={redirectTo} />
        }




        return (
            <div>
            <NavBar>
                Best SC2 Club NA ( ♥д♥)
            </NavBar>
            <Logo />
            <WingBlank>
                <List>
                {msg ? <div className='error-msg'>{msg}</div> : null}
                    <WhiteSpace />
                    <InputItem placeholder='please enter your username' onChange={val => {this.handlerChange('username', val)}}>Username&nbsp;:</InputItem>
                    <WhiteSpace />
                    <InputItem placeholder='please enter your password' type="password" onChange={val => {this.handlerChange('password', val)}}>Password &nbsp;:</InputItem>
                    <WhiteSpace />
                    <InputItem placeholder='please confrim your password' type="password2" onChange={val => {this.handlerChange('password2', val)}}>Re-enter&nbsp;&nbsp;&nbsp;:</InputItem>
                    <WhiteSpace />
                    <ListItem>
                        <span>Who U&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={this.state.type === 'pro'} onChange={() => this.handlerChange('type', 'pro')}> Pro</Radio>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={this.state.type === 'boss'} onChange={() => this.handlerChange('type', 'boss')}> Boss</Radio>
                    </ListItem>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>Register</Button>
                    <WhiteSpace />
                    <Button onClick={this.toLogin}>Account</Button>
                </List>
            </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)