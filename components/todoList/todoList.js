import style from './style/todoList.module.scss'
import {useState, useEffect, useRef} from 'react'
import {connect} from "react-redux";

function mapStateToProps(store) {
    return {
        list: store.list
    }
}

function TodoList({list, dispatch}) {
    const [filter, setFilter] = useState('all');
    const [clickedId, setClickedId] = useState(null);
    const [textInput, setTextInput] = useState('');
    const todoInput = useRef()
    useEffect(() => {
        if (todoInput.current) {
            console.log(todoInput)
            todoInput.current.focus()
        }
    }, [clickedId])
    const saveTodo = (event) => {
        if (event.key === "Enter") {
            dispatch({
                type: "ADD_TODO",
                id: list.length + 1,
                title: textInput
            })
            setTextInput('')
        }
    }

    const completeTodo = (item) => {
        dispatch({
            type: "TOGGLE_TODO",
            id: item.id,
            isActive: item.isActive
        })
    }

    const changeTodoText = (event, id) => {
        dispatch({
            type: "CHANGE_TEXT_TODO",
            id: id,
            title: event.target.value
        })
    }

    function addFilter(filter) {
        setFilter(filter)
    }

    function getClickedInput(id) {
        setClickedId(id)


    }

    function generateElements(item) {
        return <div className={style.itemRow} key={item.id}>
            <input onChange={() => completeTodo(item)}
                   type={"checkbox"}
                   defaultChecked={item.isActive}/>
            <div onDoubleClick={() => getClickedInput(item.id)}>
                <input disabled={clickedId !== item.id}
                       value={item.title}
                       ref={todoInput}
                       onChange={(event) => changeTodoText(event, item.id)}/>
                {(item.isActive ? 'active' : 'completed')}
            </div>

        </div>
    }

    let todoItems = list && list.length > 0 ? list.map((item) => {
        return generateElements(item)
    }) : ''
    if (filter === 'active') {
        todoItems = list && list.length > 0 ? list.map((item) => {
            if (item.isActive) return generateElements(item)
        }) : ''
    }

    return (<div className={style.todoListContainer}>
        <div>
            <input onKeyPress={(event) => saveTodo(event)}
                   onChange={e => setTextInput(e.target.value)}
                   value={textInput}
                   placeholder="what need to be done?"
                   type="text"/>
        </div>
        <div className="listContainer">
            {todoItems}
        </div>
        <div>
            <div></div>
            <div>
                <button onClick={() => addFilter('active')}>active</button>
                <button onClick={() => addFilter('all')}>All</button>
            </div>
            <div></div>
        </div>
    </div>)
}

export default connect(mapStateToProps)(TodoList)