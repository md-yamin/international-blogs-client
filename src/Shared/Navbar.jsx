import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import '../App.css'

const navItems = [
    { to: '/', label: 'Home' },
    { to: '/all-blogs', label: 'All Blogs' },
    { to: '/featured-blogs', label: 'Featured' },
    { to: '/add-blog', label: 'Add Blog' },
    { to: '/wishlist', label: 'Wishlist' },
]

const AuthActions = ({ user, handleSignOut, stacked, onNavigate }) => (
    user ?
        <div className={stacked ? "flex items-center justify-between" : "flex items-center gap-4"}>
            <div className="flex items-center gap-2">
                <img className="h-7 w-7 rounded-full border border-rule object-cover" src={user.photoURL} />
                <span className="font-meta text-xs uppercase tracking-wide2 text-ink-soft">{user.displayName}</span>
            </div>
            <button onClick={handleSignOut} className="font-meta text-xs uppercase tracking-wide2 text-ink underline decoration-rule underline-offset-4 hover:decoration-ink transition-colors">
                Sign Out
            </button>
        </div>
        :
        <div className={stacked ? "flex items-center justify-between" : "flex items-center gap-5"}>
            <Link to={'/login'} onClick={onNavigate} className="font-meta text-xs uppercase tracking-wide2 text-ink-soft hover:text-ink transition-colors">
                Login
            </Link>
            <Link to={'/register'} onClick={onNavigate} className="font-meta text-xs uppercase tracking-wide2 text-ink underline decoration-rule underline-offset-4 hover:decoration-ink transition-colors">
                Register
            </Link>
        </div>
)

AuthActions.propTypes = {
    user: PropTypes.object,
    handleSignOut: PropTypes.func,
    stacked: PropTypes.bool,
    onNavigate: PropTypes.func,
}

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleSignOut = () => {
        logOut()
            .then(
                console.log('logged out successfully'),
                Swal.fire({
                    title: 'Logged Out',
                    text: 'You have been logged out',
                    icon: 'info',
                    confirmButtonText: 'Ok'
                })
            )
            .catch(

        )
    }

    return (
        <header className="bg-paper">
            {/* Utility strip: date-style kicker + account actions */}
            <div className="hidden lg:block border-b border-rule">
                <div className="container mx-auto px-6 flex items-center justify-between h-9">
                    <span className="font-meta text-[11px] uppercase tracking-wide2 text-ink-faint">Vol. I · International Blogs</span>
                    <AuthActions user={user} handleSignOut={handleSignOut} />
                </div>
            </div>

            {/* Identity band: centered masthead wordmark */}
            <div className="border-b border-rule">
                <div className="container mx-auto px-6 py-7 lg:py-10 flex items-center justify-between lg:justify-center relative">
                    <Link to={'/'} className="font-display italic text-3xl lg:text-5xl text-ink tracking-tight">
                        Blog Stream
                    </Link>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav-panel"
                        aria-label="Toggle menu"
                        className="lg:hidden flex h-9 w-9 items-center justify-center border border-rule text-ink absolute right-6"
                    >
                        {
                            mobileOpen ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        }
                    </button>
                </div>
            </div>

            {/* Primary navigation band: desktop only, evenly spread with dividers */}
            <nav className="hidden lg:block border-b border-rule">
                <div className="container mx-auto px-6">
                    <ul className="flex items-center justify-center divide-x divide-rule">
                        {navItems.map(item => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    className="block px-8 py-4 font-meta text-xs uppercase tracking-wide2 text-ink-soft hover:text-ink transition-colors"
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile navigation panel: full-bleed, sectioned (not a compressed desktop menu) */}
            {
                mobileOpen &&
                <div id="mobile-nav-panel" className="lg:hidden border-b border-rule bg-paper">
                    <div className="px-6 py-6 space-y-8">
                        <div>
                            <p className="font-meta text-[11px] uppercase tracking-wide2 text-ink-faint mb-3">Navigate</p>
                            <ul className="space-y-4">
                                {navItems.map(item => (
                                    <li key={item.to}>
                                        <NavLink
                                            onClick={() => setMobileOpen(false)}
                                            to={item.to}
                                            className="block font-display text-2xl text-ink"
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="border-t border-rule pt-6">
                            <p className="font-meta text-[11px] uppercase tracking-wide2 text-ink-faint mb-3">Account</p>
                            <AuthActions user={user} handleSignOut={handleSignOut} stacked onNavigate={() => setMobileOpen(false)} />
                        </div>
                    </div>
                </div>
            }
        </header>
    );
};

export default Navbar;
