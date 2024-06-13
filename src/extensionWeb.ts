import * as vscode from "vscode";
import * as app from "./extensionApp";

export const activate = async (
  context: vscode.ExtensionContext
): Promise<void> => {
  app.activateApp(context, "WEB");
};
