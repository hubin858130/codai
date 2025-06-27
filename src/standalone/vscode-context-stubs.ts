// @ts-nocheck
import * as vscode from "vscode"

import { log } from "./utils"

const outputChannel: vscode.OutputChannel = {
	append: (text) => process.stdout.write(text),
	appendLine: (line) => console.log(`OUTPUT_CHANNEL: ${line}`),
	clear: () => {},
	show: () => {},
	hide: () => {},
	dispose: () => {},
	name: "",
	replace: function (value: string): void {},
}

function postMessage(message: ExtensionMessage): Promise<boolean> {
<<<<<<< HEAD
	log("postMessage stub called:", JSON.stringify(message).slice(0, 200))
=======
	log("postMessage stub called:", message)
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
	return Promise.resolve(true)
}

export { outputChannel, postMessage }
