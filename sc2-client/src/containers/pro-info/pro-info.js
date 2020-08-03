/*
pro info 完善的路由容器组件
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


class ProInfo extends React.Component {

    state = {
        avatar: '',
        post: '',
        info: ''
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
                const path = type ==='boss' ? '/pro' : '/boss'
                return <Redirect to={path} />
            }
    



        return (
            <div>
                <NavBar> Your Pro Info ･*･:≡(　ε:) </NavBar>
                <AvatarSelector setAvatar={this.setAvatar} />
                
                <InputItem placeholder='league main race' onChange={val => {this.handleChange('post', val)}}>Main Race: </InputItem>
                <TextareaItem title="Summary: "
                                        rows={5} onChange={val => {this.handleChange('info', val)}} placeholder='how long been playing sc2, your top ranking, etc' />
                <Button type='primary' onClick={this.save}> Save </Button>

            </div>
        )
    }
}


export default connect(
    state => ({user: state.user}),
    {updateUser}
)(ProInfo)