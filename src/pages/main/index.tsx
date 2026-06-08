import Home from "@/components/layout/Home"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Profile from "@/components/layout/Profile"
import Projects from "@/components/layout/Projects"
import Technology from "@/components/layout/Technology"
import FlowingDivider from "@/components/ui/FlowingDivider"



const Main: React.FC = () => {
  return (
    <>
      <Header />

      <Home />

      <FlowingDivider className="my-10 sm:my-16" />

      <Profile />
      <Technology />
      <Projects />

      <Footer />
    </>

  )
}

export default Main