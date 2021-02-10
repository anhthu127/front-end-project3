import React from 'react'

export const ValidToken = (props) => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    console.log(props.history);
    props.history.push('/logout')
}