import style from './style.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { iTask } from '../../interfaces';
import Modal from '../modal/Modal';

export default function Main() {
    const [inputValues, setInputValues] = useState({ title: '', description: '' });
    const [open, setOpen] = useState<boolean>(false);

    const [active, setActive] = useState({});

    const [tasks, setTasks] = useState<iTask[]>([]);

    function swapCheckbox(index: number) {
        const updatedTaks = [...tasks]
        updatedTaks[index].isCheck = !updatedTaks[index].isCheck
        setTasks(updatedTaks)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setInputValues({ ...inputValues, [event.target.name]: event.target.value });

    async function createTask() {
        const result = await axios.post('http://localhost:3000/task', inputValues);
        console.log(result);
        location.reload()
    }

    async function getAllTasks() {
        const response = await axios.get('http://localhost:3000/task');
        const tasksWithCheckFlag = response.data.map((task: iTask) => ({ ...task, isCheck: false }));
        setTasks(tasksWithCheckFlag);
    }

    useEffect(() => {
        getAllTasks();
    }, []);

    useEffect(() => {
        if (open) document.body.style.backgroundColor = '#00000025'
        else document.body.style.backgroundColor = 'white'
    }, [open])

    return (
        <div className={style.wrapper}>
            <h1>TODO LIST</h1>
            <div className={style.inpCreat}>
                <input type="text" name='title' onChange={handleInputChange} placeholder='Create note...' />
                <input type="text" name='description' onChange={handleInputChange} placeholder='Create description note...' />
                <button onClick={createTask}>CREATE</button>
            </div>

            {tasks.map((task: iTask, index) => (
                <div className={style.inpTask1} key={index}>
                    <input onChange={() => swapCheckbox(index)} name={String(index)} type="checkbox" checked={task.isCheck}></input>
                    <h2 className={task.isCheck ? style.checked : style.def}>{task.title}</h2>
                    <p className={task.isCheck ? style.checked : ''}>{task.description}</p>
                    <div className={style.imgMain}>
                        <div className={style.imgPencil} onClick={() => { setOpen(true); setActive(tasks[index]) }}></div>
                        <div className={style.imgBasket} onClick={async () => {
                            debugger
                            const result = await axios.delete(`http://localhost:3000/task/${task._id}`);
                            console.log(result);
                            location.reload()
                        }}></div>
                    </div>
                    {open ? <Modal setOpen={setOpen} task={active} /> : null}
                </div>
            ))}

        </div>
    );
}