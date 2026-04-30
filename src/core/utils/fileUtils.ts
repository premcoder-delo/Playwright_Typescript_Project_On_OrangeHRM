import fs from 'fs';
import path from 'path';

export function cleanFolder(folderPath: string) {
    const fullPath = path.resolve(folderPath);

    if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
    }

    fs.mkdirSync(fullPath, { recursive: true });
}