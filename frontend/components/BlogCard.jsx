import React, { useState } from 'react'
import styles from "@/styles/blogcard/blogcard.module.css"
import image from "@/public/image.jpg"
import Image from "next/image"
import Link from 'next/link'
import { MdDelete } from "react-icons/md";
import { deleteBlog } from '@/Actions/Blog'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'


const BlogCard = ({title,author,imageUrl,description,blogId,isOwner}) => {
    const router = useRouter();





    const deleteBlogReq = async(id)=>{
        let res = null;

        Swal.fire({
            title: "Do you want to delete this blog?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText:  `No`
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
               res = await deleteBlog(id);
               if(res){
                Swal.fire("Blog Deleted!", "", "success").then(()=>{
                    window.location.reload();
                });
                
              }
            }
        })
    }

    // const getShortDescription = (description)=>{
    //     setReadMore(true);
    //     return description.substring(0,397);
    // }

    const ReadMore = ({ children }) => {
        const [text,setText] = useState(children[1]);
        const [shortText,setShortText] = useState(children[1].slice(0,400));
        const [isReadMore, setIsReadMore] = useState(false);

        const toggleReadMore = () => {
            // console.log(shortText);
            // console.log(text);

            console.log(children)
            setIsReadMore(!isReadMore);
        };

    

        return (
            <p className={styles.blogDescription}>
                {isReadMore ? text : shortText}
                <span
                    onClick={toggleReadMore}
                    className="read-or-hide"
                    style={{ color: "green" ,cursor:"pointer"}}
                >
                    {isReadMore ?  " show less" : "...read more" }
                </span>
            </p>
        );
    };


    return (
        <>
        
        <div className={styles.blogcard}>
           {isOwner && <div className={styles.deleteIcon} onClick={()=>deleteBlogReq(blogId)}>
                <MdDelete/>
            </div>
            }
            <Link href={`/blog/${blogId}`}>
            <div className={styles.blogImage}>
                {/* <Image src={`${imageUrl}`} alt=""  width={200} height={200} quality={100} /> */}
                <img src={`${imageUrl}`} alt="Blog Image"/>
            </div>
            <div className={styles.blogTitle}>
                {title}
            </div>
            </Link>
            <div className={styles.blogDescriptionBox}> 
                <ReadMore> {description} </ReadMore>
                <p className={styles.authorText}>
                    {`~${author}`}
                </p>
            </div>
           

        </div>
       
        </>
    )
}

export default BlogCard
