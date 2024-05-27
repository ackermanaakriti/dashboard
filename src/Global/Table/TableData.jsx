import DataTable from "react-data-table-component";
import React, { useEffect, useRef, useState } from "react";
import { FilterComponent } from "./FilterComponent";
import './Table.css'
import { GreenButton } from "../../Components/GreenButton";
import { addMenu } from '../../Redux/TopTabSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import SpinLoader from "../../Components/Loader/SpinLoader";
import Export from "../../Components/ExportCsv";

export const TableDataComp = ({ columns, width, filteredItems, filterText, setFilterText, link,tabletree,fileName }) => {
   
console.log('hello from tabledata',filteredItems)
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [tableHeight, setTableHeight] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate()

console.log(fileName)



    const customStyles = {
    
        header: {
            style: {
                // minHeight: '56px',
            },
        },
        headRow: {
            style: {
                // 0.5px solid rgba(61, 99, 99, 0.4);
                borderTopStyle: 'solid',
                borderTopWidth: '0.5px',
                borderTopColor: 'rgba(61, 99, 99, 0.4)',
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
                    borderRightWidth: '0.5px',
                    borderRightColor: 'rgba(61, 99, 99, 0.4)',
                },
            },
        },
        cells: {
            style: {
                fontFamily: 'inter',
                fontWeight: '500',
                fontSize: '16px',
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '0.5px',
                    borderRightColor: 'rgba(61, 99, 99, 0.4)',
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
            <div className="flex gap-[20px]">
            {fileName === 'VoucherSequence' ? ' ' :
                <div  onClick={() => navigate(link)}>
                      <GreenButton
                        className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter"
                        text="Add New +" /> 
                  
                         
                         </div>
    }
                         <div className="flex float-right">{tabletree ? tabletree():''}</div>
                </div>
               
                <div className="flex gap-[20px] items-center pb-[5px]">
                    <Export filteredItems={filteredItems} fileName={fileName} allColumns={columns}/>
                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
                </div>
            </>
        );
    }, [filterText, resetPaginationToggle, filteredItems,]);

    return (
        <div className={`wrap-datatable`} style={{  width: `${width}`, }}
        >
            {/* {loading ? <SpinLoader/> : ''} */}
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
