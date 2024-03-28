import axios from "../Utils/axios"


export const createBlog = async(image,author,title,description)=>{
    try{

        const res = await axios.post("/createblog",{image,author,title,description},{
            headers:{
                "Authorization" :  `Bearer ${localStorage.getItem("token")}`
            }
        }
        
        )

        
        if(res){
            console.log(res.data);
    
            
        }

        return res.data;

    }catch(e){
        console.log(e);
    }
}

export const getAllBlogs = async (token)=>{
    try{

        const res = await axios.get("/getAllBlogs",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

     
        return res.data;

    }catch(e){
        console.log(e);
    }
}

export const getMyBlogs =  async (token)=>{
    try{
        console.log("token-------",token)
        const res = await axios.get("/getMyBlogs",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        if(res){
            console.log(res.data);

        }

        return res.data;
    }catch(e){
        console.log(e);
    }
}

export  const getBlog = async(id,token)=>{
    try{
        console.log("token   ",token);
        
    
        const res = await axios.get(`/blog/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        if(res){
            console.log(res.data);
        }

        return res.data;

    
    }catch(e){
        console.log(e);
    }
}

export const deleteBlog = async(id)=>{
    try{
        const res = await axios.delete(`/blog/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        if(res){
            console.log(res.data);
        }
        return res.data
    }catch(e){
        console.log(e)
    }
}