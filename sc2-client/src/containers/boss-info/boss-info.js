/*
boss info 完善的路由容器组件
*/

import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import {updateUser} from '../../redux/Actions'


class BossInfo extends React.Component {

    state = {
        avatar: '',
        post: '',
        info: '',
        company: '',
        salary: ''
    }

    setAvatar = (avatar) => {
        this.setState({
            avatar
        })
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    save = () => {
        console.log(this.state)
        this.props.updateUser(this.state)
    }

    render() {
        const {avatar, type} = this.props.user
        if(avatar) {
            const path = type ==='pro' ? '/pro' : '/boss'
            return <Redirect to={path} />
        }


        return (
            <div>
                <NavBar> Your Boss Info ･*･:≡(　ε:)</NavBar>
                <AvatarSelector setAvatar={this.setAvatar} />
                <InputItem placeholder='race in-need' onChange={val => {this.handleChange('post', val)}}>Race wantd: </InputItem>
                <InputItem placeholder='club Name' onChange={val => {this.handleChange('company', val)}}>Club Name: </InputItem>
                <InputItem placeholder='salary' onChange={val => {this.handleChange('salary', val)}}>Salary: </InputItem>
                <TextareaItem title="Summary: "
                                        rows={2} onChange={val => {this.handleChange('info', val)}} />
                <Button type='primary' onClick={this.save}> Save </Button>

            </div>
        )
    }
}



export default connect(
    state => ({user: state.user}),
    {updateUser}
)(BossInfo)