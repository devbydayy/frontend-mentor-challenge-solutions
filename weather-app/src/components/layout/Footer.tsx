export default function Footer() {
    return (
        <footer className="py-6 mt-12 text-center text-neutral-300">
            <div className="container mx-auto max-w-desktop">
                <p>&copy; {new Date().getFullYear()} Weather Now. All rights reserved.</p>
            </div>
        </footer>
    );
}
