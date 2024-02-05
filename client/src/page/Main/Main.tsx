import style from './style.module.scss'
import { useState } from 'react'

function Main() {
    const [data, setData] = useState();


    return (
        <div className={style.wrapper}>

            <h1>TODO LIST</h1>
            <div className={style.header}>

                <input type='text' placeholder='enter note...' name='title'></input>
                <input type='text' placeholder='enter description...' name='description'></input>
                <div><button>Create</button></div>
            </div>
        </div >
    )
}

export default Main
