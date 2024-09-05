import Avatar from "../components/Avatar"
import BlogApp from "../components/BlogApp"
import BlogCard from "../components/BlogCard"
import {useBlogs} from "../hooks"
const Blogs=()=>{
        
        const {blogs,loading}=useBlogs();
        console.log(blogs)
    if(loading){
        return <>
        Loading...
        </>
    }
    return(
        <>
        <BlogApp name={"sas"} size="big" />
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