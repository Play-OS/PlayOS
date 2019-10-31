import InstanceBag from "../InstanceBag";
import { createFs } from "./FileSystemService";

export async function bootup() {
    InstanceBag.set('fs', await createFs());
}
