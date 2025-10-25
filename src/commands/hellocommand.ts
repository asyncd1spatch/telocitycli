import {
  AppStateSingleton,
  config as appConfig,
  customParseArgs as parseArgs,
  generateHelpText,
  log,
} from "../libs/core";
import type { Command, CommandConstructor } from "../libs/types";

export default class HelloWorldCommand implements Command {
  static get allowPositionals() {
    return false;
  }
  static get positionalCompletion() {
    return "none" as const;
  }
  static get options() {
    return {
      help: { type: "boolean", short: "h" },
    } as const;
  }
  async execute(argv: string[]): Promise<number> {
    const appState = AppStateSingleton.getInstance();
    const { values: argValues } = parseArgs({
      args: argv.slice(1),
      allowPositionals: (this.constructor as typeof HelloWorldCommand).allowPositionals,
      strict: true,
      options: (this.constructor as typeof HelloWorldCommand).options,
    });

    if (argValues.help) {
      const helpText = generateHelpText(
        appState.s.help.commands.hw,
        (this.constructor as CommandConstructor).options,
      );
      log(helpText);
      return 0;
    }

    const message = appConfig.HELLO_WORLD ?? "Hello, World! (fallback)";
    log(message);

    return 0;
  }
}
