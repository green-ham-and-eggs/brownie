import * as uuid from "uuid";
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
  const allUsers = result.Items;
  const candidates = allUsers.filter(user => user.presented === false);
  console.log(candidates)
  const candidate = candidates[Math.floor(Math.random()*candidates.length)];

  return candidate;
});

export const didPresent = handler(async (event) => {
  const data = JSON.parse(event.body);

  const newPresentation = {
    TableName: process.env.TABLE_NAME,
    Key: {
      meetingId: "test",
      userId: data.userId, // TO DO: change to getting from path
    },
    UpdateExpression: "SET presented = :pFlag, presentationId = :pId, presentationDate = :pDate, topic = :pTopic",
    ExpressionAttributeValues : {
      ":pId": uuid.v1(),
      ":pFlag" : true,
      ":pDate": Date.now(),
      ":pTopic": data.topic
    }
  };

  // Update presented boolean
  await dynamoDb.update(newPresentation);
  
  return newPresentation;
});