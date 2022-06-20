import axios from 'axios'
import {useState, useEffect} from 'react'
import ProductForm from './ProductForm.js'
import './App.css'


export default function AddProduct(){

	return(

	<>
	<h1>Add a new product here</h1>
		<ProductForm/>
	</>
	)
}
