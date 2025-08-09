// src/components/MovieCard.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const [loaded, setLoaded] = useState(false);

  // Poster URL'ini önceden doğrula; http/https değilse direkt placeholder kullan
  const posterUrl = useMemo(() => {
    const p = movie?.Poster;
    if (typeof p === "string" && /^https?:\/\//i.test(p)) return p;
    return "/placeholder.png"; // public/placeholder.png
  }, [movie?.Poster]);

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform bg-white"
    >
      <div className="aspect-[2/3] bg-gray-200 relative">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" />}
        <img
          src={posterUrl}
          alt={movie?.Title || "Poster"}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            if (e.currentTarget.src.endsWith("/placeholder.png")) return;
            e.currentTarget.src = "/placeholder.png";
            setLoaded(true);
          }}
        />
      </div>

      <div className="p-3">
        <h3 className="text-base font-semibold group-hover:text-pink-600 transition-colors line-clamp-1">
          {movie?.Title}
        </h3>
        <p className="text-sm text-gray-600">{movie?.Year}</p>
      </div>
    </Link>
  );
}
