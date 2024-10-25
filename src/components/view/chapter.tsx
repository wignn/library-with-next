import { useState } from "react";

interface Chapter {
  id: number;
  title: string;
  date: string;
  type: "Premium" | "Free";
}

//mock
const chapters: Chapter[] = [
  { id: 1, title: "First Encounter", date: "Jul 04, 2024", type: "Free" },
  { id: 2, title: "A Study in Grey", date: "Jul 04, 2024", type: "Free" },
  { id: 3, title: "A Study in Grey (2)", date: "Jul 04, 2024", type: "Free" },
  {
    id: 4,
    title: "The Scandal of the Bohemian Queen",
    date: "Jul 04, 2024",
    type: "Free",
  },
  { id: 5, title: "Chapter 5 (Premium)", date: "Jul 05, 2024", type: "Premium" },
];

const ChaptersPage = () => {
  const [selectedType, setSelectedType] = useState<"All" | "Premium" | "Free">(
    "All"
  );

  const filteredChapters = chapters.filter(
    (chapter) => selectedType === "All" || chapter.type === selectedType
  );

  return (
    <div className="flex justify-center items-start">
      <div className="w-full  bg-gray-800 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">206 Chapters</h1>

        <div className="flex space-x-4 mb-6">
          {["All", "Premium", "Free"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as "All" | "Premium" | "Free")}
              className={`px-4 py-2 rounded-lg ${
                selectedType === type
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } transition-all`}
            >
              {type}
            </button>
          ))}
        </div>

        <ul className="space-y-4">
          {filteredChapters.map((chapter) => (
            <li
              key={chapter.id}
              className="border-b border-gray-600 pb-4 last:border-none"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  {chapter.title}
                </h2>
                <span className="text-sm text-gray-400">{chapter.date}</span>
              </div>
              <p className="text-gray-500">{chapter.type} Chapter</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChaptersPage;
