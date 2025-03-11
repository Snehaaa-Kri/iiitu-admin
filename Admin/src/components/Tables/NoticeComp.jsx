import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { API } from '../../utils/apiURl';
import { BsFiletypeDoc } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import NoticeModal from './NoticeModal';
import ConfirmationModal from '../../utils/ConfirmationModal';

function NoticeComp({ item, handleDelete, fetchData }) {
  const [isLatest, setIsLatest] = useState(false);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);

  const handleSetLatest = async () => {
    try {
      const response = await axios.put(
        `${API}/notice/${item._id}`,
        { isLatest: !isLatest },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setIsLatest(!isLatest);
      if (response.status == 200) {
        toast.success('Data Updated');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (id) => {
    setSelectedNoticeId(id);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNoticeId(null);
  }
  const confirmDelete = () => {
    if (selectedNoticeId) {
      handleDelete(selectedNoticeId);
      closeModal();
    }
  }


  return (
    <>
      <tr className="border-b border-stroke dark:border-strokedark">
        <td className="py-4 px-4 text-black dark:text-white">
          {item.title}
        </td>
        <td className="py-4 px-4 text-black dark:text-white">
          {item.description}
        </td>
        <td className="py-4 px-4 text-black dark:text-white">
          {item.link}
        </td>

        {/* last  */}
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
          <div className="mt-4">
            <label className="mb-3 text-black dark:text-white flex flex-row items-center gap-1">
              Latest:
              <input
                className="size-4"
                type="checkbox"
                checked={isLatest}
                onChange={handleSetLatest}
              />
            </label>
          </div>
          {item?.doc && (
            <Link to={item.doc} className="hover:text-primary">
              <BsFiletypeDoc />
            </Link>
          )}
          <MdEdit
            className="text-blue-500 text-xl cursor-pointer"
            onClick={() => {
              setEditData(item);
              setModal(true);
            }}
          />
          <button onClick={() => openModal(item._id)} className="hover:text-primary">
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502Z"
                fill=""
              />
              <path
                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </td>
      </tr>

      {modal && (
        <NoticeModal data={editData} setModal={setModal} fetchData={fetchData} />
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title="Delete Notice"
        message="Are you sure you want to delete this notice? This action cannot be undone."
      />
    </>

    
  );
}

export default NoticeComp;