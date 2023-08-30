import { useEffect, useState } from "react"
import ShowToDoList from "../components/ShowToDoList"
import ToDoForm from "../components/ToDoForm"
import Style from "../styles/ToDoPage.module.css"

const crudKey = "I7X4r-lIE2hiv-NPHYZaUpx2GTm7H7jeljF8X2MmxK9duQOx4Q"
const ToDoPage = () => {
    const [toDoList, setToDoList] = useState([])

    //on page load get data 
    useEffect(() => {   
        fetch("/api/v1/todolist",{
            headers:{
                "Content-Type":"aplication/json",
                "Authorization":`Bearer ${crudKey}`
            }
        })
        .then(res => {
            if(!res.ok) throw new Error("Response Failed")
            return res.json()
        })
        .then(data => setToDoList(data.items.map((todo) =>{
            return {
                name:todo.name, 
                isCompleted:todo.isCompleted,
                id:todo._uuid
            }
        })))
        .catch(err => console.log(err))

    }, [])
    //on add btn click post data and add to setToDoList
    const onformSubmit = (name, isCompleted) => {
        fetch("/api/v1/todolist",{
            method:"POST",
            headers:{
                "Content-Type":"aplication/json",
                "Authorization":`Bearer ${crudKey}`
            },
            body:JSON.stringify([{name, isCompleted}])
        })
        .then(res => {
            if(!res.ok) throw new Error("Response Failed")
            return res.json()
        })
        .then(data => setToDoList((prev) => [{
            name:data.items[0].name, 
            isCompleted:data.items[0].isCompleted,
            id:data.items[0]._uuid
        }, ...prev]))
        .catch(err => console.log(err))
    }

    return (
        <div className={Style.wrapper}>
            <ToDoForm onformSubmit={onformSubmit}/>
            
            <div className={Style["todo-list"]}>
            {toDoList.map((todo) => (
                <ShowToDoList key={todo.id} id={todo.id} name={todo.name} isCompleted={todo.isCompleted} />
            ))}
            </div>
        </div>
        
      
    )

}

export default ToDoPage