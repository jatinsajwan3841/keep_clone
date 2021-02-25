import React from "react";

export default function Holder({id, isCompleted, completefun, deletefun}){
    return(
    <div className = 'noteholder'>
        <textarea className = {isCompleted ? 'cross' : ''} value={t.value} readOnly/>
        <input type='checkbox' id='completed' onClick={() => completefun(id)} />
        <label>Completed</label>
        <button className='btn' onClick={() => deletefun(id)}>delete</button>                        
    </div>
    )
}