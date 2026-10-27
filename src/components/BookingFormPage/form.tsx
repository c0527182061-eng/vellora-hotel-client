import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate, useParams, useSearchParams } from "react-router"
import type { CreateBookingRequest } from "../../types/booking"
import { createBook } from "../../hooks/useMutation"
import { getRoomsById } from "../../hooks/useQuery"

const toDateString = (d: Date) => d.toLocaleDateString("en-CA")

const today = () => toDateString(new Date())

const oneYearFromToday = () => {
    const d = new Date()
    d.setFullYear(d.getFullYear() + 1)
    return toDateString(d)
}

export const nightsBetween = (checkIn: string, checkOut: string) =>
    Math.round(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        86_400_000
    )

const emptyToUndefined = (value: unknown, original: unknown) =>
    original === "" ? undefined : value

export const bookingSchema: yup.ObjectSchema<CreateBookingRequest> =
    yup.object({
        checkIn: yup
            .string()
            .required("יש לבחור תאריך כניסה")
            .test(
                "not-past",
                "תאריך הכניסה לא יכול להיות בעבר",
                (value) => value >= today()
            )
            .test(
                "max-year",
                "אפשר להזמין עד שנה קדימה",
                (value) => value <= oneYearFromToday()
            ),

        checkOut: yup
            .string()
            .required("יש לבחור תאריך יציאה")
            .test(
                "after",
                "תאריך היציאה חייב להיות אחרי תאריך הכניסה",
                function (value) {
                    const { checkIn } = this.parent
                    return !checkIn || value > checkIn
                }
            )
            .test(
                "max-nights",
                "אפשר להזמין עד 30 לילות",
                function (value) {
                    const { checkIn } = this.parent
                    return !checkIn || nightsBetween(checkIn, value) <= 30
                }
            ),

        phone: yup
            .string()
            .trim()
            .required("יש להזין מספר טלפון")
            .matches(
                /^\+?[0-9][0-9\- ]{7,18}[0-9]$/,
                "מספר טלפון לא תקין (לדוגמה: 050-1234567)"
            ),

        guestName: yup
            .string()
            .trim()
            .transform(emptyToUndefined)
            .min(2, "שם האורח חייב להכיל לפחות 2 תווים")
            .max(100, "שם האורח ארוך מדי (עד 100 תווים)")
            .optional(),

        notes: yup
            .string()
            .trim()
            .transform(emptyToUndefined)
            .max(500, "ההערות ארוכות מדי (עד 500 תווים)")
            .optional(),

        roomId: yup.string().required(),
    })

