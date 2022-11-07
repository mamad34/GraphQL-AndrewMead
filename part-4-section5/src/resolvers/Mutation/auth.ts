import{Context}from"../../index"
import validator from 'validator'
import bcrypt from 'bcryptjs'
import  Jwt from "jsonwebtoken"  
interface SignupArgs{
    credentials:{
        email:string,
        password:string,

    }
    name:string,
    bio:string,
}

interface SigninArgs{
    credentials:{
        email:string,
        password:string,

    }
}

interface UserPayload{
    userErrors:{
        message:string
    }[];
    token: string|null
}

export const authResolvers = {
    signup:async(_:any,{credentials,name,bio}:SignupArgs,{prisma}:Context):Promise<UserPayload>=>{
        const {email , password } = credentials
        const isEmail = validator.isEmail(email)

        if(!isEmail){
            return{
                userErrors:[{
                    message:"Invalid email"
                }],
                token:null
            }
        }

        const isValidPassword = validator.isLength(password,{min:5})

        if (!isValidPassword) {
            return{
                userErrors:[{
                    message:"Invalid password"
                }],
                token:null
            }
        }
        
        if(!name || !bio){
            return{
                userErrors:[{
                    message:"Invalid name or bio"
                }],
                token:null
            }
        }

        const hashedPassword = await bcrypt.hash(password,8)
        const user = await prisma.user.create({
            data:{
                email,
                name,
                password:hashedPassword,
            }
        })

        await prisma.profile.create({
            data:{
                bio,
                userId:user.id
            }
        })

        const token = await Jwt.sign({
            userId:user.id,
        },"sign" ,{
            expiresIn:85958
        })

        return{
            userErrors:[],
            token
        }

        // return prisma.user.create({data:{
        //     email,name,password
        // }})
    },
    signin:async(_:any,{credentials}:SigninArgs,{prisma}:Context):Promise<UserPayload>=>{
        console.log("fuck" , credentials)
        const {email,password} = credentials
        console.log("fuck2")
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            return{
                userErrors:[
                    {message:"Invalid Credentials"}
                ],
                token:null
            }
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return{
                userErrors:[
                    {message:"Invalid Credentials"}
                ],
                token:null
            }
        }
        return{
            userErrors:[],
            token: Jwt.sign({userId:user.id},"sign",{expiresIn:3232})
        }
    }
}