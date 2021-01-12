import React from 'react'

export const ValidToken = (props) => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    props.history.push('/auth')
}