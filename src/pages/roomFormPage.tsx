import { useDropzone } from "react-dropzone"
import * as yup from "yup"
import { ROOM_STATUSES, ROOM_TYPES, type RoomFormFields, type RoomStatus, type RoomType } from "../types/room"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate, useParams } from "react-router"
import { roomForm } from "../hooks/useMutation"
import noImage from '../assets/no_image.png'

import { useEffect, useState } from "react"
import { getRoomsById } from "../hooks/useQuery"

export type RoomForm = RoomFormFields & { image?: File }

const emptyToUndefined = (value: unknown, original: unknown) =>
  original === "" ? undefined : value

export const roomSchema: yup.ObjectSchema<RoomForm> = yup.object({
  roomNumber: yup.number()
    .transform(emptyToUndefined)
    .typeError("מספר חדר חייב להיות מספר")
    .integer("מספר חדר חייב להיות מספר שלם")
    .positive("מספר חדר חייב להיות גדול מ־0")
    .required("חובה להזין מספר חדר"),

  name: yup.string()
    .trim()
    .required("חובה להזין שם חדר"),

  type: yup.mixed<RoomType>()
    .oneOf(["SINGLE", "DOUBLE", "FAMILY", "SUITE"], "חובה לבחור סוג חדר")
    .required("חובה לבחור סוג חדר"),

  pricePerNight: yup.number()
    .transform(emptyToUndefined)
    .typeError("מחיר חייב להיות מספר")
    .positive("מחיר חייב להיות גדול מ־0")
    .required("חובה להזין מחיר ללילה"),

  maxGuests: yup.number()
    .transform(emptyToUndefined)
    .typeError("מספר אורחים חייב להיות מספר")
    .integer("מספר אורחים חייב להיות מספר שלם")
    .min(1, "לפחות אורח אחד")
    .required("חובה להזין מספר אורחים מרבי"),

  floor: yup.number()
    .transform(emptyToUndefined)
    .typeError("קומה חייבת להיות מספר")
    .integer("קומה חייבת להיות מספר שלם")
    .min(0, "קומה לא יכולה להיות שלילית")
    .required("חובה להזין קומה"),

  description: yup.string()
    .trim()
    .transform(emptyToUndefined)
    .optional(),
  status: yup.mixed<RoomStatus>()
    .oneOf(["AVAILABLE", "UNAVAILABLE"])
    .optional(),

  image: yup.mixed<File>()
    .optional()
    .test("fileType", "אפשר להעלות רק תמונה", file =>
      !file || file.type.startsWith("image/"))
    .test("fileSize", "התמונה גדולה מדי (עד 5MB)", file =>
      !file || file.size <= 5 * 1024 * 1024)
})



