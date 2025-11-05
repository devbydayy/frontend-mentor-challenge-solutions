import { gql } from '@apollo/client';

export const GET_RECURRING_BILLS = gql`
  query GetRecurringBills {
    recurringBills {
      name
      avatar
      date
      amount
    }
  }
`;
