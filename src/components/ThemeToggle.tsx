import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n";

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const { t } = useI18n();
  const Icon = mode === "system" ? Monitor : mode === "dark" ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 border border-current/30 text-inherit" aria-label={t("appearance.change")} title={t("appearance.change")}>
          <Icon aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="font-body">
        <DropdownMenuLabel>{t("appearance.label")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={mode} onValueChange={(value) => {
          if (value === "light" || value === "dark" || value === "system") setMode(value);
        }}>
          <DropdownMenuRadioItem value="light"><Sun className="mr-2 h-4 w-4" aria-hidden="true" />{t("appearance.light")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark"><Moon className="mr-2 h-4 w-4" aria-hidden="true" />{t("appearance.dark")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system"><Monitor className="mr-2 h-4 w-4" aria-hidden="true" />{t("appearance.system")}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}