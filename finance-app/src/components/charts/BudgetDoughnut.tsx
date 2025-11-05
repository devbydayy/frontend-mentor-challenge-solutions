'use client';
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface ChartDataItem {
  category: string;
  value: number;
  theme: string;
}

interface BudgetDoughnutProps {
  data: ChartDataItem[];
  totalSpent: number;
  totalLimit: number;
}

export const BudgetDoughnut = ({ data, totalSpent, totalLimit }: BudgetDoughnutProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => setIsMounted(true), []);

  const handleMouseEnter = (index: number) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  return (
    <Box sx={{ width: '100%', height: 250, position: 'relative' }}>
      {isMounted && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius="80%"
              outerRadius="100%"
              paddingAngle={0}
              cornerRadius={0}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`outer-${index}`}
                  fill={
                    activeIndex === index
                      ? `${entry.theme}80`
                      : entry.theme
                  }
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </Pie>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius="67%"
              outerRadius="80%"
              paddingAngle={0}
              cornerRadius={0}
              stroke="none"
              fillOpacity={0.7}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`inner-${index}`}
                  fill={
                    activeIndex === index
                      ? `${entry.theme}98`
                      : entry.theme
                  }
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </Pie>

            <Tooltip content={undefined} />
          </PieChart>
        </ResponsiveContainer>
      )}

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
          {formatCurrency(totalSpent)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-Grey500)' }}>
          of {formatCurrency(totalLimit)} limit
        </Typography>
      </Box>
    </Box>
  );
};

export default BudgetDoughnut;
