
import { Link } from "react-router"
import Card from "../components/homePage/card"
import { getAllRooms1 } from "../hooks/useQuery"
import { deleteRoom1 } from "../hooks/useMutation"
import { useQueryClient } from "@tanstack/react-query"

export default function AdminRoomsPage() {
  const { data, isLoading, error } = getAllRooms1()
  const queryClient = useQueryClient()
  const deleteRoom = deleteRoom1()

  const delete1 = (id: string) => {
    const text = "לאשר את המחיקה"
    if (!window.confirm(text)) return

    deleteRoom.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllRooms"] })
      }
    })
  }

  if (isLoading)
    return (
      <div dir="rtl" className="flex min-h-[50vh] items-center justify-center bg-[#faf7f2] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-11 w-11 animate-spin rounded-full border-[3px] border-[#e8decc] border-t-[#a4874c]" />
          <p className="text-sm font-medium text-[#95866e]">טוען חדרים...</p>
        </div>
      </div>
    )

  return (
    <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#faf7f2] px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#eee1cc]/60 via-[#f7f1e7]/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-8 border-b border-[#e8deca] pb-6 sm:mb-10">
          <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#a4874c]">
            VELLORA MANAGEMENT
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#51432e] sm:text-4xl">
                ניהול חדרים
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#95866e]">
                ניהול, עריכה ועדכון של חדרי המלון במקום אחד.
              </p>
            </div>
            <div className="flex w-fit items-center gap-2 rounded-full border border-[#e8deca] bg-[#fffefa]/90 px-4 py-2.5 text-xs font-medium text-[#81745f] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#b49a66]" />
              אזור ניהול
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700 shadow-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">!</span>
            <p>{error?.response?.data?.error?.message}</p>
          </div>
        )}

        {!data && (
          <div className="rounded-3xl border border-[#e8deca] bg-[#fffefa] px-6 py-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4ead9] text-[#a4874c]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
                <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 7h2m2 0h2M9 11h2m2 0h2" />
              </svg>
            </div>
            <p className="font-serif text-xl font-semibold text-[#51432e]">
              לא נמצאו תוצאות
            </p>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {data.map(r => (
              <div
                key={r.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-[#e8deca] bg-[#fffefa] p-3 shadow-[0_15px_45px_-30px_rgba(92,73,39,0.3)] transition duration-300 hover:-translate-y-1 hover:border-[#d6c29b] hover:shadow-[0_24px_55px_-30px_rgba(92,73,39,0.35)]"
              >
                <div className="min-w-0 overflow-hidden rounded-2xl">
                  <Card
                    id={r.id}
                    imageUrl={r.imageUrl}
                    name={r.name}
                    type={r.type}
                    description={r.description}
                  />
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 p-2 pt-4">
                  <Link
                    to={`/admin/rooms/${r.id}/edit`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e5d6bb] bg-[#f8f3e9] px-3 py-3 text-sm font-semibold text-[#80633f] transition duration-300 hover:border-[#c9ad7c] hover:bg-[#efe3ce] hover:shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                    </svg>
                    עריכת החדר
                  </Link>

                  <button
                    onClick={() => delete1(r.id)}
                    disabled={deleteRoom.isPending}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ecdada] bg-[#fffafa] px-3 py-3 text-sm font-semibold text-[#a45f58] transition duration-300 hover:border-[#d7aaa5] hover:bg-[#fbeeee] hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
                      <path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 10v6m4-6v6" />
                    </svg>
                    {deleteRoom.isPending ? "מוחק..." : "מחיקת החדר"}
                  </button>
                </div>

                {deleteRoom.error && (
                  <p className="mx-2 mb-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">
                    {deleteRoom.error?.response?.data?.error?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
