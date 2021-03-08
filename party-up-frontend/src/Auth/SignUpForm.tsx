import React, { useState } from "react";
import './style.css';
import {onSignUp} from './auth.api';


const  SignUp = () =>{
 
//  handleChange = (event : any) => {}  

const[error, setError] = useState('')

   const handleSubmit = async(event : React.FormEvent) => {
      event.preventDefault();
      
      const response =  await onSignUp({

         username, 
         email,
         password

      })
      if(response&&response.error){
         setError(response.error)
      }

   }


   const [{username, email, password}, setSignUpData] = useState ({

      username : '',
      email: '',
      password : ''
   })




     return (
       <div className='wrapper'>
         <div className='form-wrapper'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} noValidate >
               <div className='Name'>
                  <label htmlFor="Name">Name</label>

                  <input type='text' value = {username} name='Name' onChange=   {(event)=> setSignUpData({
                      username: event.target.value,
                      email,
                      password 

})}         />
               </div>
               <div className='email'>
                  <label htmlFor="email">Email</label>
                  <input type='email' value={email} name='email' onChange={(event)=> setSignUpData({
                      username,
                      email: event.target.value,
                      password 

})} />
               </div>
               <div className='password'>
                  <label htmlFor="password">Password</label>
                  <input type='password' value={password} name='password' onChange={(event)=> setSignUpData({
                      username,
                      email,
                      password: event.target.value

})}/>
               </div>              
          
                  <button className='submit'>Register Me</button>
                  {error.length > 0 && <p className="error">{error}</p>}
              
          </form>
      </div>
   </div>
  );
 }

export default SignUp