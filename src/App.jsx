import { useEffect, useState } from "react"
import axios from "axios"


const Home = () => {
  const [login, setLogin] = useState("")
  const [pass, setPass] = useState("")

  const loginHandler = (e) => {
    setLogin(e.target.value)
  }

  const passHandler = (e) => {
    setPass(e.target.value)
  }

  async function send() {
    const response = await axios.post("http://91.203.10.130:2783/portal/hs/ksapi/auth", {log: login, password: pass})
    console.log(response)
  }

  const get_app = async () => {
    const response = await axios.get("http://91.203.10.130:2783/portal/hs/ksapi/test")
    console.log(response)
  }

  return (
    <div className="container">
      <h1>Авторизация</h1>
      <input type="text" onChange={loginHandler} value={login} placeholder="Введите логин"/>
      <input type="password" onChange={passHandler} value={pass} placeholder="Введите пароль"/>
      <button onClick={send}>Войти</button>
      <button onClick={get_app}>Получить данные</button>
    </div>
  )
}

export default Home;