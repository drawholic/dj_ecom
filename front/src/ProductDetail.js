import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const productStyle = {
	width:'90%',
	padding:'20px',
	margin:'50px'
}

export default function ProductDetail(){

	const {pk} = useParams()
	const [product, setProduct] = useState([])
	const [added, setAdded ] = useState(false)

	useEffect(()=>{
		axios({
		url:`http://localhost:8000/products/${pk}`,
		method:'GET'
		}).then(res => {
			
		if(res.status===200){
			setProduct(res.data)
		}
		})

	}, [])

	const submitHandler = e => {
	e.preventDefault()
	axios({
		url:'http://localhost:8000/cart/',
		method:'POST',
		headers:{
			Authorization:`Token ${sessionStorage.getItem('token')}`
		},
		data:{
			id:pk
		}
	}).then(res => {
		if (res.status===200){
			setAdded(true)
		}
	}).catch(err => console.log(err))
	}

	return(
		<>
		{
			added ?
				<h1>product added to your cart</h1>
				:
				<div style={productStyle}>
			<h1>{product.title}</h1>
			<img src={product.img_url}/>
			<p>{product.description}</p>
			<p>{product.price} UAH</p>
			<form onSubmit={e => submitHandler(e)}>
			<input className='submit' type='submit' value='add to the cart'/>
			</form>
		</div>
		}
		</>



	)

}
