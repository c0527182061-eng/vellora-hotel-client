

export default function Footer() {
  return (
    <div className="relative mt-16 overflow-hidden border-t border-[#d8c49b]/40 bg-[#423a2d] px-6 py-10 text-center text-[#f7f2e7] shadow-[0_-8px_30px_rgba(66,58,45,0.08)]">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-l from-[#a88a50] via-[#e6d7b5] to-[#a88a50]" />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-10">

        {/* כתובת */}
        <div className="flex items-center gap-3 transition-colors duration-300 hover:text-[#e6d7b5]">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9b587]/40 bg-white/5 text-[#e6d7b5]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </span>
          <p className="text-sm leading-7 text-[#f1e9d9]">
            כתובתינו: הארזים 8 נתניה
          </p>
        </div>

        <div className="hidden h-8 w-px bg-[#c9b587]/30 sm:block" />

        {/* טלפון */}
        <div className="flex items-center gap-3 transition-colors duration-300 hover:text-[#e6d7b5]">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9b587]/40 bg-white/5 text-[#e6d7b5]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.386c.967 0 1.817.617 2.12 1.522l.723 2.17a2.25 2.25 0 0 1-.56 2.337l-1.02 1.02a12.04 12.04 0 0 0 4.292 4.292l1.02-1.02a2.25 2.25 0 0 1 2.337-.56l2.17.723a2.25 2.25 0 0 1 1.522 2.12V19.5c0 1.243-1.007 2.25-2.25 2.25h-.75C9.147 21.75 2.25 14.853 2.25 6.75Z" />
            </svg>
          </span>
          <p className="text-sm leading-7 text-[#f1e9d9]">
            טלפון: 036234565
          </p>
        </div>

        <div className="hidden h-8 w-px bg-[#c9b587]/30 sm:block" />

        {/* מייל */}
        <div className="flex items-center gap-3 transition-colors duration-300 hover:text-[#e6d7b5]">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9b587]/40 bg-white/5 text-[#e6d7b5]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75m19.5 0-9.75 6.75L2.25 6.75" />
            </svg>
          </span>
          <p className="text-sm leading-7 text-[#f1e9d9]">
         vellora@gmail.com :מייל  
          </p>
        </div>

      </div>

      <div className="mx-auto mt-8 h-px max-w-xs bg-gradient-to-l from-transparent via-[#c9b587]/40 to-transparent" />

      <p className="mt-5 text-xs tracking-widest text-[#c9bda8]">
        VELLORA · HOSPITALITY & COMFORT
      </p>
    </div>
  )
}
