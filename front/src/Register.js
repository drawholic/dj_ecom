import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const PasswordErrorMessage =({msg})=> <div style={{color:'red'}}>{msg}</div>

export default function Register({regis}){
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [password1, setPassword1] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const dependencies = [username, password, password1]
	useEffect(()=>{
		setError('')
	},[...dependencies])
	
	const handleSubmit = e => {
		e.preventDefault()
		if (password !== password1){
			setError('You passwords are not equal.')
			return
		}
		else if(!username || !password || !password1){	
			setError('Fill all of the fields')	
		}
		else{
			axios({
			url:'http://localhost:8000/register/',
			method:'POST',
			data:{
			username:username,
			password:password
			}
			}).then(res=>{
			if(res.data.token){
				regis(res.data.token)
				sessionStorage.setItem('token', res.data.token)
				navigate('/')

			}
				else{
					setError('Username is taken')
				}
			})
		}
	}

	return(
	<div>
	{!sessionStorage.getItem('token')?
	<form className='form' onSubmit={e => handleSubmit(e)}>
		<label htmlFor='username'>Enter your username:</label>
		<input value={username} className='input' name='usersname' onChange={e => setUsername(e.target.value)} />
		
		<label htmlFor='password'>Enter your password:</label>
		<input value={password} name='password' className='input' type='password' onChange={e => setPassword(e.target.value)} />

		<label htmlFor="password1">Confirm your password:</label>
		<input value={password1} name='password1' type='password' className='input' onChange={e => setPassword1(e.target.value)} />
		{error ?

		<PasswordErrorMessage msg={error}/>	:
			null}
		<input type='submit' value='Register' className='submit'/>
	</form>
	:
		<h1>You are logged in!!!</h1>
	}
	</div>

	)

}
