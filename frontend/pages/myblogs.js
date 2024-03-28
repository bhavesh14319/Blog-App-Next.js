import { getMyBlogs } from '@/Actions/Blog'
import MyBlogs from '@/components/MyBlogs'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

const myblogs = ({ blogsData }) => {


  return (
    <div>
      <Head>
        <title>Bloggle | MyBlogs</title>
      </Head>
      <MyBlogs blogs={blogsData} />
    </div>
  )
}

export default myblogs

export async function getServerSideProps(context) {
  let blogsData = null;

  try {
    const { req, res, query } = context;


    if (req.cookies.mytoken) {
      const response = await getMyBlogs(req.cookies.mytoken);

      if (response) {
        blogsData = response.blogs
        console.log(blogsData)
      }
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      }
    }


  } catch (e) {
    console.log(e.message);
  }


  return {
    props: { blogsData }
  }
}

