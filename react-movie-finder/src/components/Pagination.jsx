export default function Pagination({ page , total , perPage=10, onPage})
{
    const totalPages = Math.ceil(total / perPage);
    if(totalPages <= 1) return null;
    return(

<div className="flex items-center gap-2 justify-center mt-4">
      <button disabled={page<=1} onClick={()=>onPage(page-1)} className="px-3 py-1 border rounded-lg disabled:opacity-40">Önceki</button>
      <span className="text-sm">Sayfa {page} / {totalPages}</span>
      <button disabled={page>=totalPages} onClick={()=>onPage(page+1)} className="px-3 py-1 border rounded-lg disabled:opacity-40">Sonraki</button>
    </div>

    );

}