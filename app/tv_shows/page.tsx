import { redirect } from "next/navigation";

export default function TvIndex() {
  redirect("/tv_shows/trending");
}
