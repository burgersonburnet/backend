"use strict";
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const restaurants = require('./../restaurants');

const rootSchema = `
    type Restaurant {
        restaurant_name: String!
        description: String!
        on_burnet:Boolean
        address: String!
        zip: Int!
        latitude: Float
        longitude: Float
        mapX: Int!
        mapY: Int!
        drive_through: Boolean
        service_style: String
        phone: String
        website: String
        menu: String
        glankler_gripe: String
        restaurant_photo: String
        with_fries: Boolean
        rating: Int
        price: Float
        logo: String
        burgers: [Burger]
        reviews: [Review]
    }
    
    type Burger {
        name: String
    }
    
    type Review {
        reviewer: String
        review: String
    }
    
    type Query {
        restaurants: [Restaurant]
    }
    
    schema {
        query: Query
    }
`

const resolverMap = {
    Query: {
        restaurants() {
            return restaurants;
        },
        // reviews() {
        //     return '';
        // },
        // burgers() {
        //     return burger;
        // }
    }
}


const executableSchema = makeExecutableSchema({
    typeDefs: rootSchema,
    resolvers: resolverMap,
});

module.exports = executableSchema;