/**
 * Small reusable loading system. Kept to three primitives so we're not
 * hand-building a bespoke skeleton per page: a generic Spinner for short
 * one-off waits (comment submit, etc.), a BlogCardSkeleton matching the
 * card grid layout, and a BlogDetailsSkeleton matching the article layout.
 * Animation uses Tailwind's `animate-pulse`; the app-wide
 * `prefers-reduced-motion` rule in index.css already disables it for users
 * who've asked for reduced motion.
 */

import PropTypes from 'prop-types';

export const Spinner = ({ label = 'Loading' }) => (
    <div role="status" className="flex items-center justify-center gap-3 py-16 text-ink-soft">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-rule border-t-ink motion-reduce:animate-none" />
        <span className="font-meta text-xs uppercase tracking-wide2">{label}</span>
    </div>
);

export const BlogCardSkeleton = () => (
    <div className="animate-pulse motion-reduce:animate-none">
        <div className="aspect-[4/3] bg-paper-raised" />
        <div className="mt-4 space-y-3">
            <div className="h-3 w-16 bg-paper-raised" />
            <div className="h-5 w-4/5 bg-paper-raised" />
            <div className="h-4 w-full bg-paper-raised" />
            <div className="h-4 w-2/3 bg-paper-raised" />
        </div>
    </div>
);

Spinner.propTypes = {
    label: PropTypes.string,
}

export const BlogCardSkeletonGrid = ({ count = 6 }) => (
    <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => <BlogCardSkeleton key={i} />)}
    </div>
);

BlogCardSkeletonGrid.propTypes = {
    count: PropTypes.number,
}

export const BlogDetailsSkeleton = () => (
    <div className="animate-pulse motion-reduce:animate-none container mx-auto max-w-3xl px-6 py-16 space-y-6">
        <div className="h-3 w-24 bg-paper-raised" />
        <div className="h-10 w-4/5 bg-paper-raised" />
        <div className="h-4 w-40 bg-paper-raised" />
        <div className="aspect-[16/9] w-full bg-paper-raised" />
        <div className="space-y-3 pt-4">
            <div className="h-4 w-full bg-paper-raised" />
            <div className="h-4 w-full bg-paper-raised" />
            <div className="h-4 w-3/4 bg-paper-raised" />
        </div>
    </div>
);
