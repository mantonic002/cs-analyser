import axios from "axios";
import {type Game } from "../models";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export async function parseDemo(file: File): Promise<Game> {
  const formData = new FormData();
  formData.append("demo", file);

  const response = await api.post("/parse", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data as Game;
}
