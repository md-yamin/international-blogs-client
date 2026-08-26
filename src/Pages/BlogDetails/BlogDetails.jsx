import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { FaUserAlt } from "react-icons/fa";
import BlogImage from "../../Shared/BlogImage";
import { BlogDetailsSkeleton } from "../../Shared/Skeletons";

const BlogDetails = () => {
    const { user } = useContext(AuthContext)
    const loggedEmail = user?.email
    const loggedUserImg = user?.userImg
    const { id } = useParams()
    const [blog, setBlog] = useState([])
    const [comment, setComment] = useState([])
    const [loading, setLoading] = useState(true)
    const { _id, name, image, detailed_description, short_description, category, title, userEmail, userImg } = blog
    const blogId = _id


    useEffect(() => {
        setLoading(true)
        fetch(`https://international-blogs-server.vercel.app/blogs/${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setBlog(data);
                setLoading(false)
            })
            .catch(
                error => console.log(error)
            )
    }, [id])


    useEffect(() => {
        fetch(`https://international-blogs-server.vercel.app/comments/${blogId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setComment(data);
            })
    }, [blogId])


    console.log(comment);

    const handleComment = (e) => {
        e.preventDefault()
        const comment = e.target.comment.value
        const newComment = { comment, blogId, name, loggedEmail, loggedUserImg }
        fetch(`https://international-blogs-server.vercel.app/comments`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    console.log();
                    Swal.fire({
                        title: 'Success',
                        text: 'You have successfully added an item',
                        icon: 'success',
                        confirmButtonText: 'Continue'
                    })
                    e.target.reset()
                }
            })
    }

    if (loading) {
        return <BlogDetailsSkeleton />
    }

    return (
        <article>
            {/* Article header: category, title, byline sit above the image, editorial-style */}
            <header className="container mx-auto max-w-3xl px-6 pt-12 lg:pt-20">
                <p className="font-meta text-[11px] uppercase tracking-wide2 text-accent">{category}</p>
                <h1 className="mt-4 font-display text-3xl lg:text-5xl leading-tight text-ink">{title}</h1>

                <div className="mt-6 flex items-center justify-between border-t border-rule pt-5">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 overflow-hidden rounded-full bg-paper-raised flex items-center justify-center shrink-0">
                            {
                                userImg ?
                                    <img src={userImg} alt={name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                    :
                                    <FaUserAlt className="text-ink-faint text-sm" />
                            }
                        </div>
                        <p className="font-meta text-xs uppercase tracking-wide2 text-ink-soft">By {name}</p>
                    </div>
                    {
                        loggedEmail && loggedEmail === userEmail &&
                        <Link to={`/update-blog/${_id}`} className="font-meta text-[11px] uppercase tracking-wide2 text-ink underline decoration-rule underline-offset-4 hover:decoration-ink transition-colors">
                            Edit Article
                        </Link>
                    }
                </div>
            </header>

            {/* Hero image: this is the LCP element for the page, so it loads eagerly at high priority */}
            <div className="container mx-auto max-w-5xl px-6 mt-8 lg:mt-10">
                <BlogImage src={image} alt={title} aspect="aspect-[16/9]" priority={true} />
            </div>

            {/* Article body: comfortable reading width and line length, separate from the hero/meta above */}
            <div className="container mx-auto max-w-2xl px-6 py-12 lg:py-16">
                {
                    short_description &&
                    <p className="font-display italic text-xl text-ink-soft leading-relaxed border-l-2 border-accent pl-5 mb-8">
                        {short_description}
                    </p>
                }
                <p className="text-base leading-relaxed text-ink whitespace-pre-line">{detailed_description}</p>
            </div>

            {/* Comments: visually separated from the article as a secondary section */}
            <div className="bg-paper-raised">
                <div className="container mx-auto max-w-2xl px-6 py-12 lg:py-16">
                    <h2 className="font-meta text-[11px] uppercase tracking-wide2 text-ink-faint mb-8">
                        Comments {comment.length > 0 && `(${comment.length})`}
                    </h2>

                    {
                        comment.length === 0 ?
                            <p className="text-sm text-ink-soft mb-8">No comments yet.</p>
                            :
                            <div className="space-y-8 mb-10">
                                {
                                    comment.map(c => (
                                        <div className="flex gap-4 items-start" key={c._id}>
                                            <div className="h-9 w-9 overflow-hidden rounded-full bg-paper flex items-center justify-center shrink-0">
                                                {
                                                    c?.loggedUserImg ?
                                                        <img className="h-full w-full object-cover" src={c.loggedUserImg} alt={c?.name || ''} loading="lazy" decoding="async" />
                                                        :
                                                        <FaUserAlt className="text-ink-faint text-sm" />
                                                }
                                            </div>
                                            <div>
                                                <h3 className="font-meta text-xs uppercase tracking-wide2 text-ink-soft">{c?.name || c?.email}</h3>
                                                <p className="mt-1 text-sm leading-relaxed text-ink">{c?.comment}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                    }

                    {
                        loggedEmail && loggedEmail !== userEmail &&
                        <form onSubmit={handleComment} className="border-t border-rule pt-8">
                            <label htmlFor="comment" className="font-meta text-[11px] uppercase tracking-wide2 text-ink-faint">Leave a comment</label>
                            <textarea id="comment" className="mt-3 w-full border border-rule bg-paper p-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink" name="comment" placeholder="Share your thoughts on this article" rows={4}></textarea>
                            <input className="mt-4 border border-ink px-5 py-2 font-meta text-xs uppercase tracking-wide2 text-ink hover:bg-ink hover:text-paper transition-colors cursor-pointer" type="submit" value="Submit" />
                        </form>
                    }
                </div>
            </div>
        </article>
    );
};

export default BlogDetails;
