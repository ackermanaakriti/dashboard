import React from 'react'

const GeneralLedgerTableWeb = ({ tableData }) => {
    const totalDebit = tableData?.reduce((sum, item) => sum + parseFloat(item.debitAmount || 0), 0);
    const totalCredit = tableData?.reduce((sum, item) => sum + parseFloat(item.creditAmount || 0), 0);
    console.log(totalDebit)
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



                            console.log(item)


                            return (
                                <React.Fragment key={index}>



                                    <tr key={item.id}>
                                        <td>{item.chartOfAccountAccountName}</td>
                                        <td>{item.debitAmount}</td>
                                        <td>{item.creditAmount}</td>
                                    </tr>


                                </React.Fragment>
                            )
                        })}
                        <tr className='bg-[#f5f4f2]'>
                            <td colspan="1">Total</td>
                            <td>{totalDebit}</td>
                            <td>{totalCredit}</td>
                        </tr>
                    </tbody>
                </table>

            </div></>
    )
}

export default GeneralLedgerTableWeb