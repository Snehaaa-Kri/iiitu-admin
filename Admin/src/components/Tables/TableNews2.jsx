import React from 'react';
import { Link } from 'react-router-dom';
import { STATIC_FILES } from '../../utils/apiURl';
import { BsFiletypeDoc } from 'react-icons/bs';
import NewsComp from './NewsComp';

function TableNews2({ data, handleDelete, fetchData }) {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Heading
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Description
              </th>
              <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                Link
              </th>
              <th className="min-w-[10px] py-4 px-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <NewsComp
                  item={item}
                  handleDelete={handleDelete}
                  fetchData={fetchData}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableNews2;
