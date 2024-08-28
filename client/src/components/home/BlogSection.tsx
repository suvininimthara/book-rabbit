import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlogSection.css';

const BlogSection = () => {
    interface Blog {
        _id: string;
        title: string;
        content: string;
        username: string;
        date: string;
    }

    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axios.get('/api/blogs/recent');
                setBlogs(response.data);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            }
        }
        fetchBlogs();
    }, []);

    return (
        <section className="blog-section">
            <h2>Latest Blogs</h2>
            <div className="blogs-list">
                {blogs.map(blog => (
                    <div key={blog._id} className="blog-card">
                        <h3>{blog.title}</h3>
                        <p>{blog.content.substring(0, 100)}...</p>
                        <span className="blog-details">{blog.username} - {new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
