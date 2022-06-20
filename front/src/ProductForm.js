import {useState} from 'react'
import axios from 'axios'

export default function ProductForm(){

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [url, setUrl] = useState('')
	const [price, setPrice] = useState(0)
	const [error, setError] = useState('')
	const [created, setCreated] = useState(false)

	const submitHandler = e => {
		e.preventDefault()
		axios({
		url:'http://localhost:8000/products/',
		method:'POST',
		headers : {
		Authorization: `Token ${sessionStorage.getItem('token')}`
		},
			data:{
				title:title,
				description:description,
				img_url:url,
				price:price,

			}
		}).then(res => {
			if (res.status===200){
				setCreated(true)
				setPrice('')
				setTitle('')
				setUrl('')
				setDescription()
			}else{
				setError('something went wrong')

			}
		})
	}

	return(
<>
		{created ? <h1 style={{margin:'50px'}}>Great. Your product was created!</h1> :

	<form className='form' onSubmit={e => submitHandler(e)}>
	
	<label>Title</label>
	<input value={title} className='input' onChange={e=>setTitle(e.target.value)}/>

	<label>Description</label>
	<textarea value={description} className='input' onChange={e=>setDescription(e.target.value)}/>

	<label>Price</label>
	<input value={price} type='number' className='input' onChange={e=> setPrice(e.target.value)}/>

	<label>Url</label>
	<input value={url} type='url' className='input' onChange={e => setUrl(e.target.value)}/>

	<input type='submit' className='submit'/>
	
	</form>
			}
</>
	)
}
