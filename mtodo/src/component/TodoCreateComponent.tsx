import { FormEvent, useEffect, useState } from "react"
import { Todo } from "../types/Todo";

type TodoCreateProps={
    todo:Todo,
    createAction:(event:Todo)=>void,
    isUpdate:boolean,
    updateAction:(event:Todo)=>void
}

export const TodoCreate = (props:TodoCreateProps) => {
    const [todoLocal, setTodo] = useState<Todo>({
        id: 0,
        completed: false,
        title: "",
        userId: 1
    });

    const submitUpdate=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(!props.isUpdate){
            props.createAction(todoLocal);
        }else{
            props.updateAction(todoLocal);
        }
    }

    useEffect(()=>{
        setTodo(()=> props.todo);

    },[props]);

    return (
        <form onSubmit={submitUpdate}>
            <div className="mb-1">
                <label>Id</label>
                <input type="text" value={todoLocal?.id == 0 ? "" : todoLocal.id} disabled={props.isUpdate} onChange={(event)=> {setTodo((value)=>{return {...value,id:parseInt(event.target.value)} as Todo});} }/>
            </div>
            <div className="mb-1">
                <label>Title</label>
                <input type="text" value={todoLocal.title} onChange={(event)=> {setTodo((value)=>{return {...value,title:event.target.value} as Todo});} }/>
            </div>
            <div className="mb-1">
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>
    );

}