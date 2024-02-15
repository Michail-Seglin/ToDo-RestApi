import React, { useState } from 'react';
import style from './style.module.scss';
import { iTask } from '../interfaces';
import axios from 'axios';

interface ModalProps {
    setOpen: boolean;
    task: iTask
}

const Modal: React.FC<ModalProps> = ({ setOpen, task }) => {
    const [inp, setInp] = useState({ title: '', description: '' })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setInp({ ...inp, [event.target.name]: event.target.value });


    return <div className={style.modal}>
        <div><input onChange={handleInputChange} name='title' type="text" placeholder='enter title...' /></div>
        <div><input onChange={handleInputChange} name='description' type="text" placeholder='enter description...' /></div>

        <div className={style.btns}>
            <div><button onClick={() => setOpen(false)}>cancel</button></div>
            <div><button onClick={async () => {
                const result = await axios.put(`http://localhost:3000/task/${task._id}`, inp);
                console.log(result);
                location.reload()
            }}>confirm</button></div>
        </div>
    </div>;
}

export default Modal;