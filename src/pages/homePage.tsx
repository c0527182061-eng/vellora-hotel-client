
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

    return <>
        <div
            dir="rtl"
            className="grid h-[calc(100vh-154px)] grid-cols-[280px_minmax(0,1fr)] gap-5 overflow-hidden ps-0 pe-3"
        >

            <aside className="h-full min-h-0 min-w-0 overflow-y-auto overflow-x-hidden">
                <Filter />
            </aside>
            {isLoading && <p>טוען נתונים...</p>}
            {error && <p>{error.response?.data?.error?.message ?? "אין חיבור לשרת"}</p>}
            {data && data.length === 0 && <p>לא נמצאו חדרים מתאימים</p>}

            <main className="min-h-0 min-w-0 overflow-y-auto overflow-x-hidden pe-2 pb-8">
                <div className="min-w-0 flex-1">
                    {error?.response?.data?.error?.message}
                    <div dir="rtl" className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                        {data?.map(r => {
                            return r.status == "AVAILABLE" && <Card key={r.id} id={r.id} imageUrl={r.imageUrl} name={r.name} type={r.type} description={r.description} />
                        })}
                    </div>
                </div>    </main>
        </div>





    </>

}

export default HomePage;