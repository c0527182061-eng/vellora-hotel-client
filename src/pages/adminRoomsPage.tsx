import { Link } from "react-router"
import Card from "../components/homePage/card"
import { getAllRooms1 } from "../hooks/useQuery"
import { deleteRoom1 } from "../hooks/useMutation"
import { useQueryClient } from "@tanstack/react-query"


export default function AdminRoomsPage() {


  const { data, isLoading, error } = getAllRooms1()
  const queryClient=useQueryClient()
  const deleteRoom=deleteRoom1()

const delete1=(id:string)=>
{
      const text = "לאשר את המחיקה"
    if (!window.confirm(text)) return
deleteRoom.mutate(id,{
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllRooms"] })
        } 
})


}

  if (isLoading)
    return <p>טוען נתונים...</p>
  return <>

    <p>{error?.response?.data?.error?.message} </p>
    {!data && <p>לא נמצאו תוצאות</p>}
    {data?.map(r => {
      return <div key={r.id}>
        <Card id={r.id} imageUrl={r.imageUrl} name={r.name} type={r.type} description={r.description} />
        <Link to={`/admin/rooms/${r.id}/edit`}>עריכת החדר</Link>
        <button onClick={()=>delete1(r.id)} >מחיקת החדר</button>
        {deleteRoom.error?.response?.data?.error?.message}
      </div>
    }
    )}
  </>
}
