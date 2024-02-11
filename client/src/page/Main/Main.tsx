import style from './style.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { iTask } from '../../interfaces';

function Main() {
    const [task, setTask] = useState({ title: '', description: '' });
    const [array, setArray] = useState<iTask[]>([]);

    const getData = (e: any) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const sendData = async () => {
        try {
            const data = await axios.post('http://localhost:3000/task/', task);
            console.log(data);

            setTask({ title: '', description: '' })

        } catch (error) {
            alert(error)
        }
    }
    async function getAllTask() {

        const data = await axios.get('http://localhost:3000/task/');
        console.log(data.data);
        const listTaskCheck = data.data.map((el: iTask) => {
            return { ...el, isCheck: false }
        })
        setArray(listTaskCheck);
    }

    useEffect(() => {
        getAllTask();
    })

    async function CreateTask() {
        const result = await axios.post(`http://localhost:3000/task`, task);
        console.log(result);
    }

    async function updateTask() {
        try {

            const data = await axios.put(`http://localhost:3000/task/`);
            console.log(data);
        } catch (err) {
            console.log(err);

        }
    }


    async function deleteTask(id: string) {
        try {

            const data = await axios.delete(`http://localhost:3000/task/${id}`);
            console.log(data);
            const filtered: iTask[] = array.filter((el: any) => el._id !== id);
            setArray(filtered);
        } catch (err) {
            console.log(err);

        }
    }
    return (
        <div className={style.wrapper}>
            <h1>TODO LIST</h1>
            <div className={style.inpCreat}>
                <input type="text" name='title' onChange={getData} placeholder='Create note...' />
                <input type="text" name='description' onChange={getData} placeholder='Create description note...' />
                <button onClick={CreateTask}>CREATE</button>
            </div>

            {array.map((el: iTask, index) => <div className={style.inpWrap}>
                <div className={style.inpTask}>
                    <input name={String(index)} type="checkbox" ></input>
                    <h2>{el.title}</h2>
                    <p>{el.description}</p>
                    <div className={style.imgMain}>
                        <button onClick={() => { updateTask() }} className={style.imgPencil}></button>
                        <button onClick={() => { deleteTask(el._id) }} className={style.imgBasket}></button>
                    </div>
                </div>
                <div className={style.line}></div>
            </div>
            )}
        </div>
    )
}

export default Main
