import React from 'react';
import Image from 'next/image';

export default function DashboardCard({ card_name, amount, monthData, lastMonthData, monthDataDetail, lastMonthDataDetail }) {

    const formatAmount = (name, value) => {
        if (name === 'Total Drone Value') {
            return `$${value.toLocaleString()}`;
        }
        return value;
    };

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="whitespace-nowrap tracking-tight text-[12px] font-semibold">{card_name}</h3>
            </div>
            <div className="p-6">
                <div className="text-md font-bold">{formatAmount(card_name, amount)}</div>
                <p className={`text-[12px] text-muted-foreground ${monthData && lastMonthData 
                    ? monthDataDetail - lastMonthDataDetail > 0 
                        ? 'text-green-500' 
                        : monthDataDetail - lastMonthDataDetail < 0
                            ? 'text-red-500'
                            : 'text-gray-500'
                    : 'text-gray-500'}`}>
                    {monthData && lastMonthData 
                        ? monthDataDetail - lastMonthDataDetail === 0
                            ? 'No change from last month'
                            : `${monthDataDetail - lastMonthDataDetail > 0 ? '+' : ''}${formatAmount(card_name, monthDataDetail - lastMonthDataDetail)} from last month`
                        : 'No data for this month'}
                </p>
            </div>
        </div>
    )
};