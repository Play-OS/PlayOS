import ApiResponse, { ApiResponseType } from "../models/ApiResponse";
import trans from "../lang/trans";
import Application from "../models/Application";

export async function fetchAppInformationFromManifestUri(manifestUri: string): Promise<ApiResponse<Application, string>> {
    try {
        const response = await fetch(manifestUri);

        if (!response.ok) {
            return {
                status: response.status,
                type: ApiResponseType.Error,
                error: trans('errors.unexpected'),
            }
        }

        return {
            status: response.status,
            type: ApiResponseType.Success,
            data: await response.json(),
        }
    } catch (error) {
        return {
            status: 500,
            type: ApiResponseType.Error,
            error: trans('errors.unexpected'),
        }
    }
}
