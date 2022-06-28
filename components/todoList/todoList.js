import style from './style/todoList.module.scss'
import {useState, useEffect} from 'react'
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
    const [listLength, setListLength] = useState(0);
    const newTodoId = list && list.length > 0 ? list.slice(-1)[0].id + 1 : 1
    const saveTodo = (event) => {
        if (event.key === "Enter") {
            dispatch({
                type: "ADD_TODO", id: newTodoId, title: textInput
            })
            setTextInput('')
        }
    }

    const completeTodo = (item) => {
        dispatch({
            type: "TOGGLE_TODO", id: item.id, isActive: item.isActive
        })
    }

    const changeTodoText = (event, id) => {
        dispatch({
            type: "CHANGE_TEXT_TODO", id: id, title: event.target.value
        })
    }

    const deleteTodo = (id) => {
        dispatch({
            type: "DELETE_TODO", id: id
        })
    }

    function deleteCompleted() {
        list.filter(x => !x.isActive).forEach((element) => {
            deleteTodo(element.id)
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
            <div className={style.checkBox}>
                <input onChange={() => completeTodo(item)}
                       type={"checkbox"}
                       defaultChecked={!item.isActive}/>
            </div>
            <div onDoubleClick={() => getClickedInput(item.id)}
                 className={style.todoInputContainer}>
                <input disabled={clickedId !== item.id}
                       value={item.title}
                       className={style.todoInput}
                       autoFocus={clickedId === item.id}
                       onChange={(event) => changeTodoText(event, item.id)}/>
            </div>
            <div className={style.status + ' ' + (item.isActive ? style.backAqua : style.backGreen)}>
                {(item.isActive ? 'active' : 'completed')}
            </div>
            <div onClick={() => deleteTodo(item.id)}
                 className={style.deleteContainer}>
                <div className={style.delete}></div>
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

    function lengthOfActiveTodo() {
        setListLength(list.filter(x => x.isActive).length)
    }

    useEffect(() => {
        if (list && list.length > 0) {
            lengthOfActiveTodo()
        }
    }, [])

    return (<div className={style.todoListContainer}>
        <div className={style.topLine}></div>
        <div className={style.addTodo}>
            <input onKeyPress={(event) => saveTodo(event)}
                   onChange={e => setTextInput(e.target.value)}
                   value={textInput}
                   placeholder="what need to be done?"
                   type="text"/>
        </div>
        <div className="listContainer">
            {todoItems}
        </div>
        <div className={style.filterContainer}>
            <div>
                <span>{listLength}</span><span>item left</span>
            </div>
            <div className={style.filters}>
                <span className={filter === 'active' ? style.active : ''}
                      onClick={() => addFilter('active')}>active</span>
                <span className={filter === 'all' ? style.active : ''} onClick={() => addFilter('all')}>All</span>
            </div>
            <div>
                <button onClick={deleteCompleted}>Clear completed</button>
            </div>
        </div>
    </div>)
}

export default connect(mapStateToProps)(TodoList)