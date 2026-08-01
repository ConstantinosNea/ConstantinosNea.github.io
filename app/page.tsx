import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

/** Static-export friendly root redirect (middleware is not available with `output: 'export'`). */
export default function RootPage() {
  redirect(`/${defaultLocale}/`);
}
