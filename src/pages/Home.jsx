import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="w-full py-20">
                <Container>
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold">
                            Loading posts...
                        </h2>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full">

            {/* Hero Section */}
            <section className="py-20 text-center dark:bg-gray-900 dark:text-white">
                <Container>
                    <h1 className="text-5xl font-bold mb-6">
                        Welcome to Inkly
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Share your ideas, stories, and knowledge with the world.
                    </p>
                </Container>
            </section>

            {/* Posts Section */}
            <section className="w-full py-12 bg-gray-100 dark:bg-gray-800">
                <Container>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold">
                            Latest Posts
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Discover the latest stories from the Inkly community.
                        </p>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-semibold">
                                No posts yet
                            </h2>

                            <p className="text-gray-600 mt-2">
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
            </section>

        </div>
    );
}

export default Home;