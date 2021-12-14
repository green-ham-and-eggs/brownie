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
  const userId = result.Items[0].userId;

  const point = {
    TableName: process.env.TABLE_NAME,
    Key: {
      meetingId: "test",
      userId: userId,
    },
    UpdateExpression: "ADD score :inc",
    ExpressionAttributeValues : {
      ":inc": 1,
    }
  };

  await dynamoDb.update(point);
  
  return { status: true };
});