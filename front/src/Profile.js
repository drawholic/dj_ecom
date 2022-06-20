import axios from 'axios'
import {useEffect, useState} from 'react'
import UserForm from './UserForm.js'
import './App.css'
import Product from './Product.js'

const imgStyles ={
	width:'300px',
	height:'300px',
	border:'1px solid black',
	margin:'150px'
}
const linkStyle = {
	margin:'50px'
}

const wrapper = {
	margin:'100px'
}
export default function Profile(){

	const [isLogged, setIsLogged] = useState('')
	const [userName, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [lastName, setLastName] = useState('')
	const [firstName, setFirstName] = useState('')	
	const [products, setProducts] = useState([])
	useEffect(()=>{
	axios({
		url:'http://localhost:8000/profile/',
		method:'GET',
		data:{
		token:sessionStorage.getItem('token')
		},
		headers:{
		'Authorization':`Token ${sessionStorage.getItem('token')}`
		}
	}).then(res => {
		if(res.status===200){
		setIsLogged(true)
		setProducts(res.data.products)
		setUsername(res.data.username)
		setEmail(res.data.email)
		setFirstName(res.data.firstname)
		setLastName(res.data.lastname)
		
		}

	})	
	}, [])
	return(
		<div style={wrapper}>
			<div className='profile-header'>
	<div style={imgStyles}>
		img place
	</div>
	<UserForm />
	</div>
		<div>
	<a style={linkStyle} href='/products/add-product'>Add a product</a>
	<a style={linkStyle} href='cart/'>Cart</a>

	<div>
	<h1>My products</h1>
		{products.map((prod)=>(
		<Product key={prod.id} title={prod.title}/>
		))}
	</div>
	</div>
		</div>

	)
}
