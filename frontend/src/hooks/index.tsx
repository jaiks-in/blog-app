import axios from 'axios'
import {useState,useEffect} from 'react'
import {BACKEND_URL} from '../../config'
import {useParams} from 'react-router-dom'
interface blogTypes{
    id:number|string,
    title:string,
    content:string,
    author:{
        name:string
    }
}
export const useBlog=({id}:{id:number|"string"})=>{
    const [blog,setBlog]=useState<blogTypes>();
    const [loading,setLoading]=useState(true);
 console.log(id);
    useEffect( ()=>{
         axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        }).then(responce=>{
            setBlog(responce.data.blog);
        setLoading(false);
        },[])
      
        
    },[id])
    return(
      {blog,loading}
    )
}
export const useBlogs =()=>{
    
    const [blogs,setBlogs]=useState<blogTypes[]>([]);
    const [loading,setLoading]=useState(true);
    useEffect( ()=>{
         axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        }).then(responce=>{
            setBlogs(responce.data.blogs);
        setLoading(false);
        },[])
      
        
    },[])

    return{
        blogs,loading
    }
}
