import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex space-x-4">
                <Link className="hover:text-gray-300" href="/">
                    Home
                </Link>
                <Link className="hover:text-gray-300" href="/cart">
                    Cart
                </Link>
            </nav>
            Header
        </header>
    );
};

export default Header;