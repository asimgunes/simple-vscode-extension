# Simple Extension Example

An example demonstrating simple extension into VS Code and examining the extension behaviour in Theia Web.

# Clean

For cleaning the workspace folder please run the following command:

```
rm -rf node_modules dist out package.json *.vsix
```

# Building the Project and Generating the \*.VSIX Packages

Please run the following command to generate the project and the alternatives. Note that all 'package.json' creation and package installations are handled by the script.

```
node build-all.js
```

# Test for Theia Web Notes

## Initial Case

Extension loaded with 'main' entrypoint (Backend), logs viewed at backend.

```
browser: not defined
main: defined
extensionKind: not defined
```

## Alternative 1

Extension loaded with 'main' entrypoint (Backend), logs viewed at backend.
According to VSCode documentation extension should be tried to loaded at the front-end scope, if not available should be loaded to the backend scope. https://code.visualstudio.com/api/advanced-topics/extension-host

```
browser: defined
main: defined
extensionKind: ['ui', 'workspace']
```

## Alternative 2

Extension loaded with 'main' entrypoint (Backend), logs viewed at backend.

```
browser: defined
main: defined
extensionKind: [ 'workspace', 'ui']
```

## Alternative 3

Extension loaded with 'main' entrypoint (Backend), logs viewed at backend.

```
browser: defined
main: defined
extensionKind: not defined
```

## Alternative 4

Extension did not loaded! According to VSCode documentation extension should be tried to loaded at the front-end scope.

```
browser: defined
main: defined
extensionKind: ['ui']
```

## Alternative 5

Extension did not loaded!

```
browser: defined
main: not defined
extensionKind: not defined
```
