import { useQuery } from "@tanstack/react-query"
import { getRooms } from "../api/room"
import type { Room, RoomsQuery } from "../types/room"





export const getRoomsUseQuery= (key: string,filter:RoomsQuery={}) => {
    return useQuery(
        {
            queryKey: [key],
            queryFn: () =>getRooms(filter)
        }
    )
}