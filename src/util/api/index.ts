import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const api_url = "https://api.jikan.moe/v4";
const etagCache = new Map<string, string>();

export const get = async (endpoint: string, params?: string) => {
  let url = api_url + endpoint;
  if (params) {
    url += "?" + new URLSearchParams(params).toString();
  }
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const savedEtag = etagCache.get(url);
  if (savedEtag) {
    headers["If-None-Match"] = savedEtag;
  }
  try {
    const response = await axios.get(url, {
      headers,
      validateStatus: (status) => status === 200 || status === 304,
    });
    const newEtag = response.headers["etag"];
    if (response.status === 200 && newEtag) {
      etagCache.set(url, newEtag);
    }

    return response;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === axios.HttpStatusCode.NotModified) {
      toast.success("Conteúdo não modificado (304)");
      return { status: 304, data: "Not Modified" };
    }
    if (err.response?.status === axios.HttpStatusCode.TooManyRequests) {
      console.error("Muitas requisições, tente novamente mais tarde.");
      return { status: 429, data: "Too Many Requests" };
    }

    throw err;
  }
};
