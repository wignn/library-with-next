"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { SingleImageDropzone } from "../../../components/image";
import { useEdgeStore } from "@/lib/edgeStore";
import { useSession } from "next-auth/react";
import { createBook } from "@/lib/action.book";

interface FormData {
  title: string;
  author: string;
  description: string;
}

interface FileUrls {
  url: string;
  thumbnailUrl: string;
}

const CreateBookForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    description: "",
  });
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<FileUrls | undefined>(undefined);
  const [progress, setProgress] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { edgestore } = useEdgeStore();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.description || !file) {
      setFormErrors({ submit: "All fields are required." });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});
    setSuccessMessage("");

    try {
      const result = await edgestore.myPublicImage.upload({
        file,
        onProgressChange: setProgress,
      });

      setUrl({
        url: result.url || "",
        thumbnailUrl: result.thumbnailUrl || "",
      });
      const token = session?.token;
      const res = await createBook(
        { data: { ...formData, cover: result.url } },
        token
      );

      console.log(res.data);
      setSuccessMessage("Book created successfully!");
      setFormData({ title: "", author: "", description: "" });
      setUrl(undefined);
      setProgress(0);
      setFile(undefined);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setFormErrors({
          submit:
            error.response.data.message ||
            "Failed to create book. Please try again.",
        });
      } else {
        setFormErrors({ submit: "Failed to create book. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-100 to-gray-300 p-6 my-4 rounded-lg border border-gray-400 shadow-lg"
      >
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter title..."
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter author..."
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        {/* Description Field */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter description..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Cover Image Upload */}
        <div className="mb-5">
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-gray-700"
          >
            Cover Image
          </label>
          <div className="justify-center flex">
            <SingleImageDropzone
              width={100}
              height={100}
              value={file}
              dropzoneOptions={{ maxSize: 1024 * 1024 * 1 }} // 1 MB limit
              onChange={(file) => setFile(file)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full mb-4">
            <div
              className="bg-indigo-500 text-xs font-medium text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}

        {/* Form Errors */}
        {formErrors.submit && (
          <p className="text-red-500 mb-4">{formErrors.submit}</p>
        )}

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        {url && (
          <div className="text-green-500 mb-4">
            <p>URL: {url.url}</p>
            <p>Thumbnail URL: {url.thumbnailUrl}</p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition ease-in-out shadow-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateBookForm;
