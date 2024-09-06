import { useParams } from "react-router-dom"
import FullBlogCard from "../components/FullBlogCard"
import Skeleton from "../components/Skeleton"
import {useBlog} from '../hooks/index'
const Blog=()=>{
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    if(loading){
        return<>
       <Skeleton/> 
        </>
    }
    return(
        <>
        {blog?<FullBlogCard blog={blog}/>:<Skeleton/>}
        
        </>
    )
}
export default Blog