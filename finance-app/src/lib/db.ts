
export const db = {
  user: {
    findUnique: async (args: any) => {
      console.log('Mock DB: Find user', args);
      return null;
    }
  }
};
