
import { useQueryClient } from "@tanstack/react-query"
import { decideBooking1 } from "../hooks/useMutation"
import { getAllBookings1 } from "../hooks/useQuery"
import type { DecideBookingRequest } from "../types/booking"

export default function AdminBookingsPage() {
  const { data, isLoading, error } = getAllBookings1()
  const queryClient = useQueryClient()
  const decideBooking = decideBooking1()

  const decide = (id: string, status: DecideBookingRequest["status"]) => {
    const text = status === "APPROVED" ? "לאשר את ההזמנה?" : "לדחות את ההזמנה?"
    if (!window.confirm(text)) return

    decideBooking.mutate(
      { id: id, decision: { status: status } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllBookings"] })
        }
      }
    )
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#faf7f2] px-4 py-7 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 border-b border-[#e8deca] pb-5">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-[#b08d57]">
            VELLORA · ADMINISTRATION
          </p>
          <h1 className="font-serif text-3xl font-semibold text-[#3d3028] sm:text-4xl">
            ניהול הזמנות
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#8b7b70]">
            צפייה בפרטי ההזמנות וטיפול בהזמנות הממתינות לאישור
          </p>
        </div>

        {isLoading && (
          <div className="rounded-2xl border border-[#eee4d8] bg-white px-6 py-10 text-center">
            <p className="text-sm font-medium text-[#6f5a49]">טוען נתונים...</p>
          </div>
        )}

        {error?.response?.data?.error?.message && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error.response.data.error.message}
          </div>
        )}

        {!isLoading && data?.length === 0 && (
          <div className="rounded-2xl border border-[#eee4d8] bg-white px-6 py-10 text-center">
            <h2 className="text-lg font-semibold text-[#3d3028]">אין הזמנות להצגה</h2>
            <p className="mt-2 text-sm text-[#8b7b70]">
              הזמנות חדשות שייווצרו יופיעו כאן
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data?.map(b => (
            <div
              key={b.id}
              className="overflow-hidden rounded-2xl border border-[#e8deca] bg-[#fffefa] shadow-[0_5px_20px_-12px_rgba(74,55,40,0.2)] transition duration-300 hover:border-[#d6c29b] hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[#eee5d6] bg-gradient-to-l from-[#f6efe3] to-[#fffefa] px-4 py-3">
                <div>
                  <p className="text-[11px] font-medium text-[#a4874c]">פרטי הזמנה</p>
                  <h2 className="mt-1 text-base font-bold text-[#3d3028]">
                    חדר {b.room.roomNumber}
                  </h2>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    b.status === "PENDING"
                      ? "bg-amber-100 text-amber-800"
                      : b.status === "APPROVED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {b.status === "PENDING"
                    ? "ממתינה לאישור"
                    : b.status === "APPROVED"
                      ? "מאושרת"
                      : b.status === "REJECTED"
                        ? "נדחתה"
                        : b.status}
                </span>
              </div>

              <div className="space-y-4 p-4">
                <section>
                  <h3 className="mb-2 border-r-2 border-[#b08d57] pr-2 text-xs font-bold text-[#6f5a49]">
                    פרטי האורח
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-[#faf7f2] p-2.5">
                      <p className="mb-1 text-[11px] text-[#9b8a7c]">שם האורח</p>
                      <p className="break-words text-sm font-semibold text-[#3d3028]">
                        {b.guestName || "לא צוין"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-[#faf7f2] p-2.5">
                      <p className="mb-1 text-[11px] text-[#9b8a7c]">מספר טלפון</p>
                      <p dir="ltr" className="text-right text-sm font-semibold text-[#3d3028]">
                        {b.phone}
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-2 border-r-2 border-[#b08d57] pr-2 text-xs font-bold text-[#6f5a49]">
                    פרטי השהייה
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-[#faf7f2] p-2.5">
                      <p className="mb-1 text-[11px] text-[#9b8a7c]">תאריך כניסה</p>
                      <p className="text-sm font-semibold text-[#3d3028]">{b.checkIn}</p>
                    </div>
                    <div className="rounded-lg bg-[#faf7f2] p-2.5">
                      <p className="mb-1 text-[11px] text-[#9b8a7c]">תאריך יציאה</p>
                      <p className="text-sm font-semibold text-[#3d3028]">{b.checkOut}</p>
                    </div>
                    <div className="rounded-lg bg-[#faf7f2] p-2.5">
                      <p className="mb-1 text-[11px] text-[#9b8a7c]">מספר חדר</p>
                      <p className="text-sm font-semibold text-[#3d3028]">{b.room.roomNumber}</p>
                    </div>
                    <div className="rounded-lg bg-[#faf7f2] p-2.5">
                      <p className="mb-1 text-[11px] text-[#9b8a7c]">קומה</p>
                      <p className="text-sm font-semibold text-[#3d3028]">{b.room.floor}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-2 border-r-2 border-[#b08d57] pr-2 text-xs font-bold text-[#6f5a49]">
                    פרטי תשלום
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-[#f6efe3] p-2.5">
                      <p className="mb-1 text-[11px] text-[#9b8a7c]">מחיר כולל</p>
                      <p className="text-lg font-bold text-[#9a7441]">₪{b.totalPrice}</p>
                    </div>
                    <div className="rounded-lg bg-[#faf7f2] p-2.5">
                      <p className="mb-1 text-[11px] text-[#9b8a7c]">תאריך יצירת ההזמנה</p>
                      <p className="text-sm font-semibold text-[#3d3028]">{b.createdAt}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-2 border-r-2 border-[#b08d57] pr-2 text-xs font-bold text-[#6f5a49]">
                    הערות להזמנה
                  </h3>
                  <div className="rounded-lg bg-[#faf7f2] p-3 text-sm leading-5 text-[#6f5a49]">
                    {b.notes || "לא נוספו הערות"}
                  </div>
                </section>

                <div className="border-t border-[#eee5d6] pt-3">
                  <p className="mb-3 text-[11px] text-[#9b8a7c]">
                    מזהה החדר: {b.room.roomNumber}
                  </p>

                  {decideBooking.error && (
                    <p className="mb-3 rounded-lg bg-red-50 p-2 text-xs text-red-700">
                      {decideBooking.error.response?.data?.error?.message}
                    </p>
                  )}

                  {b.status == "PENDING" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => decide(b.id, "APPROVED")}
                        disabled={decideBooking.isPending}
                        className="flex-1 rounded-lg bg-[#8b7653] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6f5d41] focus:outline-none focus:ring-2 focus:ring-[#b08d57] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        ✓ אישור הזמנה
                      </button>
                      <button
                        onClick={() => decide(b.id, "REJECTED")}
                        disabled={decideBooking.isPending}
                        className="flex-1 rounded-lg border border-red-200 bg-white px-3 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        ✕ דחיית הזמנה
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}