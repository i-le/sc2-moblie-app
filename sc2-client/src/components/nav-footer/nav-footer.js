import React from 'react'
import { TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends React.Component {

    static propTypes = {
        navList: PropTypes.array.isRequired
    }

    render () {
        let {navList} = this.props
        // hiding pro if as pro logged in , hiding boss if as boss logged in
        navList = navList.filter(nav => !nav.hide)

    const path = this.props.location.pathname  // only router componet has location
        return (
            <div>
            <TabBar>
                    {
                        navList.map(nav =>
                            <Item key={nav.path} 
                                title={nav.text}
                                icon={{uri: require(`./images/${nav.icon}.png`)}}
                                selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                                selected={path === nav.path}
                                onPress={() => this.props.history.replace(nav.path)}
                                //badge={nav.path === '/message' ? unReadCount : 0}
                            />
                        )}
            </TabBar>
            </div>
        )
    }
}

export default withRouter(NavFooter) //向外暴露withRouter() 's component
// intener will pass some uniq router attrubuts ：history/location/math