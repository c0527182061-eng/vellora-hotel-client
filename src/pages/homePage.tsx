
import Card from "../components/homePage/card";
import Filter from "../components/homePage/filter";
import { getRoomsUseQuery } from "../hooks/useQuery";
import { useSearchParams } from "react-router";
import type { RoomSort, RoomType } from "../types/room";

const HomePage = () => {
    const [searchParams] = useSearchParams()
    const filters = {
        checkIn: searchParams.get("checkIn") ?? undefined,
        checkOut: searchParams.get("checkOut") ?? undefined,
        type: (searchParams.get("type") as RoomType) ?? undefined,
        sort: (searchParams.get("sort") as RoomSort) ?? undefined,
        search: searchParams.get("search") ?? undefined,
        minPrice: (searchParams.get("minPrice")) ? Number(searchParams.get("minPrice")) : undefined,
        maxPrice: (searchParams.get("maxPrice")) ? Number(searchParams.get("maxPrice")) : undefined,
        guests: (searchParams.get("guests")) ? Number(searchParams.get("guests")) : undefined,
    }

    const { data, error, isLoading } = getRoomsUseQuery("allRooms", filters)

    return (
        <>
            <div
                dir="rtl"
                className="grid h-[calc(100vh-154px)] grid-cols-1 gap-5 overflow-hidden bg-gradient-to-br from-[#faf7f2] via-[#fffdf8] to-[#f3eadf] px-4 py-5 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6 lg:pe-5"
            >
                <aside className="h-full min-h-0 min-w-0 overflow-y-auto overflow-x-hidden rounded-3xl border border-[#e9dfd2] bg-white/85 p-3 shadow-[0_8px_30px_rgba(61,48,40,0.06)] backdrop-blur-sm">
                    <Filter />
                </aside>

                <main className="min-h-0 min-w-0 overflow-y-auto overflow-x-hidden rounded-3xl border border-[#eee5d9] bg-white/60 p-4 shadow-[0_8px_30px_rgba(61,48,40,0.04)] sm:p-6 lg:p-7">
                    <div className="mb-6 flex items-center justify-between border-b border-[#e9dfd2] pb-5">
                        <div>
                            <p className="mb-1 text-xs font-semibold tracking-[0.22em] text-[#b08d57]">
                                VELLORA HOTEL
                            </p>
                            <h1 className="text-2xl font-semibold tracking-tight text-[#3d3028] sm:text-3xl">
                                החדרים שלנו
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-[#8a796b]">
                                מצאו את החדר המושלם לחופשה שלכם
                            </p>
                        </div>

                        <div className="hidden h-14 w-14 items-center justify-center rounded-2xl border border-[#e9dcc9] bg-gradient-to-br from-[#f8f0e4] to-[#ead9c1] sm:flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                className="h-7 w-7 text-[#9b794b]"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V8l9-5 9 5v13M3 11h18M7 21v-6h10v6M8 8h.01M12 8h.01M16 8h.01" />
                            </svg>
                        </div>
                    </div>

                    {isLoading && (
                        <div className="flex min-h-48 flex-col items-center justify-center gap-4 rounded-2xl border border-[#eee5d9] bg-white/80 p-8 text-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#eadfce] border-t-[#b08d57]" />
                            <p className="text-sm font-medium text-[#6f5a49]">טוען נתונים...</p>
                        </div>
                    )}

                    {error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50/80 px-5 py-4 text-sm leading-6 text-red-700">
                            {error.response?.data?.error?.message ?? "אין חיבור לשרת"}
                        </div>
                    )}

                    {data && data.length === 0 && (
                        <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-[#d9c7af] bg-white/70 px-6 py-10 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4eadc] text-[#a17e4f]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="h-8 w-8"
                                >
                                    <circle cx="11" cy="11" r="7" />
                                    <path strokeLinecap="round" d="m16 16 4 4M8 11h6" />
                                </svg>
                            </div>
                            <p className="text-lg font-semibold text-[#3d3028]">לא נמצאו חדרים מתאימים</p>
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        {error?.response?.data?.error?.message}
                        <div dir="rtl" className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {data?.map(r => {
                                return r.status == "AVAILABLE" && <Card key={r.id} id={r.id} imageUrl={r.imageUrl} name={r.name} type={r.type} description={r.description} />
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default HomePage;
