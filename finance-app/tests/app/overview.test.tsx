import { render, screen } from '@testing-library/react';
import OverviewPage from '@/app/(main)/overview/page'; 
import { Balance } from '@/types';


jest.mock('@/app/(main)/overview/page', () => ({
  __esModule: true,
  default: jest.requireActual('@/app/(main)/overview/page').default,
  getOverviewData: jest.fn(),
}));

const mockBalance: Balance = {
  current: 5000,
  income: 2500,
  expenses: 1500,
};

describe('OverviewPage (Integration Test)', () => {

  const mockedGetOverviewData = jest.requireMock('@/app/(main)/overview/page').getOverviewData;

  beforeEach(() => {
    mockedGetOverviewData.mockClear();
  });

  it('renders balance cards with correct data', async () => {
    mockedGetOverviewData.mockResolvedValue({
      balance: mockBalance,
      pots: [],
      transactions: [],
      budgets: [],
      recurringBills: [],
    });

    const PageComponent = await OverviewPage();
    render(PageComponent);
    expect(screen.getByText('$5,000.00')).toBeInTheDocument(); 
    expect(screen.getByText('$2,500.00')).toBeInTheDocument(); 
    expect(screen.getByText('$1,500.00')).toBeInTheDocument(); 
  });
});
