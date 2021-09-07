import React from 'react'
import { updateUser, create } from './store'
import { connect } from 'react-redux'

const _Users = ({ users, view, toggle, create }) => {
    return (
        <div>
            <button onClick = {create}>Create</button>
            <ul>
                {
                    users.filter(user => !view || (user.attendance && view === 'attended') || (!user.attendance && view === 'absent')).map( user => {
                        return (
                            <li onClick ={() => toggle(user)} key={user.id} className={user.attendance ? 'attended':'absent'}>{user.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapStateToProps = state => state
const mapDispatchToProps = (dispatch) => {
    return {
        toggle: (user) => dispatch(updateUser(user)),
        create: () => dispatch(create())
    }
}

const Users = connect(mapStateToProps, mapDispatchToProps)(_Users)

export default Users