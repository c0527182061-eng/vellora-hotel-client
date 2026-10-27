
import { Outlet } from "react-router"
import Header from "./components/header/header"
import Footer from "./components/footer"
import ScrollToTop from "./components/scrollToTop"

function App() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#faf7f2] text-[#3d3028]">
      <Header />
      <ScrollToTop />
      <main className="relative flex-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#f1e7d8]/40 to-transparent" />
        <div className="relative min-h-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
