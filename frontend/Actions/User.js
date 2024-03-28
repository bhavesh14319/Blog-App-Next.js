
import axios from "../Utils/axios"



export const registerUser = async(name,email,password,image)=>{
    try{

        const res = await axios.post("/register",{name,email,password,image},{
            withCredentials:true
        })

        if(res){
            localStorage.setItem("token",res.data.token)
            
        }

        return res.data;

    }catch(e){
        console.log(e);
    }
}

export const loginUser = async(email,password)=>{
    try{

        const res = await axios.post("/login",{email,password},{
            withCredentials:true
        })
        if(res){
            console.log(res.cookie)
            localStorage.setItem("token",res.data.token)
        }
        

        

        return res.data;

    }catch(e){
        console.log(e);
    }
}

export const logoutUser = async (t)=>{
    try{
        const res = await axios.get("/logout",{
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials:true
        })


        localStorage.removeItem("token");

        return res.data;
    }catch(e){
        console.log(e);
    }
}