import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from '../../context/AuthProvider';
import { BlogDetailsSkeleton } from '../../Shared/Skeletons';

const categories = ['Animals', 'Anime', 'Comedy', 'Cartoon', 'Education', 'Entertainment', 'Fitness', 'Fashion', 'Food', 'Lifestyle', 'Music', 'Movies', 'Sports', 'Travel', 'Tech', 'Video Game']

const fieldClass = "w-full border border-rule bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition-colors"
const labelClass = "font-meta text-[11px] uppercase tracking-wide2 text-ink-faint"

const UpdateBlog = () => {

    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const userEmail = user?.email
    const userImg = user?.photoURL
    const time = new Date()

    console.log(id);
    const [blog, setBlog] = useState([])
    const [loading, setLoading] = useState(true)
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
                error => console.error(error)
            )
    }, [id])

    const { name, title, image, email, short_description, detailed_description, category } = blog


    const handleUpdateBlog = e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const title = form.title.value
        const image = form.image.value
        const email = form.email.value
        const short_description = form.short_description.value
        const detailed_description = form.detailed_description.value
        const category = form.category.value

        console.log(name, title,  image, email, short_description, detailed_description, category);

        const newBlog = { name, title, image, email, short_description, detailed_description, category, userEmail, userImg, time }

        fetch(`https://international-blogs-server.vercel.app/blogs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newBlog)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount>0) {
                    console.log();
                    Swal.fire({
                        title: 'Success',
                        text: 'You have successfully updated an item',
                        icon: 'success',
                        confirmButtonText: 'Continue'
                        })
                    form.reset()
                }
            })
            .catch(
                error => console.error(error)
            )

    }

    if (loading) {
        return <BlogDetailsSkeleton />
    }

    return (
        <div className="container mx-auto max-w-4xl px-6 py-14">
            <p className={labelClass}>Editing</p>
            <h1 className="mt-3 font-display italic text-4xl lg:text-5xl text-ink">{title}</h1>

            <form onSubmit={handleUpdateBlog} className="mt-12 space-y-12">

                <div>
                    <label htmlFor="title" className={labelClass}>Title</label>
                    <input
                        name="title"
                        id="title"
                        type="text"
                        placeholder="Title"
                        defaultValue={title}
                        className="mt-2 w-full border-b border-rule bg-transparent py-2 font-display text-3xl text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink" />
                </div>

                <div className="grid gap-10 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <label htmlFor="short_description" className={labelClass}>Short Description</label>
                            <textarea
                                name="short_description"
                                id="short_description"
                                rows="3"
                                placeholder="Short Description"
                                defaultValue={short_description}
                                className={`mt-2 ${fieldClass}`}></textarea>
                        </div>

                        <div>
                            <label htmlFor="detailed_description" className={labelClass}>Detailed Description</label>
                            <textarea
                                name="detailed_description"
                                id="detailed_description"
                                rows="12"
                                placeholder="Detailed Description"
                                defaultValue={detailed_description}
                                className={`mt-2 ${fieldClass}`}></textarea>
                        </div>
                    </div>

                    <div className="space-y-6 lg:border-l lg:border-rule lg:pl-8">
                        <div>
                            <label htmlFor="category" className={labelClass}>Category</label>
                            <select name="category" id="category" defaultValue={category ? category : 'DEFAULT'} required className={`mt-2 ${fieldClass}`}>
                                <option value={'DEFAULT'} disabled>Select a category</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="image" className={labelClass}>Image URL</label>
                            <input
                                name="image"
                                id="image"
                                type="text"
                                placeholder="Image Url"
                                defaultValue={image}
                                className={`mt-2 ${fieldClass}`} />
                        </div>

                        <div className="border-t border-rule pt-6">
                            <label htmlFor="user_name" className={labelClass}>Author Name</label>
                            <input
                                name="name"
                                id="user_name"
                                type="text"
                                placeholder="User Name"
                                defaultValue={name}
                                className={`mt-2 ${fieldClass}`} />
                        </div>

                        <div>
                            <label htmlFor="user_email" className={labelClass}>Author Email</label>
                            <input
                                name="email"
                                id="user_email"
                                type="email"
                                placeholder="User Email"
                                defaultValue={email}
                                className={`mt-2 ${fieldClass}`} />
                        </div>
                    </div>
                </div>

                <div className="border-t border-rule pt-8">
                    <input type="submit" className="border border-ink px-8 py-3 font-meta text-xs uppercase tracking-wide2 text-ink hover:bg-ink hover:text-paper transition-colors cursor-pointer" value="Save Changes" />
                </div>
            </form>
        </div>
    );
};

export default UpdateBlog;
