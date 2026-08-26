import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const fieldClass = "w-full border border-rule bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition-colors"
const labelClass = "font-meta text-[11px] uppercase tracking-wide2 text-ink-faint"

const Register = () => {

    const { createUser, signInWithGoogle, signInWithGithub } = useContext(AuthContext);

    const [passwordEye, setPasswordEye] = useState(false)
    const showPassword = () => {
        setPasswordEye(!passwordEye)
    }
    const handleSocialLogin = socialProvider => {
        socialProvider()
            .then(result => {
                if (result.user) {
                    Swal.fire({
                        title: 'Success',
                        text: 'You have successfully logged in',
                        icon: 'success',
                        confirmButtonText: 'Continue'
                    })
                }
            })
            .catch(
                error => {
                    console.log(error),
                    Swal.fire({
                        title: 'Error',
                        text: 'Sorry something went wrong',
                        icon: 'error',
                        confirmButtonText: 'Close'
                    })
                }

            )
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onTouched'
    });

    const onSubmit = data => {
        const { name } = data;
        const { email } = data;
        const { password } = data;
        reset()

        createUser(email, password, name)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'Success',
                    text: 'You have successfully registered',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                })
            })
            .catch(
                error => {
                    console.log(error),
                    Swal.fire({
                        title: 'Error',
                        text: 'Sorry something went wrong',
                        icon: 'error',
                        confirmButtonText: 'Close'
                    })
                }

            )
    }


    return (
        <div className="container mx-auto px-6 py-16 lg:py-24">
            <div className="mx-auto max-w-sm">
                <p className={`text-center ${labelClass}`}>Join Blog Stream</p>
                <h1 className="mt-3 text-center font-display italic text-4xl text-ink">Create an Account</h1>

                <form noValidate="" onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
                    <div>
                        <label htmlFor="name" className={labelClass}>Name</label>
                        <input type="text" name="name" id="name" placeholder="Your Name" className={`mt-2 ${fieldClass}`} {...register("name", { required: true })} />
                    </div>
                    <div>
                        <label htmlFor="email" className={labelClass}>Email address</label>
                        <input type="email" name="email" id="email" placeholder="you@example.com" className={`mt-2 ${fieldClass}`} {...register("email", { required: true })} />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className={labelClass}>Password</label>
                        <input type={(!passwordEye) ? 'password' : 'text'} name="password" id="password" placeholder="••••••••" className={`mt-2 ${fieldClass}`}
                            {...register("password", {
                                required: true,
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}$/,
                                    message: 'Password must be at least 6 characters long and contain at least one uppercase letter, one special character, and one numeric digit.'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            })} required />
                        <div className="absolute right-3 top-9">
                            {
                                (passwordEye === false) ? <IoEyeOff className="text-ink-faint cursor-pointer" onClick={showPassword} /> : <IoEye className="text-ink-faint cursor-pointer" onClick={showPassword} />
                            }
                        </div>
                        {errors.password && <span className="mt-2 block text-xs text-red-700">{errors.password.message}</span>}
                    </div>
                    <input type="submit" className="w-full border border-ink py-3 font-meta text-xs uppercase tracking-wide2 text-ink hover:bg-ink hover:text-paper transition-colors cursor-pointer" value="Register" />
                </form>

                <div className="my-8 flex items-center gap-4">
                    <hr className="w-full border-rule" />
                    <p className="font-meta text-[11px] uppercase tracking-wide2 text-ink-faint shrink-0">Or</p>
                    <hr className="w-full border-rule" />
                </div>

                <div className="space-y-3">
                    <button onClick={() => handleSocialLogin(signInWithGoogle)} aria-label="Register with Google" type="button" className="flex w-full items-center justify-center gap-3 border border-rule py-3 text-sm text-ink hover:border-ink transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <span>Continue with Google</span>
                    </button>
                    <button onClick={() => handleSocialLogin(signInWithGithub)} aria-label="Register with GitHub" role="button" className="flex w-full items-center justify-center gap-3 border border-rule py-3 text-sm text-ink hover:border-ink transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                        <span>Continue with GitHub</span>
                    </button>
                </div>

                <p className="mt-10 text-center text-sm text-ink-soft">
                    Already have an account?{' '}
                    <Link to="/login" className="text-ink underline decoration-rule underline-offset-4 hover:decoration-ink transition-colors">Sign in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
