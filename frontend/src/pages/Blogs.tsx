import Avatar from "../components/Avatar"
import BlogApp from "../components/BlogApp"
import BlogCard from "../components/BlogCard"
import Skeleton from "../components/Skeleton"
import {useBlogs} from "../hooks"
const Blogs=()=>{
        
        const {blogs,loading}=useBlogs();
        console.log(blogs)
    if(loading){
        return <>
       <Skeleton/>
        </>
    }
    return(
        <>
        <BlogApp  />
        {
            blogs.map(data=>
                <div>
                
            <BlogCard title={data.title} 
            authorName={data.author.name || ""}
            content={data.content}
            publishedDate="2nd feb"
            />
            </div>
            )
        }
      
        </>
    )
}
export default Blogs