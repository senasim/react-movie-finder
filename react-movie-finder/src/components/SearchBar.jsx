import { useEffect,useState } from "react";

export default function SearchBar({ defaultValue="", onSearch }){
const [q,setQ] =useState(defaultValue);

useEffect(() => {
    const t =setTimeout(() => onSearch(q.trim()), 500);

    return ()=> clearTimeout(t);
}, [q, onSearch]);

return (
    < input
    className="w-full border rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"

     value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Film adı yaz..."
      
    />
);
}