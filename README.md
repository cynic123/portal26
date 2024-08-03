###Prequisites###
-------------
1. node v16.14.0 (https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
2. mongo v7.0.9 (https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

Create mongo database and collection:
-------------------------------------
>use events;
>
>db.createUser( { user: "portal26", pwd: "portal26", roles: [{ role: "readWrite", db: "events" }] } );

>db.createCollection("events_log", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["event_timestamp", "user_id", "domain", "tenant"],
         properties: {
            event_timestamp: {
               bsonType: "date",
               description: "Timestamp of the event",
            },
            tenant: {
               bsonType: "string",
               description: "Tenant of the event",
            },
            user_id: {
               bsonType: "string",
               description: "ID of the user",
            },
            url: {
               bsonType: "string",
               description: "URL related to the event",
            },
            body: {
               bsonType: "string",
               description: "Body of the event"
            },
            domain: {
               bsonType: "string",
               description: "Domain of the event",
            },
            category: {
               bsonType: ["array", "null"],
               description: "Array of categories for the event",
               items: {
                  bsonType: "string",
               }
            }
         }
      }
   }
});

>db.events_log.createIndex({
   event_timestamp: 1,
   tenant: 1,
   user_id: 1,
   domain: 1,
   category: 1
}, {
   name: "events_log_index"
});

Setup:
------
1. git clone https://github.com/cynic123/portal26.git
2. Go to project root directory: `cd portal26` 
3. npm install
4. npm start

API Usage:
----------
**Event Webhook Endpoint:**

>curl --location 'http://localhost:3000/v1/webhooks/swiggy/events' \
--header 'Content-Type: application/json' \
--data '{
  "event_timestamp":"2024-01-11T01:42:50.234200+00:00",
  "user_id":"johndoe",
  "url": "https://chat.openai.com/backend-api/conversation",
  "body":"what is the capital of India?"
}
'

**Query Endpoint**
1. No filter
>curl --location --request POST 'http://localhost:3000/v1/swiggy/query' \
--header 'Content-Type: application/json' \
--data ''

2. With filters
>curl --location 'http://localhost:3000/v1/swiggy/query' \
--header 'Content-Type: application/json' \
--data '{
    "category": "Information Technology"
}
'
>
>curl --location 'http://localhost:3000/v1/zepto/query' \
--header 'Content-Type: application/json' \
--data '{
    "from_date": "2024-04-06", 
    "to_date": "2024-05-04",
    "user_id": "testUser",
    "domain": "chat.openai.com",
    "category": "Information Technology"
}'