export default function RoomFormPage() {
  const [show, setShow] = useState(false)
  const messege = "החדר נוצר בהצלחה!!!!!"

  const { roomId } = useParams()
  const { data, isLoading, error } = getRoomsById(roomId ?? "")

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<RoomForm>({
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
      }
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
      if (files[0]) setValue("image", files[0], { shouldValidate: true })
    },
  })

  const removeImage = () => {
    setValue("image", undefined, { shouldValidate: true })
  }
  const inputStyle = "mt-2 w-full rounded-xl border border-[#e8ded0] bg-[#fdfbf8] px-4 py-3 text-sm text-[#3d3028] outline-none transition placeholder:text-[#b8a795] focus:border-[#b08d57] focus:bg-white focus:ring-2 focus:ring-[#b08d57]/15"
  const labelStyle = "block text-sm font-semibold text-[#594638]"
  const errorStyle = "mt-1 text-xs text-red-600"

  return (
    <div dir="rtl" className="min-h-screen bg-[#faf7f2] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {isLoading && "טוען נתןנים"}
        {error?.response?.data?.error?.message}

        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#b08d57]">
            VELLORA · ADMINISTRATION
          </p>
          <h1 className="text-3xl font-bold text-[#3d3028] sm:text-4xl">
            פרטי החדר
          </h1>
          <p className="mt-3 text-sm text-[#8b7b70]">
            הזן את פרטי החדר כדי לנהל אותו במערכת
          </p>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#b08d57]" />
        </div>

        <form
          onSubmit={handleSubmit(onsubmit)}
          className="rounded-3xl border border-[#eee4d8] bg-white p-6 shadow-[0_12px_40px_rgba(74,55,40,0.07)] sm:p-10"
        >
          <div className="mb-8 border-b border-[#f0e8de] pb-5">
            <h2 className="text-xl font-bold text-[#3d3028]">מידע על החדר</h2>
            <p className="mt-2 text-sm text-[#9b8a7c]">מלא את השדות הבאים</p>
          </div>


          <div>
            <label className={labelStyle}>מספר החדר</label>
            <input type="number" {...register("roomNumber")} className={inputStyle} placeholder="לדוגמה: 101" />
            {errors.roomNumber && <p className={errorStyle}>{errors.roomNumber.message}</p>}
          </div>

          <div>
            <label className={labelStyle}>שם החדר</label>
            <input {...register("name")} className={inputStyle} placeholder="לדוגמה: סוויטת דלוקס" />
            {errors.name && <p className={errorStyle}>{errors.name.message}</p>}
          </div>

          <div>
            <label className={labelStyle}>סטטוס החדר</label>
            <select {...register("status")} className={inputStyle}>
              {ROOM_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            {errors.status && <p className={errorStyle}>{errors.status.message}</p>}
          </div>

          <div>
            <label className={labelStyle}>מחיר ללילה (₪)</label>
            <input type="number" {...register("pricePerNight")} className={inputStyle} placeholder="לדוגמה: 650" />
            {errors.pricePerNight && <p className={errorStyle}>{errors.pricePerNight.message}</p>}
          </div>

          <div>
            <label className={labelStyle}>מספר אורחים מקסימלי</label>
            <input type="number" {...register("maxGuests")} className={inputStyle} placeholder="לדוגמה: 4" />
            {errors.maxGuests && <p className={errorStyle}>{errors.maxGuests.message}</p>}
          </div>

          <div>
            <label className={labelStyle}>קומה</label>
            <input type="number" {...register("floor")} className={inputStyle} placeholder="לדוגמה: 2" />
            {errors.floor && <p className={errorStyle}>{errors.floor.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className={labelStyle}>תיאור החדר</label>
            <textarea
              {...register("description")}
              className={`${inputStyle} min-h-32 resize-y leading-7`}
              placeholder="תיאור קצר של החדר, המתקנים והיתרונות שלו..."
            />
            {errors.description && <p className={errorStyle}>{errors.description.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className={labelStyle}>סוג החדר</label>
            <select {...register("type")} className={inputStyle}>
              {ROOM_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            {errors.type && <p className={errorStyle}>{errors.type.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className={labelStyle}>תמונת החדר</label>

            <div
              {...getRootProps()}
              className="mt-2 rounded-xl border-2 border-dashed border-[#e8ded0] bg-[#fdfbf8] p-4 text-center text-sm text-[#8b7b70]"
            >
              <input {...getInputProps()} />

              {image ? (
                <div>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="תצוגה מקדימה"
                    className="h-48 w-full rounded-xl object-cover"
                  />
                  <p className="mt-2 text-xs">{image.name}</p>

                  <div className="mt-3 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={open}
                      className="rounded-lg border border-[#b08d57] px-4 py-2 text-sm font-semibold text-[#8b7653] hover:bg-[#f8f4eb]"
                    >
                      החלפת תמונה
                    </button>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
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
                    className="h-48 w-full rounded-xl object-cover"
                  />
                  <p className="mt-2 text-xs">התמונה הנוכחית</p>

                  <div className="mt-3 flex justify-center">
                    <button
                      type="button"
                      onClick={open}
                      className="rounded-lg border border-[#b08d57] px-4 py-2 text-sm font-semibold text-[#8b7653] hover:bg-[#f8f4eb]"
                    >
                      החלפת תמונה
                    </button>
                  </div>
                </div>
              ) : (
                <div className="cursor-pointer py-6">
                  <img src={noImage} alt="אין תמונה" className="mx-auto mb-3 h-24 w-24 rounded-xl object-cover opacity-60" />
                  <p>{isDragActive ? "שחררי כאן" : "גררי תמונה לכאן או לחצי לבחירה"}</p>
                </div>
              )}
            </div>

            {errors.image && <p className={errorStyle}>{errors.image.message}</p>}
          </div>
          <div className="mt-8 border-t border-[#f0e8de] pt-6">
            <button
              type="submit"
              disabled={roomFormMutation.isPending}
              className="w-full rounded-xl bg-[#8b7653] px-6 py-4 font-semibold text-white shadow-md shadow-[#8b7653]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#6f5d41] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#b08d57] focus:ring-offset-2"
            >
              שמירת פרטי החדר
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-[#b8a795]">
          VELLORA HOTEL · YOUR COMFORT, OUR PRIORITY
        </p>
        {roomFormMutation.error && (
          <div className="text-red-600">
            <p>{roomFormMutation.error.response?.data?.error?.message}</p>
            {roomFormMutation.error.response?.data?.error?.details?.map(d => (
              <p key={d.field} className="text-xs">{d.message}</p>
            ))}
          </div>
        )}
      </div>
      {show && messege}
    </div>
  )
}
