import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux'
import store, { fetchUsers, setView } from './store'
import Nav from './Nav'
import Users from './Users'

class _App extends Component{
    componentDidMount(){
        this.props.loadUsers()
        window.addEventListener('hashchange', () => {
            this.props.setView(window.location.hash.slice(1))
        })
        this.props.setView(window.location.hash.slice(1))
    }
    render(){
        const {users, view} = this.props
        return (
            <div>
                <h1>Redux HW Users</h1>
                <Nav />
                <Users />
            </div>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => {
    return {
        setView: (view) => dispatch(setView(view)),
        loadUsers: () => dispatch(fetchUsers())
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App)


render(<Provider store = {store}><App /></Provider>, document.querySelector('#root'));