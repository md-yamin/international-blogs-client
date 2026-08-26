import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable image primitive used anywhere a blog/user image comes from an
 * external URL (ImgBB / i.ibb.co). It does three things the app's plain
 * <img> tags didn't do before:
 *   1. Reserves space via a fixed aspect ratio, so the surrounding layout
 *      doesn't jump while the (often slow) external image loads.
 *   2. Lazy-loads by default; pass `priority` for the one or two
 *      above-the-fold/LCP images per page that should load eagerly.
 *   3. Falls back to a simple local placeholder if the URL 404s or the
 *      external host is unreachable, instead of showing a broken-image icon.
 *
 * This does not make the external image itself load faster - it only
 * avoids doing unnecessary work (loading it early, reflowing the page)
 * around a request whose speed is out of the frontend's control.
 */
const BlogImage = ({ src, alt = '', aspect = 'aspect-[4/3]', className = '', priority = false, imgClassName = '' }) => {
    const [status, setStatus] = useState('loading'); // loading | loaded | error

    return (
        <div className={`relative overflow-hidden bg-paper-raised ${aspect} ${className}`}>
            {status !== 'error' && src ? (
                <img
                    src={src}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={priority ? 'high' : 'auto'}
                    onLoad={() => setStatus('loaded')}
                    onError={() => setStatus('error')}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-paper-raised">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8 text-ink-faint" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="1" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                    </svg>
                </div>
            )}
        </div>
    );
};

BlogImage.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    aspect: PropTypes.string,
    className: PropTypes.string,
    priority: PropTypes.bool,
    imgClassName: PropTypes.string,
};

export default BlogImage;
