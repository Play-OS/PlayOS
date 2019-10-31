import InstanceBag from "../InstanceBag";
import { createFs } from "./FileSystemService";

export function bootup() {
    InstanceBag.set('fs', createFs());
}
