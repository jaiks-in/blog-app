import BlogApp from "../components/BlogApp";
import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";
import { useBlogs, BlogTypes } from "../hooks";

const Blogs = () => {
  const { blogs, loading } = useBlogs();
  console.log(blogs);

  if (loading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <>
      <BlogApp />
      {blogs.map((data: BlogTypes) => (
        <div key={data.id}> {/* Use the `key` prop */}
          <BlogCard
            title={data.title}
            authorName={data.author.name || ""}
            content={data.content}
            publishedDate="2nd Feb" // Modify to the actual published date if available
            id={Number(data.id)} // Ensure the `id` is correctly passed
          />
        </div>
      ))}
    </>
  );
};

export default Blogs;
