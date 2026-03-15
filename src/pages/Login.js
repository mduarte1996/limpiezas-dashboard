import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e)=>{
e.preventDefault();

const data = await loginUser({username,password});

if(data.token){
localStorage.setItem("token",data.token);
navigate("/");
}else{
alert("Credenciales incorrectas");
}

};

return(

<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>

<form onSubmit={handleLogin} style={{background:"white",padding:"40px",borderRadius:"10px"}}>

<h2>Login</h2>

<input
placeholder="Usuario"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Contraseña"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button type="submit">
Entrar
</button>

</form>

</div>

);

}

export default Login;