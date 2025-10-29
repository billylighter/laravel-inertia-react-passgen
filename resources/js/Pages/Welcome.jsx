import { Link, Head } from '@inertiajs/react'
import PasswordGenerator from '@/Components/PasswordGenerator.jsx'
import ThemeToggle from "@/Components/ThemeToggle.jsx";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Password Generator" />

            <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">

                <div className=" p-6 flex items-center space-x-4">
                    <ThemeToggle />
                    <div className={"ms-3 dark:text-gray-200 text-gray-600"}>|</div>
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="text-gray-700 dark:text-gray-300 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="text-gray-700 dark:text-gray-300 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="text-gray-700 dark:text-gray-300 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md backdrop-blur-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                            🔐 Smart Password Generator
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Keep your passwords unguessable
                        </p>
                    </div>

                    <PasswordGenerator />

                    <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        © 2025 Made with ❤️
                    </div>
                </div>

            </div>
        </>
    )
}
