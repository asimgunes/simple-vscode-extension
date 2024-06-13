//@ts-check
const esbuild = require('esbuild');

/**
 * @typedef {import('esbuild').BuildOptions} BuildOptions
 */

/** @type BuildOptions */
const sharedWebOptions = {
	bundle: true,
	external: ['vscode'],
	target: 'es2020',
	platform: 'browser',
	minify: false,
	sourcemap: true,
};

/** @type BuildOptions */
const webOptions = {
	entryPoints: ['src/extensionWeb.ts'],
	outfile: 'dist/web/es/extension.js',
	format: 'cjs',
	mainFields: ['browser', 'main', 'module'],
	// Banner&footer workaround for loading web extension to Theia platform
	banner:{ js: "if(typeof module === 'undefined') { var module = {}; }" },
	footer:{ js: "exports.activate = activate;" },
	...sharedWebOptions,
};

/** @type BuildOptions */
const sharedDesktopOptions = {
	bundle: true,
	external: ['vscode'],
	target: 'es2020',
	platform: 'node',
	sourcemap: true,
};

/** @type BuildOptions */
const desktopOptions = {
	entryPoints: ['src/extensionDesktop.ts'],
	outfile: 'dist/desktop/extension.js',
	format: 'cjs',
	...sharedDesktopOptions,
};

function createContexts() {
	return Promise.all([
		esbuild.context(webOptions),
		esbuild.context(desktopOptions),
	]);
}

createContexts().then(contexts => {
	const promises = [];
	for (const context of contexts) {
		promises.push(context.rebuild());
	}
	Promise.all(promises).then(async () => {
		for (const context of contexts) {
			await context.dispose();
		}
	}).then(() => { return undefined; }).catch(console.error);
}).catch(console.error);