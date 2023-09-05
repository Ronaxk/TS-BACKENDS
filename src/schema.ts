import { ApolloServer, gql } from "apollo-server-express";
import { Post } from "./models/Post_model";

const typeDefs = gql`
  type Post {
    id: ID
    questionText: String
    moduleName: String
    options: [Option]
    correctOptionId: Int
    updatedBy: String
    createdDate: String
    createdBy: String
  }

  type Option {
    optionId: String
    optionText: String
  }

  type Query {
    getAllPosts: [Post]
    getPost(id: ID): Post
  }

  input PostOption {
    optionId: String
    optionText: String
  }

  input PostInput {
    questionText: String
    moduleName: String
    options: [PostOption]
    correctOptionId: Int
    updatedBy: String
    createdDate: String
    createdBy: String
  }

  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
  }
`;

const resolvers = {
  Query: {
    getAllPosts: async () => {
      return await Post.find();
    },
    getPost: async (
      _parent: any,
      { id, optionId }: any,
      _context: any,
      _info: any
    ) => {
      return await Post.findById(id);
    },
  },

  Mutation: {
    createPost: async (
      parent: any,
      args: {
        post: any;
        questionText: any;
        moduleName: any;
        options: any;
        correctOptionId: any;
        updatedBy: any;
        createdBy: any;
      }
    ) => {
      const {
        questionText,
        moduleName,
        options,
        correctOptionId,
        createdBy,
        updatedBy,
      } = args.post;
      const post = new Post({
        questionText,
        moduleName,
        options,
        correctOptionId,
        updatedBy,
        createdBy,
      });
      await post.save();
      return post;
    },
    deletePost: async (parent: any, args: any) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return "Ok, Post deleted";
    },
    updatePost: async (parent: any, args: any) => {
      const { id } = args;
      const {
        questionText,
        moduleName,
        options,
        correctOptionId,
        createdBy,
        updatedBy,
      } = args.post;
      const post = await Post.findByIdAndUpdate(
        id,
        {
          questionText,
          moduleName,
          options,
          correctOptionId,
          createdBy,
          updatedBy,
        },
        { new: true }
      );
      return post;
    },
  },
};

export { typeDefs, resolvers };
