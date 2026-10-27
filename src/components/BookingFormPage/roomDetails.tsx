import { getRoomsById } from '../../hooks/useQuery'
import { useParams } from 'react-router'
import noImage from "../../assets/no_image.png"

export default function RoomDetails() {
  const { roomId } = useParams()
  const { data, isLoading: isLoad, error } = getRoomsById(
    roomId ? roomId : ""
  )

  if (isLoad)
    return (
      <div
        dir="rtl"
        className="flex min-h-[300px] items-center justify-center bg-[#fffefa] px-4"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#e8decc] border-t-[#a4874c]" />
          <p className="text-sm text-[#95866e]">טוען נתונים...</p>
        </div>
      </div>
    )

  return (
    <div dir="rtl" className="w-full bg-transparent p-0">
      {error && (
        <div className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error?.response?.data?.error?.message ||
            "אירעה שגיאה בטעינת פרטי החדר"}
        </div>
      )}

      <section className="group w-full overflow-hidden rounded-3xl border border-[#e8ddca] bg-[#fffefa] shadow-[0_18px_55px_-25px_rgba(92,73,39,0.22)]">
        <div className="relative overflow-hidden bg-[#f2ece1]">
          <img
            src={data?.imageUrl ? data.imageUrl : noImage}
            alt="תמונת החדר"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:aspect-[16/10]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#30271f]/40 via-transparent to-transparent" />

          <div className="absolute right-4 top-4 rounded-full border border-white/60 bg-white/95 px-4 py-2 text-xs font-semibold tracking-wide text-[#715a31] shadow-lg backdrop-blur-md">
            VELLORA COLLECTION
          </div>

          <div className="absolute bottom-4 right-4 rounded-full border border-white/50 bg-[#fffefa]/95 px-4 py-2 text-sm font-semibold text-[#715a31] shadow-lg backdrop-blur-md">
            {data?.type}
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-[#a4874c]">
            פרטי החדר
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#51432e] sm:text-3xl">
            {data?.name}
          </h2>

          <div className="mt-4 flex items-center gap-2">
            <span className="h-px w-8 bg-[#c9ad7c]" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#b49a66]" />
          </div>

          <p className="mt-4 text-sm leading-7 text-[#81735b]">
            {data?.description}
          </p>

          <div className="my-6 border-t border-[#e8deca]" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-[#eee5d6] bg-gradient-to-br from-[#fffdf8] to-[#f8f4eb] p-4 transition duration-300 hover:border-[#d8c49b] hover:shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eee3ce] text-[#947641]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                >
                  <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#95866e]">קומה</p>
                <p className="mt-1 text-sm font-bold text-[#51432e]">
                  {data?.floor}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#eee5d6] bg-gradient-to-br from-[#fffdf8] to-[#f8f4eb] p-4 transition duration-300 hover:border-[#d8c49b] hover:shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eee3ce] text-[#947641]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                >
                  <circle cx="9" cy="8" r="3.5" />
                  <path d="M2.5 20v-1.5A5.5 5.5 0 0 1 8 13h2a5.5 5.5 0 0 1 5.5 5.5V20M16 4.8a3.5 3.5 0 0 1 0 6.7M17 14h.5a4 4 0 0 1 4 4v2" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#95866e]">מספר אורחים מרבי</p>
                <p className="mt-1 text-sm font-bold text-[#51432e]">
                  {data?.maxGuests}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#eee5d6] bg-gradient-to-br from-[#fffdf8] to-[#f8f4eb] p-4 transition duration-300 hover:border-[#d8c49b] hover:shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eee3ce] text-[#947641]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                >
                  <rect x="4" y="3" width="16" height="18" rx="2" />
                  <path d="M8 7h8M8 11h8M8 15h3" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#95866e]">מספר חדר</p>
                <p className="mt-1 text-sm font-bold text-[#51432e]">
                  {data?.roomNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="my-6 border-t border-[#e8deca]" />

          <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-l from-[#f8f4eb] to-[#fffdf8] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-[#81735b]">מחיר ללילה</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#947641]">
                {data?.pricePerNight?.toLocaleString("he-IL")} ₪
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#e8deca] bg-white/80 px-4 py-3 text-xs font-medium text-[#81735b] shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-4 w-4 text-[#a4874c]"
              >
                <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z" />
              </svg>
              אירוח בסטנדרט גבוה
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}