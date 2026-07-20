import { redirect } from "next/navigation";

/** Ancien slug (PDP) → PA. */
export default function PdpArticleRedirect() {
  redirect("/pa-ppf-qui-fait-quoi-facturation-electronique");
}
