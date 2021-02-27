import React from 'react';
import "./comp.css";
import { MdDelete } from "react-icons/md";

export default function Base({layout}){
    const [todo, settodo] = React.useState('');
    const [todoList, settodoList] = React.useState([]);
    const [expand, setexpand] = React.useState(false);

    const handleVal = (e) => settodo(e.target.value);

    const handlexpand = () => setexpand(true);

    const handleAdd = () =>{
        if (todo != ''){
            const details = {
                id: ~~(Math.random()*1000),
                value: todo,
                isCompleted: false,
            } 
           settodoList([...todoList, details]) ;
           settodo('');
           setexpand(false);
        }
        else setexpand(false);
    }

    const handleDelete = ( id) =>{
        settodoList(todoList.filter((t) => t.id != id));
    }

    const handleCompleted = (id) => {
        //find index of that array object
        const element = todoList.findIndex((elem) => elem.id == id);
        //copy array into new variable using spread op.
        const newtodoList = [...todoList]
        //edit that element
        newtodoList[element] = {
            ...newtodoList[element],
            isCompleted: true,
        };

        settodoList(newtodoList);
    }

    return(
        <>
            <form>                
                <textarea rows={expand ? 3:1 } value={todo} onClick={handlexpand} onChange={handleVal} onBlur={handleAdd} placeholder='Take your note...' />
            </form>
        
            {todoList != [] ? 
            <ul className={layout ? 'container' : 'container containerf'}>
                {todoList.map(t =>
                    <li key={t.id} className = {layout ? 'noteholder' : 'noteholder noteholderf'}>
                        <div contentEditable className={layout ? 'textarea' : 'textarea textareaf'}>
                            <span className = {t.isCompleted ? 'cross' : ''} >{t.value}</span>
                            <span className='tools'>
                                <button className='btn' onClick={() => handleDelete(t.id)}><MdDelete/></button>   
                                <input className='btn' type='checkbox' id='completed' onClick={() => handleCompleted(t.id)} />
                            </span>
                        </div>
                        
                    </li>
                    )}
            </ul>
            
            : null}
        </>
    )
}