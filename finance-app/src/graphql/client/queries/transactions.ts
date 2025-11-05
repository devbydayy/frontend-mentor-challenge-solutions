import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions($limit: Int, $offset: Int, $sortBy: String, $filterByCategory: String) {
    transactions(limit: $limit, offset: $offset, sortBy: $sortBy, filterByCategory: $filterByCategory) {
      name
      avatar
      category
      date
      amount
    }
  }
`;
