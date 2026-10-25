
import { Link } from 'react-router'
import type { RoomCard } from '../types/room'

export default function Card(r: RoomCard) {
    return (
        <Link to={`/rooms/:${(r.roomNumber)}`}>
        <div className="group flex h-[420px] flex-col overflow-hidden rounded-2xl border border-[#e8dfce] bg-[#fffefa] shadow-[0_8px_30px_rgba(75,60,38,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(75,60,38,0.14)]">
            <div className="relative h-56 overflow-hidden bg-[#f0ebe1]">
                <img
                    src={r.imageUrl ?`${import.meta.env.VITE_API_URL}${r.imageUrl}`: "../src/assets/no_image.png"}
                    alt="תמונת החדר"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-6 text-right">
                <p className="mb-2 text-2xl font-semibold tracking-tight text-[#423a2d] transition-colors duration-300 group-hover:text-[#8a754c]">
                    {r.name}
                </p>

                <div className="mb-4 inline-flex rounded-full border border-[#d9c9a5] bg-[#f7f2e7] px-3 py-1 text-xs font-semibold text-[#806a43]">
                    {r.type}
                </div>

                <div className="mb-4 h-px w-full bg-gradient-to-l from-[#c9b587] via-[#e8dfce] to-transparent" />

                <p className="text-sm leading-7 text-[#827968]">
                    {r.description}
                </p>
            </div>
        </div>
        </Link>
    )
}
