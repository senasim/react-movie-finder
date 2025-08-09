const BASE = "https://www.omdbapi.com/";

export async function searchMovies(q, page = 1, type = "all") {
  if (!q) return { Search: [], totalResults: 0 };

  const params = new URLSearchParams({
    apikey: import.meta.env.VITE_OMDB_KEY,
    s: q,
    page: String(page),
  });

  // OMDb: type=movie|series|episode — "all" ise hiç eklemiyoruz
  if (type && type !== "all") params.set("type", type);

  const url = `https://www.omdbapi.com/?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "Arama hatası");
  return data;
}

export async function getMovieById(id) {
  const url = `${BASE}?apikey=${import.meta.env.VITE_OMDB_KEY}&i=${id}&plot=full`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "Bulunamadı");
  return data;
}

export async function getMoviesByIds(ids = []) {
  const results = [];
  for (const id of ids) {
    try {
      const url = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&i=${id}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response !== "False") {
        results.push(data);
      }
    } catch (e) {
      console.error("Öneri film getirilemedi:", id, e);
    }
  }
  return results;
}
