import { gql } from '@apollo/client';

export const GET_OVERVIEW_DATA = gql`
  query GetOverviewData {
    balance {
      current
      income
      expenses
    }
    pots {
      name
      total
      target
    }
    transactions(limit: 5) {
      name
      avatar
      date
      amount
    }
  }
`;
