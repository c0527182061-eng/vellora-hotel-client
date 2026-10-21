import { useQuery } from '@tanstack/react-query'
import { api } from '../api/api'
import type { Room } from '../types/room'

export default function Room() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () =>{
        const response=await api.get<Room[]>('/rooms')
        return response.data
    }

    
  })

  if (isLoading) return <div>טוען חדרים...</div>
  if (error) return <div>שגיאה בטעינת החדרים</div>

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}