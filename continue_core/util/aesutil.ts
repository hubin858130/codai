import crypto from "crypto"

export class AesUtil {
	private static readonly AES_KEY = "a0b1c2d3e4f888h8a1b2c3d4e5f6g777" // 32字节密钥
	private static readonly AES_IV_LENGTH = 16
	private static readonly ALGORITHM = "aes-256-cbc"

	/**
	 * AES加密字符串
	 * @param text 要加密的字符串
	 * @returns 格式为 "iv.encryptedData" 的Base64字符串
	 */
	static aesEncrypt(text: string): string {
		const iv = crypto.randomBytes(this.AES_IV_LENGTH)
		const key = Buffer.from(this.AES_KEY, "utf8")
		const cipher = crypto.createCipheriv(this.ALGORITHM, Uint8Array.from(key), Uint8Array.from(iv))

		let encrypted = cipher.update(text, "utf8", "base64")
		encrypted += cipher.final("base64")

		return `${iv.toString("base64")}.${encrypted}`
	}

	/**
	 * AES解密字符串
	 * @param encryptedText 格式为 "iv.encryptedData" 的Base64字符串
	 * @returns 解密后的原始字符串
	 */
	static aesDecrypt(encryptedText: string): string {
		const [ivBase64, encryptedData] = encryptedText.split(".")
		const iv = Buffer.from(ivBase64, "base64")
		const key = Buffer.from(this.AES_KEY, "utf8")

		const decipher = crypto.createDecipheriv(this.ALGORITHM, Uint8Array.from(key), Uint8Array.from(iv))

		let decrypted = decipher.update(encryptedData, "base64", "utf8")
		decrypted += decipher.final("utf8")

		return decrypted
	}
}
