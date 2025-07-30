
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function Login() {

  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispach = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem("token")){
      validateToken();
    }
  })

  let validateToken = async()=>{
    let dataToSend = new FormData();
    dataToSend.append("token",localStorage.getItem("token"))
    
    let reqOptions = {
      method:"POST",
      body:dataToSend
    };

    let JSONData = await fetch ("/validateToken",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
    if(JSOData.status === "Success"){
      dispach({type:"login",data:JSOData.data})
      navigate("/dashboard");
    }
  }

  let onLogin = async()=>{
    let dataToSend = new FormData();
    dataToSend.append("email",emailInputRef.current.value)
    dataToSend.append("password",passwordInputRef.current.value)
    
    let reqOptions = {
      method:"POST",
      body:dataToSend
    };

    let JSONData = await fetch ("/login",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
    if(JSOData.status === "Success"){
      localStorage.setItem("token",JSOData.data.token)
      dispach({type:"login",data:JSOData.data})
      navigate("/dashboard");
    }
  }
  return (
    <div className="App">
      <form>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input type='email' ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
          <button type='button' onClick={()=>{onLogin()}}>Login</button>
          
        
      </form>
      <br></br>
      <br></br>
      <span>If you don't have an account ?<Link to='signup'>Signup</Link></span>
      <p>srinivas@gmail.com  srinivas</p>
    </div>
  );
}

export default Login;
