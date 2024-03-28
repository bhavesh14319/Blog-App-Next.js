import { getBlog } from '@/Actions/Blog'
import React, { useEffect, useState } from 'react'
import Header from './Header';
import styles from "@/styles/bloginfo/bloginfo.module.css"


const BlogInfo = ({blog}) => {

    // const[blog,setBlog] = useState(null);


    useEffect(()=>{
        console.log(blog);
    },[blog])
 
  return (
    <div>
       <Header/>

        <div className={styles.infoCont}>
            <div className={styles.infoContLeft}>
                <img src={`${blog?.image.url}`} alt="" />
            </div>
            <div className={styles.infoContRight}>
                <div>
                <h2 className={styles.title}>{blog?.title}</h2>

                <p className={styles.description}>{blog?.description}</p>


                <p className={styles.date}>Created On <br/>{new Date(blog?.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                <h2 className={styles.detailsTitle}>Publisher Details</h2>
                <div className={styles.ownerDetailsCont}>
                        
                    <div className={styles.ownerDetailsContLeft}>
                        <div className={styles.avatarWrapper}>
                             <img src={blog?.owner.avatar.url} alt="" />
                        </div>
                    </div>
                    <div className={styles.ownerDetailsContRight}>
                            <p>Name: {blog?.owner.name}</p>
                            <p>email: {blog?.owner.email}</p>
                            <p>Blog Count: {blog?.owner.blogs.length}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default BlogInfo
