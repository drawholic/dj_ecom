import {useEffect} from 'react'



export default function Logout({logout}){

	useEffect(()=>{
		sessionStorage.clear()
		logout()
	}, [])

	return(
	<div>
	
		<h1>Okay, you are logged out now. Bye!</h1>
		Go and <a href='/login'>Log in</a>
		</div>
	)
}
