
import { getMyBookings1 } from '../hooks/useQuery'
import { AuthContext } from '../context/userContext'
import MySingleBooking from '../components/mySingleBooking'

export default function MyBookingsPage() {
  const { user } = AuthContext()
  const { data, isLoading, error } = getMyBookings1(user?.id)

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-br from-[#faf7f2] via-[#fffdf8] to-[#f1e7d8] px-4"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border border-[#b08d57]/15" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full border border-[#b08d57]/15" />
        <div className="relative rounded-3xl border border-[#e9dfd2] bg-white/80 px-10 py-9 text-center shadow-[0_12px_40px_rgba(61,48,40,0.07)] backdrop-blur-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e7d8bd] bg-gradient-to-br from-[#faf3e7] to-[#eee0c8]">
            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#e8decc] border-t-[#a4874c]" />
          </div>
          <p className="text-sm font-medium text-[#81735b]">טוענים את ההזמנות שלך...</p>
          <div className="mx-auto mt-5 h-1 w-24 overflow-hidden rounded-full bg-[#eee5d9]">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#b08d57]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#faf7f2] via-[#fffdf8] to-[#f3eadf] px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,177,124,0.16),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(223,211,185,0.35),transparent_50%)]" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full border border-[#b08d57]/10" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full border border-[#b08d57]/10" />

      <div className="relative mx-auto max-w-6xl">
        <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-[#e8ddca] bg-white/65 px-5 py-9 text-center shadow-[0_10px_35px_rgba(61,48,40,0.05)] backdrop-blur-sm sm:px-10 sm:py-11">
          <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border border-[#b08d57]/15" />
          <div className="pointer-events-none absolute -right-1 -top-5 h-24 w-24 rounded-full border border-[#b08d57]/15" />
          <div className="pointer-events-none absolute -bottom-16 -left-8 h-40 w-40 rounded-full border border-[#b08d57]/10" />

          <div className="relative">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e7d8bd] bg-gradient-to-br from-[#faf3e7] to-[#eee0c8] shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-7 w-7 text-[#9b794b]"
              >
                <rect x="5" y="4" width="14" height="17" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 4V2.8h6V4M8 9h8M8 13h8M8 17h4" />
              </svg>
            </div>

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#a4874c] sm:text-xs">
              VELLORA HOTEL
            </p>

            <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#423a2d] sm:text-4xl">
              ההזמנות שלי
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#81735b] sm:text-base">
              כאן תוכלו לצפות בפרטי ההזמנות שלכם ובסטטוס העדכני שלהן.
            </p>

            <div className="mx-auto mt-6 flex items-center justify-center gap-2">
              <span className="h-px w-12 bg-[#d8c49b]" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#b49a66]" />
              <span className="h-px w-12 bg-[#d8c49b]" />
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-sm leading-6 text-red-700 shadow-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
              </svg>
            </div>
            <p>
              {error?.response?.data?.error?.message ||
                'אירעה שגיאה בטעינת ההזמנות'}
            </p>
          </div>
        )}

        {!error && (!data || data.length === 0) && (
          <section className="relative overflow-hidden rounded-3xl border border-[#e5dcc9] bg-white/80 px-6 py-14 text-center shadow-[0_10px_35px_rgba(61,48,40,0.05)] backdrop-blur-sm">
            <div className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full border border-[#b08d57]/10" />

            <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#e7d8bd] bg-gradient-to-br from-[#faf3e7] to-[#eee0c8] text-3xl text-[#a4874c] shadow-sm">
              ♧
            </div>

            <h2 className="relative font-serif text-2xl font-semibold text-[#51432e]">
              עדיין אין לך הזמנות
            </h2>

            <p className="relative mt-3 text-sm leading-7 text-[#81735b]">
              לאחר שתשלימו הזמנה, הפרטים שלה יופיעו כאן.
            </p>

            <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-l from-transparent via-[#c9b587] to-transparent" />
          </section>
        )}

        <div className="grid gap-7 md:grid-cols-2">
          {data?.map((book) => (
            <MySingleBooking key={book.id} book={book} />
          ))}
        </div>
      </div>
    </main>
  )
}
