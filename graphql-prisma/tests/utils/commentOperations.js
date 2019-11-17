import { gql } from 'apollo-boost';

const deleteComment = gql`
  mutation($id: ID!) {
    deleteComment(
      id: $id
    ){
      id
      text
    }
  }
`;

const subscribeToComments = gql`
  subscription($postId: ID!) {
    comment(postId: $postId) {
      mutation
      node {
        id
        text
      }
    }
  }
`;

export { deleteComment, subscribeToComments }
