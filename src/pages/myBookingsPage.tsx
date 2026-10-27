
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
        className="flex min-h-[60vh] items-center justify-center bg-[#f7f4ed]"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#e8decc] border-t-[#a4874c]" />
          <p className="text-sm text-[#95866e]">טוענים את ההזמנות שלך...</p>
        </div>
      </div>
    )
  }

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#f7f4ed] px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,177,124,0.16),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(223,211,185,0.35),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#a4874c]">
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
        </header>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error?.response?.data?.error?.message ||
              'אירעה שגיאה בטעינת ההזמנות'}
          </div>
        )}

        {!error && (!data || data.length === 0) && (
          <section className="rounded-2xl border border-[#e5dcc9] bg-[#fffefa] px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f4eb] text-3xl text-[#a4874c]">
              ♧
            </div>

            <h2 className="font-serif text-2xl font-semibold text-[#51432e]">
              עדיין אין לך הזמנות
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#81735b]">
              לאחר שתשלימו הזמנה, הפרטים שלה יופיעו כאן.
            </p>
          </section>
        )}

        <div className="grid gap-7 md:grid-cols-2">
          {data?.map((book) => (
           <MySingleBooking key={book.id}  book={book}/>
          ))}
        </div>
      </div>
    </main>
  )
}
