import GilAPI from "./GilApi.js";
import GilClient from "./GilClient.js";
export default class Client {
    client: GilClient;
    gilapi: GilAPI;
    constructor(token: string);
}
