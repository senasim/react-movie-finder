import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [favs, setFavs] = useState([]);
  useEffect(() => { setFavs(JSON.parse(localStorage.getItem("favs")||"[]")); }, []);
  const isFav = (id) => new Set(favs.map(f=>f.imdbID)).has(id);
  const toggle = (m) => {
    const set = new Set(favs.map(f=>f.imdbID));
    const next = set.has(m.imdbID) ? favs.filter(x=>x.imdbID!==m.imdbID) : [...favs, m];
    setFavs(next);
    localStorage.setItem("favs", JSON.stringify(next));
  };

  if (!favs.length) return <div>Favoriniz yok.</div>;
  return (
    <div className="grid gap-3">
      {favs.map(m => (
        <MovieCard key={m.imdbID} movie={m} isFav={isFav(m.imdbID)} onToggleFav={toggle} />
      ))}
    </div>
  );
}
