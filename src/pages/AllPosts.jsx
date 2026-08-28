import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className="w-full py-8 bg-gray-100 dark:bg-gray-950 min-h-screen">
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold dark:text-white">
                        All Posts
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Explore all posts from the Inkly community.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold dark:text-white">
                            No posts yet
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Be the first person to publish a post!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <PostCard
                                key={post.$id}
                                {...post}
                            />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;