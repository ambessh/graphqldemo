const graphql = require('graphql');
const _ = require('lodash');
const book = require('../models/book');
const author = require('../models/author');







const { GraphQLObjectType
    , GraphQLString
    , GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;



const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return book.find({authorId:parent.id})
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return author.findById(parent.authorId)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                  return author.findById(args.id)
                
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                  return book.find();
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                  return author.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString) },
                age: { type: new GraphQLNonNull( GraphQLInt) }
            },
            resolve(parent, args) {
                let authors = new author({
                    name: args.name,
                    age: args.age
                });
                return authors.save();

            }

        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString )},
                genre: { type:new GraphQLNonNull( GraphQLString) },
                authorId: { type:new GraphQLNonNull( GraphQLID) }
            },
            resolve(parent, args) {
                const books=new book({
                   name:args.name,
                   genre:args.genre,
                   authorId:args.authorId 
                });
               return books.save();
               
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});