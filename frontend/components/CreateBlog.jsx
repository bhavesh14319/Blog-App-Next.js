import React, { useState ,useContext, useEffect} from 'react'
import Header from './Header'
import styles from "@/styles/createblog/createblog.module.css"
import Image from 'next/image'
import defaultImage from "@/public/default.png"
import { createBlog } from '@/Actions/Blog'
import { userContext } from '@/UserContext'
import Swal from "sweetalert2";

const CreateBlog = () => {
    const [image, setImage] = useState(defaultImage);
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const {loading,setLoading} = useContext(userContext)


    const handleImageChange = (e) => {
        console.log(e.target.files)
        const file = e.target.files[0];
        const Reader = new FileReader();

        Reader.readAsDataURL(file);
        Reader.onload = (e) => {
            if (Reader.readyState === 2) {
                console.log(Reader.result);
                setImage(Reader.result);
            }
        }
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        setLoading(true);
        const res =  await createBlog(image, author,title,description);
        if(res){
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Blog Published Successfully!!",
              }).then(()=>{
                window.location.reload();
              });

            setAuthor("");
            setDescription("");
            setImage(defaultImage);
            setTitle("");

            
        }
    }

    useEffect(()=>{
        console.log(document.getElementById("imageInput"))
    },[])


    return (
        <>
            <Header />
            <div className={styles.createblogcontainer}>

                <div className={styles.createblogformcontainer}>
                    <p className={styles.createblogtitle}>Create Blog</p>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.createblogform}>
                            <div className={styles.formImage}>
                                <Image src={image} alt="blog image" width={100} height={100}/>
                                {/* {image ? <img src={image} alt="blog image" /> : <img src={defaultImage} alt='default image'/>} */}
                            </div>
                            <input id="imageInput" className={styles.fileinput} type="file" src="" alt=""  onChange={handleImageChange} />

                            <div className={styles.inputcontainer}>
                                <label>Author</label>
                                <input className={styles.input} type="text" name="author" required value={author} onChange={(e) => setAuthor(e.target.value)} />
                            </div>

                            <div className={styles.inputcontainer}>
                                <label>Title</label>
                                <input className={styles.input} type="text" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>

                            <div className={styles.inputcontainer}>
                                <label>Description</label>
                                <textarea className={styles.descinput} name="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <div className={styles.buttoncontainer}>
                                <input className={styles.submitbtn} type="submit" value={loading? "Publishing..." : "Publish"} />
                            </div>

                        </div>
                    </form>

                </div>

            </div>

        </>
    )
}

export default CreateBlog
