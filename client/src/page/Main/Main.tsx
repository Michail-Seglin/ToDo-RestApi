import style from './style.module.scss'

function Main() {

    return (
        <div className={style.wrapper}>

            <h1>TODO LIST</h1>
            <div className={style.header}>

                <input type='text' placeholder='enter note...'></input>
                <input type='text' placeholder='enter description...'></input>
                <div><button>Create</button></div>
            </div>
        </div >
    )
}

export default Main
