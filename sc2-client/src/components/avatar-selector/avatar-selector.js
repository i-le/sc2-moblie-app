import React from 'react'
import {List, Grid} from 'antd-mobile'
import './avatar.css'
import PropTypes from 'prop-types'

export default class AvatarSelector extends React.Component {

    static propTypes = {
        setAvatar: PropTypes.func.isRequired
    }

    state = {
        icon: null
    }

    constructor(props) {
        super(props)
        this.headerList = []
        for (var i = 0; i < 20; i++) {
            this.headerList.push({
                text: 'avatar' + (i+1),
                icon: require(`../../assets/sc2avatars/avatar${i+1}.png`)
            })
        }
    }

   handleClick = ({text, icon}) => {
        this.setState({icon})
        this.props.setAvatar(text)
   }



    render() {
        const {icon} = this.state
        const listHeader = !icon ? 'pick your awesome SC2 avatar' : (
        <div>
            selected avatar: <img src={icon} height='75' width='75' alt='no face'/>
            </div>
        )
        return (
            <div>
                <List renderHeader={() => listHeader}>
                    <Grid data={this.headerList}
                                columnNum={5} 
                                    onClick={this.handleClick}
                                />
                </List>
                <div>

                </div>
            </div>
        )
    }
}