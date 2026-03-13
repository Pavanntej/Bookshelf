// components/BookCard.jsx
import { useState } from "react";
import TrailerModal from "./TrailerModal";
import { motion } from "framer-motion";

export default function BookCard({ book }) {
  const [open, setOpen] = useState(false);

  function onMouseEnter() {
    // set CSS var for page bg to book.accentColor
    document.documentElement.style.setProperty('--page-bg', book.accentColor || '#f5f5f7');
  }
  function onMouseLeave() {
    document.documentElement.style.setProperty('--page-bg', '#f8fafc');
  }

  const ytId = (url) => {
    try { const u = new URL(url); return u.searchParams.get("v") || url.split('/').pop(); } catch { return url; }
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl shadow-md overflow-hidden"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <img src={book.coverUrl} alt={book.title} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-sm text-gray-500">{book.genre}</p>
          <p className="mt-2 text-sm line-clamp-3">{book.description}</p>

          <div className="mt-4 flex gap-2">
            <button onClick={()=>setOpen(true)} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm">Watch Trailer</button>
            <a href={book.buyColourUrl} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg border text-sm">Buy Colour</a>
            <a href={book.buyBWUrl} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg border text-sm">Buy B&W</a>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-gray-600">Cast: {book.cast?.join(", ")}</div>
            <div className="flex gap-2">
              <button onClick={() => {
                // copy link
                const link = `${location.origin}/books/${book.slug || book.id}`;
                navigator.clipboard.writeText(link);
                alert("Link copied!");
              }} className="text-xs underline">Copy Link</button>
            </div>
          </div>
        </div>
      </motion.div>

      <TrailerModal open={open} onClose={()=>setOpen(false)} videoId={ytId(book.trailerUrl)} />
    </>
  );
}
