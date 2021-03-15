import Axios, { AxiosRequestConfig } from 'axios';
import { BACKEND_URL } from '../globals';
import { AuthCredentials } from './interfaces/auth-credentials.dto';

export const onSignUp = async (data: AuthCredentials) => {
  const requestConfig: AxiosRequestConfig = {
    method: 'POST',
    url: `${BACKEND_URL}/auth/register`,
    data,
  };

  try {
    const { data } = await Axios.request(requestConfig);
    console.log(data.accessToken);
  } catch (e) {
    console.error(e.response);
    return { error: e.response.data.message };
  }
};

export interface SUCredential {
    username: string, 
    email: string,
    password: string
}
export interface SICredential {

    username: string, 
    password: string
}


 export class Auth  { 


  
    private static instance:Auth = new Auth();
    private isAuthenticated:boolean = false;

       constructor(){
        if(Auth.instance){
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
        Auth.instance = this;
       }

       public static getInstance():Auth
    {
        return Auth.instance;
    }

        public getAuthenticated(): boolean{
            return this.isAuthenticated
       }
 

         public onSignIn = async(data: SICredential)=>{

        const requestConfig: AxiosRequestConfig = {
    
            method: 'POST',
            url: 'http://localhost:3001/auth/login',
            data
        }
    try {
    
        const {data: response} = await Axios.request(requestConfig)
        this.isAuthenticated = true
        localStorage.setItem('token', response.accessToken);
        return response
       
    
    }
    catch(e){
    
    console.log()
    
    return {error: e.response.data.message}
    
    }
    
    }

    

 onSignUp = async (data: SUCredential)=>{


    const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: 'http://localhost:3001/auth/register', 
        data
    }


    try{
        const {data: response } = await Axios.request(requestConfig);
        this.isAuthenticated = true
        localStorage.setItem('token', response.accessToken);
        return response
    }
    catch(e){
        console.error(e.response)
        return {error: e.response.data.message}
    }
    
    

}







}





