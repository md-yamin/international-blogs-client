import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BlogImage from '../../Shared/BlogImage';

const WishlistCard = ({ oneWish, handleDelete }) => {

    const { _id, title, image, short_description, category } = oneWish

    return (
        <article className="group">
            <Link to={`/blog-details/${_id}`}>
                <BlogImage src={image} alt={title} aspect="aspect-[4/3]" imgClassName="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
            </Link>

            <div className="mt-4">
                <span className="font-meta text-[11px] uppercase tracking-wide2 text-accent">{category}</span>
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
                    <button onClick={() => handleDelete(_id)} className="ml-auto font-meta text-[11px] uppercase tracking-wide2 text-ink-faint hover:text-red-700 transition-colors">
                        Remove
                    </button>
                </div>
            </div>
        </article>
    );
};

WishlistCard.propTypes = {
    oneWish: PropTypes.object,
    handleDelete: PropTypes.func,
};

export default WishlistCard;
