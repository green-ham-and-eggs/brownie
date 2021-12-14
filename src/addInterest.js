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
      UpdateExpression: "SET interest = list_append(interest, :interest), interestId = :interestId",
    ExpressionAttributeValues: {
      ":interest": [data.interest || null],
      ":interestId":  uuid.v1(),
    },
    ReturnValues: "UPDATED_NEW",
    };
  
    await dynamoDb.update(params);
  
    return { status: true };
  });