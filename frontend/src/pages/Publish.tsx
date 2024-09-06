import axios from "axios"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config"
import BlogApp from "../components/BlogApp";
interface dataType{
    title:string,
    content:string
}

function Publish(){
    const navigate =useNavigate()
    const titleRef=useRef <HTMLInputElement>(null);
    const contentRef =useRef<HTMLInputElement> (null);
       
        

    async function sendRequest(e){
        e.preventDefault()
        const title=titleRef?.current.value;
        const content=contentRef?.current.value;
        
        try{
           
                const response=  await axios.post(`${BACKEND_URL}/api/v1/blog/create`,{
                    title,content
                },{
                headers:{
                    Authorization:localStorage.getItem('jwt')
                }
            })
            navigate('/blogs')

            console.log(response)
            
        }catch(e){

        }
    }
    
    return(
        <>
       
        <label>
            title
        </label>
        <input ref={titleRef} className="b-2" type="text" required/>
        <label>
            content
        </label>
        <input ref={contentRef} type="text" required/>
        <div>
            <button onClick={ sendRequest}>publish</button>
        </div>
        </>
    )
}

export default Publish