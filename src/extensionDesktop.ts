import * as vscode from "vscode";
import * as app from "./extensionApp";

export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  app.activateApp(context, "DESKTOP/BACKEND");
}
