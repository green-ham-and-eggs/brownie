// Function to create a user
import * as uuid from "uuid";
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

//const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        // The attributes of the item to be created
      userId: event.pathParameters.id, // The id of the author
        interestId: uuid.v1(),
      interest: data.interest,
    
      },
    };
  
    await dynamoDb.put(params);
  
    return params.Item;
  });