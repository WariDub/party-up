import Axios, {AxiosRequestConfig} from 'axios'



export interface Credential {
    username: string, 
    email: string,
    password: string
}





export const onSignUp = async (data: Credential)=>{


    const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: 'http://localhost:3001/auth/register', 
        data
    }


    try{
        const {data: response } = await Axios.request(requestConfig);
    }
    catch(e){
        console.error(e.response)
        return {error: e.response.data.message}
    }
    
    

}