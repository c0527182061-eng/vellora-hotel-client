import { useDropzone } from "react-dropzone"
import * as yup from "yup"
import {
  ROOM_STATUSES,
  ROOM_TYPES,
  type RoomFormFields,
  type RoomStatus,
  type RoomType,
} from "../types/room"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate, useParams } from "react-router"
import { roomForm } from "../hooks/useMutation"
import noImage from "../assets/no_image.png"
import { useEffect, useState } from "react"
import { getRoomsById } from "../hooks/useQuery"

export type RoomForm = RoomFormFields & { image?: File }

const emptyToUndefined = (value: unknown, original: unknown) =>
  original === "" ? undefined : value

export const roomSchema: yup.ObjectSchema<RoomForm> = yup.object({
  roomNumber: yup
    .number()
    .transform(emptyToUndefined)
    .typeError("מספר חדר חייב להיות מספר")
    .integer("מספר חדר חייב להיות מספר שלם")
    .positive("מספר חדר חייב להיות גדול מ־0")
    .required("חובה להזין מספר חדר"),

  name: yup
    .string()
    .trim()
    .required("חובה להזין שם חדר"),

  type: yup
    .mixed<RoomType>()
    .oneOf(
      ["SINGLE", "DOUBLE", "FAMILY", "SUITE"],
      "חובה לבחור סוג חדר"
    )
    .required("חובה לבחור סוג חדר"),

  pricePerNight: yup
    .number()
    .transform(emptyToUndefined)
    .typeError("מחיר חייב להיות מספר")
    .positive("מחיר חייב להיות גדול מ־0")
    .required("חובה להזין מחיר ללילה"),

  maxGuests: yup
    .number()
    .transform(emptyToUndefined)
    .typeError("מספר אורחים חייב להיות מספר")
    .integer("מספר אורחים חייב להיות מספר שלם")
    .min(1, "לפחות אורח אחד")
    .required("חובה להזין מספר אורחים מרבי"),

  floor: yup
    .number()
    .transform(emptyToUndefined)
    .typeError("קומה חייבת להיות מספר")
    .integer("קומה חייבת להיות מספר שלם")
    .min(0, "קומה לא יכולה להיות שלילית")
    .required("חובה להזין קומה"),

  description: yup
    .string()
    .trim()
    .transform(emptyToUndefined)
    .optional(),

  status: yup
    .mixed<RoomStatus>()
    .oneOf(["AVAILABLE", "UNAVAILABLE"])
    .optional(),

  image: yup
    .mixed<File>()
    .optional()
    .test("fileType", "אפשר להעלות רק תמונה", file =>
      !file || file.type.startsWith("image/")
    )
    .test("fileSize", "התמונה גדולה מדי (עד 5MB)", file =>
      !file || file.size <= 5 * 1024 * 1024
    ),
})

