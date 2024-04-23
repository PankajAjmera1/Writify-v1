import { BrowserRouter,Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./Components/Header"
import FooterComp from "./Components/Footer"

function App() {

  return (
   <BrowserRouter>
   <Header/>
   <Routes>
   <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
   </Routes>
   <FooterComp/>
   </BrowserRouter>
  )
}

export default App
