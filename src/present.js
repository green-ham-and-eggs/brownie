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
  console.log(candidates);
  console.log(Math.floor(Math.random()*candidates.length))
  
  const candidate = candidates[Math.floor(Math.random()*candidates.length)];

  // Resetting the previous presenting flag
  const previousPresenters = allUsers.filter(user => user.presenting === true);
  if (previousPresenters.length === 1) {
    const setNotPresenting = {
      TableName: process.env.TABLE_NAME,
      Key: {
        meetingId: "test",
        userId: previousPresenters[0].userId,
      },
      UpdateExpression: "SET presenting = :flag",
      ExpressionAttributeValues : {
        ":flag" : false,
      }
    }
  
    await dynamoDb.update(setNotPresenting);
  } else if (previousPresenters.length > 1){
    console.log("something is wrongggg");
    return;
  }

  // Setting presenting flag
  const setPresenting = {
    TableName: process.env.TABLE_NAME,
    Key: {
      meetingId: "test",
      userId: candidate.userId,
    },
    UpdateExpression: "SET presenting = :flag",
    ExpressionAttributeValues : {
      ":flag" : true,
    }
  }

  await dynamoDb.update(setPresenting);

  // Picking interest
  const interests = candidate.interest || [];
  const templateInterests = [ //TO DO: fill in with actual interests
    "Favourite TV show",
    "Favourite holiday destinations",
    "A new hobby",
  ];
  interests.push(...templateInterests);
  const topic = interests[Math.floor(Math.random()*interests.length)];
  
  // Update interest in db
  const newTopic = {
    TableName: process.env.TABLE_NAME,
    Key: {
      meetingId: "test",
      userId: candidate.userId,
    },
    UpdateExpression: "SET topic = :t",
    ExpressionAttributeValues : {
      ":t" : topic,
    }
  }

  await dynamoDb.update(newTopic);

  return { candidate: candidate, topic: topic };
});

export const didPresent = handler(async (event) => {
  const data = JSON.parse(event.body);

  const newPresentation = {
    TableName: process.env.TABLE_NAME,
    Key: {
      meetingId: "test",
      userId: data.userId, // TO DO: change to getting from path
    },
    UpdateExpression: "SET presented = :pFlag, presentationId = :pId, presentationDate = :pDate, topic = :pTopic, presenting = :p",
    ExpressionAttributeValues : {
      ":pId": uuid.v1(),
      ":pFlag" : true,
      ":pDate": Date.now(),
      ":pTopic": data.topic,
      ":p": false,
    }
  };

  // Update presented boolean
  await dynamoDb.update(newPresentation);
  
  return newPresentation;
});