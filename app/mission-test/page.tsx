import { redirect } from "next/navigation";

/** Ancien nom — on renvoie vers Premiers pas. */
export default function MissionTestRedirect() {
  redirect("/premiers-pas");
}
