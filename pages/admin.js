// pages/admin.js
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Admin() {

const [user,setUser] = useState(null)
const [books,setBooks] = useState([])

const [title,setTitle] = useState("")
const [genre,setGenre] = useState("")
const [description,setDescription] = useState("")
const [trailer,setTrailer] = useState("")
const [colour,setColour] = useState("")
const [bw,setBw] = useState("")
const [cover,setCover] = useState("")

useEffect(()=>{
const unsub = auth.onAuthStateChanged(u => setUser(u))
return unsub
},[])

async function login(){
const provider = new GoogleAuthProvider()
await signInWithPopup(auth,provider)
}

async function loadBooks(){
const snap = await getDocs(collection(db,"books"))
setBooks(snap.docs.map(d=>({id:d.id,...d.data()})))
}

useEffect(()=>{
if(user) loadBooks()
},[user])

async function addBook(){

await addDoc(collection(db,"books"),{
title,
genre,
description,
trailerUrl:trailer,
buyColourUrl:colour,
buyBWUrl:bw,
coverUrl:cover
})

alert("Book Added!")

setTitle("")
setGenre("")
setDescription("")
setTrailer("")
setColour("")
setBw("")
setCover("")

loadBooks()
}

if(!user){
return(
<div className="min-h-screen flex items-center justify-center">
<button onClick={login} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
Sign in with Google
</button>
</div>
)
}

return(

<div className="max-w-4xl mx-auto py-10">

<h2 className="text-2xl mb-6">Admin — Add Book</h2>

<div className="grid gap-4">

<input
placeholder="Title"
value={title}
onChange={e=>setTitle(e.target.value)}
className="border p-2"
/>

<input
placeholder="Genre"
value={genre}
onChange={e=>setGenre(e.target.value)}
className="border p-2"
/>

<textarea
placeholder="Description"
value={description}
onChange={e=>setDescription(e.target.value)}
className="border p-2"
/>

<input
placeholder="Trailer YouTube Link"
value={trailer}
onChange={e=>setTrailer(e.target.value)}
className="border p-2"
/>

<input
placeholder="Buy Colour Link"
value={colour}
onChange={e=>setColour(e.target.value)}
className="border p-2"
/>

<input
placeholder="Buy Black & White Link"
value={bw}
onChange={e=>setBw(e.target.value)}
className="border p-2"
/>

<input
placeholder="Book Cover Image URL"
value={cover}
onChange={e=>setCover(e.target.value)}
className="border p-2"
/>

<button
onClick={addBook}
className="bg-green-600 text-white p-3 rounded"
>
Add Book
</button>

</div>

<h2 className="text-xl mt-10 mb-4">Books</h2>

<div className="grid grid-cols-2 gap-4">

{books.map(book=>(
<div key={book.id} className="border p-3 rounded">

<img
src={book.coverUrl}
className="w-full h-40 object-cover"
/>

<h3 className="font-semibold mt-2">
{book.title}
</h3>

<p className="text-sm text-gray-500">
{book.genre}
</p>

</div>
))}

</div>

</div>

)

}
