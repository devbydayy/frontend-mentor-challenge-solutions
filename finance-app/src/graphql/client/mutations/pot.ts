import { gql } from '@apollo/client';

export const UPDATE_POT = gql`
  mutation UpdatePot($name: String!, $amount: Float!) {
    updatePot(name: $name, amount: $amount) {
      name
      total
    }
  }
`;
