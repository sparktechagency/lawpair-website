
import Banner from "../../components/home/banner/Banner"
import FindAttorney from "../../components/home/FindAttorney"
import HomeLegalResources from "../../components/home/HomeLegalResources"


const Home = () => {
  return (
    <div className="">
     <div >
     <Banner />
     </div>

      <FindAttorney />
      <HomeLegalResources />
    </div>
  )
}

export default Home