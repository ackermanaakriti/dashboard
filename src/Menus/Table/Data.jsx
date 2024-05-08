import DataTable from "react-data-table-component";
import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FilterComponent } from "./FilterComponent";
import './Table.css'
import useGetData from "../../Apis/useGetData";
import { MdEdit } from "react-icons/md";
import useScreenSize from "./UseScreenSize";
import { GreenButton } from "../../Components/GreenButton";




export const Filtering = () => {
    const { data } = useGetData('Employee/GetAll')
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [tableData, setTableData] = useState()
    const screenSize = useScreenSize();
    console.log(tableData)
    const ref = useRef()
    const [tableHeight, setTableHeight] = useState(0);
    
    const windowHeight = window.innerHeight;
    
    useEffect(() => {
        if (windowHeight < 700) {
            const calculateTableHeight = () => {
                const availableHeight = windowHeight - 100;
                setTableHeight(availableHeight);
            };

            console.log(tableHeight)
            // Call the function initially and whenever window size changes
            calculateTableHeight();
            window.addEventListener('resize', calculateTableHeight);
            return () => {
                window.removeEventListener('resize', calculateTableHeight);
            };
        }
        else{
            setTableHeight(600)
        }
    }, [tableHeight, windowHeight]);

    console.log(tableHeight)

    useEffect(() => {
        setTableData(data?.data)

    })




    const columns = [
        {
            name: ' First Name',
            selector: row => row.firstName,
            sortable: true,
            // grow: 2,
            width: '15%',


        },
        {
            name: ' Last Name',
            selector: row => row.lastName,

            width: '15%',

        },
        {
            name: 'Position',
            hide:'md',
            selector: row => row.positon,
            width: '15%',


            conditionalCellStyles: [
                {
                    when: row => row.positon === 'string',
                    style: {
                        backgroundColor: 'rgba(63, 195, 128, 0.9)',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
            ]
        },
        {
            name: 'Contact No',
            selector: row => row.contactNumber,
            hide: 'md',
            width: '15%',
        },
        {
            name: 'Email',
            selector: row => row.email,
            // hide: 'md',

        },
        {
            name: 'Actions',

            cell: row => (
                <div className="flex gap-[24px]">
                   
                    <button onClick={() => handleEdit(row)}> <span className="text-[20px] text-PrimaryColor  mx-[3px]"><MdEdit /></span></button>
                    <button onClick={() => handleDelete(row)}><span className="text-[20px] text-redclr  mx-[3px]"><RiDeleteBin6Line /></span></button>
                    {/* <button onClick={() => handleView(row)}> <span className="text-[20px]   mx-[3px]"><IoEyeOutline/></span></button> */}
                </div>
            ),
            allowOverflow: true,
            button: true,
            width: '10%',
            // Adjust width as needed
        }
    ];


    const handleDelete = () => {

    }
    const handleEdit = () => {

    }


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
                    text="Add New +"
                />

                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            </>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <div ref={ref} className={`wrap-datatable`} style={{ height: `${tableHeight}px`}}>
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
