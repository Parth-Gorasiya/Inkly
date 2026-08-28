import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="py-8 bg-gray-100 dark:bg-gray-950 min-h-screen">
    <Container>
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
            Create a New Post
        </h1>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <PostForm />
        </div>
    </Container>
</div>
  )
}

export default AddPost