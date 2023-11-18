import { useEffect, useState } from "react"
import { Todo } from "../types/Todo";

export type Todos = {
    todos: Todo[],
    selectRow:(e:Todo)=>void
}

export const TodoList = (props: Todos) => {
    const [localTodo, setLocalTodo] = useState<Todo[]>([]);
    useEffect(() => {
        setLocalTodo(() => props.todos);
    }, [props]);
    return (<>
        <table>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Title</td>
                </tr>
            </thead>
            <tbody>
                {localTodo.map((value: Todo) => {
                    return (
                        <tr key={value.id} onClick={()=>props.selectRow(value)}>
                            <td>{value.id}</td>
                            <td>{value.title}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>)
}