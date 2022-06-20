import axios from "axios";
import {useEffect, useState} from "react";

const orderStyle = {
    border: '1px solid black',
    paddingLeft:'100px',
    paddingRight:'100px',

}
const cart = {
    display:'flex',
    flexDirection:'column'
}



export default function Cart(){
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        axios({
            url:'http://localhost:8000/cart',
            method:'GET',
            headers:{
                Authorization:`Token ${sessionStorage.getItem('token')}`
            }
        }).then(res=> {
            if (res.status===200){
                setOrders(res.data)
            }
        }).catch(err => console.log(err))
    }, [])

    return(<div className='cart'>
        { orders.length
                ?
                <>
                    {
                        orders.map( order => (
                         <div style={orderStyle}>
                            <h1>{order.title}</h1>
                             <h1>Price: {order.price}</h1>
                             <p>{order.description}</p>
                        </div>
                    ))
                    }
                </>
                :
            <h1>Cart is empty</h1>
        }
        </div>
    )
}