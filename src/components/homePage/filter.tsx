
import * as yup from "yup"
import type { RoomSort, RoomsQuery, RoomType } from "../../types/room"
import { useSearchParams } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

const today = () => new Date().toLocaleDateString("en-CA")

const emptyToUndefined = (value: unknown, original: unknown) =>
    original === "" ? undefined : value

const ROOM_TYPES: RoomType[] = ["SINGLE", "DOUBLE", "FAMILY", "SUITE"]

const ROOM_SORTS: RoomSort[] = ["price_asc", "price_desc", "name_asc"]

export const roomsFilterSchema: yup.ObjectSchema<Omit<RoomsQuery, "status">> = yup.object({
    checkIn: yup
        .string()
        .transform(emptyToUndefined)
        .optional()
        .test("not-past", "תאריך הכניסה לא יכול להיות בעבר", (value) => !value || value >= today())
        .test("pair", "יש לבחור גם תאריך כניסה", function (value) {
            return !!value || !this.parent.checkOut
        }),

    checkOut: yup
        .string()
        .transform(emptyToUndefined)
        .optional()
        .test("pair", "יש לבחור גם תאריך יציאה", function (value) {
            return !!value || !this.parent.checkIn
        })
        .test("after", "תאריך היציאה חייב להיות אחרי תאריך הכניסה", function (value) {
            const { checkIn } = this.parent
            return !value || !checkIn || value > checkIn
        }),

    type: yup
        .mixed<RoomType>()
        .transform(emptyToUndefined)
        .oneOf(ROOM_TYPES, "סוג חדר לא תקין")
        .optional(),

    minPrice: yup
        .number()
        .transform(emptyToUndefined)
        .typeError("מחיר מינימלי חייב להיות מספר")
        .min(0, "המחיר לא יכול להיות שלילי")
        .optional(),

    maxPrice: yup
        .number()
        .transform(emptyToUndefined)
        .typeError("מחיר מקסימלי חייב להיות מספר")
        .min(0, "המחיר לא יכול להיות שלילי")
        .optional()
        .test("min-max", "מחיר מקסימלי חייב להיות גדול או שווה למחיר המינימלי", function (value) {
            const { minPrice } = this.parent
            return value === undefined || minPrice === undefined || value >= minPrice
        }),

    guests: yup
        .number()
        .transform(emptyToUndefined)
        .typeError("מספר אורחים חייב להיות מספר")
        .integer("מספר אורחים חייב להיות מספר שלם")
        .min(1, "לפחות אורח אחד")
        .max(15, "עד 10 אורחים")
        .optional(),

    search: yup
        .string()
        .trim()
        .transform(emptyToUndefined)
        .max(10, "החיפוש ארוך מדי (עד 100 תווים)")
        .optional(),

    sort: yup
        .mixed<RoomSort>()
        .transform(emptyToUndefined)
        .oneOf(ROOM_SORTS, "מיון לא תקין")
        .optional(),
})

