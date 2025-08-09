import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "../lib/omdb";

export default function Details() {
  const { id } = useParams();
  const [state, setState] = useState({ loading:true, error:"", movie:null });

  useEffect(() => {
    (async () => {
      try {
        setState({loading:true, error:"", movie:null});
        const data = await getMovieById(id);
        setState({loading:false, error:"", movie:data});
      } catch(e) {
        setState({loading:false, error:e.message||"Hata", movie:null});
      }
    })();
  }, [id]);

  if (state.loading) return <div>Yükleniyor...</div>;
  if (state.error) return <div className="text-red-600">{state.error}</div>;
  const m = state.movie;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <img className="rounded-xl w-full object-cover" src={m.Poster && m.Poster!=="N/A" ? m.Poster : "https://via.placeholder.com/500x750?text=No+Image"} alt={m.Title} />
      <div className="md:col-span-2 space-y-2">
        <h1 className="text-2xl font-semibold">{m.Title} ({m.Year})</h1>
        <div className="text-sm text-gray-700">{m.Runtime} • {m.Genre} • {m.Rated}</div>
        <div className="text-sm">IMDB: {m.imdbRating} / 10 (Oy: {m.imdbVotes})</div>
        <p className="mt-3 text-gray-800 leading-relaxed">{m.Plot}</p>
        <div className="text-sm text-gray-700">Yönetmen: {m.Director}</div>
        <div className="text-sm text-gray-700">Oyuncular: {m.Actors}</div>
        <Link to="/" className="inline-block mt-4 px-4 py-2 border rounded-lg">← Geri</Link>
      </div>
    </div>
  );
}
