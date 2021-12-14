// function to get interest
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    IndexName: "interestIndex",
    KeyConditionExpression:  "meetingId = :meetingId",
    ExpressionAttributeValues: {
      ":meetingId": "test",
      },
  };

  const result = await dynamoDb.query(params);
  
  const interest_array = [];
  var i = 0;

  for (let x of result.Items)
  {
        interest_array[i] = x.interest;
        i++;
  }

  return interest_array;
});