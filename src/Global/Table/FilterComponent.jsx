 export const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
    <div className="flex pb-[20px] ">
		
		<input
			id="search"
			type="text"
			placeholder="Filter By Name"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
            className="border-borderclr border-[2px] px-[10px] py-[6px] border-right-0"
		/>
		<button className="bg-PrimaryColor text-white  px-[10px] py-[6px] outline-0" type="button" onClick={onClear}>
			Clear
		</button>
        </div>
	</>
);
