import { useEffect, useState } from 'react';
import { TodoList } from '../component/TodoListComponent';
import { instance } from '../services/httpClient';
import { Todo } from '../types/Todo';
import { TodoCreate } from '../component/TodoCreateComponent';
import { TodoModalBox } from '../component/TodoModalBox';

export const TodoPage = () => {
    const [sample, setSample] = useState<Todo[]>([]);
    const setInitial = {
        id: 0,
        completed: false,
        title: "",
        userId: 1
    }
    const [loading, setLoading] = useState<boolean>(true);
    const [todo, setTodo] = useState<Todo>(setInitial);
    const [update, setUpdate] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const getTodos = async () => {
        const samples = await instance.get("https://jsonplaceholder.typicode.com/todos")
        setSample(() => samples.data);
    }

    const createTodo = (e: Todo) => {
        setSample((value) => {
            value.push(e)
            return value;
        });
        setTodo(() => setInitial);
        setUpdate(() => false);
    }

    const updateTodo = (e: Todo) => {
        setSample((valuel) => {
            valuel.forEach((value: Todo, index: number, array: Todo[]) => {
                if (value.id === e.id) {
                    array[index] = e;
                }
            });
            return valuel;
        });
        setTodo(() => setInitial);
        setUpdate(() => false);
    }

    function setNew() {
        setUpdate(() => false);
        setTodo(() => setInitial);
    }

    useEffect(() => {
        if (loading) {
            getTodos();
            setLoading(false);
        }

    }, [loading, sample, todo, update]);

    function selectedRow(row: Todo) {
        setTodo(() => row); setUpdate(() => true);
    }

    function deleteAction(id:number){
        setSample(value=> value.filter(i=> i.id!=id));
        setShow(()=> false);
    }

    return (
        <>
            <h1>Todo Page</h1>
            <button className="btn btn-primary" onClick={()=> setShow(()=> true)}>Delete</button>
            <TodoList todos={sample} selectRow={selectedRow} />
            <button className="btn btn-primary" onClick={setNew}>New</button>
            <TodoCreate todo={todo} createAction={createTodo} isUpdate={update} updateAction={updateTodo} />
            <TodoModalBox show={show} handleClose={deleteAction} />
        </>
    );
};