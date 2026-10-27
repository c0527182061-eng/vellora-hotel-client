import Form from "../components/BookingFormPage/form";
import RoomDetails from "../components/BookingFormPage/roomDetails";



export default function BookingFormPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#faf7f1] via-[#f7f3eb] to-[#eee5d7] px-4 py-8 sm:px-6 lg:py-12"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-9 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[#a7834e] sm:text-sm">
            VELLORA · YOUR STAY
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-[#30271f] sm:text-4xl lg:text-5xl">
            השלמת ההזמנה
          </h1>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#c9ad7c]" />
            <span className="h-2 w-2 rotate-45 bg-[#b18b51]" />
            <span className="h-px w-12 bg-[#c9ad7c]" />
          </div>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#827568] sm:text-base">
            השלימו את הפרטים ותכננו את השהייה שלכם ב־Vellora.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <section className="min-w-0 overflow-hidden rounded-3xl border border-[#e8ddca] bg-white/95 shadow-[0_15px_50px_rgba(73,54,32,0.08)] transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(73,54,32,0.12)] [&>div]:!min-h-0 [&>div]:!bg-transparent [&>div>div:first-child]:hidden">
            <RoomDetails />
          </section>

          <section className="min-w-0 overflow-hidden rounded-3xl border border-[#e8ddca] bg-white/95 shadow-[0_15px_50px_rgba(73,54,32,0.08)] transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(73,54,32,0.12)]">
            <Form />
          </section>
        </div>

        <footer className="mt-9 text-center">
          <p className="text-xs tracking-[0.25em] text-[#a18b70]">
            VELLORA HOTELS
          </p>
          <p className="mt-2 text-xs text-[#a18b70]/80">
            Every stay, a special experience
          </p>
        </footer>
      </div>
    </main>
  );
}