import React from 'react'

const IncomeReportTableWeb = ({tableData}) => {
    console.log(tableData)
    return (
        <>
            <div className='report-webtable-container'>
                <table className='report-webtable font-inter' border="1" cellPadding="5" cellSpacing="0">
                    <thead>
                        <tr className='bg-[#dad8d8]'>

                            <th>ChartofAccount Name</th>

                            <th>Debit Amount</th>
                            <th>Credit Amount</th>

                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.map((item, index) => {

                            const totalDebitIncome = item?.income?.reduce((sum, income) => sum + parseFloat(income.debitAmount || 0), 0);
                            const totalCreditIncome = item?.income?.reduce((sum, income) => sum + parseFloat(income.creditAmount || 0), 0);

                            const totalDebitExpense = item?.expenses?.reduce((sum, expense) => sum + parseFloat(expense.debitAmount || 0), 0);
                            const totalCreditExpense = item?.expenses?.reduce((sum, expense) => sum + parseFloat(expense.creditAmount || 0), 0);




                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td style={{ fontSize: '18px', borderRight: 'none', fontWeight: '600' }}>Income</td>
                                        <td colSpan="8"></td>
                                    </tr>
                                    {item?.income?.map((income) => (
                                        <tr key={income.id}>
                                            <td>{income.chartOfAccountAccountName}</td>
                                            <td>{income.debitAmount}</td>
                                            <td>{income.creditAmount}</td>
                                        </tr>

                                    ))}
                                    <tr className='bg-[#f5f4f2]'>
                                        <td colspan="1">Total</td>
                                        <td>{totalDebitIncome}</td>
                                        <td>{totalCreditIncome}</td>
                                    </tr>



                                    <tr>
                                        <td style={{ fontSize: '18px', borderRight: 'none', fontWeight: '600' }}>Expenses</td>
                                        <td colSpan="8"></td>
                                    </tr>
                                    {item?.expenses?.map((expense) => (
                                        <tr key={expense.id}>
                                            <td>{expense.chartOfAccountAccountName}</td>
                                            <td>{expense.debitAmount}</td>
                                            <td>{expense.creditAmount}</td>
                                        </tr>
                                    ))}
                                    <tr className='bg-[#f5f4f2]'>
                                        <td colspan="1">Total</td>
                                        <td>{totalDebitExpense}</td>
                                        <td>{totalCreditExpense}</td>
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>

            </div></>
    )
}

export default IncomeReportTableWeb