import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from "next/link";
import TodoList from "../components/todoList/todoList.js";
import todos from "../redux/reducers";
import {createStore} from "redux";
import {Provider} from "react-redux";


export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch("http://localhost:8000/todoList")
    const data = await res.json()
    // Pass data to the page via props

    return {props: {data}}

}

const initialState = {
    list: [
        {
            "title": "item1",
            "isActive": true,
            "id": 1
        },
        {
            "title": "item2",
            "isActive": true,
            "id": 2
        },
        {
            "title": "item3",
            "isActive": true,
            "id": 3
        },
        {
            "title": "item4",
            "isActive": true,
            "id": 4
        }
    ]
}
const store = createStore(todos, initialState)

export default function Home() {

    return (
        <div className={styles.container}>
            <Head>
                <title>snapp</title>
                <meta name="description" content="snapp"/>
            </Head>
            <Provider store={store}>
                <TodoList/>
            </Provider>
        </div>
    )
}
