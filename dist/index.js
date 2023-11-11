import GilAPI from "./GilApi.js";
import GilClient from "./GilClient.js";
export default class Client {
    constructor(token) {
        this.client = new GilClient(token);
        this.gilapi = new GilAPI(token);
        return {
            client: this.client,
            gilapi: this.gilapi
        };
    }
}
//# sourceMappingURL=index.js.map