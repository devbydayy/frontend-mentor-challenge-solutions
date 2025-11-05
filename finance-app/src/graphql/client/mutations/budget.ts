import { gql } from '@apollo/client';

export const ADD_BUDGET = gql`
  mutation AddBudget($category: String!, $maximum: Float!) {
    addBudget(category: $category, maximum: $maximum) {
      category
      maximum
    }
  }
`;
