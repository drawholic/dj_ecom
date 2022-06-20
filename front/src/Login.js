import axios from 'axios'
import {useState, useEffect} from 'react'
import {csrftoken} from './Token.js'
import './App.css'


export default function Login({login}){

	const [message, setMessage] = useState('')
        const [token, setToken] = useState('')
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')

        useEffect(()=>{
		if (sessionStorage.getItem('token')){
			setToken(sessionStorage.getItem('token'))
		}
                if (token){
                axios({
                method: 'get',
                url:'http://localhost:8000',
                headers: {
	                Authorization: `Token ${token}`
	                }
                }).then(res => setMessage(res.data.text)).catch(err => console.log(err))
                }
        }, [token])


        const SubmitHandler = e => {
                e.preventDefault()
                axios.post('http://localhost:8000/token/', {'username':username, 'password':password})
                .then(res => {
			login(res.data.token)
			setToken(res.data.token)
			sessionStorage.setItem('token', res.data.token)
	                })
                .catch(err => console.log(err))
	        }


        return (
               <div className="Login">
                {!sessionStorage.getItem('token')?
                <form onSubmit={SubmitHandler}>
	       <div className='form'> 
		<input value={csrftoken} type='hidden'/>
	        
			<label htmlFor='username'>Username</label>
                <input className='input' name='username' value={username} onChange={e => setUsername(e.target.value)}/>
                
			<label htmlFor='password'>Password</label>
                <input className='input' type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}/>
                
			<input className='submit' type='submit' value='Log in'/>
                </div>
			</form>
                :
                <h1>{message}</h1>
                }
                </div>
);
}

