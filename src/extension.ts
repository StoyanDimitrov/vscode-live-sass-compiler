'use strict';
import * as vscode from 'vscode';
import { AppModel } from './appModel';
import { checkNewAnnouncement } from './announcement/index';

export function activate(context: vscode.ExtensionContext) {

    console.log('"live-sass-compiler" is now actived! Go and Debug :P ');

    let appModel = new AppModel();

    checkNewAnnouncement(context.globalState);

    let disposablecompileAll =
        vscode.commands.registerCommand('liveSass.command.watchMySass', () => {
            appModel.compileAllFiles();
        });

    let disposableStopWaching =
        vscode.commands.registerCommand('liveSass.command.donotWatchMySass', () => {
            appModel.StopWaching();
        });

    let disposableOneTimeCompileSass =
        vscode.commands.registerCommand('liveSass.command.oneTimeCompileSass', () => {
            appModel.compileAllFiles(false);
        });

    let disposableCompileCurrentSass =
        vscode.commands.registerCommand('liveSass.command.compileCurrentSass', () => {
            appModel.compileCurrentFile();
        });

    let disposableOpenOutputWindow =
        vscode.commands.registerCommand('liveSass.command.openOutputWindow', () => {
            appModel.openOutputWindow();
        })

    let disposableOnDidSave =
        vscode.workspace.onDidSaveTextDocument(() => {
            appModel.compileOnSave();
        });

    context.subscriptions.push(
        disposablecompileAll,
        disposableStopWaching,
        disposableOnDidSave,
        disposableOneTimeCompileSass,
        disposableCompileCurrentSass,
        disposableOpenOutputWindow,
        appModel);
}


export function deactivate() {
}
