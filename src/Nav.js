import React from 'react'
import  { connect } from 'react-redux'

const Nav = ({users, view}) => {
    const attended = users.filter(user => user.attendance)
    const absent = users.filter(user => !user.attendance)
    return (
        <nav>
            <a href='#' className = {!view ? 'selected':''}>All ({users.length})</a>
            <a href='#attended' className = {view === 'attended' ? 'selected':''}>Attended ({attended.length})</a>
            <a href='#absent' className = {view === 'absent' ? 'selected':''}>Absent ({absent.length})</a>
        </nav>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Nav)