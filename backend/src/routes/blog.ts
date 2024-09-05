import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { Env } from '../../node_modules/hono/dist/types/types';
import { userRouter } from './user';

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:String,
        JWT_TOKEN:String
    },
    Variables:{
        userId:string
    }

}>();

blogRouter.use("/*",async (c,next)=>{
    const authHeader=c.req.header("authorization")||"";
    const user= await verify(authHeader,c.env.JWT_TOKEN);
    try{
        if(user){
            c.set("userId",user.id);
            await next();
        }else{
            c.status(403);
            return c.json({
                message:"you are not logged in"
            })
        }
    }catch(e){

    }
   
});
blogRouter.post('/',async (c)=>{
    const body=await c.req.json();
   
    const authorId=c.get("userId")
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
 const blog=await prisma.blog.create({
     data:{
         title:body.title,
         content:body.content,
         authorId:Number(authorId)
     }
 })
 console.log(blog)
   
      
   
return c.json({
    id:blog.id
})
})
blogRouter.put("/",async (c)=>{
    const body=await c.req.json(); 
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
  
      const blog = await prisma.blog.update({
          where: {
              id: body.id
          }, 
          data: {
              title: body.title,
              content: body.content
          }
      })
  
      return c.json({
          id: blog.id
      })
})
blogRouter.get('/bulk',async (c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
   const blogs= await prisma.blog.findMany({
       select:{
           id:true,
           content:true,
           title:true,
            author:{
                select:{
                    name:true
                }
            }
       }
   });
   return c.json({
       blogs
   })
})
blogRouter.get("/:id",async (c)=>{
    const id=await c.req.param("id");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    })
    const blog=await prisma.blog.findFirst({
        where:{
            id:Number(id)
        },
            select:{
                title:true,
                content:true,
                author:{
                   select:{
                    name:true
                   }
                }
            }
        }
    )
    return c.json({
       blog
    })
})
