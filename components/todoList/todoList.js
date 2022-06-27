import style from './style/todoList.module.scss'
import React from 'react'
import Link from "next/link";
import {useState} from "react";
import {connect} from "react-redux";

function addTodo(id, title) {
    return {
        type: "ADD_TODO",
        id: id
    }
}

function mapStateToProps(store) {
    console.log(store)
    return {
        list: store.list
    }
}

const mapDispatchToProps = {
    addTodo
}


function todoList({list}) {
    const [todoList, setStateValues] = useState(list);
    let textInput = React.createRef();
    const saveTodo = (event) => {
        if (event.key === "Enter") {
            addTodo(5, textInput.current.value)
        }
    }

    const updateObjectInArray = (index) => {
        setStateValues(current => current.map(obj => {
            if (obj.id === index + 1) {
                return {...obj, isActive: false};
            }
            return obj;
        }),);
    };
    const todoItems = todoList.map((items, index) => {
        if (items.isActive) return <div className={style.itemRow}
                                        onDoubleClick={() => updateObjectInArray(index)}>
            {items.title + ' ' + items.isActive}
        </div>
    });

    return (<div className={style.todoListContainer}>
        <div>
            <input ref={textInput} onKeyPress={(event) => saveTodo(event)} placeholder="what need to be done?"
                   type="text"/>
        </div>
        <div className="listContainer">
            {todoItems}
        </div>
        <div>
            <div></div>
            <div>
                <Link href="/active">active</Link>
                <Link href="/">All</Link>
            </div>
            <div></div>
        </div>
    </div>)
}

export default connect(mapStateToProps, mapDispatchToProps)(todoList)