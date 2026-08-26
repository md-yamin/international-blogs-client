import BlogCard from "../../Shared/BlogCard";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
import { BlogCardSkeletonGrid } from "../../Shared/Skeletons";


const AllBlogs = () => {

    const { user } = useContext(AuthContext)
    const wishEmail = user?.email
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch('https://international-blogs-server.vercel.app/blogs', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setBlogs(data)
                setLoading(false)
            })
    }, [])


    const [wish, setWish] = useState(null)
    const handleWishlist = (id) => {

        (fetch(`https://international-blogs-server.vercel.app/blogs/${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                const updatedWish = { ...data, wishReq: wishEmail }
                setWish(updatedWish)
            })
        )
    }
    useEffect(() => {
        if (wish !== null) {
            fetch(`https://international-blogs-server.vercel.app/wishlist`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(wish)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        console.log();
                        Swal.fire({
                            title: 'Success',
                            text: 'You have successfully added an this blog to your wishlist',
                            icon: 'success',
                            confirmButtonText: 'Continue'
                        })
                    }
                })
        }
    }, [wish])

    const handleSearch = (e) => {
        e.preventDefault()
        const title = e.target.search.value.toLowerCase()
        setLoading(true)
        fetch(`https://international-blogs-server.vercel.app/blogs/searched/${title}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBlogs(data)
                setLoading(false)
            })
    }

    const handleDelete = id => {

        const confirm = Swal.fire({
            title: 'Confirm Delete',
            text: 'Are you sure you would like to delete this item?',
            icon: 'error',
            confirmButtonText: 'Yes, I am'
        })

        if (confirm) {
            fetch(`https://international-blogs-server.vercel.app/blogs/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: 'Deleted',
                            text: 'You have deleted a blog',
                            icon: 'info',
                            confirmButtonText: 'Ok'
                        })
                    }
                    const remaining = blogs.filter(blog => blog._id !== id)
                    setBlogs(remaining)
                })
        }
    }

    return (
        <div className="container mx-auto px-6 py-14">
            <div className="border-b border-rule pb-10">
                <p className="font-meta text-[11px] uppercase tracking-wide2 text-ink-faint">Archive</p>
                <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <h1 className="font-display italic text-4xl lg:text-5xl text-ink">
                        All Blogs <span className="text-ink-faint text-2xl not-italic">({blogs.length})</span>
                    </h1>
                    <form onSubmit={handleSearch} className="flex w-full max-w-sm border-b border-ink">
                        <input className="w-full bg-transparent py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none" type="search" name="search" placeholder="Search articles" />
                        <button type="submit" className="font-meta text-[11px] uppercase tracking-wide2 text-ink-soft hover:text-ink transition-colors">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-14">
                {
                    loading ?
                        <BlogCardSkeletonGrid count={6} />
                        :
                        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                blogs.map(blog => <BlogCard key={blog._id} blog={blog} handleDelete={handleDelete} handleWishlist={handleWishlist}></BlogCard>)
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default AllBlogs;
