import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <article className="bg-white rounded-xl overflow-hidden shadow-sm
                hover:shadow-xl transition-all duration-300
                hover:-translate-y-1">

                {/* Image */}
                <div className="w-full h-52 overflow-hidden">
                    {featuredImage ? (
                        <img
                            src={appwriteService.getFilePreview(featuredImage)}
                            alt={title}
                            className="w-full h-full object-cover
                                hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200
                            flex items-center justify-center">
                            <span className="text-gray-500">
                                No Image
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    <h2 className="text-xl font-bold line-clamp-2 dark:text-white">
                        {title}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                        Read article →
                    </p>
                </div>

            </article>
        </Link>
    );
}

export default PostCard;