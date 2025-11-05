'use client';
import { Transaction } from '@/types';
import { useState, useMemo } from 'react';
import { Box, Card, List, Pagination } from '@mui/material';
import TransactionToolbar from './TransactionToolbar';
import TransactionRow from './TransactionRow';

const ITEMS_PER_PAGE = 10;

const TransactionList = ({ initialTransactions }: { initialTransactions: Transaction[] }) => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('Latest');
    const [category, setCategory] = useState('All Transactions');

    const filteredAndSortedTransactions = useMemo(() => {
        let items = [...initialTransactions];

        if (searchTerm) {
            items = items.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (category !== 'All Transactions') {
            items = items.filter(t => t.category === category);
        }

        if (sortOrder === 'Latest') {
            items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sortOrder === 'Oldest') {
            items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }

        return items;
    }, [initialTransactions, searchTerm, sortOrder, category]);

    const count = Math.ceil(filteredAndSortedTransactions.length / ITEMS_PER_PAGE);
    const paginatedTransactions = filteredAndSortedTransactions.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    
    const allCategories = useMemo(() => ['All Transactions', ...new Set(initialTransactions.map(t => t.category))], [initialTransactions]);

    return (
        <Card>
            <TransactionToolbar 
                onSearch={setSearchTerm}
                onSort={setSortOrder}
                onCategoryChange={setCategory}
                sortOrder={sortOrder}
                category={category}
                categories={allCategories}
            />
            <List disablePadding>
                {paginatedTransactions.map((transaction, index) => (
                    <TransactionRow key={index} transaction={transaction} />
                ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Pagination count={count} page={page} onChange={handlePageChange} />
            </Box>
        </Card>
    );
};

export default TransactionList;
