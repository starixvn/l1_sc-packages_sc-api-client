import initPlayer from "./player";

export default class APIClient {
    constructor(configs) {
        this.configs = configs;
        this.player = initPlayer(this.configs);
    }
}
