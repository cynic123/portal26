Prequisites:
-------------
1. node v16.14.0
2. mongo v7.0.9

Setup:
------
1. git clone https://github.com/cynic123/portal26.git
2. Go to project root directory: `cd portal26` 
3. npm install
4. npm start

API Usage:
----------
**Event Webhook Endpoint:**

curl --location 'http://localhost:3000/v1/webhooks/swiggy/events' \
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
>curl --location 'http://localhost:3000/v1/zepto/query' \
--header 'Content-Type: application/json' \
--data '{
    "category": "Information Technology",
    "from_date": "2024-04-06",
    "to_date": "2024-05-04",
    "user_id": "testUser",
    "domain": "openai.com"
}
'
