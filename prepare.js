const fsp = require('fs/promises');
const packageBase = require('./package-json/package-base.json');
const packageAddOn = (alternative, build) => require(`./package-json/package-${alternative}-${build}.json`);

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
    // Generating package.json
    const alternative = process.argv[2] || 'initial';
    const bundler = process.argv[3] || 'esbuild';
    
    console.log('Preparing package.json for', alternative, ',', bundler);
    await preparePackageJSON(alternative, bundler);
}

run();