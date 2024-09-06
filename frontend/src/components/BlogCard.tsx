import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string
}
const BlogCard =({authorName,title,content,publishedDate}:BlogCardProps)=>{
    const authName=authorName[0];
    return(
        <>
        <Link to="/blog">
            <Avatar name={authName} size="small"/>
            <span>{authorName}</span>
            <div>
                {title}
                {content.slice(0,100)+'...'}
                {publishedDate}
                {Math.ceil(content.length)/100}
            </div>
            
            </Link>
        </>
    )
}

export default BlogCard