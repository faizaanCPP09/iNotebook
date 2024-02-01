import React from 'react'

export default function Alert(props) {
   
    return (
        <div style={{height:'50px'}}>      
            {props.alert && <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {props.alert.type}:<strong>{props.alert.msg}</strong> 
        </div>}
        </div>
    )
}
