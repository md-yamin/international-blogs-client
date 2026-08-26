import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';

const FeaturedRow = ({ blog, serial }) => {

    const { _id, name, title, userImg } = blog

    return (
        <tr className="border-b border-rule">
            <td className="py-4 font-meta text-xs text-ink-faint">{String(serial).padStart(2, '0')}</td>
            <td className="py-4">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 overflow-hidden rounded-full bg-paper-raised flex items-center justify-center shrink-0">
                        {
                            userImg ?
                                <img src={userImg} alt={name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                :
                                <FaUserAlt className="text-ink-faint text-sm" />
                        }
                    </div>
                    <span className="text-sm text-ink-soft">{name}</span>
                </div>
            </td>
            <td className="py-4 font-display text-lg text-ink">{title}</td>
            <td className="py-4 text-right">
                <Link to={`/blog-details/${_id}`} className="font-meta text-[11px] uppercase tracking-wide2 text-ink-soft hover:text-ink transition-colors">
                    Read
                </Link>
            </td>
        </tr>
    );
};

FeaturedRow.propTypes = {
    blog: PropTypes.object,
    serial: PropTypes.number
}

export default FeaturedRow;
