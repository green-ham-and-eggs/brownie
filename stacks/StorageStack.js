import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
  // Public reference to the table
  table;

  constructor(scope, id, props) {
    super(scope, id, props);

    // Create the DynamoDB table
    this.table = new sst.Table(this, "Brownie_new", {
      fields: {
        meetingId: sst.TableFieldType.STRING,
        userId: sst.TableFieldType.STRING,
        interestId: sst.TableFieldType.STRING,
        presentationId: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "meetingId", sortKey: "userId" },

    });
  }
}