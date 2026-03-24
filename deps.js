const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = [...results, ...getFiles(file)];
        } else { 
            results.push(file);
        }
    });
    return results;
}

const files = getFiles('src').filter(file => file.endsWith('.ts') || file.endsWith('.tsx'));
const deps = new Set();
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const matches1 = content.matchAll(/from\s+['"]((?:@[^\/]+\/)?[a-zA-Z0-9_-]+)['"]/g);
    for (const match of matches1) {
        deps.add(match[1]);
    }
});

const ignore = ['react', 'react-dom'];
const toInstall = Array.from(deps).filter(d => !d.startsWith('.') && !d.startsWith('@/') && !ignore.includes(d));

if (toInstall.length > 0) {
    console.log('Installing dependencies: ', toInstall.join(' '));
    execSync('npm install ' + toInstall.join(' '), { stdio: 'inherit' });
} else {
    console.log('No missing dependencies found.');
}
