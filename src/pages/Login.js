import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import './Login.css'
import api from '../services/api'


export default function Login({history}){
    const [username,setUsername] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        const response = await api.post('/devs',{
            username,
        })
        const {_id} = response.data
        console.log(response)
        history.push(`/dev/${_id}`)
    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="tindev"/>
                <input
                    placeholder ="Digite seu usuario do gitHub"
                    value={username}
                    onChange={e => setUsername(e.target.value)}                
                />
                <button type="submit">Logar</button>
            </form>
        </div>
    )
}