import Card from "../components/card";
import { getRoomsUseQuery } from "../hooks/useQuery";



const HomePage = () => {


const {data,error,isLoading}=getRoomsUseQuery("allRooms")

    if(isLoading) return <p>טוען נתונים</p>
    if(!data)
     return<p>לא נמצאו תוצאות</p>
    return <>
    {error?.response?.data?.error?.message}
        <div dir="rtl" className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-5 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

    {data?.map(r=><Card key={r.id} roomNumber={r.roomNumber} imageUrl={r.imageUrl} name={r.name} type={r.type} description={r.description} />)}
    </div>
    </>

}

export default HomePage;