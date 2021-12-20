import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: "meetingId = :m",
    ExpressionAttributeValues: {
      ":m":"test"
    },
  };

  const result = await dynamoDb.query(params);
  
  const currentPresenters = result.Items.filter(p => p.presenting === true);
  if (currentPresenters.length === 1) {
    return currentPresenters[0];
  } else if (currentPresenters.length === 0) {
    return false;
  }
  throw new Error("You have more than one presenters");
});