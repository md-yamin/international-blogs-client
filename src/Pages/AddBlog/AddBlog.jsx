import { useContext } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../context/AuthProvider';

const categories = ['Animals', 'Anime', 'Comedy', 'Cartoon', 'Education', 'Entertainment', 'Fitness', 'Fashion', 'Food', 'Lifestyle', 'Music', 'Movies', 'Sports', 'Travel', 'Tech', 'Video Game']

const fieldClass = "w-full border border-rule bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition-colors"
const labelClass = "font-meta text-[11px] uppercase tracking-wide2 text-ink-faint"

const AddBlog = () => {

    const { user } = useContext(AuthContext)
    const userEmail = user?.email
    const userImg = user?.photoURL
    const time = new Date()

    const handleAddBlog = e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const title = form.title.value
        const image = form.image.value
        const email = form.email.value
        const short_description = form.short_description.value
        const detailed_description = form.detailed_description.value
        const category = form.category.value

        console.log(name, image, email, short_description, detailed_description, category, title, userEmail);

        const newBlog = { name, image, email, short_description, detailed_description, category, title, userEmail, userImg, time}

        fetch('https://international-blogs-server.vercel.app/blogs', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newBlog)
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
                    form.reset()
                }
            })

    }

    return (
        <div className="container mx-auto max-w-4xl px-6 py-14">
            <p className="font-meta text-[11px] uppercase tracking-wide2 text-ink-faint">New Article</p>
            <h1 className="mt-3 font-display italic text-4xl lg:text-5xl text-ink">Write a Blog</h1>

            <form onSubmit={handleAddBlog} className="mt-12 space-y-12">

                {/* Content: title is the primary act of writing, so it leads on its own */}
                <div>
                    <label htmlFor="title" className={labelClass}>Title</label>
                    <input
                        required
                        name="title"
                        id="title"
                        type="text"
                        placeholder="Give your article a title"
                        className="mt-2 w-full border-b border-rule bg-transparent py-2 font-display text-3xl text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink" />
                </div>

                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Main content column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <label htmlFor="short_description" className={labelClass}>Short Description</label>
                            <p className="text-xs text-ink-faint mt-1 mb-2">A one or two line summary shown on article cards.</p>
                            <textarea
                                required
                                name="short_description"
                                id="short_description"
                                rows="3"
                                placeholder="Short Description"
                                className={fieldClass}></textarea>
                        </div>

                        <div>
                            <label htmlFor="detailed_description" className={labelClass}>Detailed Description</label>
                            <p className="text-xs text-ink-faint mt-1 mb-2">The full body of the article.</p>
                            <textarea
                                required
                                name="detailed_description"
                                id="detailed_description"
                                rows="12"
                                placeholder="Write the full article here"
                                className={fieldClass}></textarea>
                        </div>
                    </div>

                    {/* Metadata sidebar: everything that isn't the article body itself */}
                    <div className="space-y-6 lg:border-l lg:border-rule lg:pl-8">
                        <div>
                            <label htmlFor="category" className={labelClass}>Category</label>
                            <select name="category" id="category" defaultValue={'DEFAULT'} required className={`mt-2 ${fieldClass}`}>
                                <option value={'DEFAULT'} disabled>Select a category</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="image" className={labelClass}>Image URL</label>
                            <input
                                required
                                name="image"
                                id="image"
                                type="text"
                                placeholder="https://"
                                className={`mt-2 ${fieldClass}`} />
                        </div>

                        <div className="border-t border-rule pt-6">
                            <label htmlFor="user_name" className={labelClass}>Author Name</label>
                            <input
                                required
                                name="name"
                                id="user_name"
                                type="text"
                                placeholder="User Name"
                                className={`mt-2 ${fieldClass}`} />
                        </div>

                        <div>
                            <label htmlFor="email" className={labelClass}>Author Email</label>
                            <input
                                required
                                name="email"
                                id="email"
                                type="email"
                                defaultValue={user ? user.email : ""}
                                className={`mt-2 ${fieldClass}`} />
                        </div>
                    </div>
                </div>

                <div className="border-t border-rule pt-8">
                    <input type="submit" className="border border-ink px-8 py-3 font-meta text-xs uppercase tracking-wide2 text-ink hover:bg-ink hover:text-paper transition-colors cursor-pointer" value="Publish" />
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
