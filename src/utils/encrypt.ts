import crypto from "crypto"
import * as vscode from "vscode" // 正确引用

export class EncryptUtil {
	/**
	 * 加密字符串
	 * @param input 要加密的字符串
	 * @returns 格式为 "时间戳-Base64字符串"
	 */
	static encrypt(input: string): string {
		// 获取当前时间戳
		const timestamp = Date.now().toString()

		// 拼接时间戳和输入字符串
		const combined = timestamp + input

		// 创建SHA-256哈希
		const hash = crypto.createHash("sha256").update(combined).digest()

		// 转换为Base64
		const base64 = hash.toString("base64")

		// 返回格式为 "时间戳-Base64字符串"
		return `${timestamp}-${base64}`
	}
}

// 工具函数示例//huqb
export function getPluginVersion() {
  const extension = vscode.extensions.getExtension('beandao.codai-top');
  console.log("@@@,extension:"+extension)
  return extension?.packageJSON.version || 'unknown';
}
