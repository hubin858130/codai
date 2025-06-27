import { Controller } from ".."
<<<<<<< HEAD
import { StringRequest, KeyValuePair } from "../../../shared/proto/common"
=======
import { StringRequest } from "../../../shared/proto/common"
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

/**
 * Executes a scroll to settings action
 * @param controller The controller instance
 * @param request The request containing the ID of the settings section to scroll to
<<<<<<< HEAD
 * @returns KeyValuePair with action and value fields for the UI to process
 */
export async function scrollToSettings(controller: Controller, request: StringRequest): Promise<KeyValuePair> {
	return KeyValuePair.create({
		key: "scrollToSettings",
		value: request.value || "",
	})
=======
 * @returns An object with action and value fields for the UI to process
 */
export async function scrollToSettings(controller: Controller, request: StringRequest): Promise<Record<string, string>> {
	return {
		action: "scrollToSettings",
		value: request.value || "",
	}
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
}
