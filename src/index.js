import { Issuer, custom } from "openid-client";
import initAuth from "./auth";
import initMember from "./member";

const beforeTokenExpired = 60 * 5;
const timeout = 60000;

custom.setHttpOptionsDefaults({ timeout });

export default class APIClient {
    constructor(configs, logger) {
        this.configs = configs;
        this.logger = logger;
        this.auth = initAuth(this.configs);
        this.member = initMember(this.configs);
    }

    async autoUpdateToken() {
        await this.updateToken();

        setTimeout(async function refresh() {
            if (this.isTokenExpired()) {
                await this.updateToken();
            }

            setTimeout(refresh, timeout);
        }, timeout);
    }

    isTokenExpired() {
        return !this.configs.expired || this.configs.expired - Date.now() / 1000 - beforeTokenExpired <= 0;
    }

    async updateToken() {
        try {
            const token = await this.getBearerToken();

            this.configs.token = token.token;
            this.configs.expired = token.expired;

            logger.log("Get bearer token successfully.");
        } catch (error) {
            logger.logError(`Get bearer token failed: ${error}`);
        }
    }

    async getBearerToken() {
        const clientMetadata = {
            grant_type: "client_credentials",
            client_id: this.configs.client.id,
            client_secret: this.configs.client.secret,
        };
        const issuer = await Issuer.discover(this.configs.authUrl);
        const client = new issuer.Client(clientMetadata);
        const token = await client.grant(clientMetadata);

        return token.access_token
            ? {
                  token: `${token.token_type} ${token.access_token}`,
                  expired: token.expires_at,
              }
            : null;
    }
}
