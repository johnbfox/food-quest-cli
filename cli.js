#!/usr/bin/env node
const axios = require('axios')
const _ = require('lodash')
const graphQlRequest = require('graphql-request')
const graphQlClient = graphQlRequest.GraphQLClient

const baseUrl = 'https://api.yelp.com/v3/graphql'
const tokenHeader = 'Bearer O2qVd2QYakazDZglmf4TCiiU71LbQeYQ3OdTq1oJAlNTn0lhLutN7XYUY9M6MAQaraWLvs8g6LxnqgSt1B1TIR_EW3-ZeMelQ7vNHzBoAPZKSYEx4N5XCPeZIEQMW3Yx'
const client = new graphQlClient(baseUrl, { headers: {'Authorization': tokenHeader}})
const baseTerm = '"lunch"'

const term = process.argv[2] || 'lunch'

const query = `{
        search(
            term: "${term}",
            location: "2 Oliver Street Boston MA",
            price: "1",
            radius: 500,
            limit: 50) {
        total
        business {
            name
            rating
            location {
              address1
            }
        }
    }
}`;

const minRating = 4;

client.request(query).then((res) => {
  const businesses = res.search.business
  const filteredBusinesses = businesses.filter(item => item.rating >= minRating)
  randomChoice = filteredBusinesses[Math.floor(Math.random() * filteredBusinesses.length)];
  printBusiness(randomChoice);
}).catch((err) => {
  console.error(err)
})

function printBusiness(business){
  if(business){
    console.log('You\'re going to...')

    console.log('')
    console.log(business.name)
    console.log(' ' + business.location.address1)
  }else{
    console.log('No food for you!')
  }
}
