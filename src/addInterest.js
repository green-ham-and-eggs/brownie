// Function to create a user
import * as uuid from "uuid";
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

//const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        // The attributes of the item to be created
        meetingId:"test",
      userId: event.pathParameters.id, // The id of the author
        // interestId: uuid.v1(),
      },
      UpdateExpression: "SET interest = :interest",
    ExpressionAttributeValues: {
      ":interest": data.interest || null,
    },
    ReturnValues: "ALL_NEW",
    };
  
    await dynamoDb.update(params);
  
    return { status: true };
  });