import enUSPath from "../data/i18n/en-US.json" with { type: "file" };
import type { CommandConstructor, LanguageStrings } from "./libs/types";

export function getFilesToKeep(): string[] {
  return ["config.json", "locale.json"];
}

export function getLocaleInfoMap() {
  return {
    "en-US": { name: "English (United States)", path: (enUSPath as unknown) as string, defaultForLanguage: true },
  } as const;
}

export function loadLocaleData(
  locale: string,
): Promise<Partial<LanguageStrings> | null> {
  const localeInfoMap = getLocaleInfoMap();
  if (!(locale in localeInfoMap)) {
    return Promise.resolve(null);
  }

  const internalPath = localeInfoMap[locale as keyof typeof localeInfoMap].path;

  return Bun.file(internalPath).json();
}

export async function getCommand(key: true): Promise<Record<string, () => Promise<CommandConstructor>>>;
export async function getCommand(key: string): Promise<CommandConstructor | undefined>;
export async function getCommand(
  key: string | true,
): Promise<
  CommandConstructor | undefined | Record<string, () => Promise<CommandConstructor>>
> {
  const commandMap = {
    cfg: () => import("./commands/configcommand").then(m => m.default),
    co: () => import("./commands/cocommand").then(m => m.default),
    help: () => import("./commands/helpcommand").then(m => m.default),
    hw: () => import("./commands/hellocommand").then(m => m.default),
  } as const;

  if (key === true) {
    return commandMap;
  }

  const loader = commandMap[key as keyof typeof commandMap];
  return loader ? await loader() : undefined;
}
