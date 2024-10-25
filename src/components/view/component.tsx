import { useState } from "react";
import { formater } from "@/lib/utils";
import Image from "next/image";
import ChaptersPage from "./chapter";
import { FaBell, FaBookmark } from "react-icons/fa";

interface TagsProps {
  cover: string;
  description: string;
  title: string;
  author: string;
  createdAt: string;
}

const Tags: React.FC<TagsProps> = ({
  cover,
  description,
  title,
  author,
  createdAt,
}) => {
  const tags = [
    "Comedy",
    "Fantasy",
    "Harem",
    "Mystery",
    "Psychological",
    "Romance",
  ];

  const [isExpanded, setIsExpanded] = useState(false);


  const toggleDescription = () => setIsExpanded((prev) => !prev);

  const MAX_LENGTH = 100; 

  return (
    <div className="flex flex-col md:flex-row p-4 sm:p-8 space-y-6 md:space-y-0 md:space-x-8">
      <div className="w-full md:w-1/3 h-1/2 bg-opacity-20 bg-black backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-6">
        <Image
          src={cover}
          alt="Cover"
          layout="responsive"
          width={400}
          height={600}
          className="rounded-lg object-cover shadow-lg"
        />
        <div className="justify-center flex my-5 space-x-4">
          <button className="inline-block items-center gap-2 text-gray-400 hover:text-green-500 transition-all">
            <FaBookmark size={25}/>
          </button>
          <button className="inline-block items-center gap-2 text-gray-400 hover:text-green-500 transition-all">
            <FaBell size={25}/>
          </button>
        </div>
        <button className="w-full mt-4 py-2 px-4 text-white bg-green-600 hover:bg-green-500 rounded-lg transition-all">
          Read
        </button>
      </div>

      {/* Section Kanan: Detail, Tags, dan Deskripsi */}
      <div className="w-full md:w-2/3 space-y-6">
        {/* Gambar Parsial di Atas */}
        <div className="relative hidden md:block  h-48 sm:h-72 overflow-hidden rounded-xl shadow-lg">
          <Image
            src="/sample.jpg"
            alt="Partial Cover"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className="rounded-xl"
          />
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h1 className="text-xl sm:text-3xl font-bold">{title}</h1>
        </div>

        <div className="flex flex-wrap justify-between text-gray-300 text-sm sm:text-base">
          <span className="font-semibold">{author}</span>
          <span>666.6K Reads</span>
          <span>4.8 Rating</span>
          <span>{formater(createdAt)}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          <p>
            {isExpanded ? description : description.slice(0, MAX_LENGTH) + "..."}
          </p>
          <button
            onClick={toggleDescription}
            className="mt-2 text-green-500 hover:underline"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        </div>

 
        <ChaptersPage />
      </div>
    </div>
  );
};

export default Tags;
