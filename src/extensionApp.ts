/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from "vscode";

const handler = (scope: string) => async () => {
  console.log("Running Simple Extension: ", scope);
  vscode.window.showInformationMessage(
    `[Scope:${scope}] Running simple extension!`
  );
};

export async function activateApp(
  context: vscode.ExtensionContext,
  scope: string
): Promise<void> {
  console.log("Activating Simple Extension: ", scope);

  context.subscriptions.push(
    vscode.commands.registerCommand("ag.simple.run", handler(scope))
  );
}