export default function Form() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { roomId } = useParams()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CreateBookingRequest>({
        resolver: yupResolver(bookingSchema),
        defaultValues: {
            checkIn: searchParams.get("checkIn") ?? "",
            checkOut: searchParams.get("checkOut") ?? "",
            roomId: roomId,
        },
    })

    const checkIn = watch("checkIn")
    const checkOut = watch("checkOut")
    const { data } = getRoomsById(roomId ? roomId : "")

    const nights =
        checkIn && checkOut && checkOut > checkIn
            ? nightsBetween(checkIn, checkOut)
            : 0

    const totalPrice = data ? nights * data.pricePerNight : 0

    const createBook1 = createBook()

    const submit = (data: CreateBookingRequest) => {
        createBook1.mutate(data, {
            onSuccess: () => {
                navigate("/my-bookings")
            },
        })
    }

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="relative overflow-hidden rounded-3xl border border-[#e8ddca] bg-gradient-to-br from-white via-[#fffefa] to-[#faf5eb] px-5 py-8 shadow-[0_24px_70px_-24px_rgba(92,73,39,0.22)] sm:px-8 sm:py-10 lg:px-10"
        >
            <div className="absolute right-0 top-0 h-1.5 w-full bg-gradient-to-l from-[#8c7040] via-[#e6d7b5] to-[#a88a50]" />

            <div className="mb-8 border-b border-[#eee5d6] pb-6">
                <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#a7834e]">
                    VELLORA · RESERVATION
                </p>
                <h2 className="font-serif text-2xl font-semibold text-[#423a2d] sm:text-3xl">
                    טופס בקשת הזמנה
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#95866e]">
                    מלאו את הפרטים הבאים להשלמת הבקשה
                </p>
            </div>

            <div className="mb-6 grid gap-5 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#5c5140]">
                        תאריך כניסה
                    </label>
                    <input
                        type="date"
                        {...register("checkIn")}
                        className="w-full rounded-xl border border-[#e3dccf] bg-[#fdfbf7] px-4 py-3.5 text-sm text-[#443b2e] outline-none transition duration-300 hover:border-[#c9b587] focus:border-[#ad9159] focus:bg-white focus:ring-4 focus:ring-[#d9c9a5]/25"
                    />
                    <p className="mt-1.5 min-h-5 text-sm text-red-600">
                        {errors.checkIn?.message}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#5c5140]">
                        תאריך יציאה
                    </label>
                    <input
                        type="date"
                        {...register("checkOut")}
                        className="w-full rounded-xl border border-[#e3dccf] bg-[#fdfbf7] px-4 py-3.5 text-sm text-[#443b2e] outline-none transition duration-300 hover:border-[#c9b587] focus:border-[#ad9159] focus:bg-white focus:ring-4 focus:ring-[#d9c9a5]/25"
                    />
                    <p className="mt-1.5 min-h-5 text-sm text-red-600">
                        {errors.checkOut?.message}
                    </p>
                </div>
            </div>

            <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#5c5140]">
                    שם האורח
                </label>
                <input
                    type="text"
                    placeholder="השם המלא"
                    {...register("guestName")}
                    className="w-full rounded-xl border border-[#e3dccf] bg-[#fdfbf7] px-4 py-3.5 text-sm text-[#443b2e] outline-none transition duration-300 placeholder:text-[#b0a797] hover:border-[#c9b587] focus:border-[#ad9159] focus:bg-white focus:ring-4 focus:ring-[#d9c9a5]/25"
                />
                <p className="mt-1.5 min-h-5 text-sm text-red-600">
                    {errors.guestName?.message}
                </p>
            </div>

            <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#5c5140]">
                    מספר טלפון
                </label>
                <input
                    type="tel"
                    placeholder="050-1234567"
                    {...register("phone")}
                    className="w-full rounded-xl border border-[#e3dccf] bg-[#fdfbf7] px-4 py-3.5 text-sm text-[#443b2e] outline-none transition duration-300 placeholder:text-[#b0a797] hover:border-[#c9b587] focus:border-[#ad9159] focus:bg-white focus:ring-4 focus:ring-[#d9c9a5]/25"
                />
                <p className="mt-1.5 min-h-5 text-sm text-red-600">
                    {errors.phone?.message}
                </p>
            </div>

            <div className="mb-7">
                <label className="mb-2 block text-sm font-semibold text-[#5c5140]">
                    הערות נוספות
                </label>
                <textarea
                    rows={3}
                    placeholder="בקשות מיוחדות או מידע נוסף..."
                    {...register("notes")}
                    className="w-full resize-y rounded-xl border border-[#e3dccf] bg-[#fdfbf7] px-4 py-3.5 text-sm text-[#443b2e] outline-none transition duration-300 placeholder:text-[#b0a797] hover:border-[#c9b587] focus:border-[#ad9159] focus:bg-white focus:ring-4 focus:ring-[#d9c9a5]/25"
                />
                <p className="mt-1.5 min-h-5 text-sm text-red-600">
                    {errors.notes?.message}
                </p>
            </div>

            <div className="mb-7 overflow-hidden rounded-2xl border border-[#e8deca] bg-gradient-to-br from-[#faf6ed] to-[#f3ead9] p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#a7834e] shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            className="h-5 w-5"
                        >
                            <rect x="3" y="5" width="18" height="16" rx="2" />
                            <path d="M16 3v4M8 3v4M3 10h18" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#51432e]">
                            סיכום ההזמנה
                        </h3>
                        <p className="mt-1 text-xs text-[#95866e]">
                            פירוט עלויות השהייה
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 py-2">
                    <span className="text-sm text-[#81735b]">מספר לילות</span>
                    <span className="rounded-lg bg-white px-3 py-1.5 font-semibold text-[#51432e] shadow-sm">
                        {nights}
                    </span>
                </div>

                <div className="my-3 border-t border-[#e5dcc9]" />

                <div className="flex items-center justify-between gap-4 py-2">
                    <span className="text-sm text-[#81735b]">מחיר ללילה</span>
                    <span className="text-sm font-medium text-[#51432e]">
                        {data?.pricePerNight?.toLocaleString("he-IL")} ₪
                    </span>
                </div>

                <div className="my-3 border-t border-[#e5dcc9]" />

                <div className="flex items-center justify-between gap-4 pt-2">
                    <span className="font-semibold text-[#51432e]">
                        מחיר כולל
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-[#947641] sm:text-3xl">
                        {totalPrice.toLocaleString("he-IL")} ₪
                    </span>
                </div>
            </div>

            <button
                type="submit"
                disabled={createBook1.isPending}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-l from-[#8c7040] to-[#b49a66] px-6 py-4 font-semibold text-white shadow-lg shadow-[#a4874c]/20 transition duration-300 hover:-translate-y-0.5 hover:from-[#765c32] hover:to-[#a88a50] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#cbb88f]/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {createBook1.isPending
                        ? "שולח בקשה..."
                        : "שליחת בקשת הזמנה"}
                    {!createBook1.isPending && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    )}
                </span>
            </button>

            <p className="mt-5 text-center text-xs leading-6 text-[#95866e]">
                פרטי ההזמנה יוצגו באזור ההזמנות שלי לאחר השליחה.
            </p>

            {createBook1.error?.response?.data?.error?.message && (
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {createBook1.error?.response?.data?.error?.message}
                </p>
            )}
        </form>
    )
}