import { useState } from "react";
import "./Todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import { getLocalStorageTodoData, setLocalStorageTodoData } from "./TodoLocalStorage";


export const Todo = () => {

    const [task, setTask] = useState(() => getLocalStorageTodoData());
    

    const handleFormSubmit = (inputValue) => {
        const {id , content , checked} = inputValue;

        //To check the input field is empty or not
        if(!content) return;
        //to check if the data is already existing or not
        // if(task.includes(inputValue)) return;

        const ifTodoContentMatched = task.find((curTask) => curTask.content === content);
        if (ifTodoContentMatched) return;
        setTask((prevTask) => [...prevTask , {id, content, checked }]);
    };

    // add data to local Storage

    setLocalStorageTodoData(task)
    //todo date and Time
    
    

    //todo handleDeleteTodo function

    const handleDeleteTodo = (value) => {
        // console.log(task);
        // console.log(value);
        const updatedTask = task.filter((curTask) => curTask.content !== value);
        setTask(updatedTask)
    };

    //todo handleclearTodoData functionality

    const handleclearTodoData = () => {
        setTask([])
    }

    //todo handleCheckedTodo funtion

    const handleCheckedTodo = (content) => {
        const updatedTask = task.map((curTask) => {
            if(curTask.content === content){
                return {...curTask , checked : !curTask.checked};
            }else{
                return curTask;
            }

        });
        setTask(updatedTask);
    }

    

    return (
        <section className="todo-container">

            <header>
                <h1>Todo List</h1>
                <TodoDate/>
            </header>

           <TodoForm onAddTodo = {handleFormSubmit}/>

            <section className="myUnOrdList">

                <ul>
                    {
                        task.map((curTask , index) => {
                            return(

                                <TodoList
                                key={curTask.id} 
                                data={curTask.content} 
                                checked = {curTask.checked}
                                onHandleDeleteTodo = {handleDeleteTodo}
                                onHandleCheckedTodo = {handleCheckedTodo}
                                />
                            );

                        })
                    }
                </ul>

            </section>

            <section>
                <button className="clear-btn" onClick={handleclearTodoData}>Clear all</button>
            </section>

        </section>
    )
};