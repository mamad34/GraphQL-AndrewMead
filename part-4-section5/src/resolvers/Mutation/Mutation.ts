import{Context}from"../../index"
import{Post}from".prisma/client"
import{Prisma}from"@prisma/client"
import { postResolvers } from "./post"
import { authResolvers } from "./auth"

// interface PostCreateArgs{
//    post:{
//     title?:string
//     content?:string
//    }
    
// }

// interface PostPayloadType{
//     userErrors:{
//         message:string
//     }[],
//     post: Post | null | Prisma.Prisma__PostClient<Post, never>
//     // array of objects
// }

export const Mutation = {
    ...postResolvers,
    ...authResolvers,
}