import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression:  "meetingId = :meetingId",
    ExpressionAttributeValues: {
      ":meetingId": "test",
      },
  };

  // 
  const result = await dynamoDb.query(params);
  const allUsers = result.Items;
  const candidates = allUsers.filter(user => user.presented === false);
  console.log(candidates)
  const candidate = candidates[Math.floor(Math.random()*candidates.length)];

  
  return candidate;
});