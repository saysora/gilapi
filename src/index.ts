import GilAPI from "./GilApi";
import GilClient from "./GilClient";

export interface GClient {
  client: GilClient;
  gilapi: GilAPI;
}

export default class Client {
  client: GilClient;
  gilapi: GilAPI;

  constructor(token: string) {
    this.client = new GilClient(token);
    this.gilapi = new GilAPI(token);

    return {
      client: this.client,
      gilapi: this.gilapi
    }
  }

}
