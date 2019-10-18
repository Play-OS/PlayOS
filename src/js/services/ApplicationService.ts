import Application from "../models/Application";
import IProvider from "./providers/IProvider";
import Configuration from "../Configuration";

export async function addApplication(manifestUrl: string): Promise<Application> {
    const provider: IProvider = Configuration.get('provider');
    const response = await fetch(manifestUrl);
    const app: Application = await response.json();

    app.id = Math.random().toString();
    app.manifest_url = manifestUrl;

    await provider.addApplicationToStore(app);

    return app;
}
