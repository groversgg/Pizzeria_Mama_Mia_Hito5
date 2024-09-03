import React from 'react'
import { useState } from 'react';
import { formatNumber } from '../../assets/js/utils';
import './cart.css'

const Cart = ({pizzas}) => {
    
    const [carrito, setCarrito] = useState([])
    let total = carrito.reduce((acumulador, producto)=> acumulador +=producto.count ,0)
    let totalPagar = carrito.reduce((acumulador,producto)=> acumulador += (producto.price * producto.count),0)
    
    
    const agregar =(producto)=>{
        let coincidencia = carrito.findIndex(item => item.id === producto.id)
        let nuevo_producto = {id:producto.id, name:producto.name, img:producto.img, count:1, price:producto.price}
        if (coincidencia >=0){
            carrito[coincidencia].count++
            setCarrito([...carrito])
        }else{
            setCarrito([...carrito, nuevo_producto])
        }
    }

    const disminuir =(producto)=>{
        let coincidencia = carrito.findIndex(item => item.id === producto.id)
        if (coincidencia>=0){
            if (carrito[coincidencia].count>1){
                carrito[coincidencia].count--
                setCarrito([...carrito])
            }else{
                setCarrito(carrito.filter(item=> item.id !== producto.id))
            }
        }
    }
    const obtenerCantidad = (id) => {
        const productoEnCarrito = carrito.find(item => item.id === id);
        return productoEnCarrito ? productoEnCarrito.count : 0;
    }

  return (
    <div>
        <h2>Detalles del Pedido</h2>       
        <h3>Cantidad de Productos {total}</h3>
        <div className='d-flex align-items-center'>
            <h3>Total a Pagar $ {formatNumber(totalPagar)}</h3>
            <button className='btn btn-success m-2'>Pagar</button>
        </div>
        
        <div className='p3'>
            {pizzas.map((producto)=>

                <div className='d-flex align-items-center' key={producto.id}>
                    <div className='titulo'>
                        <img src={producto.img} alt="" className=''/>
                    </div>
                    <div className='descripcion'>
                        <p><strong>{producto.name}</strong></p>
                        <p>Precio: <strong>${formatNumber(producto.price)}</strong></p>
                        <p>Cantidad:{obtenerCantidad(producto.id)}</p>
                    </div>
                        
                    <div className='botones'>
                        <button className='btn btn-success m-2'onClick={()=>agregar(producto)}>+</button>
                        <button className='btn btn-danger m-2'onClick={()=>disminuir(producto)}>-</button>
                    </div>
                </div>
            )}
        </div>
    </div>

 )
}

export default Cart
