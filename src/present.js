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

  // Picking a random presenter
  const result = await dynamoDb.query(params);
  const allUsers = result.Items;
  let candidates = allUsers.filter(user => user.presented === false);

  // Resetting the candidate pool
  if (candidates.length === 0) {
    const ids = allUsers.map(x => x.userId);
    for (const id of ids) {
      let updatedUser = {
        TableName: process.env.TABLE_NAME,
        Key: {
          meetingId: "test",
          userId: id,
        },
        UpdateExpression: "SET presented = :pFlag",
        ExpressionAttributeValues : {
          ":pFlag" : false,
        }
      };

      await dynamoDb.update(updatedUser);
    }

    candidates = allUsers;
  }
  
  const candidate = candidates[Math.floor(Math.random()*candidates.length)];

  //TODO: pick random topic from template topics + interests
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