import React, { useState } from 'react';
// import LinkPickerDefault from '../Forms/LinkPicker/LinkPickerDefault';

const TableLink = ({ Link, setLink }) => {
  const handleEdit = (index, field, value) => {
    const upLinkdLink = [...Link];
    upLinkdLink[index][field] = value;
    setLink(upLinkdLink);
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    // console.log(Link);
    setLink([...Link, { LinkName: '', URL: '' }]);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-center text-xl font-bold mb-4 text-black dark:text-white">
          Link
        </h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Link
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Link Name
              </th>
            </tr>
          </thead>
          <tbody>
            {Link &&
              Link.map((link, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-300 py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <input
                      type="text"
                      value={link.URL}
                      placeholder="Link eg. http://googleform/sdfsa"
                      onChange={(e) => handleEdit(index, 'URL', e.target.value)}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="text-center border-b border-gray-300 py-5 px-4 dark:border-strokedark">
                    <input
                      type="text"
                      value={link.LinkName}
                      placeholder="LinkName eg.Registeration"
                      onChange={(e) =>
                        handleEdit(index, 'LinkName', e.target.value)
                      }
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <button
          onClick={handleAddLink}
          className="my-4 inline-block rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark transition"
        >
          Add Link
        </button>
      </div>
    </div>
  );
};

export default TableLink;
