import { Hono } from 'hono';

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { Prisma } from '../node_modules/.prisma/client/index';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import {cors} from 'hono/cors'
const app = new Hono<{
  Bindings:{
    DATABASE_URL:String,
    JWT_TOKEN:String
  }
}>()
app.use('/*',cors());
    app.route('/api/v1/user',userRouter);
    app.route('/api/v1/blog',blogRouter)
// app.post('/api/v1/signup', async (c) => {
//   const prisma =new PrismaClient({
//     datasourceUrl:c.env.DATABASE_URL
//   }).$extends(withAccelerate());
// 	const body =await c.req.json();
//   console.log(body)
//   prisma.user.create({
//           data:{
//             username:body.username,
//             password:body.password,
//             name:body.name
//           }
//         })
//    return c.text("sign up")
// })
// app.post('/api/v1/user/signup',async (c)=>{
//   const body = await c.req.json();
//   const prisma =new PrismaClient({
//     datasourceUrl:c.env.DATABASE_URL,
//   }).$extends(withAccelerate())
//   try{
//     console.log(body)
//     const user=await prisma.user.create({
//       data:{
//         username:body.username,
//         password:body.password,
//         name:body.name
//       }
//     })
//     const jwt=await sign(
//       {
//         id:user.id
//       },c.env.JWT_TOKEN
//     )
//     console.log(jwt)
//     return c.text(jwt);
//   }catch(e){
//     c.status(411);
//     console.log(e);
//     return c.text("Invalid Details");
//   }
// })
// app.post('/api/v1/user/login',async (c)=>{
//   const body =c.req.json();
//   const prisma=new PrismaClient({
//     datasourceUrl:c.env.DATABASE_URL
//   }).$extends(withAccelerate());
//   try{
//     const user= await prisma.user.findFirst({
//       where:{
//         username:body.username,
//         password:body.password
//       }
//     })
//     if(!user){
//       c.status(403);

//     }
//   }catch(e){
    

//   }
//   return c.text("login successfully")
// });

export default app