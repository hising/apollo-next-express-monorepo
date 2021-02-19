import { RESTDataSource } from "apollo-datasource-rest";

export class CoronaAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://yetric.se/api/corona/";
    }

    async getReport(name) {
        let response = this.get(`reports/${name}`).catch((e) => {
            console.error(e);
        });
        console.log(response);
        return response;
    }
}
