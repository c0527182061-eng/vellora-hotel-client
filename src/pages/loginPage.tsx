
import type { LoginRequest } from '../types/user';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from '../context/userContext';
import { Link, useNavigate } from 'react-router';
import { loginUseMutation } from '../hooks/useMutation';



export const loginSchema: yup.ObjectSchema<LoginRequest> = yup.object({
  email: yup
    .string()
    .trim()
    .email("כתובת אימייל לא תקינה")
    .required("יש להזין אימייל"),
  password: yup
    .string()
    .required("יש להזין סיסמה"),
});

export default function LoginPage() {
  const { login: saveUser } = AuthContext()
  const navigate = useNavigate();
  const loginMutation = loginUseMutation();
  const submit = (data: LoginRequest) => {
    loginMutation.mutate(data,
      {
        onSuccess: (response) => {
          localStorage.setItem("token", response.token)
          saveUser(response.user)
          navigate(response.user.role == 'CUSTOMER' ? "/my-bookings" : "/admin/bookings")
        }
      }
    )
  }



  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  });

  return (
    <div dir="rtl" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f4ed] px-4 py-14 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,177,124,0.16),_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(223,211,185,0.35),_transparent_50%)]" />

      <div className="relative w-full max-w-[460px]">
        <div className="absolute -inset-2 rounded-[28px] border border-[#d6c49d]/40" />

        <form
          onSubmit={handleSubmit(submit)}
          className="relative overflow-hidden rounded-2xl border border-[#e5dcc9] bg-[#fffefa] px-7 py-10 shadow-[0_24px_70px_-24px_rgba(92,73,39,0.22)] sm:px-11 sm:py-12"
        >
          <div className="absolute right-0 top-0 h-1 w-full bg-gradient-to-l from-[#a88a50] via-[#e6d7b5] to-[#a88a50]" />

          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-[#423a2d] sm:text-[34px]">
              התחברות
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#89806f]">
              התחבר לחשבון שלך כדי להמשיך
            </p>

            <div className="mx-auto mt-6 flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-[#d8c49b]" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#b49a66]" />
              <span className="h-px w-10 bg-[#d8c49b]" />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block text-sm font-semibold text-[#5c5140]">
              אימייל
            </label>

            <input
              type='email'
              {...register("email")}
              placeholder="name@example.com"
              className="w-full rounded-lg border border-[#e3dccf] bg-[#fdfbf7] px-4 py-3.5 text-sm text-[#443b2e] outline-none transition duration-200 placeholder:text-[#b0a797] hover:border-[#c9b587] focus:border-[#ad9159] focus:bg-white focus:ring-4 focus:ring-[#d9c9a5]/20"
            />

            <p className="mt-1.5 min-h-5 text-sm text-red-600">
              {errors.email?.message}
            </p>
          </div>

          <div className="mb-8">
            <label className="mb-2.5 block text-sm font-semibold text-[#5c5140]">
              סיסמה
            </label>

            <input
              type='password'
              {...register("password")}
              placeholder="הזן סיסמה"
              className="w-full rounded-lg border border-[#e3dccf] bg-[#fdfbf7] px-4 py-3.5 text-sm text-[#443b2e] outline-none transition duration-200 placeholder:text-[#b0a797] hover:border-[#c9b587] focus:border-[#ad9159] focus:bg-white focus:ring-4 focus:ring-[#d9c9a5]/20"
            />

            <p className="mt-1.5 min-h-5 text-sm text-red-600">
              {errors.password?.message}
            </p>
          </div>
          <div>
            <Link to={"/register"}
              className="mt-6 mb-6 block text-center text-sm font-medium text-[#8a754c] underline-offset-4 transition-all duration-300 hover:text-[#514632] hover:underline focus:outline-none focus:ring-2 focus:ring-[#c9b587]/40 rounded-md"            >
              אין לכם חשבון?להרשמה</Link>
          </div>
          <button
            type='submit'
            disabled={loginMutation.isPending}
            className="group relative w-full overflow-hidden rounded-lg bg-[#514632] px-5 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_6px_16px_rgba(81,70,50,0.15)] transition-all duration-300 hover:bg-[#76613c] hover:shadow-[0_9px_22px_rgba(81,70,50,0.22)] focus:outline-none focus:ring-4 focus:ring-[#c9b587]/35 active:scale-[0.99]"
          >
            <span className="relative z-10">התחברות {loginMutation.isPending && 'loading....'}</span>
          </button>
          {loginMutation.error && (
            <p className="text-sm text-red-600">
              {loginMutation.error.response?.data?.error?.message ?? "אין חיבור לשרת. נסי שוב בעוד רגע"}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
