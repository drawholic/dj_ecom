import './App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'




export default function UserForm(){

	const [userName, setUserName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	
	const [updated, setUpdated] = useState(false)
	
	useEffect(()=>{
		axios({
		url:'http://localhost:8000/profile',
		method:'GET',
		headers:{
		'Authorization':`Token ${sessionStorage.getItem('token')}`
		},
		
		}).then(res => {
		if (res.status===200){
			setUserName(res.data.username)	
			setFirstName(res.data.firstname)
			setLastName(res.data.lastname)
			setEmail(res.data.email)
		}
		}).catch(err => {
			console.log(err)
		})
	},[] )
	const SubmitHandler = e => {
		e.preventDefault()
		axios({
		url:'http://localhost:8000/profile/',
		method:'PUT',
		headers: {
		'Authorization':`Token ${sessionStorage.getItem('token')}`
		},
		data:{
			username:userName,
			first_name:firstName,
			last_name:lastName,
			email:email
		}
		}).then(res => {
		if(res.status===200){
			setUpdated(true)
		}
		})
	}
	return(
	<div>
		{!updated?
			null
			:
		'Good job, profile is updated'
	}
	<form className='form' onSubmit={e=>SubmitHandler(e)}>
		<label htmlFor='firstName'>First name:</label>
		<input name='firstName' className='input' value={firstName} onChange={e=>setFirstName(e.target.value)}/>

		<label htmlFor='lastName'>Last Name:</label>
		<input name='lastName'className='input' value={lastName} onChange={e=>setLastName(e.target.value)}/>

		<label htmlFor='username'>Username:</label>
		<input className='input' name='userName' value={userName} onChange={e=>setUserName(e.target.value)}/>
		
		<label htmlFor='email'>Email:</label>
		<input className='input' name='email' value={email} onChange={e=>setEmail(e.target.value)}/>

		<input value='Update' type='submit' className='submit'/>

	</form>

	</div>
	)
}
