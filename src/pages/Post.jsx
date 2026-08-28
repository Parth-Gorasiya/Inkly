import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const [likes, setLikes] = useState(0);
    const [userLike, setUserLike] = useState(null);
    const [likeLoading, setLikeLoading] = useState(false);

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
    if (!slug) {
        navigate("/");
        return;
    }

    appwriteService.getPost(slug).then(async (post) => {
        if (post) {
            setPost(post);

            // Get all likes for this post
            const likeData = await appwriteService.getPostLikes(post.$id);

            if (likeData) {
                setLikes(likeData.documents.length);
            }

            // Check if current user has liked this post
            if (userData) {
                const existingLike = await appwriteService.getUserLike(
                    userData.$id,
                    post.$id
                );

                setUserLike(existingLike);
            }
        } else {
            navigate("/");
        }
    });
}, [slug, navigate, userData]);

const handleLike = async () => {
    if (!userData) {
        navigate("/login");
        return;
    }

    setLikeLoading(true);

    if (userLike) {
        const success = await appwriteService.deleteLike(userLike.$id);

        if (success) {
            setUserLike(null);
            setLikes((prev) => prev - 1);
        }
    } else {
        const newLike = await appwriteService.createLike(
            userData.$id,
            post.$id
        );

        if (newLike) {
            setUserLike(newLike);
            setLikes((prev) => prev + 1);
        }
    }

    setLikeLoading(false);
};

    const deletePost = async () => {
    const status = await appwriteService.deletePost(post.$id);

    if (status) {
        await appwriteService.deleteFile(post.featuredImage);
        navigate("/");
    }
};

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
    <h1 className="text-2xl font-bold">{post.title}</h1>

    <button
        onClick={handleLike}
        disabled={likeLoading}
        className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white
        hover:bg-red-600 disabled:opacity-50"
    >
        {userLike ? "❤️ Unlike" : "🤍 Like"}
    </button>

    <span className="ml-3 text-gray-600">
        {likes} {likes === 1 ? "Like" : "Likes"}
    </span>
</div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}