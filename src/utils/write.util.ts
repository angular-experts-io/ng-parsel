import { writeFileSync } from 'fs';

export function writeJson(filePath: string, data: any) {
  writeFileSync(filePath, JSON.stringify(data, null, 4));
}
