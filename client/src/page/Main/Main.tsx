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
        const result = await axios.post(`http://localhost:3000/task`, inp);
        console.log(result);
    }
    
    async function deleteTask(id: string) {
        const data = await axios.delete(`http://localhost:3000/task/${id}`);
        console.log(data);
        const filtered: iTask[] = array.filter((el: any) => el._id !== id);
        setArray(filtered);
    }
    return (
        <div className={style.wrapper}>

            <h1>TODO LIST</h1>
            <div className={style.header} >

                <input type='text' placeholder='enter note...' name='title' onChange={getData} value={task.title}></input>
                <input type='text' placeholder='enter description...' name='description' onChange={getData} value={task.description}></input>
                <button type='submit' onClick={sendData}>Create</button>
            </div>

            {array.map((el: iTask) => <div className={style.inpTask}>
                <input type='checkBox'></input>
                <h2>{el.title}</h2>
                <p>{el.description}</p>
                <div className={style.imgMain}>
                    <div className={style.imgUpdate}></div>
                    <div className={style.imgDelete}></div>
                </div>
            </div>)}
        </div >
    )
}

export default Main
