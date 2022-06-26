import style from './style/todoList.module.scss'
import Link from "next/link";
import {useEffect, useState} from "react";

export default function todoList() {
    const list = [{
        title: 'item1', isActive: true, id: 1
    }, {
        title: 'item2', isActive: true, id: 2
    }, {
        title: 'item3', isActive: true, id: 3
    }, {
        title: 'item4', isActive: true, id: 4
    }]
    const [todoList, setStateValues] = useState(list);

    const saveTodo = (event) => {
        if (event.key === "Enter") {
            alert('11')
        }
    }

    const updateObjectInArray = (index) => {
        setStateValues(current =>
            current.map(obj => {
                if (obj.id === index + 1) {
                    return {...obj, isActive: false};
                }
                return obj;
            }),
        );
    };
    const todoItems = todoList.map((items, index) => {
        if (items.isActive)
            return <div className={style.itemRow}
                        onDoubleClick={() => updateObjectInArray(index)}>
                {items.title + ' ' + items.isActive}
            </div>
    });

    return (<div className={style.todoListContainer}>
        <div><input onKeyPress={saveTodo} placeholder="what need to be done?" type="text"/></div>
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