export default function RoomFormPage() {
  const [show, setShow] = useState(false)
  const messege = "החדר נוצר בהצלחה!!!!!"

  const { roomId } = useParams()
  const { data, isLoading, error } = getRoomsById(roomId ?? "")

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<RoomForm>({
    resolver: yupResolver(roomSchema),
  })

  const image = watch("image")
  const roomFormMutation = roomForm(roomId ? "edit" : "add", roomId)
  const navigate = useNavigate()

  const onsubmit = (data: RoomForm) => {
    roomFormMutation.mutate(data, {
      onSuccess: () => {
        setShow(true)
        if (roomId)
          navigate("/")
        reset()
      },
    })
  }

  useEffect(() => {
    if (data) {
      reset({
        roomNumber: data.roomNumber,
        name: data.name,
        type: data.type,
        pricePerNight: data.pricePerNight,
        maxGuests: data.maxGuests,
        floor: data.floor,
        description: data.description ?? "",
        status: data.status,
      })
    }
  }, [data])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    noClick: !!image,
    onDrop: files => {
      if (files[0])
        setValue("image", files[0], { shouldValidate: true })
    },
  })

  const removeImage = () => {
    setValue("image", undefined, { shouldValidate: true })
  }

  const inputStyle =
    "mt-2 w-full rounded-2xl border border-[#e8ded0] bg-[#fdfbf8] px-4 py-3.5 text-sm text-[#3d3028] shadow-sm outline-none transition-all duration-300 placeholder:text-[#b8a795] hover:border-[#d5c2a9] focus:border-[#b08d57] focus:bg-white focus:ring-4 focus:ring-[#b08d57]/10"

  const labelStyle =
    "block text-sm font-semibold text-[#594638]"

  const errorStyle =
    "mt-2 rounded-lg text-xs font-medium text-red-600"

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-[#faf7f2] via-[#fffefa] to-[#f3eadf] px-4 py-10 sm:px-6 lg:py-14"
    >
      <div className="mx-auto max-w-4xl">
        {isLoading && "טוען נתןנים"}
        {error?.response?.data?.error?.message}

        <div className="mb-10 text-center">
          <p className="mb-4 inline-flex rounded-full border border-[#e8d9c3] bg-white/80 px-5 py-2 text-xs font-semibold tracking-[0.25em] text-[#a17c48] shadow-sm">
            VELLORA · ADMINISTRATION
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#3d3028] sm:text-5xl">
            פרטי החדר
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#8b7b70] sm:text-base">
            הזן את פרטי החדר כדי לנהל אותו במערכת
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-[#d8c3a5]" />
            <span className="h-2 w-2 rounded-full bg-[#b08d57]" />
            <span className="h-px w-10 bg-[#d8c3a5]" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onsubmit)}
          className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/95 shadow-[0_24px_70px_rgba(74,55,40,0.10)] backdrop-blur-sm"
        >
          <div className="border-b border-[#eee4d8] bg-gradient-to-l from-[#f5ede2] via-[#fcf8f2] to-white px-6 py-7 sm:px-10 sm:py-9">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#e8d9c3] bg-white text-2xl text-[#a17c48] shadow-sm">
                ✦
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#3d3028] sm:text-2xl">
                  מידע על החדר
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#9b8a7c]">
                  מלא את השדות הבאים
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-7 gap-y-6 p-6 sm:grid-cols-2 sm:p-10">
            <div>
              <label className={labelStyle}>מספר החדר</label>

              <input
                type="number"
                {...register("roomNumber")}
                className={inputStyle}
                placeholder="לדוגמה: 101"
              />

              {errors.roomNumber && (
                <p className={errorStyle}>
                  {errors.roomNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelStyle}>שם החדר</label>

              <input
                {...register("name")}
                className={inputStyle}
                placeholder="לדוגמה: סוויטת דלוקס"
              />

              {errors.name && (
                <p className={errorStyle}>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelStyle}>סטטוס החדר</label>

              <select {...register("status")} className={inputStyle}>
                {ROOM_STATUSES.map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              {errors.status && (
                <p className={errorStyle}>
                  {errors.status.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelStyle}>מחיר ללילה (₪)</label>

              <input
                type="number"
                {...register("pricePerNight")}
                className={inputStyle}
                placeholder="לדוגמה: 650"
              />

              {errors.pricePerNight && (
                <p className={errorStyle}>
                  {errors.pricePerNight.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelStyle}>מספר אורחים מקסימלי</label>

              <input
                type="number"
                {...register("maxGuests")}
                className={inputStyle}
                placeholder="לדוגמה: 4"
              />

              {errors.maxGuests && (
                <p className={errorStyle}>
                  {errors.maxGuests.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelStyle}>קומה</label>

              <input
                type="number"
                {...register("floor")}
                className={inputStyle}
                placeholder="לדוגמה: 2"
              />

              {errors.floor && (
                <p className={errorStyle}>
                  {errors.floor.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className={labelStyle}>תיאור החדר</label>

              <textarea
                {...register("description")}
                className={`${inputStyle} min-h-36 resize-y leading-7`}
                placeholder="תיאור קצר של החדר, המתקנים והיתרונות שלו..."
              />

              {errors.description && (
                <p className={errorStyle}>
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className={labelStyle}>סוג החדר</label>

              <select {...register("type")} className={inputStyle}>
                {ROOM_TYPES.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              {errors.type && (
                <p className={errorStyle}>
                  {errors.type.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className={labelStyle}>תמונת החדר</label>

              <div
                {...getRootProps()}
                className={`mt-3 overflow-hidden rounded-3xl border-2 border-dashed p-5 text-center text-sm transition-all duration-300 sm:p-7 ${
                  isDragActive
                    ? "border-[#b08d57] bg-[#f5ead9] shadow-inner"
                    : "border-[#e8ded0] bg-gradient-to-br from-[#fdfbf8] to-[#f8f1e8] hover:border-[#c7a875] hover:bg-[#faf5ed]"
                }`}
              >
                <input {...getInputProps()} />

                {image ? (
                  <div>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="תצוגה מקדימה"
                      className="h-56 w-full rounded-2xl object-cover shadow-md"
                    />

                    <p className="mt-3 break-all text-xs text-[#8b7b70]">
                      {image.name}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={open}
                        className="rounded-xl border border-[#d8c3a5] bg-white px-5 py-2.5 text-sm font-semibold text-[#8b7653] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f8f1e8] hover:shadow-md"
                      >
                        החלפת תמונה
                      </button>

                      <button
                        type="button"
                        onClick={removeImage}
                        className="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:-translate-y-0.5 hover:bg-red-50"
                      >
                        הסרת תמונה
                      </button>
                    </div>
                  </div>
                ) : data?.imageUrl ? (
                  <div>
                    <img
                      src={data.imageUrl}
                      alt="תמונת החדר"
                      className="h-56 w-full rounded-2xl object-cover shadow-md"
                    />

                    <p className="mt-3 text-xs text-[#8b7b70]">
                      התמונה הנוכחית
                    </p>

                    <div className="mt-4 flex justify-center">
                      <button
                        type="button"
                        onClick={open}
                        className="rounded-xl border border-[#d8c3a5] bg-white px-5 py-2.5 text-sm font-semibold text-[#8b7653] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f8f1e8] hover:shadow-md"
                      >
                        החלפת תמונה
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="cursor-pointer rounded-2xl py-8 transition">
                    <img
                      src={noImage}
                      alt="אין תמונה"
                      className="mx-auto mb-4 h-28 w-28 rounded-2xl object-cover opacity-70 transition duration-300 hover:scale-105"
                    />

                    <p className="font-semibold text-[#6f5a49]">
                      {isDragActive
                        ? "שחררי כאן"
                        : "גררי תמונה לכאן או לחצי לבחירה"}
                    </p>
                  </div>
                )}
              </div>

              {errors.image && (
                <p className={errorStyle}>
                  {errors.image.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <div className="mt-2 border-t border-[#eee4d8] pt-7">
                <button
                  type="submit"
                  disabled={roomFormMutation.isPending}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-l from-[#6f5d41] via-[#8b7653] to-[#a58a60] px-6 py-4 font-semibold text-white shadow-lg shadow-[#8b7653]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8b7653]/25 focus:outline-none focus:ring-4 focus:ring-[#b08d57]/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <span className="relative z-10">
                    שמירת פרטי החדר{" "}
                    {roomFormMutation.isPending && "השמירה מתבצעת"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>

        <p className="mt-7 text-center text-[11px] font-medium tracking-[0.2em] text-[#b8a795]">
          VELLORA HOTEL · YOUR COMFORT, OUR PRIORITY
        </p>

        {roomFormMutation.error && (
          <div className="mt-5 rounded-2xl border border-red-100 bg-red-50/80 p-5 text-red-600 shadow-sm">
            <p>
              {roomFormMutation.error.response?.data?.error?.message}
            </p>

            {roomFormMutation.error.response?.data?.error?.details?.map(d => (
              <p key={d.field} className="mt-1 text-xs">
                {d.message}
              </p>
            ))}
          </div>
        )}
      </div>

      {show && messege}
    </div>
  )
}