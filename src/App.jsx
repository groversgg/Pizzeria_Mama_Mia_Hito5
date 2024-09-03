import Navbar from "./components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import Footer from "./components/Footer/Footer";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import React, {useState, useEffect} from "react";
import Cart from "./Pages/Cart/Cart";
import Pizza from "./Pages/Pizza/Pizza";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import NotFound from "./Views/NotFound/NotFound";



function App() {
  const [pizzas, setPizzas] = useState([])

  const info = async()=>{
    const result = await fetch("http://localhost:5000/api/pizzas")
    const data = await result.json()
    setPizzas(data)
  } 
  useEffect(()=>{
    info()
  },[])

  
  const [products, setProducts] = useState([])

  const infoProduct = async()=>{
    const resultProduct = await fetch("http://localhost:5000/api/pizzas/p001")
    const dataproduct = await resultProduct.json()
    setProducts(dataproduct)    
  }
  useEffect(()=>{
    infoProduct()
  },[])

  const [email, setEmail] = useState ("")
  const [password1, setPassword1] = useState ("")
  const [password2, setPassword2] = useState("")
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home pizzas={pizzas}/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Cart" element={<Cart pizzas = {pizzas}/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Total" element={<Cart pizzas = {pizzas}/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {/*<Pizza 
        name={products.name}
        price={products.price}
        ingredients={products.ingredients}
        img={products.img}
        desc={products.desc}
      />*/}
      <Footer/>
    </>      

  )
}

export default App
