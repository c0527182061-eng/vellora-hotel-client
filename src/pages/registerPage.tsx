import type { RegisterRequest } from '../types/user';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from '../context/userContext';
import { Link, useNavigate } from 'react-router';
import { registerUseMutation } from '../hooks/useMutation';

export const registerSchema: yup.ObjectSchema<RegisterRequest> = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("יש להזין שם מלא")
    .min(2, "השם חייב להכיל לפחות 2 תווים")
    .max(100, "השם ארוך מדי (עד 100 תווים)"),
  email: yup
    .string()
    .trim()
    .required("יש להזין אימייל")
    .email("כתובת אימייל לא תקינה"),
  password: yup
    .string()
    .required("יש להזין סיסמה")
    .min(8, "הסיסמה חייבת להכיל לפחות 8 תווים")
    .max(72, "הסיסמה ארוכה מדי (עד 72 תווים)")
    .matches(/[A-Za-z]/, "הסיסמה חייבת להכיל לפחות אות אחת באנגלית")
    .matches(/[0-9]/, "הסיסמה חייבת להכיל לפחות ספרה אחת"),
  confirmPassword: yup
    .string()
    .required("יש להזין אימות סיסמה")
    .oneOf([yup.ref("password")], "הסיסמאות אינן תואמות"),
})

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterRequest>({
    resolver: yupResolver(registerSchema)
  });
  const { login: saveUser } = AuthContext()
  const navigate = useNavigate();
  const registerMutation = registerUseMutation();
  const submit = (data: RegisterRequest) => {
    registerMutation.mutate(data,
      {
        onSuccess: (response) => {
          localStorage.setItem("token", response.token)
          saveUser(response.user)
          navigate(response.user.role == 'CUSTOMER' ? "/my-bookings" : "/admin/bookings")
        }
      }
    )
  }

  return (
    <div dir="rtl" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#faf7f2] via-[#f7f1e6] to-[#eee3d0] px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,177,124,0.22),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(223,211,185,0.45),transparent_50%)]" />
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border border-[#b08d57]/10 sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -right-14 top-26 h-52 w-52 rounded-full border border-[#b08d57]/10 sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-[#b08d57]/10 sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_48%,rgba(176,141,87,0.035)_48.2%,transparent_48.5%)]" />

      <div className="relative w-full max-w-[480px]">
        <div className="absolute -inset-2 rounded-[32px] border border-[#d6c49d]/50" />
        <div className="absolute -inset-4 rounded-[36px] border border-[#d6c49d]/20" />

        <form
          onSubmit={handleSubmit(submit)}
          className="group relative overflow-hidden rounded-[24px] border border-[#e5dcc9] bg-[#fffefa]/95 px-6 py-9 shadow-[0_30px_80px_-28px_rgba(92,73,39,0.28)] backdrop-blur-sm transition-all duration-500 hover:shadow-[0_35px_90px_-28px_rgba(92,73,39,0.34)] sm:px-10 sm:py-11"
        >
          <div className="absolute right-0 top-0 h-1 w-full bg-gradient-to-l from-[#a88a50] via-[#f0e2bf] to-[#a88a50]" />
          <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-[#d9c9a5]/10 blur-2xl transition-all duration-700 group-hover:bg-[#d9c9a5]/25" />

          <div className="relative mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d8c49b]/50 bg-gradient-to-br from-[#faf4e7] to-[#eee2c9] text-[#a88a50] shadow-[0_8px_20px_rgba(176,141,87,0.12)] transition-all duration-500 group-hover:rotate-3 group-hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.4" stroke="currentColor" className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3.75 20.118a7.5 7.5 0 0 1 14.494-2.625" />
              </svg>
            </div>

            <p className="mb-2 text-[10px] font-medium tracking-[0.35em] text-[#a88a50]">
              JOIN VELLORA
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-[#423a2d] sm:text-[34px]">
              הרשמה
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#89806f]">
              הרשם כדי להמשיך
            </p>

            <div className="mx-auto mt-5 flex items-center justify-center gap-2">
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d8c49b]" />
              <span className="h-2 w-2 rotate-45 border border-[#b49a66] bg-[#f3e8d0] transition-transform duration-500 group-hover:rotate-90" />
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d8c49b]" />
            </div>
          </div>

          <div className="mb-5">
            <label className="mb-2.5 block text-sm font-semibold text-[#5c5140]">
              שם מלא
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#b09a70]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>

              <input
                {...register("fullName")}
                placeholder="שרה כהן"
                className="w-full rounded-xl border border-[#e3dccf] bg-[#fdfbf7] py-3.5 pl-4 pr-12 text-sm text-[#443b2e] outline-none transition-all duration-300 placeholder:text-[#b0a797] hover:border-[#c9b587] focus:border-[#ad9159] focus:bg-white focus:ring-4 focus:ring-[#d9c9a5]/25"
              />
            </div>

            <p className="mt-1.5 min-h-5 text-sm text-red-600">
              {errors.fullName?.message}
            </p>
          </div>

          <div className="mb-5">
            <label className="mb-2.5 block text-sm font-semibold text-[#5c5140]">
              אימייל
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#b09a70]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75m19.5 0-9.75 6.75L2.25 6.75" />
                </svg>
              </span>

              <input
                type='email'
                {...register("email")}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-[#e3dccf] bg-[#fdfbf7] py-3.5 pl-4 pr-12 text-sm text-[#443b2e] outline-none transition-all duration-300 placeholder:text-[#b0a797] hover:border-[#c9b587] focus:border-[#ad9159] focus:bg-white focus:ring-4 focus:ring-[#d9c9a5]/25"
              />
            </div>

            <p className="mt-1.5 min-h-5 text-sm text-red-600">
              {errors.email?.message}
            </p>
          </div>

          <div className="mb-5">
            <label className="mb-2.5 block text-sm font-semibold text-[#5c5140]">
              סיסמה
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#b09a70]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21H6.75a2.25 2.25 0 0 1-2.25-2.25v-6A2.25 2.25 0 0 1 6.75 10.5Z" />
                </svg>
              </span>

              <input
                type='password'
                {...register("password")}
                placeholder="הזן סיסמה"
                className="w-full rounded-xl border border-[#e3dccf] bg-[#fdfbf7] py-3.5 pl-4 pr-12 text-sm text-[#443b2e] outline-none transition-all duration-300 placeholder:text-[#b0a797] hover:border-[#c9b587] focus:border-[#ad9159] focus:bg-white focus:ring-4 focus:ring-[#d9c9a5]/25"
              />
            </div>

            <p className="mt-1.5 min-h-5 text-sm text-red-600">
              {errors.password?.message}
            </p>
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block text-sm font-semibold text-[#5c5140]">
              אימות סיסמה
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#b09a70]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m6.75 2.25a9.75 9.75 0 1 1-19.5 0 9.75 9.75 0 0 1 19.5 0Z" />
                </svg>
              </span>

              <input
                type='password'
                {...register("confirmPassword")}
                placeholder="אימות סיסמה"
                className="w-full rounded-xl border border-[#e3dccf] bg-[#fdfbf7] py-3.5 pl-4 pr-12 text-sm text-[#443b2e] outline-none transition-all duration-300 placeholder:text-[#b0a797] hover:border-[#c9b587] focus:border-[#ad9159] focus:bg-white focus:ring-4 focus:ring-[#d9c9a5]/25"
              />
            </div>

            <p className="mt-1.5 min-h-5 text-sm text-red-600">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <div className="mb-6 rounded-xl border border-[#e9e0ce]/80 bg-gradient-to-l from-[#faf6ed] to-[#fffefa] px-4 py-3.5 text-center transition-all duration-300 hover:border-[#d8c49b] hover:shadow-sm">
            <Link
              to={"/login"}
              className="inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium text-[#8a754c] underline-offset-4 transition-all duration-300 hover:text-[#514632] hover:underline focus:outline-none focus:ring-2 focus:ring-[#c9b587]/40"
            >
              רשומים כבר? להתחברות
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[-2px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </Link>
          </div>

          <button
            type='submit'
            disabled={registerMutation.isPending}
            className="group/button relative w-full overflow-hidden rounded-xl border border-[#66563c] bg-gradient-to-l from-[#514632] via-[#65543a] to-[#514632] px-5 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_8px_20px_rgba(81,70,50,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#927648] hover:from-[#76613c] hover:via-[#8a7045] hover:to-[#76613c] hover:shadow-[0_12px_28px_rgba(81,70,50,0.26)] focus:outline-none focus:ring-4 focus:ring-[#c9b587]/35 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 transition-transform duration-300 group-hover/button:scale-110">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M18 15l3-3m0 0-3-3m3 3H9" />
              </svg>
              הרשמה {registerMutation.isPending && 'loading....'}
            </span>
          </button>

          {registerMutation.error && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm leading-6 text-red-600">
              {registerMutation.error.response?.data?.error?.message ?? "אין חיבור לשרת. נסה שוב בעוד רגע"}
            </p>
          )}

          <div className="mt-7 flex items-center justify-center gap-2 text-[9px] tracking-[0.25em] text-[#b09a70]/80">
            <span className="h-px w-6 bg-[#d8c49b]/60" />
            VELLORA · HOSPITALITY & COMFORT
            <span className="h-px w-6 bg-[#d8c49b]/60" />
          </div>
        </form>
      </div>
    </div>
  )
}