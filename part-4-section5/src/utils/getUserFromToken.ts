import  Jwt  from "jsonwebtoken"
export const getUserFromToken = (token:string)=>{
    try{
        
        return Jwt.verify(token,"sign") as {
            userId: number
        }
    }catch(e){
        return null
    }

}