import Application from "../../models/Application";

export interface AppGrid {
    id: string;
    apps: Application[];
}

/**
 * Sorts apps in a grid fashion
 *
 * @export
 * @param {Application[]} apps
 * @param {number} amountPerGrid
 * @returns {AppGrid[]}
 */
export default function sortAppsInGrids(apps: Application[], amountPerGrid: number): AppGrid[] {
    const result: AppGrid[] = [];
    let gridItem: AppGrid = {
        id: Math.random().toString(),
        apps: [],
    };

    apps.forEach((app) => {
        gridItem.apps.push(app);

        if (gridItem.apps.length === amountPerGrid) {
            result.push(gridItem);

            // Rest the grid
            gridItem = {
                id: Math.random().toString(),
                apps: []
            };
        }
    });

    if (gridItem.apps.length) {
        result.push(gridItem);
    }

    return result;
}