export default function Filter() {
    const [searchParams, setSearchParams] = useSearchParams()

    const onSearch = (values: Omit<RoomsQuery, "status">) => {
        setSearchParams(
            Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, String(value)])
            )
        )
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Omit<RoomsQuery, "status">>({
        resolver: yupResolver(roomsFilterSchema),
        defaultValues: {
            checkIn: searchParams.get("checkIn") ?? "",
            checkOut: searchParams.get("checkOut") ?? "",
            type: (searchParams.get("type") as RoomType) ?? undefined,
            sort: (searchParams.get("sort") as RoomSort) ?? undefined,
            search: searchParams.get("search") ?? "",
            minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
            maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
            guests: searchParams.get("guests") ? Number(searchParams.get("guests")) : undefined,
        },
    })

    return (
        <aside dir="rtl" className="w-full">
            <div className="overflow-hidden rounded-3xl border border-[#e8dccb] bg-[#fffdf9] shadow-[0_12px_36px_rgba(61,48,40,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_42px_rgba(61,48,40,0.11)]">
                <div className="relative overflow-hidden border-b border-[#e9decb] bg-gradient-to-br from-[#f8f0e4] via-[#f5ecdf] to-[#eee0cc] px-5 py-6">
                    <div className="pointer-events-none absolute -left-8 -top-10 h-32 w-32 rounded-full border border-[#b08d57]/20" />
                    <div className="pointer-events-none absolute -left-2 -top-4 h-20 w-20 rounded-full border border-[#b08d57]/20" />

                    <div className="relative flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d9c5a5] bg-white/70 shadow-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-6 w-6 text-[#9b794b]"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M7 12h10M10 19h4M6 5l3 7v7m9-14-3 7v7" />
                            </svg>
                        </div>

                        <div className="min-w-0">
                            <p className="mb-1 text-[10px] font-semibold tracking-[0.24em] text-[#a08355]">
                                VELLORA HOTEL
                            </p>
                            <h2 className="font-serif text-xl font-semibold text-[#51432e]">
                                סינון חדרים
                            </h2>
                            <p className="mt-1 text-sm leading-5 text-[#95866e]">
                                מצאו את החדר המתאים לכם
                            </p>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSearch)}
                    className="space-y-5 p-4 sm:p-5"
                >
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#665640]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
                            תאריך כניסה
                        </label>
                        <input
                            type="date"
                            {...register("checkIn")}
                            className="w-full rounded-xl border border-[#e6dac8] bg-white px-3 py-3 text-sm text-[#51432e] shadow-sm outline-none transition duration-200 hover:border-[#cbb28d] focus:border-[#aa8b50] focus:ring-4 focus:ring-[#aa8b50]/10"
                        />
                        {errors.checkIn?.message && (
                            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs leading-5 text-red-600">
                                {errors.checkIn.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#665640]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
                            תאריך יציאה
                        </label>
                        <input
                            type="date"
                            {...register("checkOut")}
                            className="w-full rounded-xl border border-[#e6dac8] bg-white px-3 py-3 text-sm text-[#51432e] shadow-sm outline-none transition duration-200 hover:border-[#cbb28d] focus:border-[#aa8b50] focus:ring-4 focus:ring-[#aa8b50]/10"
                        />
                        {errors.checkOut?.message && (
                            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs leading-5 text-red-600">
                                {errors.checkOut.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#665640]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
                            סוג חדר
                        </label>
                        <select
                            {...register("type")}
                            className="w-full cursor-pointer rounded-xl border border-[#e6dac8] bg-white px-3 py-3 text-sm text-[#51432e] shadow-sm outline-none transition duration-200 hover:border-[#cbb28d] focus:border-[#aa8b50] focus:ring-4 focus:ring-[#aa8b50]/10"
                        >
                            <option value="">כל סוגי החדרים</option>
                            {ROOM_TYPES.map(r => (
                                <option value={r} key={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#665640]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
                            מיון לפי
                        </label>
                        <select
                            {...register("sort")}
                            className="w-full cursor-pointer rounded-xl border border-[#e6dac8] bg-white px-3 py-3 text-sm text-[#51432e] shadow-sm outline-none transition duration-200 hover:border-[#cbb28d] focus:border-[#aa8b50] focus:ring-4 focus:ring-[#aa8b50]/10"
                        >
                            <option value="">ברירת מחדל</option>
                            {ROOM_SORTS.map(r => (
                                <option value={r} key={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#665640]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
                            מספר אורחים
                        </label>
                        <input
                            type="number"
                            placeholder="כמה אורחים?"
                            {...register("guests")}
                            className="w-full rounded-xl border border-[#e6dac8] bg-white px-3 py-3 text-sm text-[#51432e] shadow-sm outline-none transition duration-200 placeholder:text-[#b2a696] hover:border-[#cbb28d] focus:border-[#aa8b50] focus:ring-4 focus:ring-[#aa8b50]/10"
                        />
                        {errors.guests?.message && (
                            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs leading-5 text-red-600">
                                {errors.guests.message}
                            </p>
                        )}
                    </div>

                    <div className="rounded-2xl border border-[#eee4d6] bg-[#faf6ef] p-3.5">
                        <p className="mb-3 text-sm font-semibold text-[#665640]">
                            טווח מחירים
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="min-w-0 space-y-2">
                                <label className="text-xs font-medium text-[#8a7965]">
                                    מחיר מינימלי
                                </label>
                                <input
                                    type="number"
                                    {...register("minPrice")}
                                    className="w-full min-w-0 rounded-xl border border-[#e6dac8] bg-white px-2.5 py-3 text-sm text-[#51432e] shadow-sm outline-none transition duration-200 hover:border-[#cbb28d] focus:border-[#aa8b50] focus:ring-4 focus:ring-[#aa8b50]/10"
                                />
                                {errors.minPrice?.message && (
                                    <p className="text-xs leading-5 text-red-600">
                                        {errors.minPrice.message}
                                    </p>
                                )}
                            </div>

                            <div className="min-w-0 space-y-2">
                                <label className="text-xs font-medium text-[#8a7965]">
                                    מחיר מקסימלי
                                </label>
                                <input
                                    type="number"
                                    {...register("maxPrice")}
                                    className="w-full min-w-0 rounded-xl border border-[#e6dac8] bg-white px-2.5 py-3 text-sm text-[#51432e] shadow-sm outline-none transition duration-200 hover:border-[#cbb28d] focus:border-[#aa8b50] focus:ring-4 focus:ring-[#aa8b50]/10"
                                />
                                {errors.maxPrice?.message && (
                                    <p className="text-xs leading-5 text-red-600">
                                        {errors.maxPrice.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-l from-[#8e7041] via-[#aa8b50] to-[#b99a61] px-5 py-3.5 font-semibold text-white shadow-[0_6px_16px_rgba(142,112,65,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(142,112,65,0.3)] focus:outline-none focus:ring-4 focus:ring-[#9e8148]/25 active:translate-y-0"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
                            >
                                <circle cx="11" cy="11" r="6.5" />
                                <path strokeLinecap="round" d="m16 16 4 4" />
                            </svg>
                            חפש התאמה
                        </span>
                    </button>
                </form>
            </div>
        </aside>
    )
}
