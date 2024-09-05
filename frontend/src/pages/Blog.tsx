import { data } from "@remix-run/router/dist/utils"
import { useParams } from "react-router-dom"
import BlogCard from "../components/BlogCard"
import {useBlog} from '../hooks/index'
const Blog=()=>{
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    console.log(blog)
    return(
        <>
        
        </>
    )
}
export default Blog