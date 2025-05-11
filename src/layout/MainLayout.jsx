import { Outlet } from "react-router-dom"
import Header from "../components/shared/header/Header"
import Footer from "../components/shared/footer/Footer"

const MainLayout = () => {
  return (
    <div>
        {/* Header component */}
        <Header />

      <div className="min-h-[340px]">
      <Outlet />
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  )
}

export default MainLayout