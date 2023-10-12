#!/usr/bin/env node
import 'reflect-metadata';
import CLIApplication from './cli/cli-application.js';
import HelpCommand from './cli/commands/help.command.js';
import ImportCommand from './cli/commands/import.command.js';
import VersionCommand from './cli/commands/version.command.js';
import GenerateCommand from './cli/commands/generate.command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand,
  new VersionCommand,
  new ImportCommand,
  new GenerateCommand()
]);
myManager.processCommand(process.argv);
