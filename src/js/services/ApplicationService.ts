import ApiResponse, { ApiResponseType } from "../models/ApiResponse";
import trans from "../lang/trans";
import Application, { ApplicationViewModel, transformToApplicationViewModel } from "../models/Application";

export async function fetchAppInformationFromManifestUri(manifestUri: string): Promise<ApiResponse<ApplicationViewModel, string>> {
    try {
        const response = await fetch(manifestUri);

        if (!response.ok) {
            return {
                status: response.status,
                type: ApiResponseType.Error,
                error: trans('errors.unexpected'),
            }
        }

        const data = await response.json() as Application;

        return {
            status: response.status,
            type: ApiResponseType.Success,
            data: transformToApplicationViewModel(data, manifestUri),
        }
    } catch (error) {
        return {
            status: 500,
            type: ApiResponseType.Error,
            error: trans('errors.unexpected'),
        }
    }
}
