#!/usr/bin/env node
const axios = require('axios')
const _ = require('lodash')
const graphQlRequest = require('graphql-request')
const graphQlClient = graphQlRequest.GraphQLClient

const baseUrl = 'https://api.yelp.com/v3/graphql'
const tokenHeader = 'Bearer O2qVd2QYakazDZglmf4TCiiU71LbQeYQ3OdTq1oJAlNTn0lhLutN7XYUY9M6MAQaraWLvs8g6LxnqgSt1B1TIR_EW3-ZeMelQ7vNHzBoAPZKSYEx4N5XCPeZIEQMW3Yx'
const client = new graphQlClient(baseUrl, { headers: {'Authorization': tokenHeader}})

const query = `{
    business(id: "garaje-san-francisco") {
        name
        id
        alias
        rating
        url
    }
}`;

client.request(query).then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err)
})
