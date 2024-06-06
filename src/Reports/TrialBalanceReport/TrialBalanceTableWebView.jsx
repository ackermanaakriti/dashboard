import React, { useState, useEffect } from 'react';

const TrialBalanceWebTable = ({ tableData }) => {
    const totalDebit = tableData?.reduce((sum, item) => sum + parseFloat(item.debitAmount || 0), 0);
    const totalCredit = tableData?.reduce((sum, item) => sum + parseFloat(item.creditAmount || 0), 0);

    const [balances, setBalances] = useState([]);
    const [sortedTableData, setSortedTableData] = useState([]);

    useEffect(() => {
        // Format date and sort data
        const formattedData = tableData.map(item => ({
            ...item,
            formattedDate: item.transactionDateBS.split('T')[0]
        })).sort((a, b) => new Date(a.formattedDate) - new Date(b.formattedDate));

        setSortedTableData(formattedData);

        // Calculate balances
        let balance = 0;
        const newBalances = formattedData.map(item => {
            balance = balance - parseFloat(item.debitAmount || 0) + parseFloat(item.creditAmount || 0) ;
            return balance;
        });
        setBalances(newBalances);
    }, [tableData]);

    return (
        <>
            <div className='report-webtable-container'>
                <table className='report-webtable font-inter' border="1" cellPadding="5" cellSpacing="0">
                    <thead>
                        <tr className='bg-[#dad8d8]'>
                            <th>Voucher Number</th>
                            <th>Transaction Date</th>
                            <th>ChartofAccount Name</th>
                            <th>Debit Amount</th>
                            <th>Credit Amount</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTableData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.voucherNumber}</td>
                                <td>{item.formattedDate}</td>
                                <td>{item.chartOfAccountAccountName}</td>
                                <td>{item.debitAmount}</td>
                                <td>{item.creditAmount}</td>
                                <td>{balances[index]}</td>
                            </tr>
                        ))}
                        <tr className='bg-[#f5f4f2]'>
                            <td colSpan="3">Total</td>
                            <td>{totalDebit}</td>
                            <td>{totalCredit}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TrialBalanceWebTable;
