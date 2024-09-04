import { ChangeEvent, useState } from "react"
import { SignupInput } from "@jaiksinn/common-zod"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import {BACKEND_URL} from '../../config'

const Auth=({type}:{type:"signup" | "signin"})=>{
    const navigate=useNavigate();
    const [postInput,setPostInput]=useState<SignupInput>({
        "username":"",
        "password":"",
        "name":""
    })
    async function sendRequest(){
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type=='signup'?'signup':'signin'}`,postInput)
            console.log(response)
            const jwt=response.data;
            localStorage.setItem('jwt',jwt);
            navigate('/blog')
        }catch(e){
            console.log(e);
        }
    }
return(
    <>

        <div>
           {type=="signup"?"Already Have Account":"Create an Account"}
           < >
           <Link to="/signin">{type=="signin"?"signup":"signin"}</Link>
           </>
        </div>
        <LabelledInput type="text" label="Name" placeholder="jai..." onChange={(c)=>{
                setPostInput({
                    ...postInput,
                    name:c.target.value
                })
        }}/>
        <LabelledInput type={"password"} label="password" placeholder="12345" onChange={(c)=>{
                setPostInput({
                    ...postInput,
                    password:c.target.value
                })
        }}/>
        <LabelledInput  type="text" label="username" placeholder="username" onChange={(c)=>{
                setPostInput({
                    ...postInput,
                    username:c.target.value
                })
        }}/>
        <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
         rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 
         dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">button</button>
    </>
)
}
export default Auth
interface LabelledInputType{
    label:string,
    placeholder:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    type:string
}
export function LabelledInput({label,placeholder,onChange,type }:LabelledInputType){
    return (
    <>
     <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{label}</label>
            <input type={type||"text"} onChange={onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
            w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
        
</>
)
     
  
}