const fsp = require('fs/promises');
const cp = require('child_process');
const packageBase = require('./package-json/package-base.json');
const packageAddOn = (alternative, build) => require(`./package-json/package-${alternative}-${build}.json`);


const alternatives = ['initial', 'alt1', 'alt2', 'alt3', 'alt4', 'alt5']
const bundlers = ['esbuild', 'webpack']

const triggerRunYarn = () => cp.execSync('yarn --no-lockfile', { cwd: __dirname, stdio: 'inherit' });
const triggerRunBuild = () => cp.execSync('yarn build', { cwd: __dirname, stdio: 'inherit' });
const triggerRunPackage = () => cp.execSync('yarn package', { cwd: __dirname, stdio: 'inherit' });

const preparePackageJSON = async (alternative, build) => {
    const packageJSONContent =JSON.stringify({
        ...packageBase,
        ...packageAddOn(alternative, build)
    }, undefined, `\t`);
    let fp;
    try {
        fp = await fsp.open('package.json', 'w');
        await fp.writeFile(packageJSONContent);
    } finally {
        await fp.close();
    }
}


const run = async () => {
    // Generating initial package.json
    await preparePackageJSON('initial', 'yarn');
    
    // Install packages
    triggerRunYarn(); 

    // Build the project
    triggerRunBuild();

    // Generate the alternative VSIX packages
    for(const bundler of bundlers) {
        for(const alternative of alternatives) {
            console.log('Generating VSIX:', alternative, bundler);
            await preparePackageJSON(alternative, bundler);
            triggerRunPackage();
        }
    }
}

run();