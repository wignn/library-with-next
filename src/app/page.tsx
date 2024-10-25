import { getBooks } from "@/lib/action.book";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface book {
  id: string;
  title: string;
  cover: string;
  author: string;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const books = await getBooks();
  console.log("Session:", session?.user?.name);

  return (
<div className="min-h-screen bg-white text-gray-800">
  <nav className="p-4 bg-green-700 flex justify-between mb-10">
    <div className="font-bold text-xl text-white">
      <span className="text-gray-950">wi</span>gnn
    </div>
    <ul className="flex space-x-4 text-white">
      <li className="hover:text-green-300">Novels</li>
      <li className="hover:text-green-300">Library</li>
      <li className="hover:text-green-300">Store</li>
      <li className="hover:text-green-300">Events</li>
    </ul>
  </nav>



  <div className="p-4 grid grid-cols-2 mx-10 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {books.map((book: book) => (
      <div
        key={book.id}
        className="bg-gradient-to-b from-white to-gray-200 rounded-lg overflow-hidden shadow-lg border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-2xl"
      >
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900">{book.title}</h2>
          <p className="text-gray-700 mt-2">
            Author: <span className="text-green-600">{book.author}</span>
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


  
  );
}
