import { useEffect, useState } from "react";
import FeaturedRow from "./FeaturedRow";
import { Spinner } from "../../Shared/Skeletons";


const FeaturedBlogs = () => {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('https://international-blogs-server.vercel.app/blogs/featured', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setBlogs(data)
                setLoading(false)
            })
    }, [])

    return (
        <div className="container mx-auto px-6 py-14">
            <div className="border-b border-rule pb-10">
                <p className="font-meta text-[11px] uppercase tracking-wide2 text-ink-faint">Curated</p>
                <h1 className="mt-3 font-display italic text-4xl lg:text-5xl text-ink">Featured Blogs</h1>
            </div>

            <div className="mt-10 overflow-x-auto">
                {
                    loading ?
                        <Spinner label="Loading featured blogs" />
                        :
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-ink">
                                    <th className="pb-3 font-meta text-[11px] uppercase tracking-wide2 text-ink-faint font-normal">No.</th>
                                    <th className="pb-3 font-meta text-[11px] uppercase tracking-wide2 text-ink-faint font-normal">Author</th>
                                    <th className="pb-3 font-meta text-[11px] uppercase tracking-wide2 text-ink-faint font-normal">Title</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog, index) => <FeaturedRow key={blog._id} blog={blog} serial={index + 1}></FeaturedRow>)}
                            </tbody>
                        </table>
                }
            </div>
        </div>
    );
};

export default FeaturedBlogs;
