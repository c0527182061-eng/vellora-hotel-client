
import { AuthContext, userContext } from '../../context/userContext'
import { navLinks } from './navLinks';
import { Link, useLocation } from 'react-router';



export default function Header() {

    const { user, logout } = AuthContext();



    const role = user?.role;
    const location = useLocation();
    const filtersNavs = navLinks.filter(x => x.roles.includes(role ? role : 'GUEST') && x.to != location.pathname)


    return (
        <header dir="rtl" className="sticky top-0 z-50 w-full border-b border-[#e5dac5] bg-[#fffdf8] shadow-[0_5px_24px_rgba(80,65,39,0.07)]">

            <div className="h-[3px] w-full bg-gradient-to-l from-[#a88b51] via-[#e4d5b2] to-[#a88b51]" />

            <nav className="mx-auto flex min-h-[118px] max-w-[1500px] items-center justify-between gap-6 px-5 sm:px-10 lg:px-16">

                <Link
                    to="/"
                    className="group flex shrink-0 flex-col items-center justify-center gap-1"
                >
                    <span className="font-serif text-[31px] font-medium tracking-[0.16em] text-[#51432e] transition-colors duration-300 group-hover:text-[#a4874c] sm:text-[36px]">
                        VELLORA
                    </span>

                    <span className="flex items-center gap-2">
                        <span className="h-px w-7 bg-[#c6ad7b]" />
                        <span className="text-[9px] tracking-[0.35em] text-[#a4874c]">
                            ✦
                        </span>
                        <span className="h-px w-7 bg-[#c6ad7b]" />
                    </span>
                </Link>

                <div className="hidden h-14 w-px bg-[#e7dece] md:block" />

                <div className="flex flex-1 flex-wrap items-center justify-end gap-x-1 gap-y-1 sm:gap-x-3 lg:gap-x-6 xl:gap-x-9">
                    {filtersNavs.map(link => (
                        <Link
                            to={link.to}
                            key={link.label}
                            className="group relative whitespace-nowrap rounded-sm px-2 py-4 text-sm font-medium text-[#625744] transition-colors duration-300 hover:text-[#a1844b] sm:px-3 sm:text-base"
                        >
                            {link.label}

                            <span className="absolute bottom-2 right-2 left-2 h-[2px] origin-center scale-x-0 bg-[#b49a66] transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>
                    ))}

                    {role && role != 'GUEST' && <Link onClick={logout}  to={"/"}>התנתקות</Link>}
                </div>

            </nav>

            <div className="h-px bg-gradient-to-l from-transparent via-[#d8c7a4] to-transparent" />

        </header>
    )
}
