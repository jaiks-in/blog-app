import { data } from "@remix-run/router/dist/utils"
import { useParams } from "react-router-dom"
import BlogCard from "../components/BlogCard"
import FullBlogCard from "../components/FullBlogCard"
import Skeleton from "../components/Skeleton"
import {useBlog} from '../hooks/index'
const Blog=()=>{
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    return(
        <>
        {blog?<FullBlogCard blog={blog}/>:<Skeleton/>}
        
        </>
    )
}
export default Blog