import './App.css';
import {Route, BrowserRouter as Router, Routes, Link} from 'react-router-dom'
import Login from './Login.js'
import Main from './Main.js'
import Register from './Register.js'
import Logout from './Logout.js'
import {useState, useEffect} from 'react'
import Profile from './Profile.js'
import ProductDetail from './ProductDetail.js'
import AddProduct from './AddProduct.js'
import Cart from './Cart.js'

const styles = {
	display:'flex',
	justifyContent:'center',
	alignItems:'center'
}
function App() {
	
	const [token, setToken] = useState('')


	useEffect(()=>{
		setToken(sessionStorage.getItem('token'))
	}, [sessionStorage.getItem('token')])
	
	return(
		<Router>
		<nav>
		<ul>
			<li>
				<Link to='/'>Home</Link>
			</li>
	
		
			{!token?
			<>
			<li>
				<Link to='/login'>Login</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			</>
				:
			<li>
				<Link to='/logout'>Log out</Link>
			</li>
			}
		</ul>
		<ul>
		<li>
		<Link to='/profile'>Profile</Link>
		</li>
		</ul>
		</nav>
		<hr/>
			<div style={styles}>
		<Routes>

			<Route path='/' element={<Main/>}></Route>

		<Route path='/login' element={<Login login={(tok)=>setToken(tok)}/>} />

		<Route path='/register' element={<Register regis={(tok)=>setToken(tok)}/>} />

		<Route path='/logout' element={<Logout logout={()=>setToken('')} /> } />

		<Route path='/profile' element={<Profile/>}/>

		<Route path='/products/:pk' element={<ProductDetail/>}/>

		<Route path='products/add-product' element={<AddProduct/>} />

		<Route path='cart/' element={<Cart/>} />
		</Routes>
						</div>

		</Router>
	)
}

export default App;
