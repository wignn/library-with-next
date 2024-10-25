"use client";
import Tags from "../../../components/view/component";
import { usePathname } from "next/navigation";
import { getBookByQuery } from "@/lib/action.book";
import { useEffect, useState } from "react";

export default function Home() {
  const [book, setBook] = useState<{ cover: string; description: string; title: string ,author:string, createdAt:string} | null>(null);
  const pathname = usePathname();
  const segments = pathname.split("/").filter((part) => part);
  const query = segments[1];
  const fetchData = async () => {
    const data = await getBookByQuery(query);
    setBook(data);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  },[]);
  return (
    <div className="min-h-screen bg-gray-700 text-white p-2 md:p-8">
      {book && <Tags cover={book.cover} description={book.description} title={book.title} author={book.author} createdAt={book.createdAt}/>}
    </div>
  );
}
