import{Context}from"../../index"
import{Post}from".prisma/client"
import{Prisma}from"@prisma/client"

interface PostCreateArgs{
    post:{
     title?:string
     content?:string
    }
     
 }
 
 interface PostPayloadType{
     userErrors:{
         message:string
     }[],
     post: Post | null | Prisma.Prisma__PostClient<Post, never>
     // array of objects
 }
export const postResolvers ={
    postCreate:async(parent:any, {post}:PostCreateArgs,{prisma ,userInfo}:Context):Promise<PostPayloadType>=>{
        
        if(!userInfo){
            return {
                userErrors:[{
                    message:"not authenticated"
                }],
                post:null
            }
        }

        const {title,content} =post
        if(!title || !content){
            return{
                userErrors:[{
                    message:"You must provide title or content"
                }],
                post:null
            }
        }

        return{
            userErrors:[],
            post :prisma.post.create({
                data:{
                    title,
                    content,
                    authorId:userInfo.userId
                }
            })
        }
    },
    postUpdate:async(_:any,{post ,postId}:{postId:string,post:PostCreateArgs["post"]},{prisma}:Context)
    :Promise<PostPayloadType>=>{
        const {title,content}= post
        if(!title && !content){
            return{
                userErrors:[
                    {
                        message:"Need To have at least one field to update"
                    }
                ],
                post:null
            }
        }
        const existintPost = await prisma.post.findUnique({
            where:{
                id:Number(postId)
            }
        })
        if(!existintPost){
            return{
                userErrors:[
                    {
                        message:"Post is not exist"
                    }
                ],
                post:null
            }
        }
        let payLoadToUpdate = {
            title,
            content
        }
        if(!title) delete payLoadToUpdate.title
        if(!content) delete payLoadToUpdate.content
        return{
            userErrors:[],
            post:prisma.post.update({
                data:{
                    ...payLoadToUpdate
                },
                where:{
                    id:Number(postId)
                }
            })
        }
    },
    postDelete:async(_:any, {postId}:{postId:string},{prisma}:Context):Promise<PostPayloadType>=>{
            const post = await prisma.post.findUnique({
                where:{
                    id:Number(postId)
                }
            })
            if(!post){
                return{
                    userErrors:[
                        {
                            message:"Post is not exist"
                        }
                    ],
                    post:null
                }
            }
            await prisma.post.delete({
                where:{
                    id:Number(postId)
                }
            })
            return{
                userErrors:[],
                post
            }
    },
}