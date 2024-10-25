"use server";

import axios from "axios";
import {API} from "./API";

interface BookData {
  title: string;
  author: string;
  description: string;
  cover: string;
}

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API}/api/books`);    const dataObj = response.data;
    return dataObj.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBookByQuery = async (query: string) => {
  try {
    const response = await axios.get(`${API}/api/books/${query}`);
    const dataObj = response.data;
    return dataObj.data;
  } catch (error) {
    console.error(error);
  }
}

export const createBook = async ({ data }: { data: BookData } ,token:string | undefined, ) => {
  try {

    if(!data)return;
    const response =  await axios.post(
      `${API}/api/books`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: token,
        },
      })
    const dataObj = response.data;

    return dataObj.data;
  } catch (error) {
    console.error(error);
  }
};