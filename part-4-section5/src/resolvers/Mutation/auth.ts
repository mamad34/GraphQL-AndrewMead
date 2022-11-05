import{Context}from"../../index"

interface SignupArgs{
    email:string,
    name:string,
    bio:string,
    password:string,
}

export const authResolvers = {
    signup:(_:any,{email,name,bio,password}:SignupArgs,{prisma}:Context)=>{
        return prisma.user.create({data:{
            email,name,password
        }})
    }
}