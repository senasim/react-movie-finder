import { BrowserRouter, Routes,Route,Link } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

export default function App() {
  return(
    <BrowserRouter>
   <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-md">
  <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
    <Link to="/" className="text-lg font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
      🎬 React Movie Finder
    </Link>
    <div className="ml-auto flex gap-3">
      <Link to="/" className="hover:underline">Ara</Link>
      <Link to="/favorites" className="hover:underline">Favoriler</Link>
    </div>
  </nav>
</header>

    
    <main className="max-w-6xl mx-auto px-4 py-6">
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/movie/:id" element={<Details />} />
  <Route path="/favorites" element={<Favorites />} />

</Routes>
    </main>
    
    
    </BrowserRouter>
  );

}