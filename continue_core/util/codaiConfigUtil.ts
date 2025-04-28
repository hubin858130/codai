import * as fs from "fs"
import * as path from "path"
import { getContinueGlobalPath } from "./paths"

function getCodaiConfigJsonPath(): string {
	const p = path.join(getContinueGlobalPath(), "codaiConfig.json")
	if (!fs.existsSync(p)) {
		fs.writeFileSync(p, JSON.stringify(DEFAULT_CONFIG, null, 2))
	}
	return p
}

export interface CodeeConfig {
	autocomplete: {
		provider: string
		title: string
		model: string
		apiKey: string
		apiBase: string
		enable: boolean
	}
	language: string
}

const DEFAULT_CONFIG: CodeeConfig = {
	autocomplete: {
		provider: "Openai Compatiable",
		title: "autocomplete-coder",
		model: "",
		apiKey: "",
		apiBase: "",
		enable: false,
	},
	language: "en",
}

export function getCodaiConfig(): CodeeConfig {
	const configPath = getCodaiConfigJsonPath()
	if (!fs.existsSync(configPath)) {
		fs.writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2))
		return DEFAULT_CONFIG
	}
	return JSON.parse(fs.readFileSync(configPath, "utf8"))
}

export function updateCodaiConfig(config: Partial<CodeeConfig>): void {
	const currentConfig = getCodaiConfig()
	const newConfig = { ...currentConfig, ...config }
	fs.writeFileSync(getCodaiConfigJsonPath(), JSON.stringify(newConfig, null, 2))
}

export function getAutocompleteConfig() {
	return getCodaiConfig().autocomplete
}

export function updateAutocompleteConfig(config: Partial<CodeeConfig["autocomplete"]>) {
	const currentConfig = getCodaiConfig()
	updateCodaiConfig({
		autocomplete: {
			...currentConfig.autocomplete,
			...config,
		},
	})
}

export function getLanguageConfig(): string {
	return getCodaiConfig().language
}

export function updateLanguageConfig(language: string): void {
	updateCodaiConfig({ language })
}
