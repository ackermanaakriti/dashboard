import React from 'react';

const ReportHeader = ({ header, Company, startDate, endDate,name }) => {
  // Function to format date as "Month Day, Year - HH:MM AM/PM"
  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Date(date).toLocaleString('en-US', options);
  };

  // Get current date and time
  const issuedDate = formatDate(new Date());

  return (
    <>
    <div> <p className='text-[25px] font-inter font-[600] text-center'>{name}</p></div>
      <div className='flex justify-between items-center w-[100%]'>
        <div>
         
          <div>
            <p className='text-[18px] font-inter font-[500] pt-[10px]'> Company Name: Onviro Tech</p>
            <p className='text-[15px] font-inter font-[400] pt-[5px]'> Start Date: {startDate}</p>
            <p className='text-[15px] font-inter font-[400]'> End Date: {endDate}</p>
          </div>
        </div>
        <div>
          <p className='text-[17px] font-inter font-[400]'> Issued Date: {issuedDate}</p>
        </div>
      </div>
    </>
  );
};

export default ReportHeader;