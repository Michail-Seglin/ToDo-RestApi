import style from './style.module.scss'
import axios from 'axios'
import { useState, useEffect } from 'react'

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

            // setData(prev => [...prev, data.data]);
            setTask({ title: '', description: '' })

        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        const get = async () => {
            try {
                const res = await axios.get('http://localhost:3000/task');
                setData(res.data);
                console.log('render')
            } catch (err) {
                console.log(err);
            }
        };
        get();
    }, []);



    return (
        <div className={style.wrapper}>

            <h1>TODO LIST</h1>
            <div className={style.header} >

                <input type='text' placeholder='enter note...' name='title' onChange={getData} value={task.title}></input>
                <input type='text' placeholder='enter description...' name='description' onChange={getData} value={task.description}></input>
                <button type='submit' onClick={sendData}>Create</button>
            </div>

            <div className={style.listName}>
                {
                    data.map(item => (
                        <div className={style.wrap}>
                            <div className={style.item}>
                                {/* <p className={style.content}>{item.title}</p>
                                <p className={style.content}>{item.description}</p> */}
                                <button className={style.update} onClick={() => { setData(item._id) }}></button>
                                <button className={style.delete} ></button>
                            </div>
                        </div>
                    ))
                }
            </div>


        </div >
    )
}

export default Main
