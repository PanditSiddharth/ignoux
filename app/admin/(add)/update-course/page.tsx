'use client';
import React, { useState } from 'react';
import { update } from './server';
const AddBlogToCourse: React.FC = () => {
  const [courseId, setCourseId] = useState('');
  const [blogId, setBlogId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    update({slug: courseId, content: [blogId]})
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Course ID:</label>
        <input
          type="text"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Blog ID:</label>
        <input
          type="text"
          value={blogId}
          onChange={(e) => setBlogId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Blog to Course</button>
    </form>
  );
};

export default AddBlogToCourse;