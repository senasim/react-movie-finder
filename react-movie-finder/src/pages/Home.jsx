import { useCallback, useState,useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import Pagination from "../components/Pagination";
import { searchMovies } from "../lib/omdb";
import { getMoviesByIds } from "../lib/omdb";

export default function Home() {
  const [query, setQuery]   = useState("");
  const [page, setPage]     = useState(1);
  const [type, setType]     = useState("all"); // 👈 yeni
  const [state, setState]   = useState({ loading:false, error:"", items:[], total:0 });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
  const loadSuggestions = async () => {
    const ids = ["tt1375666", "tt0133093", "tt0816692"]; 
    // Inception, The Matrix, Interstellar
    const movies = await getMoviesByIds(ids);
    setSuggestions(movies);
  };
  loadSuggestions();
}, []);
  const runSearch = useCallback(async (q, p = 1, t = type) => {
    setQuery(q); setPage(p);
    if (!q) { setState({loading:false,error:"",items:[],total:0}); return; }
    try {
      setState(s => ({ ...s, loading:true, error:"" }));
      const data = await searchMovies(q, p, t);
      setState({ loading:false, error:"", items:data.Search, total:Number(data.totalResults||0) });
    } catch (e) {
      setState(s => ({ ...s, loading:false, error:e.message || "Hata" }));
    }
  }, [type]);

  return (
    <div className="space-y-4">
      {/* Arama + Tür filtresi aynı satırda */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <SearchBar defaultValue={query} onSearch={(q) => runSearch(q, 1, type)} />
        </div>

        {/* Tür seçimi */}
        <select
          value={type}
          onChange={(e) => {
            const next = e.target.value;
            setType(next);
            // mevcut query ile 1. sayfadan tekrar ara
            runSearch(query, 1, next);
          }}
          className="border rounded-xl px-3 py-2 bg-white"
          title="Tür"
        >
          <option value="all">Tümü</option>
          <option value="movie">Film</option>
          <option value="series">Dizi</option>
          <option value="episode">Bölüm</option>
        </select>
      </div>
      {!query && suggestions.length > 0 && (
  <div>
    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
  🎯 Önerilen Filmler
  <span className="flex-1 h-[2px] bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"></span>
</h2>
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {suggestions.map((m) => (
        <MovieCard key={m.imdbID} movie={m} />
      ))}
    </div>
  </div>
)}

      {state.error && <div className="text-sm text-red-600">Hata: {state.error}</div>}

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {state.items.length === 0 && state.loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : state.items.map((m) => <MovieCard key={m.imdbID} movie={m} />)}
      </div>

      {/* Boş durum */}
      {!state.loading && !state.error && query && state.items.length === 0 && (
        <div className="text-sm text-gray-600">“{query}” için sonuç bulunamadı.</div>
      )}

      {/* Sayfalama (türü koruyarak) */}
      <Pagination
        page={page}
        total={state.total}
        onPage={(p) => runSearch(query, p, type)}
      />
    </div>
  );
}
