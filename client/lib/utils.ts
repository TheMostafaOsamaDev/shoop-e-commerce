import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const sliceText = (text: string = "", length: number = 15) => {
  return text.slice(0, length) + (text.length > length ? "..." : "");
};

// Wrap file name

export const wrapFileName = (fileName: string, length: number = 15) => {
  const [name, ext] = fileName.split(".");
  return `${sliceText(name, length)}.${ext}`;
};

// Get assets URL
export const getAssetsUrl = (
  path: string,
  isExternal?: boolean,
  route?: string
) => {
  if (isExternal) return path;

  return `${process.env.NEXT_PUBLIC_BACKEND_UPLOADS_URL}/${route}/${path}`;
};

// Formatter category && subCategory
export const categoryFormatter = (value: any) =>
  value.replaceAll("'", "`").replaceAll(" ", "_").toUpperCase();

// params will be of type { [key: string]: string | number | boolean }
export const getQueryParams = (params: {
  [key: string]: string | number | boolean | undefined;
}) => {
  let query = "?";

  for (const key in params) {
    if (params[key] === undefined) continue;
    query += `${key}=${params[key]}&`;
  }

  return query;
};
