import React, { useEffect, useState } from 'react'
import Header from './Header'
import styles from "@/styles/home/home.module.css"
import { getMyBlogs } from '@/Actions/Blog';
import BlogCard from './BlogCard';
import { MdDelete } from "react-icons/md";

const MyBlogs = ({blogs}) => {


    const [searchquery, setSearchQuery] = useState('');
    const [blogsData, setBlogsData] = useState(blogs);

    const filterOnSearch = (blog) => {
        
        if (
            blog.title.toLowerCase().includes(searchquery.toLowerCase()) ||
            blog.author.toLowerCase().includes(searchquery.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchquery.toLowerCase())) {
            return true;
        }

        return false
    }

    useEffect(() => {

        if(searchquery===''){
            setBlogsData(blogs)
        }else{
            let newblogs  = blogs.filter(filterOnSearch);
            setBlogsData(newblogs)
        }

    }, [searchquery,blogs,filterOnSearch])

    return (
        <div>
            <Header />

            <div className={styles.homecont}>
                <div className={styles.searchCont}>
                    <div className={styles.titlebox}><p className={styles.titletext}>My Blogs</p></div>
                    <div className={styles.searchcontainer}>
                        <input className={styles.searchbox} type="text" placeholder='search blogs' value={searchquery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                </div>

                <div className={styles.blogscontainer}>

                    {/* <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard /> */}
                    
                    {blogsData &&

                        blogsData?.map((blog) => {
                            return <BlogCard key={blog._id} author={blog.author} title={blog.title} imageUrl={blog.image.url} description={blog.description} blogId={blog._id} isOwner={true}/>
                        })
                    }
                </div>

            </div>



        </div>
    )
}

export default MyBlogs
