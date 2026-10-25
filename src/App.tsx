
import { Outlet } from "react-router"
import Header from "./components/header/header"
import Footer from "./components/footer"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
