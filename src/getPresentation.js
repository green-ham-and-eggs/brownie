import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    IndexName: "presentationIndex",
    KeyConditionExpression: "meetingId = :m and presentationId = :p",
    ExpressionAttributeValues: {
      ":m":"test",
      ":p": event.pathParameters.id,
    },
  };

  const result = await dynamoDb.query(params);
  
  return result.Items[0];
});