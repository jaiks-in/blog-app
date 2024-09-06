import BlogApp from "./BlogApp";
import { blogTypes } from "../hooks";
import Avatar from "./Avatar";
import Skeleton from "./Skeleton";


const FullBlogCard=({blog}:{blog:blogTypes})=>{
    return(
        <>
       {
           blog?  <div>
           <BlogApp size="big" name={blog.author.name}/>
           <div>
           <Avatar size="big" name={blog.author.name} />
           <div>
               {blog.title}
           </div>
           <div>
               {blog.content}
           </div>
           </div>
       </div>:<Skeleton/>
       }
        </>
    )
}

export default FullBlogCard