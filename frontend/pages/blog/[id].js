import BlogInfo from '@/components/BlogInfo'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getBlog } from '@/Actions/Blog'
import Head from 'next/head'

const BlogDetails = ({ blogData }) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div>
            <Head>
                <title>
                    Bloggle | {blogData.title}
                </title>
            </Head>
           {isClient && <BlogInfo blog={blogData} suppressHydrationWarning />}
        </div>
    )
}

export default BlogDetails


export async function getServerSideProps(context) {
    let blogData = null;

    try {
        const { req, res, query } = context;
        const { id } = query
        // console.log(token)

        const response = await getBlog(id, req.cookies.mytoken);

        if (response) {
            blogData = response.blog[0]
            console.log(blogData)
        }
    } catch (e) {
        console.log(e.message);
    }


    return {
        props: { blogData }
    }
}