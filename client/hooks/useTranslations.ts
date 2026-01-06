import { useApp } from "@/context/AppContext";
import { getTranslations } from "@/lib/translations";

export function useTranslations() {
  const { language } = useApp();
  return getTranslations(language);
}
