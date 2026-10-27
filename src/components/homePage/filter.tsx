
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
            <div className="overflow-hidden rounded-2xl border border-[#e5dac6] bg-[#fffdf8] shadow-[0_8px_30px_rgba(83,66,38,0.06)]">
                <div className="border-b border-[#e9decb] bg-[#f7f1e6] px-5 py-4">
                    <h2 className="font-serif text-xl font-semibold text-[#51432e]">
                        סינון חדרים
                    </h2>
                    <p className="mt-1 text-sm text-[#95866e]">
                        מצאו את החדר המתאים לכם
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSearch)}
                    className="space-y-5 p-5"
                >
                    <div>
                        <label className="text-sm font-medium text-[#665640]">
                            תאריך כניסה
                        </label>
                        <input
                            type="date"
                            {...register("checkIn")}
                            className="mt-2 w-full rounded-lg border border-[#e5dac6] bg-white px-3 py-3 text-sm text-[#51432e] outline-none transition focus:border-[#aa8b50] focus:ring-2 focus:ring-[#aa8b50]/15"
                        />
                        {errors.checkIn?.message && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.checkIn.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#665640]">
                            תאריך יציאה
                        </label>
                        <input
                            type="date"
                            {...register("checkOut")}
                            className="mt-2 w-full rounded-lg border border-[#e5dac6] bg-white px-3 py-3 text-sm text-[#51432e] outline-none transition focus:border-[#aa8b50] focus:ring-2 focus:ring-[#aa8b50]/15"
                        />
                        {errors.checkOut?.message && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.checkOut.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#665640]">
                            סוג חדר
                        </label>
                        <select
                            {...register("type")}
                            className="mt-2 w-full rounded-lg border border-[#e5dac6] bg-white px-3 py-3 text-sm text-[#51432e] outline-none focus:border-[#aa8b50] focus:ring-2 focus:ring-[#aa8b50]/15"
                        >
                            <option value="">כל סוגי החדרים</option>
                            {ROOM_TYPES.map(r => (
                                <option value={r} key={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#665640]">
                            מיון לפי
                        </label>
                        <select
                            {...register("sort")}
                            className="mt-2 w-full rounded-lg border border-[#e5dac6] bg-white px-3 py-3 text-sm text-[#51432e] outline-none focus:border-[#aa8b50] focus:ring-2 focus:ring-[#aa8b50]/15"
                        >
                            <option value="">ברירת מחדל</option>
                            {ROOM_SORTS.map(r => (
                                <option value={r} key={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#665640]">
                            מספר אורחים
                        </label>
                        <input
                            type="number"
                            placeholder="כמה אורחים?"
                            {...register("guests")}
                            className="mt-2 w-full rounded-lg border border-[#e5dac6] bg-white px-3 py-3 text-sm outline-none focus:border-[#aa8b50] focus:ring-2 focus:ring-[#aa8b50]/15"
                        />
                        {errors.guests?.message && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.guests.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm font-medium text-[#665640]">
                                מחיר מינימלי
                            </label>
                            <input
                                type="number"
                                {...register("minPrice")}
                                className="mt-2 w-full min-w-0 rounded-lg border border-[#e5dac6] bg-white px-3 py-3 text-sm outline-none focus:border-[#aa8b50] focus:ring-2 focus:ring-[#aa8b50]/15"
                            />
                            {errors.minPrice?.message && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.minPrice.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-[#665640]">
                                מחיר מקסימלי
                            </label>
                            <input
                                type="number"
                                {...register("maxPrice")}
                                className="mt-2 w-full min-w-0 rounded-lg border border-[#e5dac6] bg-white px-3 py-3 text-sm outline-none focus:border-[#aa8b50] focus:ring-2 focus:ring-[#aa8b50]/15"
                            />
                            {errors.maxPrice?.message && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.maxPrice.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#9e8148] px-5 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-[#826839] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#9e8148]/20"
                    >
                        חפש התאמה
                    </button>

                </form>
            </div>
        </aside>





    )
}
