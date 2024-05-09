import DataTable from "react-data-table-component";
import React, { useEffect, useRef, useState } from "react";
import { FilterComponent } from "./FilterComponent";
import './Table.css'
import { GreenButton } from "../../Components/GreenButton";
import { addMenu } from '../../Redux/TopTabSlice';
import { useDispatch } from "react-redux";

export const TableDataComp = ({ columns, width, filteredItems, filterText, setFilterText, menuname }) => {

    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [tableHeight, setTableHeight] = useState(0);
    const dispatch = useDispatch();



    // getting viewHeight according to the users screens size and 
    //setting height for table
    const windowHeight = window.innerHeight;
    useEffect(() => {
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
    }, [tableHeight, filteredItems]);

    const customStyles = {
        // rows: {
        //     style: {
        //         // minHeight: '72px', // override the row height
        //         // border:'1px solid rgba(61, 99, 99, 0.4)',
        //         borderLeft: '0px',
        //         borderRight: '0px',
        //         // borderTop:'0px',
        //         '&:nth-child(1)': {

        //         },
        //         '&:last-child': { // Target the last child
        //             borderRight: 'none',
        //         }
        //     },
        // },
        cells: {
            style: {
                font:'inter',
                fontSize:'16px',
                margin:'0px',
                textAlign:'center',
            },
        },
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: 'red',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                backgroundColor: '#C0D3E4',
                fontFamily: 'inter',
                fontWeight: '600',
                fontSize: '16px',
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: 'red',
                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: 'red',
                },
            },
        },
    };



    // handle clear of filtering input
    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            <>
                <div onClick={() => dispatch(addMenu({ id: '', menu: menuname }))}>
                    <GreenButton
                        className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter"
                        text="Add New +" />
                </div>
                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            </>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <div className={`wrap-datatable`} style={{ height: windowHeight < 600 ? `${tableHeight}px` : '', width: `${width}` }}
        >
            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                // selectableRows
                persistTableHead
                customStyles={customStyles}
                style={{ height: tableHeight }}
            />
        </div>
    );
};
