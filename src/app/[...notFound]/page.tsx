import { notFound } from "next/navigation";

export default function CatchAll() {
  notFound(); // This will trigger the not-found page
} 