
import { useNavigate } from "react-router"

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div
      dir="rtl"
      className="flex min-h-[75vh] items-center justify-center bg-[#faf7f2] px-6 py-16"
    >
      <div className="w-full max-w-2xl text-center">

        <div className="relative mb-6">
          <span className="select-none text-[140px] font-extrabold leading-none tracking-tight text-[#eee3d3] sm:text-[190px]">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-[#d8c19e] bg-[#faf7f2] px-5 py-2 text-sm font-semibold tracking-widest text-[#a38352]">
              VELLORA
            </span>
          </div>
        </div>

        <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-[#b08d57]" />

        <h1 className="mb-4 text-3xl font-bold text-[#3d3028] sm:text-4xl">
          אופס! הלכנו לאיבוד
        </h1>

        <p className="mx-auto mb-3 max-w-lg text-lg leading-8 text-[#6f5a49]">
          נראה שהעמוד שחיפשת יצא לחופשה...
        </p>

        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-[#9b8a7c]">
          ייתכן שהכתובת שגויה או שהעמוד כבר לא קיים.
          אל דאגה, נשמח לעזור לך למצוא את הדרך חזרה.
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#8b7653] px-8 py-4 font-semibold text-white shadow-lg shadow-[#8b7653]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#6f5d41] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#b08d57] focus:ring-offset-2"
        >
          <span>חזרה לעמוד הבית</span>
          <span className="text-lg">←</span>
        </button>

        <p className="mt-10 text-xs tracking-wider text-[#b8a795]">
          VELLORA HOTEL · YOUR COMFORT, OUR PRIORITY
        </p>

      </div>
    </div>
  )
}
