import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import styles from "@/styles/home/home.module.css"
import BlogCard from './BlogCard'
import { userContext } from "@/UserContext";
import { getAllBlogs } from '@/Actions/Blog';

const Home = ({ blogs }) => {
    const { user, setUser, setLoading, setToken } = useContext(userContext);

    const [searchquery, setSearchQuery] = useState('');
    const [blogsData, setBlogsData] = useState(blogs);

    // const [blogs, setBlogs] = useState(null);

    // const getBlogsData = async () => {
    //     const res = await getAllBlogs();

    //     if (res) {
    //         setBlogs(res.blogs);

    //     }

    // }

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

    }, [searchquery,blogs])
    return (
        <>
            <Header />
            <div className={styles.homecont}>




                <div className={styles.searchCont}>
                    <div className={styles.titlebox}><p className={styles.titletext}>All Blogs</p></div>
                    <div className={styles.searchcontainer}>
                        <input className={styles.searchbox} type="text" placeholder='search blogs' value={searchquery} onChange={(e) => setSearchQuery(e.target.value)} />

                    </div>


                </div>
                <div className={styles.blogscontainer}>
                    {console.log(blogs)}
                    {blogsData &&

                        blogsData?.map((blog) => {
                            return <BlogCard key={blog._id} author={blog.author} title={blog.title} imageUrl={blog.image.url} description={blog.description} blogId={blog._id} isOwner={false}/>
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default Home
