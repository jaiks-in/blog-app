import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {signupInput} from '@jaiksinn/common-zod'


export const userRouter=new Hono<{
    Bindings:{
            DATABASE_URL:String,
            JWT_TOKEN:String
    }
}>()


userRouter.post('/signup',async (c)=>{
    const body = await c.req.json();
    const {success}=signupInput.safeParse(body)
    if(!success){
      c.status(411);
      console.log("wrong input")
    }
    const prisma =new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      console.log(body)
      const user=await prisma.user.create({
        data:{
          username:body.username,
          password:body.password,
          name:body.name
        }
      })
      const jwt=await sign(
        {
          id:user.id
        },c.env.JWT_TOKEN
      )
      console.log(jwt)
      return c.text(jwt);
    }catch(e){
      c.status(411);
      console.log(e);
      return c.text("Invalid Details");
    }
  })
  userRouter.post('/login',async (c)=>{
    const body =c.req.json();
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
      const user= await prisma.user.findFirst({
        where:{
          username:body.username,
          password:body.password
        }
      })
      const jwt=await sign(
        {
          id:user.id
        },c.env.JWT_TOKEN
      )
      console.log(jwt)
      if(!user){
        c.status(403);
  
      }
    }catch(e){
      
  
    }
    return c.text("login successfully")
  })

