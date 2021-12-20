import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
  // Public reference to the API
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;

    // Create the API
    this.api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        "POST   /users": "src/create.main",
        "GET    /users/{id}": "src/getUser.main",
        "GET    /present": "src/present.main",
        "PUT    /present": "src/present.didPresent",
        "GET    /users": "src/list.main",
        "GET    /history": "src/listPresentations.main",
        "PUT    /users/{id}/interest": "src/addInterest.main",
        "GET    /users/{id}/interest": "src/getUserInterest.main",
        "GET    /interest": "src/getInterest.main",
        "GET    /history/{id}": "src/getPresentation.main",
        "POST   /history/{id}": "src/sendPoints.main",
        "GET    /currentPres" : "src/getCurrentPresentation.main",
      },
    });

    // Allow the API to access the table
    this.api.attachPermissions([table]);

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}