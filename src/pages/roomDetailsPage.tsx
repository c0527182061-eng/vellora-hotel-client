
import { Link, useParams, useSearchParams } from 'react-router'
import { AuthContext } from '../context/userContext';
import RoomDetails from '../components/BookingFormPage/roomDetails';

export default function RoomDetailsPage() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const { user, isLoading } = AuthContext()

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#faf7f2] px-4 py-8 sm:px-8 sm:py-12 lg:px-12"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-3 border-b border-[#e8deca] pb-6 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#a4874c]">
              VELLORA COLLECTION
            </p>

            <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#51432e] sm:text-4xl">
              פרטי החדר
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#95866e]">
              גלו את החדר, את המאפיינים שלו ואת כל מה שצריך לקראת השהייה שלכם.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-[#e8deca] bg-[#fffefa]/80 px-4 py-2 text-xs font-medium text-[#81745f] shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#b49a66]" />
            חוויית אירוח מוקפדת
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-9">
          <div className="min-w-0">
            <RoomDetails />
          </div>

          <div className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-8">
            {!isLoading && (
              !user ? (
                <div className="group relative overflow-hidden rounded-3xl border border-[#e8decc] bg-[#fffefa] shadow-[0_20px_55px_-30px_rgba(92,73,39,0.28)] transition duration-300 hover:border-[#d6c29b]">
                  <div className="h-1.5 w-full bg-gradient-to-l from-[#80633f] via-[#c9ad7c] to-[#eee1cc]" />

                  <div className="relative p-6 sm:p-8">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e8deca] bg-gradient-to-br from-[#f4ead9] to-[#fffaf0] text-[#947641] shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="h-6 w-6"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>

                    <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#a4874c]">
                      YOUR STAY BEGINS HERE
                    </p>

                    <h2 className="font-serif text-xl font-semibold leading-snug text-[#51432e] sm:text-2xl">
                      מתכננים את השהייה הבאה שלכם?
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-[#95866e]">
                      התחברו כדי להמשיך לתהליך ההזמנה.
                    </p>

                    <div className="my-6 border-t border-[#eee5d6]" />

                    <Link
                      to="/login"
                      className="group/link inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-l from-[#80633f] to-[#9a7a4c] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(92,73,39,0.55)] transition duration-300 hover:-translate-y-0.5 hover:from-[#6b5235] hover:to-[#80633f] hover:shadow-lg"
                    >
                      התחברו כדי להזמין

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-x-1"
                      >
                        <path d="M19 12H5m7-7-7 7 7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ) : user.role === "CUSTOMER" ? (
                <div className="group relative overflow-hidden rounded-3xl border border-[#e8decc] bg-[#fffefa] shadow-[0_20px_55px_-30px_rgba(92,73,39,0.28)] transition duration-300 hover:border-[#d6c29b]">
                  <div className="h-1.5 w-full bg-gradient-to-l from-[#80633f] via-[#c9ad7c] to-[#eee1cc]" />

                  <div className="relative p-6 sm:p-8">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e8deca] bg-gradient-to-br from-[#f4ead9] to-[#fffaf0] text-[#947641] shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="h-6 w-6"
                      >
                        <path d="M3 10.5 12 3l9 7.5V21H3z" />
                        <path d="M9 21v-7h6v7" />
                      </svg>
                    </div>

                    <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#a4874c]">
                      YOUR NEXT ESCAPE
                    </p>

                    <h2 className="font-serif text-xl font-semibold leading-snug text-[#51432e] sm:text-2xl">
                      החדר הבא שלכם מחכה לכם
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-[#95866e]">
                      המשיכו לבקשת ההזמנה ובחרו את פרטי השהייה.
                    </p>

                    <div className="my-6 border-t border-[#eee5d6]" />

                    <Link
                      to={`/rooms/${roomId}/book?${searchParams.toString()}`}
                      className="group/link inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-l from-[#80633f] to-[#9a7a4c] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(92,73,39,0.55)] transition duration-300 hover:-translate-y-0.5 hover:from-[#6b5235] hover:to-[#80633f] hover:shadow-lg"
                    >
                      בקשת הזמנה

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-x-1"
                      >
                        <path d="M19 12H5m7-7-7 7 7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
