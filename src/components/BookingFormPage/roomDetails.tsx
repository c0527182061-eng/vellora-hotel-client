
import { getRoomsById } from '../../hooks/useQuery'
import { useParams } from 'react-router'
import noImage from "../../assets/no_image.png"

export default function RoomDetails() {
    const {roomId}=useParams()
      const { data, isLoading: isLoad, error } = getRoomsById(
    roomId ? roomId : ""
  )


  if (isLoad)
    return (
      <div
        dir="rtl"
        className="flex min-h-[60vh] items-center justify-center bg-[#fffdf8] px-4"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#e8decc] border-t-[#a4874c]" />
          <p className="text-sm text-[#95866e]">טוען נתונים...</p>
        </div>
      </div>
    )

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#f7f4ed] px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,177,124,0.16),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(223,211,185,0.35),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error?.response?.data?.error?.message ||
              "אירעה שגיאה בטעינת פרטי החדר"}
          </div>
        )}

        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#a4874c]">
            VELLORA HOTEL
          </p>

          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#423a2d] sm:text-4xl">
            החופשה שלכם מתחילה כאן
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#81735b] sm:text-base">
            השלימו את פרטי ההזמנה ונשמח לארח אתכם בחוויית אירוח מוקפדת.
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-[#d8c49b]" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#b49a66]" />
            <span className="h-px w-12 bg-[#d8c49b]" />
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="overflow-hidden rounded-2xl border border-[#e5dcc9] bg-[#fffefa] shadow-[0_24px_70px_-30px_rgba(92,73,39,0.25)]">
            <div className="relative overflow-hidden bg-[#f2ece1]">
              <img
                src={
                  data?.imageUrl
                    ? `${data.imageUrl}`
                    : noImage
                }
                alt="תמונת החדר"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.02] sm:aspect-[16/10]"
              />

              <div className="absolute bottom-4 right-4 rounded-full border border-white/40 bg-[#fffefa]/95 px-4 py-2 text-sm font-semibold text-[#715a31] shadow-sm">
                {data?.type}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="mb-2 text-xs font-semibold tracking-widest text-[#a4874c]">
                פרטי החדר
              </p>

              <h2 className="font-serif text-2xl font-semibold text-[#51432e] sm:text-3xl">
                {data?.name}
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#81735b]">
                {data?.description}
              </p>

              <div className="my-6 border-t border-[#e8deca]" />

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-[#81735b]">מחיר ללילה</p>
                  <p className="mt-1 text-2xl font-bold text-[#947641]">
                    {data?.pricePerNight?.toLocaleString("he-IL")} ₪
                  </p>
                </div>

                <span className="rounded-lg bg-[#f8f4eb] px-3 py-2 text-xs text-[#81735b]">
                  אירוח בסטנדרט גבוה
                </span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

