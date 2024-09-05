import Avatar from './Avatar'


function BlogApp({name ,size}){
return <>
<div className='flex justify-between'>
<div>
    medium
</div>
<div >
    <Avatar name={name} size={size}/>
</div>
</div>
</>
}
export default BlogApp;