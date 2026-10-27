
import type { Booking } from '../types/booking'
import noImage from '../assets/no_image.png'

const statusLabels: Record<string, string> = {
    PENDING: 'ממתינה לאישור',
    APPROVED: 'מאושרת',
    REJECTED: 'נדחתה',
}

const statusStyles: Record<string, string> = {
    PENDING: 'border-amber-200 bg-amber-50 text-amber-800',
    APPROVED: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    REJECTED: 'border-red-200 bg-red-50 text-red-800'
}

export default function MySingleBooking(book: { book: Booking }) {
    return (
        <article className="group relative overflow-hidden rounded-3xl border border-[#e8decd] bg-[#fffefa] shadow-[0_18px_50px_-28px_rgba(83,63,36,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#cbb58b] hover:shadow-[0_28px_65px_-28px_rgba(83,63,36,0.35)]">
            <div className="h-1.5 w-full bg-gradient-to-l from-[#8f7145] via-[#e6d5ad] to-[#b08d57]" />

            <div className="p-5 sm:p-7">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-px w-7 bg-[#b08d57]" />
                            <p className="text-xs font-semibold tracking-[0.18em] text-[#a4874c]">
                                פרטי ההזמנה
                            </p>
                        </div>

                        <h2 className="font-serif text-2xl font-semibold leading-snug text-[#44362a] transition-colors duration-300 group-hover:text-[#8f7145] sm:text-3xl">
                            {book.book.room.name}
                        </h2>

                        <p className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#f8f3e9] px-3 py-1.5 text-sm text-[#806c50]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
                            חדר מספר {book.book.room.roomNumber}
                        </p>
                    </div>

                    <span
                        className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold shadow-sm ${statusStyles[book.book.status] ||
                            'border-[#e5dcc9] bg-[#f8f4eb] text-[#715a31]'
                            }`}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {statusLabels[book.book.status] || book.book.status}
                    </span>
                </div>

                <div className="relative mb-6 h-56 overflow-hidden rounded-2xl bg-[#f0ebe1] shadow-inner sm:h-64">
                    <img
                        src={book.book.room.imageUrl ? `${book.book.room.imageUrl}` : noImage}
                        alt="תמונת החדר"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2c2118]/45 via-transparent to-white/5" />
                    <div className="absolute bottom-4 right-4 rounded-xl border border-white/40 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
                        <p className="text-xs text-[#8a765b]">מחיר כולל</p>
                        <p className="mt-0.5 text-xl font-bold text-[#72552f]">
                            {Number(book.book.totalPrice).toLocaleString('he-IL')} ₪
                        </p>
                    </div>
                </div>

                {book.book.room.deleted
                    && <p className="mb-5 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
                        <span className="h-2 w-2 rounded-full bg-gray-400" />
                        החדר הוסר מהמלון
                    </p>}

                <div className="mb-3 flex items-center gap-3">
                    <span className="h-px flex-1 bg-gradient-to-l from-[#e5d8c2] to-transparent" />
                    <p className="text-xs font-semibold tracking-wider text-[#a4874c]">פרטי השהייה</p>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#e5d8c2] to-transparent" />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="group/item rounded-2xl border border-[#eee5d6] bg-gradient-to-br from-[#fffefa] to-[#faf6ee] p-4 transition-all duration-300 hover:border-[#d8c49f] hover:shadow-md">
                        <p className="mb-2 text-xs font-medium text-[#95866e]">תאריך כניסה</p>
                        <p className="text-sm font-semibold text-[#51432e]">{book.book.checkIn}</p>
                    </div>

                    <div className="group/item rounded-2xl border border-[#eee5d6] bg-gradient-to-br from-[#fffefa] to-[#faf6ee] p-4 transition-all duration-300 hover:border-[#d8c49f] hover:shadow-md">
                        <p className="mb-2 text-xs font-medium text-[#95866e]">תאריך יציאה</p>
                        <p className="text-sm font-semibold text-[#51432e]">{book.book.checkOut}</p>
                    </div>

                    <div className="group/item rounded-2xl border border-[#eee5d6] bg-gradient-to-br from-[#fffefa] to-[#faf6ee] p-4 transition-all duration-300 hover:border-[#d8c49f] hover:shadow-md">
                        <p className="mb-2 text-xs font-medium text-[#95866e]">תאריך יצירת ההזמנה</p>
                        <p className="text-sm font-semibold text-[#51432e]">
                            {new Date(book.book.createdAt).toLocaleDateString('he-IL')}
                        </p>
                    </div>

                    <div className="group/item rounded-2xl border border-[#eee5d6] bg-gradient-to-br from-[#fffefa] to-[#faf6ee] p-4 transition-all duration-300 hover:border-[#d8c49f] hover:shadow-md">
                        <p className="mb-2 text-xs font-medium text-[#95866e]">מספר לילות</p>
                        <p className="text-sm font-semibold text-[#51432e]">{book.book.nights}</p>
                    </div>

                    <div className="group/item rounded-2xl border border-[#eee5d6] bg-gradient-to-br from-[#fffefa] to-[#faf6ee] p-4 transition-all duration-300 hover:border-[#d8c49f] hover:shadow-md">
                        <p className="mb-2 text-xs font-medium text-[#95866e]">מחיר ללילה</p>
                        <p className="text-sm font-semibold text-[#51432e]">
                            {Number(book.book.pricePerNight).toLocaleString('he-IL')} ₪
                        </p>
                    </div>

                    <div className="group/item rounded-2xl border border-[#eee5d6] bg-gradient-to-br from-[#fffefa] to-[#faf6ee] p-4 transition-all duration-300 hover:border-[#d8c49f] hover:shadow-md">
                        <p className="mb-2 text-xs font-medium text-[#95866e]">שם האורח</p>
                        <p className="break-words text-sm font-semibold text-[#51432e]">
                            {book.book.guestName || 'לא צוין'}
                        </p>
                    </div>
                </div>

                <div className="relative mt-5 overflow-hidden rounded-2xl border border-[#e8deca] bg-gradient-to-l from-[#f8f2e6] via-[#fcfaf5] to-[#f8f2e6] p-5">
                    <div className="pointer-events-none absolute -left-8 -top-10 h-28 w-28 rounded-full border border-[#dfcfad]/50" />
                    <div className="pointer-events-none absolute -left-3 -top-5 h-16 w-16 rounded-full border border-[#dfcfad]/40" />

                    <p className="relative text-sm font-semibold text-[#786348]">פרטי החדר</p>

                    <div className="relative mt-4 grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-white/80 bg-white/70 p-3.5">
                            <p className="text-xs text-[#95866e]">קומה</p>
                            <p className="mt-1.5 text-lg font-semibold text-[#51432e]">
                                {book.book.room.floor ?? "--"}
                            </p>
                        </div>

                        <div className="rounded-xl border border-white/80 bg-white/70 p-3.5">
                            <p className="text-xs text-[#95866e]">מספר אורחים מרבי</p>
                            <p className="mt-1.5 text-lg font-semibold text-[#51432e]">
                                {book.book.room.maxGuests ?? "--"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#e8deca] pt-5">
                    <div>
                        <p className="text-sm text-[#81735b]">מחיר כולל</p>
                        <p className="mt-1 font-serif text-3xl font-bold text-[#947641]">
                            {Number(book.book.totalPrice).toLocaleString('he-IL')} ₪
                        </p>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full border border-[#e7dcc5] bg-[#faf6ee] px-4 py-2 text-xs font-medium text-[#95866e]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
                        כולל {book.book.nights} לילות
                    </span>
                </div>
            </div>
        </article>
    )
}
