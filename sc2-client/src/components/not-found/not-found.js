/*
not found(boss/pro) router component
*/


import React from 'react'
import {connect} from 'react-redux'

class NotFound extends React.Component {
    render () {
        return (
            <div>
                NotFound
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(NotFound)