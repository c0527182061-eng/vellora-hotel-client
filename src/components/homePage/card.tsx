
import { Link, useSearchParams } from 'react-router'
import type { RoomCard } from '../../types/room'
import noImage from "../../assets/no_image.png"

export default function Card(r: RoomCard) {

    const [searchParams] = useSearchParams();

    return (
        <Link
            to={`/rooms/${(r.id)}?checkIn=${searchParams.get("checkIn") ?? undefined}&checkOut=${ searchParams.get("checkOut") ?? undefined}`}
            className="group block h-full rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-[#b08d57]/30"
        >
            <div className="relative flex h-[420px] flex-col overflow-hidden rounded-3xl border border-[#e8ddca] bg-gradient-to-b from-white to-[#fffaf2] shadow-[0_8px_28px_rgba(61,48,40,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d5bd96] hover:shadow-[0_20px_42px_rgba(61,48,40,0.14)]">
                <div className="relative h-56 shrink-0 overflow-hidden bg-[#f0e8dc]">
                    <img
                        src={r.imageUrl ? `${r.imageUrl}` : noImage}
                        alt="תמונת החדר"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#2d2118]/55 via-transparent to-white/5" />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-4">
                        <div className="min-w-0">
                            <p className="mb-1 text-[10px] font-semibold tracking-[0.24em] text-[#f2dfbc]">
                                VELLORA HOTEL
                            </p>
                            <p className="text-lg font-semibold text-white drop-shadow-md">
                                {r.name}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:rotate-[-8deg] group-hover:bg-white/25">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                className="h-5 w-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" />
                            </svg>
                        </div>
                    </div>

                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/80 shadow-sm backdrop-blur-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-4 w-4 text-[#a1814d]"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
                        </svg>
                    </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-5 text-right sm:p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e6d6b9] bg-gradient-to-l from-[#f5ead7] to-[#fbf6ec] px-3.5 py-1.5 text-xs font-semibold text-[#806a43]">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b08d57]" />
                            <span className="truncate">{r.type}</span>
                        </div>

                        <span className="text-[10px] font-medium tracking-[0.16em] text-[#b2a28b]">
                            ROOM
                        </span>
                    </div>

                    <div className="mb-4 h-px w-full bg-gradient-to-l from-[#b08d57]/70 via-[#e8dfce] to-transparent transition-all duration-500 group-hover:from-[#a1814d] group-hover:via-[#d5bd96]" />

                    <p className="line-clamp-4 text-sm leading-7 text-[#827968] transition-colors duration-300 group-hover:text-[#625344]">
                        {r.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-[#eee5d9] pt-4">
                        <span className="text-xs text-[#a09280]">
                            Vellora Collection
                        </span>

                        <span className="flex items-center gap-2 text-sm font-semibold text-[#967748] transition-all duration-300 group-hover:gap-3 group-hover:text-[#6f5632]">
                            <span>לפרטים נוספים</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7 7-7-7 7-7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
