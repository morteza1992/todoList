import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from "next/link";
import TodoList from "../components/todoList/todoList.js";
import todos from "../redux/reducers";
import {createStore} from "redux";
import {Provider} from "react-redux";

let initialState = {
    list: []
}
const store = createStore(todos, initialState)

const fillTodo = () => {
    if (typeof window !== 'undefined') {
        let data = JSON.parse(localStorage.getItem('todoList'))
        store.dispatch({
            type: "FILL_TODO", data: data.list
        })
    }
}
export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>snapp</title>
                    <meta name="description" content="snapp"/>
                </Head>
                <Provider store={store}>
                    <TodoList/>
                </Provider>
            </div>
        </>)
}
