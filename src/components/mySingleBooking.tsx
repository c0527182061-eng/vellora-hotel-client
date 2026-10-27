
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
        <article
            className="group overflow-hidden rounded-2xl border border-[#e5dcc9] bg-[#fffefa] shadow-[0_20px_55px_-30px_rgba(92,73,39,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_65px_-30px_rgba(92,73,39,0.38)]"
        >
            <div className="h-1 w-full bg-gradient-to-l from-[#a88a50] via-[#e6d7b5] to-[#a88a50]" />

            <div className="p-6 sm:p-7">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold tracking-widest text-[#a4874c]">
                            פרטי ההזמנה
                        </p>

                        <h2 className="mt-2 font-serif text-2xl font-semibold text-[#51432e]">
                            {book.book.room.name}
                        </h2>
                        <div className="relative h-56 overflow-hidden bg-[#f0ebe1]">
                            <img
                                src={book.book.room.imageUrl ? `${book.book.room.imageUrl}` : noImage}
                                alt="תמונת החדר"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
                        </div>
                        {book.book.room.deleted
                            && <p className="text-sm text-gray-500">החדר הוסר מהמלון</p>}

                        <p className="mt-1 text-sm text-[#95866e]">
                            חדר מספר {book.book.room.roomNumber}
                        </p>
                    </div>

                    <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[book.book.status] ||
                            'border-[#e5dcc9] bg-[#f8f4eb] text-[#715a31]'
                            }`}
                    >
                        {statusLabels[book.book.status] || book.book.status}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#eee6d8] bg-[#fdfbf7] p-4">
                        <p className="mb-2 text-xs text-[#95866e]">
                            תאריך כניסה
                        </p>
                        <p className="text-sm font-semibold text-[#51432e]">
                            {book.book.checkIn}
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#eee6d8] bg-[#fdfbf7] p-4">
                        <p className="mb-2 text-xs text-[#95866e]">
                            תאריך יציאה
                        </p>
                        <p className="text-sm font-semibold text-[#51432e]">
                            {book.book.checkOut}
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#eee6d8] bg-[#fdfbf7] p-4">
                        <p className="mb-2 text-xs text-[#95866e]">
                            תאריך יצירת ההזמנה
                        </p>
                        <p className="text-sm font-semibold text-[#51432e]">
                            {new Date(book.book.createdAt).toLocaleDateString('he-IL')}                        </p>
                    </div>

                    <div className="rounded-xl border border-[#eee6d8] bg-[#fdfbf7] p-4">
                        <p className="mb-2 text-xs text-[#95866e]">
                            מספר לילות
                        </p>
                        <p className="text-sm font-semibold text-[#51432e]">
                            {book.book.nights}
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#eee6d8] bg-[#fdfbf7] p-4">
                        <p className="mb-2 text-xs text-[#95866e]">
                            מחיר ללילה
                        </p>
                        <p className="text-sm font-semibold text-[#51432e]">
                            {Number(book.book.pricePerNight).toLocaleString('he-IL')} ₪
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#eee6d8] bg-[#fdfbf7] p-4">
                        <p className="mb-2 text-xs text-[#95866e]">
                            שם האורח
                        </p>
                        <p className="break-words text-sm font-semibold text-[#51432e]">
                            {book.book.guestName || 'לא צוין'}
                        </p>
                    </div>
                </div>

                <div className="mt-4 rounded-xl border border-[#e8deca] bg-[#f8f4eb] p-5">
                    <p className="text-sm text-[#81735b]">פרטי החדר</p>

                    <div className="mt-3 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-[#95866e]">קומה</p>
                            <p className="mt-1 font-semibold text-[#51432e]">
                                {book.book.room.floor ?? "--"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-[#95866e]">
                                מספר אורחים מרבי
                            </p>
                            <p className="mt-1 font-semibold text-[#51432e]">
                                {book.book.room.maxGuests ?? "--"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#e8deca] pt-5">
                    <div>
                        <p className="text-sm text-[#81735b]">מחיר כולל</p>
                        <p className="mt-1 text-2xl font-bold text-[#947641]">
                            {Number(book.book.totalPrice).toLocaleString('he-IL')} ₪
                        </p>
                    </div>

                    <span className="text-xs text-[#95866e]">
                        כולל {book.book.nights} לילות
                    </span>
                </div>
            </div>
        </article>
    )
}
