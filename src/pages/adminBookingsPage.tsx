
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

    decideBooking.mutate({ id: id, decision: { status: status } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllBookings"] })
        }     

      },

    )


  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#faf7f2] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold tracking-widest text-[#b08d57]">
            VELLORA · ADMINISTRATION
          </p>
          <h1 className="text-3xl font-bold text-[#3d3028] sm:text-4xl">
            ניהול הזמנות
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#8b7b70] sm:text-base">
            צפייה בפרטי ההזמנות וטיפול בהזמנות הממתינות לאישור
          </p>
          <div className="mt-5 h-1 w-20 rounded-full bg-[#b08d57]" />
        </div>

        {isLoading && (
          <div className="rounded-2xl border border-[#eee4d8] bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-lg font-medium text-[#6f5a49]">טוען נתונים...</p>
          </div>
        )}

        {error?.response?.data?.error?.message && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error.response.data.error.message}
          </div>
        )}

        {!isLoading && data?.length === 0 && (
          <div className="rounded-2xl border border-[#eee4d8] bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5eee4] text-2xl">
              ✦
            </div>
            <h2 className="text-xl font-bold text-[#3d3028]">אין הזמנות להצגה</h2>
            <p className="mt-2 text-sm text-[#8b7b70]">
              הזמנות חדשות שייווצרו יופיעו כאן
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {data?.map(b =>
            <div
              key={b.id}
              className="overflow-hidden rounded-3xl border border-[#eee4d8] bg-white shadow-[0_8px_30px_rgba(74,55,40,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(74,55,40,0.10)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e8de] bg-gradient-to-l from-[#f8f1e7] to-white px-6 py-5">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#b08d57]">
                    פרטי הזמנה
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#3d3028]">
                    חדר {b.room.roomNumber}
                  </h2>
                </div>

                <span className={`rounded-full px-4 py-2 text-sm font-semibold ${b.status === "PENDING"
                  ? "bg-amber-100 text-amber-800"
                  : b.status === "APPROVED"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-red-100 text-red-700"
                  }`}>
                  {b.status === "PENDING"
                    ? "ממתינה לאישור"
                    : b.status === "APPROVED"
                      ? "מאושרת"
                      : b.status === "REJECTED"
                        ? "נדחתה"
                        : b.status}
                </span>
              </div>

              <div className="space-y-6 p-6">

                <section>
                  <h3 className="mb-3 border-r-2 border-[#b08d57] pr-3 text-sm font-bold text-[#6f5a49]">
                    פרטי האורח
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-[#faf7f2] p-3">
                      <p className="mb-1 text-xs text-[#9b8a7c]">שם האורח</p>
                      <p className="font-semibold text-[#3d3028]">{b.guestName || "לא צוין"}</p>
                    </div>
                    <div className="rounded-xl bg-[#faf7f2] p-3">
                      <p className="mb-1 text-xs text-[#9b8a7c]">מספר טלפון</p>
                      <p dir="ltr" className="text-right font-semibold text-[#3d3028]">{b.phone}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3 border-r-2 border-[#b08d57] pr-3 text-sm font-bold text-[#6f5a49]">
                    פרטי השהייה
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-[#faf7f2] p-3">
                      <p className="mb-1 text-xs text-[#9b8a7c]">תאריך כניסה</p>
                      <p className="font-semibold text-[#3d3028]">{b.checkIn}</p>
                    </div>
                    <div className="rounded-xl bg-[#faf7f2] p-3">
                      <p className="mb-1 text-xs text-[#9b8a7c]">תאריך יציאה</p>
                      <p className="font-semibold text-[#3d3028]">{b.checkOut}</p>
                    </div>
                    <div className="rounded-xl bg-[#faf7f2] p-3">
                      <p className="mb-1 text-xs text-[#9b8a7c]">מספר חדר</p>
                      <p className="font-semibold text-[#3d3028]">{b.room.roomNumber}</p>
                    </div>
                    <div className="rounded-xl bg-[#faf7f2] p-3">
                      <p className="mb-1 text-xs text-[#9b8a7c]">קומה</p>
                      <p className="font-semibold text-[#3d3028]">{b.room.floor}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3 border-r-2 border-[#b08d57] pr-3 text-sm font-bold text-[#6f5a49]">
                    פרטי תשלום
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-[#faf7f2] p-3">
                      <p className="mb-1 text-xs text-[#9b8a7c]">מחיר כולל</p>
                      <p className="text-xl font-bold text-[#9a7441]">₪{b.totalPrice}</p>
                    </div>
                    <div className="rounded-xl bg-[#faf7f2] p-3">
                      <p className="mb-1 text-xs text-[#9b8a7c]">תאריך יצירת ההזמנה</p>
                      <p className="font-semibold text-[#3d3028]">{b.createdAt}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3 border-r-2 border-[#b08d57] pr-3 text-sm font-bold text-[#6f5a49]">
                    הערות להזמנה
                  </h3>
                  <div className="min-h-12 rounded-xl bg-[#faf7f2] p-3 text-sm leading-6 text-[#6f5a49]">
                    {b.notes || "לא נוספו הערות"}
                  </div>
                </section>

                <div className="border-t border-[#f0e8de] pt-5">
                  <p className="mb-3 text-xs text-[#9b8a7c]">מזהה החדר: {b.room.roomNumber}</p>
                  {decideBooking.error && (
                    <p>{decideBooking.error.response?.data?.error?.message}</p>
                  )}
                  {b.status == "PENDING" && (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        onClick={() => decide(b.id, "APPROVED")}
                        disabled={decideBooking.isPending}
                        className="flex-1 rounded-xl bg-[#8b7653] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#6f5d41] focus:outline-none focus:ring-2 focus:ring-[#b08d57] focus:ring-offset-2"
                      >
                        ✓ אישור הזמנה
                      </button>
                      <button
                        onClick={() => decide(b.id, "REJECTED")}
                        disabled={decideBooking.isPending}
                        className="flex-1 rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
                      >
                        ✕ דחיית הזמנה
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
