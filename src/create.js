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
      meetingId: "test",
        // The attributes of the item to be created
      userId: uuid.v1(), // The id of the author
      name: data.name, // Username
      email: data.email,
      presented: false, //change this to false
    //   presentationId: uuid.v1(),
    //   interestId: uuid.v1(),
    //   interest: data.interest,
    //   presentationDate: Date.now(),
      },
    };
  
    await dynamoDb.put(params);
  
    return params.Item;
  });