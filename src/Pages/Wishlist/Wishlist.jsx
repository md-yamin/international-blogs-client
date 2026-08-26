import { useContext, useEffect, useState } from "react";
import WishlistCard from "./WishlistCard";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { BlogCardSkeletonGrid } from "../../Shared/Skeletons";


const Wishlist = () => {
    const { user } = useContext(AuthContext)
    const email = user?.email
    const [wish, setWish] = useState([])
    const [loading, setLoading] = useState(true)
    console.log(wish);
    useEffect(() => {
        setLoading(true)
        fetch(`https://international-blogs-server.vercel.app/wishlist/${email}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setWish(data)
                setLoading(false)
            })
    }, [email])


    const handleDelete = id => {

        const confirm = Swal.fire({
            title: 'Confirm Delete',
            text: 'Are you sure you would like to remove this item?',
            icon: 'error',
            confirmButtonText: 'Yes, I am'
        })

        if (confirm) {
            fetch(`https://international-blogs-server.vercel.app/wishlist/id/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: 'Deleted',
                            text: 'You have removed this blog form wishlist',
                            icon: 'info',
                            confirmButtonText: 'Ok'
                        })
                    }
                    const remaining = wish.filter(w => w._id !== id)
                    setWish(remaining)
                })
        }
    }


    return (
        <div className="container mx-auto px-6 py-14">
            <div className="border-b border-rule pb-10">
                <p className="font-meta text-[11px] uppercase tracking-wide2 text-ink-faint">Saved</p>
                <h1 className="mt-3 font-display italic text-4xl lg:text-5xl text-ink">
                    Your Wishlist <span className="text-ink-faint text-2xl not-italic">({wish.length})</span>
                </h1>
            </div>

            <div className="mt-14">
                {
                    loading ?
                        <BlogCardSkeletonGrid count={3} />
                        : wish.length === 0 ?
                            <p className="text-ink-soft">Nothing saved yet. Articles you wishlist will appear here.</p>
                            :
                            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                                {
                                    wish.map(oneWish => <WishlistCard key={oneWish._id} oneWish={oneWish} handleDelete={handleDelete}></WishlistCard>)
                                }
                            </div>
                }
            </div>
        </div>
    );
};

export default Wishlist;
