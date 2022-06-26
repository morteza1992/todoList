import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from "next/link";
import TodoList from "../components/todoList/todoList.js";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>snapp</title>
                <meta name="description" content="snapp"/>
            </Head>
            <TodoList/>
        </div>
    )
}
