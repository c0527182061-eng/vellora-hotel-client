export default function Footer() {
  return (
    <div className="group relative mt-16 overflow-hidden border-t border-[#d8c49b]/40 bg-gradient-to-br from-[#4b4032] via-[#423a2d] to-[#342c23] px-5 py-12 text-center text-[#f7f2e7] shadow-[0_-12px_40px_rgba(66,58,45,0.10)] sm:px-8 sm:py-14">
 
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-l from-[#a88a50] via-[#f0e2bf] to-[#a88a50]" />

      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-[#d8c49b]/10 transition-transform duration-1000 group-hover:scale-110" />
      <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border border-[#d8c49b]/10" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full border border-[#d8c49b]/10 transition-transform duration-1000 group-hover:scale-110" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(230,215,181,0.07),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl">
 
        <div className="mb-9 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9b587]/70 sm:w-16" />
            <span className="text-[10px] font-medium tracking-[0.35em] text-[#d8c49b] sm:text-xs">
              VELLORA HOTEL
            </span>
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9b587]/70 sm:w-16" />
          </div>

          <h2 className="text-xl font-light tracking-[0.12em] text-[#fffdf8] sm:text-2xl">
            VELLORA
          </h2>

          <p className="max-w-md text-xs leading-6 text-[#d8cfc0] sm:text-sm">
            הפרטים שלנו, כדי שתמיד תהיו קרובים אלינו
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">

          <div className="group/item flex items-center gap-4 rounded-2xl border border-[#c9b587]/15 bg-white/[0.035] px-5 py-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-[#c9b587]/45 hover:bg-white/[0.07] hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9b587]/30 bg-gradient-to-br from-[#c9b587]/15 to-transparent text-[#e6d7b5] transition-all duration-300 group-hover/item:scale-105 group-hover/item:border-[#d8c49b]/60 group-hover/item:bg-[#c9b587]/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </span>

            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-medium tracking-[0.2em] text-[#c9b587]">
                ADDRESS
              </p>
              <p className="text-sm leading-6 text-[#f1e9d9] transition-colors duration-300 group-hover/item:text-white">
                כתובתינו: הארזים 8 נתניה
              </p>
            </div>
          </div>


          <div className="group/item flex items-center gap-4 rounded-2xl border border-[#c9b587]/15 bg-white/[0.035] px-5 py-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-[#c9b587]/45 hover:bg-white/[0.07] hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9b587]/30 bg-gradient-to-br from-[#c9b587]/15 to-transparent text-[#e6d7b5] transition-all duration-300 group-hover/item:scale-105 group-hover/item:border-[#d8c49b]/60 group-hover/item:bg-[#c9b587]/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.386c.967 0 1.817.617 2.12 1.522l.723 2.17a2.25 2.25 0 0 1-.56 2.337l-1.02 1.02a12.04 12.04 0 0 0 4.292 4.292l1.02-1.02a2.25 2.25 0 0 1 2.337-.56l2.17.723a2.25 2.25 0 0 1 1.522 2.12V19.5c0 1.243-1.007 2.25-2.25 2.25h-.75C9.147 21.75 2.25 14.853 2.25 6.75Z" />
              </svg>
            </span>

            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-medium tracking-[0.2em] text-[#c9b587]">
                PHONE
              </p>
              <p className="text-sm leading-6 text-[#f1e9d9] transition-colors duration-300 group-hover/item:text-white">
                טלפון: 036234565
              </p>
            </div>
          </div>


          <div className="group/item flex items-center gap-4 rounded-2xl border border-[#c9b587]/15 bg-white/[0.035] px-5 py-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-[#c9b587]/45 hover:bg-white/[0.07] hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9b587]/30 bg-gradient-to-br from-[#c9b587]/15 to-transparent text-[#e6d7b5] transition-all duration-300 group-hover/item:scale-105 group-hover/item:border-[#d8c49b]/60 group-hover/item:bg-[#c9b587]/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75m19.5 0-9.75 6.75L2.25 6.75" />
              </svg>
            </span>

            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-medium tracking-[0.2em] text-[#c9b587]">
                EMAIL
              </p>
              <p className="break-all text-sm leading-6 text-[#f1e9d9] transition-colors duration-300 group-hover/item:text-white">
                vellora@gmail.com :מייל
              </p>
            </div>
          </div>
        </div>


        <div className="mx-auto mt-10 flex max-w-sm items-center justify-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9b587]/50" />
          <span className="h-2 w-2 rotate-45 border border-[#d8c49b]/70 transition-transform duration-500 group-hover:rotate-[135deg]" />
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9b587]/50" />
        </div>


        <div className="mt-6">
          <p className="text-[10px] font-medium tracking-[0.25em] text-[#d8c49b] transition-colors duration-300 hover:text-[#fff0cc] sm:text-xs">
            VELLORA · HOSPITALITY & COMFORT
          </p>

          <p className="mt-3 text-[10px] text-[#c9bda8]/70">
            © VELLORA HOTEL
          </p>
        </div>
      </div>
    </div>
  )
}