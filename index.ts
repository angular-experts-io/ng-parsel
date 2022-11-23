import {readFileSync} from 'fs';
import * as glob from 'glob';

import {parse} from "./parser/parser";

const TEMP_DIRECTORY = './test-spa/src/app/**';

function traverse(directory: string) {

    const directoryGlob = `${directory}/**/*.{ts,html,scss,css,less}`;

    glob.sync(directoryGlob).forEach(filePath => {
        console.log(filePath);
        const fileContent = readFileSync(filePath, 'utf8');
        parse(fileContent);
    });
}

function isTypeScriptFile(file: string): boolean {
    return file.endsWith('.ts');
}

traverse(TEMP_DIRECTORY);
