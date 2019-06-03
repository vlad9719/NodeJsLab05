# NodeJsLab05

API for managing contracts between Renter and Stock entities written with Nest JS 
framework. 

### Installing

Step 1. Clone the repo 
```
git clone https://github.com/vlad9719/NodeJsLab05

cd NodeJsLab05
```

Step 2. Install dependencies
```
npm install
```

Step 3. Create database ```contracts``` using MySQL Workbench

Step 4. Add records to database
```
ts-node src/database/seeder.ts <number-of-records-you-wish-to-add>
```
By the end of seeding, you'll see a message like:
```$xslt
Database seeded
```
Step 5. Run the app
```$xslt
npm start
```

## API in action

Use Postman for checking API's work

Step 1. Check whether server is working using ```healthcheck``` endpoint with ```GET``` request.

The endpoint's URL is as follows:

```
GET localhost:3000/api/healthcheck
```

The expected response example is as follows:
```
{
    "message": "Server is running"
}
```

Step 2. Authorize yourself using Google account.
For that purpose, navigate in browser to the following URL:
 ```
  http:localhost:3000/auth/google
 ```
 and enter authorize with Google.
 
 Upon authorization, you'll see a JSON like this:
 ```$xslt
{
  "message":"Authrorized",
  "JWT Token":"<some_value>"
}
```
```<some_value>``` is a JWT Token you'll need to make authorized requests
on steps 3 and 4. Just copy that and insert as ```Bearer token```
Authorization header in Postman requests.

Step 3. Add a new contract with ```POST``` request.

The endpoint's URL is as follows:

```
POST localhost:3000/api/contracts/<renter_id>/<stock_id>
```

Put valid ```renter_id``` and ```stock_id``` in the URL of request, which you can find
 in database ```contracts``` you've created.
 
You should provide JSON body for this request with required numeric parameter ```rentalCost```.

```
{
	"rentalCost": 3322
}
```

Also, don't forget to provide a JWT Token from step 2 as Bearer token.

The expected response looks like this:
```
{
    "addedContract": {
        "renter": {
            "id": 324,
            "name": "Mayra"
        },
        "stock": {
            "id": 101,
            "name": "Garden",
            "numberOfCells": 763
        },
        "rentalCost": 3322,
        "createdAt": "2019-06-03T10:39:45.110Z",
        "id": 1333
    }
}
```

Step 4. Delete a contract you've just created with ```DELETE``` HTTP method.

The endpoint's URL is as follows:

```
DELETE localhost:3000/api/contracts/<renter_id>/<stock_id>
```

Put valid ```renter_id``` and ```stock_id``` in the URL of request, which you can find
 in database ```contracts``` you've created.
 
 Also, don't forget to provide a JWT Token from step 2 as Bearer token.


The expected response looks like this:
```
{
    "removedContract": {
        "renter": {
            "id": 324,
            "name": "Mayra"
        },
        "stock": {
            "id": 101,
            "name": "Garden",
            "numberOfCells": 763
        },
        "rentalCost": 3322,
        "createdAt": "2019-06-01T16:15:14.000Z"
    }
}
```

Step 5. View all stocks rented by a particular renter with ```GET``` method.

The endpoint's URL is as follows:

```
GET localhost:3000/api/stocks/<renter_id>
```
Put a valid ```renter_id``` in the URL of request, which you can find
 in database ```contracts``` you've created.

The expected response looks like this:
```
{
    "stockContracts": [
        {
            "contractId": 1023,
            "stockId": 999,
            "stockName": "Music",
            "rentalCost": 9388,
            "createdAt": "2019-01-30T22:18:00.000Z"
        }
    ],
    "totalRentalCost": 9388
}
```

Step 6. View all renters that rented a particular stock using ```renters``` endpoint
and ```GET``` method

The endpoint's URL is as follows:

```
GET localhost:3000/api/renters/<stock_id>
```
Put a valid ```stock_id``` in the URL of request, which you can find
 in database ```contracts``` you've created.


The expected response looks like this:
```
{
    "renterContracts": [
        {
            "contractId": 98,
            "renterId": 102,
            "renterName": "Andres",
            "rentalCost": 5315,
            "createdAt": "2018-11-14T23:01:11.000Z"
        },
        {
            "contractId": 1333,
            "renterId": 324,
            "renterName": "Mayra",
            "rentalCost": 3322,
            "createdAt": "2019-06-03T10:39:45.000Z"
        },
        {
            "contractId": 1334,
            "renterId": 324,
            "renterName": "Mayra",
            "rentalCost": 3322,
            "createdAt": "2019-06-03T10:45:38.000Z"
        }
    ]
}
```

Step 7. Check average response time for ```GET```ting N records
using ```average-time-report``` endpoint.

The endpoint's URL is as follows:

```
GET localhost:3000/api/average-time-report/<number_of_requests>/<number_of_records_per_request>
```

The ```<number_of_requests>``` argument defines the number of requests 
server will make for counting an average.

The ```<number_of_records_per_request>``` argument defines amount of
records to retrieve from a database with each request.
 
The expected response looks like this:
```
{
    "averageRequestTime (ms)": "12.26"
}
```

### Tests

Step 1. To run integration tests, execute the following command:
```$xslt
npm test
```

This will run tests that are located in ```.spec.ts``` files in folders ```src/renters```,
```src/contracts```, ```src/healthcheck```, ```src/stocks``` and ```src/auth```.

Step 2. To run end-to-end tests, that are located in ```test/app.e2e-spec.ts```
file, execute the following command:
```$xslt
npm run-script test:e2e
```
