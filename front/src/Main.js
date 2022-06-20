import {useEffect, useState} from 'react'
import axios from 'axios'

const styles = {
	width:'1000px',
	margin:'50px',
	border:'1px solid black',
	padding:'20px',

}
const imgStyle= {
	width: '500px'
}
export default function Main(){
	const [products, setProducts] = useState([])
	const [token, setToken] = useState(sessionStorage.getItem('token'))
	useEffect(()=>{
	axios({
		url:'http://localhost:8000/products/',
		method:'GET',
		headers:{
			Authorization: `Token ${sessionStorage.getItem('token')}`
		}
	}).then(res => {
		if(res.status===200){
		console.log(res.data)
		setProducts(res.data)
		}
	}).catch(err => console.log(err))	
	},[] )

	return (

		<div style={{margin:'50px',
					display:'flex',
					justifyContent:'center',
					flexDirection:'column'
		}} >
			<h1>Main page</h1>
			{token ?

		<>
				{
					products.map(prod => (
						<div style={styles} key={prod.id}>
							<a href={`products/${prod.id}`}><h1>{prod.title}</h1></a>
							<img style={imgStyle} src={prod.img_url}/>
							<p>{prod.description}</p>

							<h1>Price: {prod.price}</h1>
						</div>
					))
				}
				</>
				:
				<h1>You have to be logged in to visit this page</h1>
			}
		</div>
	)

}
