import { RESTDataSource } from "apollo-datasource-rest";

export class CoronaAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://yetric.se/api/corona/";
    }

    async getReport(name) {
        let response = await this.get(`reports/${name}`, null, {
            cacheOptions: {
                ttl: 3600
            }
        });
        return response.data;
    }
}
