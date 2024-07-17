"use client";
import React from 'react'
import { Suspense } from 'react';
import Loading from '../components/loader';
type Blog = {
    id: number,
    title: string,
    body: string
}


const Blog = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const blogs = await response.json();
    const displayedBlogs = blogs.slice(0, 5);


    return (
        <main className='container py-4'>
            <h1>Blog</h1>
            <Suspense fallback={<Loading />}>
                {displayedBlogs.map((blog: Blog) => (
                    <div className='card' key={blog.id}>
                        <div className='card-header'>
                            <h5 className='card-title'>{blog.title}</h5>
                        </div>
                        <div className='card-body'>
                            {blog.body}
                        </div>

                    </div>
                ))}
            </Suspense>
        </main>
    )
}

export default Blog