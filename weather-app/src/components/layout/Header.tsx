import UnitSelector from "../weather/UnitSelector";

export default function Header() {
    return (
        <header className="py-4 px-4 lg:px-8">
            <div className="container mx-auto flex justify-between items-center max-w-desktop">
                <div className="flex items-center gap-3">
                    <img src="/images/logo.svg" alt="Weather Now Logo"/>
                </div>
                <UnitSelector />
            </div>
        </header>
    )
}
