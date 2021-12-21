import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression:  "meetingId = :meetingId",
    ExpressionAttributeValues: {
      ":meetingId": "test",
      },
  };

  // 
  const result = await dynamoDb.query(params);
  
  return result.Items;
});