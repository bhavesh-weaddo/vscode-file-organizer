import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-file-organizer" is now active!');

    let organizeCommand = vscode.commands.registerCommand('vscode-file-organizer.organize', async (uri: vscode.Uri) => {
        const folderPath = uri ? uri.fsPath : vscode.workspace.workspaceFolders?.[0].uri.fsPath;
        if (!folderPath) {
            vscode.window.showErrorMessage('Oops! Please select a folder you want to organize first.');
            return;
        }

        try {
            const files = await fs.promises.readdir(folderPath);
            let movedCount = 0;

            for (const file of files) {
                const filePath = path.join(folderPath, file);
                const stat = await fs.promises.stat(filePath);

                if (stat.isDirectory()) {
                    continue;
                }

                const ext = path.extname(file).slice(1) || 'no_extension';
                const targetFolder = path.join(folderPath, ext);

                if (!fs.existsSync(targetFolder)) {
                    await fs.promises.mkdir(targetFolder);
                }

                const targetPath = path.join(targetFolder, file);
                await fs.promises.rename(filePath, targetPath);
                movedCount++;
            }

            vscode.window.showInformationMessage(`✨ Magic complete! Organized ${movedCount} files into their new homes.`);
        } catch (err) {
            vscode.window.showErrorMessage(`Oops! Something went wrong while tidying up: ${err}`);
        }
    });

    let statsCommand = vscode.commands.registerCommand('vscode-file-organizer.showStats', async (uri: vscode.Uri) => {
        const folderPath = uri ? uri.fsPath : vscode.workspace.workspaceFolders?.[0].uri.fsPath;
        if (!folderPath) {
            vscode.window.showErrorMessage('Please select a folder first!');
            return;
        }

        try {
            const files = await fs.promises.readdir(folderPath);
            const stats: { [key: string]: number } = {};

            for (const file of files) {
                const filePath = path.join(folderPath, file);
                const stat = await fs.promises.stat(filePath);

                if (stat.isDirectory()) {
                    continue;
                }

                const ext = path.extname(file).slice(1) || 'no_extension';
                stats[ext] = (stats[ext] || 0) + 1;
            }

            const statsString = Object.entries(stats)
                .map(([ext, count]) => `📂 .${ext}: ${count} files`)
                .sort((a, b) => b.localeCompare(a))
                .join('\n');

            const message = statsString 
                ? `📊 Quick Look at ${path.basename(folderPath)}:\n\n${statsString}`
                : '📂 This folder looks empty!';

            vscode.window.showInformationMessage(message, { modal: true });
        } catch (err) {
            vscode.window.showErrorMessage(`Couldn't grab the stats right now: ${err}`);
        }
    });

    context.subscriptions.push(organizeCommand, statsCommand);
}

export function deactivate() {}
