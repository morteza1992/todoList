import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import todos from "../redux/reducers";
import {createStore} from "redux";
import {Provider} from "react-redux";
import dynamic from "next/dynamic";
const TodoList = dynamic(() => import("../components/todoList/todoList.js"), {
    ssr: false,
});
let initialState = {
    list: []
}
const store = createStore(todos, initialState)

const fillTodo = () => {
    let data = JSON.parse(localStorage.getItem('todoList'))
    store.dispatch({
        type: "FILL_TODO", data: data.list
    })
}
export default function Home() {
    if (typeof window !== "undefined") {
        fillTodo()
    }
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
