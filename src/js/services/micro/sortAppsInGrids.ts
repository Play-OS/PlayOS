import { ParsedApplicationInfo } from "../../../vendor/kernel/core/WasmParser";

export interface AppGrid {
    id: string;
    apps: ParsedApplicationInfo[];
}

/**
 * Sorts apps in a grid fashion
 *
 * @export
 * @param {Application[]} apps
 * @param {number} amountPerGrid
 * @returns {AppGrid[]}
 */
export default function sortAppsInGrids(apps: ParsedApplicationInfo[], amountPerGrid: number): AppGrid[] {
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
                apps: [],
            };
        }
    });

    if (gridItem.apps.length) {
        result.push(gridItem);
    }

    return result;
}
