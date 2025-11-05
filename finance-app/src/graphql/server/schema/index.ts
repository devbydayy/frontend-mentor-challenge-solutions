
export const typeDefs = `#graphql
  type Balance {
    current: Float
    income: Float
    expenses: Float
  }

  type Transaction {
    avatar: String
    name: String
    category: String
    date: String
    amount: Float
    recurring: Boolean
  }

  type Budget {
    category: String
    maximum: Float
    theme: String
    spent: Float
    remaining: Float
    transactions: [Transaction]
  }

  type Pot {
    name: String
    target: Float
    total: Float
    theme: String
  }
  
  type Query {
    balance: Balance
    transactions(
        limit: Int, 
        offset: Int, 
        sortBy: String, 
        filterByCategory: String
    ): [Transaction]
    budgets: [Budget]
    pots: [Pot]
    recurringBills: [Transaction]
  }

  # Placeholders for mutations
  type Mutation {
    addBudget(category: String!, maximum: Float!): Budget
    updatePot(name: String!, amount: Float!): Pot
  }
`;
