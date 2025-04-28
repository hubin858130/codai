import i18n from "i18next"
import { initReactI18next } from "react-i18next"
// import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from "./locales/en/translation.json"
import zhCNTranslation from "./locales/zh-CN/translation.json"
import jaTranslation from "./locales/ja/translation.json"
import ruTranslation from "./locales/ru/translation.json"
import frTranslation from "./locales/fr/translation.json"
import arTranslation from "./locales/ar/translation.json"
import koTranslation from "./locales/ko/translation.json"
import zhTWTranslation from "./locales/zh-TW/translation.json"
import deTranslation from "./locales/de/translation.json"
import itTranslation from "./locales/it/translation.json"
import msTranslation from "./locales/ms/translation.json"
import esTranslation from "./locales/es/translation.json"

const resources = {
	en: {
		translation: enTranslation,
	},
	"zh-CN": {
		translation: zhCNTranslation,
	},
	ja: {
		translation: jaTranslation,
	},
	ru: {
		translation: ruTranslation,
	},
	fr: {
		translation: frTranslation,
	},
	ar: {
		translation: arTranslation,
	},
	ko: {
		translation: koTranslation,
	},
	"zh-TW": {
		translation: zhTWTranslation,
	},
	de: {
		translation: deTranslation,
	},
	it: {
		translation: itTranslation,
	},
	ms: {
		translation: msTranslation,
	},
	es: {
		translation: esTranslation,
	},
}

// 初始化 i18n
i18n.use(initReactI18next).init({
	resources,
	lng: "en", // 默认语言
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
})

export default i18n
