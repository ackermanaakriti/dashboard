import DataTable from "react-data-table-component";
import React, { useEffect, useRef, useState } from "react";
import { FilterComponent } from "./FilterComponent";
import './Table.css'
import useGetData from "../../Apis/useGetData";
import { GreenButton } from "../../Components/GreenButton";
import { useLayouData } from "../../Context/MainLayoutContext";




export const TableDataComp = ({columns,width,data}) => {
    console.log(data)
    // const { data } = useGetData(urls)
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [tableData, setTableData] = useState();
    const {setId,getId} = useLayouData()
    const [tableHeight, setTableHeight] = useState(0);
    
    const windowHeight = window.innerHeight;
    
    useEffect(() => {
        setTableData(data?.data)
        console.log(tableData)
    
        if (windowHeight < 700) {
            const calculateTableHeight = () => {
                const availableHeight = windowHeight - 100;
                setTableHeight(availableHeight);
            };
            calculateTableHeight();
            window.addEventListener('resize', calculateTableHeight);
            return () => {
                window.removeEventListener('resize', calculateTableHeight);
            };
        }
           else{
            setTableHeight(600)
        }
    }, [tableHeight,setId,data]);


    const filteredItems = tableData?.filter(
        item => item?.firstName && item?.firstName.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            <>
                <GreenButton
                    className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter"
                    text="Add New +" />
                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            </>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <div  className={`wrap-datatable`} style={{ height: `${tableHeight}px`, width:`${width}`}}>
            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                // selectableRows
                persistTableHead
                style={{ height: tableHeight }}
            />
        </div>
    );
};
