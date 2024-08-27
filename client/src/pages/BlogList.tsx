import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { useNavigate } from 'react-router-dom';
import { Blog } from '../models/blogModel';

const BlogListPage: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blogs');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Blog[] = await response.json();
                if (Array.isArray(data)) {
                    setBlogs(data);
                } else {
                    throw new Error('Unexpected data format');
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to load blogs');
            }
        };
        fetchBlogs();
    }, []);

    const handleAddBlog = () => {
        navigate('/add-blog');
    };

    return (
        <div>
            <h2>Blogs</h2>
            <button onClick={handleAddBlog}>Add Blog</button>
            {error && <p>{error}</p>}
            {Array.isArray(blogs) && blogs.length > 0 ? (
                blogs.map(blog => (
                    <BlogCard
                        key={blog._id}
                        _id={blog._id}
                        title={blog.title}
                        content={blog.content}
                        username={blog.username}
                        date={blog.date}
                        onEdit={() => navigate(/edit-blog/${blog._id})}
                        onDelete={() => {

                        }}
                    />
                ))
            ) : (
                <p>No blogs available.</p>
            )}
        </div>
    );
};

export default BlogListPage;