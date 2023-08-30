import Style from "../styles/ToDoShow.module.css"


const ShowToDoList = ({id, name, isCompleted}) => {
    return (
        <div className={Style.wrapper}>
            <span>{name}</span>
            <input type={"checkbox"} value={isCompleted}  className={Style.checkbox}/>
        </div>
    )
}

export default ShowToDoList