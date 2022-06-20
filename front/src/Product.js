
const productStyle={
	border:'1px solid black',
	padding:'20px',
	margin:'20px'
}

export default function Product({title, key}){


	return(
		<div style={productStyle} key={key}>
		<p>{title}</p>
		</div>
	)
}
