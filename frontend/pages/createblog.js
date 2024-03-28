import CreateBlog from '@/components/CreateBlog'
import Head from 'next/head'
import React from 'react'

const createblog = () => {
  return (
    <div>
      <Head>
        <title>
          Bloggle | Create-Blog
        </title>
      </Head>
      <CreateBlog />
    </div>
  )
}

export default createblog
