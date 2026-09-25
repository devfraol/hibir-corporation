import { Link, useLocation } from "react-router-dom";
import { alternatePath, localeFromPath } from "@/i18n";

/** URL-backed language switcher: it always keeps the current page and hash. */
export default function LanguageSwitcher() {
  const { pathname, search, hash } = useLocation();
  const locale = localeFromPath(pathname);
  const target = `${alternatePath(pathname)}${search}${hash}`;
  return <Link to={target} className="rounded-md border border-current/25 px-2 py-1 text-[11px] font-semibold tracking-wide transition-colors hover:text-accent" aria-label={locale === "en" ? "Switch language to Amharic" : "Switch language to English"}>
    {locale === "en" ? "አማ" : "EN"}
  </Link>;
}
