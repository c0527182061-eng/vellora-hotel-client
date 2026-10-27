
import { AuthContext} from '../../context/userContext'
import { navLinks } from './navLinks';
import { Link, useLocation } from 'react-router';



export default function Header() {

    const { user, logout } = AuthContext();



    const role = user?.role;
    const location = useLocation();
    const filtersNavs = navLinks.filter(x => x.roles.includes(role ? role : 'GUEST') && x.to != location.pathname)


    return (
        <header dir="rtl" className="sticky top-0 z-50 w-full border-b border-[#e5dac5]/80 bg-[#fffdf8]/95 shadow-[0_5px_24px_rgba(80,65,39,0.07)] backdrop-blur-xl">

            <div className="h-[3px] w-full bg-gradient-to-l from-[#a88b51] via-[#f1e5c9] to-[#a88b51]" />

            <nav className="mx-auto flex min-h-[100px] max-w-[1500px] items-center justify-between gap-5 px-5 sm:min-h-[112px] sm:px-10 lg:px-16">

                <Link
                    to="/"
                    className="group relative flex shrink-0 flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 transition duration-300 hover:bg-[#f7f0e4]/70"
                >
                    <span className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#d9c49b]/0 via-[#d9c49b]/0 to-[#d9c49b]/0 opacity-0 blur-md transition duration-500 group-hover:from-[#d9c49b]/20 group-hover:via-[#f5ead5]/30 group-hover:to-[#d9c49b]/20 group-hover:opacity-100" />

                    <span className="relative font-serif text-[31px] font-medium tracking-[0.16em] text-[#51432e] transition duration-300 group-hover:text-[#a1844b] sm:text-[36px]">
                        VELLORA
                    </span>

                    <span className="relative flex items-center gap-2">
                        <span className="h-px w-7 bg-[#c6ad7b] transition-all duration-300 group-hover:w-10" />
                        <span className="text-[9px] text-[#a4874c] transition-transform duration-500 group-hover:rotate-180">
                            ✦
                        </span>
                        <span className="h-px w-7 bg-[#c6ad7b] transition-all duration-300 group-hover:w-10" />
                    </span>
                </Link>

                <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-[#d7c6a5] to-transparent md:block" />

                <div className="flex flex-1 flex-wrap items-center justify-end gap-x-1 gap-y-1 sm:gap-x-2 lg:gap-x-4 xl:gap-x-6">
                    {filtersNavs.map(link => (
                        <Link
                            to={link.to}
                            key={link.label}
                            className="group relative whitespace-nowrap rounded-xl px-3 py-3 text-sm font-medium text-[#625744] transition-all duration-300 hover:bg-[#f5eee2] hover:text-[#967642] sm:px-4 sm:text-base"
                        >
                            {link.label}

                            <span className="absolute bottom-1.5 right-4 left-4 h-[2px] origin-center scale-x-0 rounded-full bg-gradient-to-l from-[#a1844b] to-[#d8c49b] transition-transform duration-300 group-hover:scale-x-100" />

                            <span className="absolute inset-0 rounded-xl ring-1 ring-[#c7ad7a]/0 transition duration-300 group-hover:ring-[#c7ad7a]/30" />
                        </Link>
                    ))}

                    {role && role != 'GUEST' && (
                        <Link
                            onClick={logout}
                            to={"/"}
                            className="group inline-flex items-center gap-2 rounded-xl border border-[#e5d7c1] bg-white/70 px-4 py-3 text-sm font-semibold text-[#8b7653] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bda474] hover:bg-[#f7f0e5] hover:text-[#6f5d41] hover:shadow-md"
                        >
                            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
                                ↗
                            </span>
                            <span>התנתקות</span>
                        </Link>
                    )}
                </div>

            </nav>

            <div className="h-px bg-gradient-to-l from-transparent via-[#d8c7a4] to-transparent" />

        </header>
    )
}
