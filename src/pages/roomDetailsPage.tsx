
import { Link, useParams, useSearchParams } from 'react-router'
import { getRoomsById } from '../hooks/useQuery';
import { AuthContext } from '../context/userContext';
import noImage from "../assets/no_image.png"

export default function RoomDetailsPage() {
  const { roomId } = useParams();
  const { data, isLoading:isLoad, error } = getRoomsById(roomId ? roomId : "");
   const [searchParams] = useSearchParams();
   const { user, isLoading } = AuthContext()
  if (isLoad)
    return (
      <div dir="rtl" className="flex min-h-[60vh] items-center justify-center bg-[#fffdf8]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#e8decc] border-t-[#a4874c]" />
          <p className="text-sm text-[#95866e]">טוען נתונים...</p>
        </div>
      </div>
    );
    if(!data)
      return <p>לא נמצא מוצר</p>

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-[#fcfaf6] px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 border-b border-[#e8decc] pb-6">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#a4874c]">
            VELLORA
          </span>
          <h1 className="mt-2 font-serif text-3xl font-medium text-[#51432e] sm:text-4xl">
            פרטי החדר
          </h1>
          <p className="mt-2 text-sm text-[#95866e]">
            כל הפרטים על החדר שבחרתם
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error?.response?.data?.error?.message || "אירעה שגיאה בטעינת פרטי החדר"}
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">

            <div className="overflow-hidden rounded-3xl border border-[#e8decc] bg-white shadow-[0_15px_45px_rgba(83,66,38,0.08)]">
              <div className="h-1 bg-gradient-to-l from-[#a78a50] via-[#e7d7b2] to-[#a78a50]" />

              <div className="relative overflow-hidden bg-[#f2ece1]">
                <img
                  src={data?.imageUrl ? `${data.imageUrl}` :noImage}
                  alt="תמונת החדר"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.02] sm:aspect-[16/10]"
                />
                <span className="absolute right-5 top-5 rounded-full border border-white/70 bg-[#fffdf8]/95 px-4 py-2 text-xs font-semibold tracking-wide text-[#80683e] shadow-sm">
                  {data.type}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-semibold text-[#51432e] sm:text-3xl">
                  {data.name}
                </h2>

                <p className="mt-3 leading-8 text-[#81745f]">
                  {data.description || "פרטי החדר יופיעו כאן."}
                </p>
              </div>
            </div>

            <section className="overflow-hidden rounded-3xl border border-[#e8decc] bg-[#fffdf8] shadow-[0_15px_45px_rgba(83,66,38,0.06)]">
              <div className="border-b border-[#eee5d6] bg-[#f7f1e6] px-6 py-5">
                <h2 className="font-serif text-xl font-semibold text-[#51432e]">
                  מאפייני החדר
                </h2>
                <p className="mt-1 text-sm text-[#95866e]">
                  כל מה שחשוב לדעת לפני ההזמנה
                </p>
              </div>

              <div className="space-y-0 px-6">
                <div className="flex items-center justify-between gap-4 border-b border-[#eee5d6] py-5">
                  <span className="text-sm text-[#95866e]">מספר חדר</span>
                  <span className="font-semibold text-[#51432e]">{data.roomNumber}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-[#eee5d6] py-5">
                  <span className="text-sm text-[#95866e]">סוג החדר</span>
                  <span className="font-semibold text-[#51432e]">{data.type}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-[#eee5d6] py-5">
                  <span className="text-sm text-[#95866e]">מספר אורחים מרבי</span>
                  <span className="font-semibold text-[#51432e]">{data.maxGuests}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-[#eee5d6] py-5">
                  <span className="text-sm text-[#95866e]">קומה</span>
                  <span className="font-semibold text-[#51432e]">{data.floor}</span>
                </div>

                <div className="flex items-center justify-between gap-4 py-6">
                  <span className="text-sm text-[#95866e]">מחיר ללילה</span>
                  <div className="text-left">
                    <span className="font-serif text-3xl font-semibold text-[#9e8148]">
                      ₪{data.pricePerNight}
                    </span>
                    <span className="block mt-1 text-xs text-[#95866e]">
                      ללילה
                    </span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}
      </div>


{!isLoading && (
  !user ? (
    <Link to="/login" className="...">התחברו כדי להזמין</Link>
  ) : user.role === "CUSTOMER" ? (
    <Link to={`/rooms/${roomId}/book?${searchParams.toString()}`}>בקשת הזמנה</Link>
  ) : null
)}    </main>
  );
}
