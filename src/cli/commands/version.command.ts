import chalk from 'chalk';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CliCommandInterface } from './command.interface.js';

 type PackageJSONConfig = {
   version: string;
 }

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
     value !== null &&
     !Array.isArray(value) &&
     Object.hasOwn(value, 'version')
  );
}

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';
  constructor(
     private readonly filePath: string = './package.json'
  ) {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (! isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(chalk.yellow.bold(version));
    } catch (error: unknown) {
      console.error(chalk.yellow.bold(`Failed to read version from ${this.filePath}`));

      if (error instanceof Error) {
        console.error(chalk.yellow.bold(error.message));
      }
    }
  }
}
