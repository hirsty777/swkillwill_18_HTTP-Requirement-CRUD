import {  useRef } from "react"
import Style from "../styles/ToDoForm.module.css"


const ToDoForm = ({onformSubmit}) => {
    const inputRef = useRef();
   
    const onSubmit = (e) => {
        e.preventDefault()
        if(inputRef.current.value.trim() === "") return //if no value vas entered return
        onformSubmit(inputRef.current.value,false)
        inputRef.current.value = ""
    }
 
    return (
        <div className={Style.wrapper}>
            <form  className={Style["add-from"]} onSubmit={onSubmit} >
                <input  className={Style["add-input"]} type="text" name="to-do" ref={inputRef} placeholder="Add To-Do"/>
                <button className={Style["add-btn"]}>Add</button>
            </form>
        </div>
    )
}

export default ToDoForm