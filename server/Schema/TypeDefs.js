const { gql } = require("apollo-server-express");

const typeDefs = gql(`

  type Query {
    getSpeech(id: ID!): Speech
    getAllSpeeches: [Speech]
    getUser(id: ID!): User
    getAllUsers: [User]
    getTasks: [Task]
    getTaskById(id: ID!): Task
  }

  type Mutation {
    addSpeech(input: SpeechInput!): Speech
    updateSpeech(id: ID!, input: SpeechInput!): Speech
    deleteSpeech(id: ID!): Speech
    addUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): User
    createTask(title: String!): Task
    updateTask(id: ID!, title: String, completed: Boolean): Task
    deleteTask(id: ID!): Task
  }

  input SpeechInput {
    title: String!
    content: String!
    userId: ID!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Speech {
    id: ID!
    title: String!
    content: String!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    speeches: [Speech]
  }
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }
  
`);

module.exports = { typeDefs };
