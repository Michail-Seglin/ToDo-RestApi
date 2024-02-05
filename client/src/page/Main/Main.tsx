import style from './style.module.scss'
import axios from 'axios'
import { useState } from 'react'

function Main() {
    const [task, setTask] = useState({ title: '', description: '' });
    const [data, setData] = useState([]);

    const getData = (e: any) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const sendData = async () => {
        try {
            const data = await axios.post('http://localhost:3000/task/', task);
            console.log(data);

            // setData(list => [...list, data.data]);
            setTask({ title: '', description: '' })
            if (!data.data) throw new Error('error')

        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className={style.wrapper}>

            <h1>TODO LIST</h1>
            <form className={style.header} >

                <input type='text' placeholder='enter note...' name='title' onChange={getData} value={task.title}></input>
                <input type='text' placeholder='enter description...' name='description' onChange={getData} value={task.description}></input>
                <button type='submit' onClick={sendData}>Create</button>
            </form>
        </div >
    )
}

export default Main
