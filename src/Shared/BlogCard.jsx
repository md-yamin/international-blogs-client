import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import BlogImage from './BlogImage';

const BlogCard = ({ blog, handleDelete, handleWishlist }) => {

    const { user } = useContext(AuthContext)
    const { _id, title, image, short_description, category } = blog

    return (
        <article className="group">
            <Link to={`/blog-details/${_id}`}>
                <BlogImage src={image} alt={title} aspect="aspect-[4/3]" imgClassName="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
            </Link>

            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <span className="font-meta text-[11px] uppercase tracking-wide2 text-accent">{category}</span>
                </div>
                <Link to={`/blog-details/${_id}`}>
                    <h3 className="mt-2 font-display text-xl leading-snug text-ink group-hover:underline decoration-1 underline-offset-4">
                        {title}
                    </h3>
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft line-clamp-3">{short_description}</p>

                <div className="mt-4 flex items-center gap-5 border-t border-rule pt-3">
                    <Link to={`/blog-details/${_id}`} className="font-meta text-[11px] uppercase tracking-wide2 text-ink hover:text-accent transition-colors">
                        Read
                    </Link>
                    <button onClick={() => handleWishlist(_id)} className="font-meta text-[11px] uppercase tracking-wide2 text-ink-soft hover:text-accent transition-colors">
                        Wishlist
                    </button>
                    {
                        user?.email === blog.email &&
                        <button onClick={() => handleDelete(_id)} className="ml-auto font-meta text-[11px] uppercase tracking-wide2 text-ink-faint hover:text-red-700 transition-colors">
                            Delete
                        </button>
                    }
                </div>
            </div>
        </article>
    );
};

BlogCard.propTypes = {
    blog: PropTypes.object,
    handleDelete: PropTypes.func,
    handleWishlist: PropTypes.func,
};

export default BlogCard;
