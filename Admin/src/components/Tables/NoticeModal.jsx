import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { API } from '../../utils/apiURl';

const NoticeModal = ({ setModal, data, fetchData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    link: '',
    isLatest: false,
    documentLink: '',
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.put(`${API}/notice/${data._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        toast.success('Notice updated successfully!');
        setModal(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error updating notice:', error);
      toast.error('Failed to update notice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        link: data.link || '',
        isLatest: data.isLatest || false,
        documentLink: data.doc || '',
      });
    }
  }, [data]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1001] bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-[320px] sm:w-full h-[80%] overflow-y-scroll max-w-md transform transition-all duration-300 ease-in-out animate-slide-in-up">
        <div className="flex justify-end">
          <IoCloseCircleOutline
            onClick={() => setModal(false)}
            className="text-gray-500 hover:text-themeblue1 text-[2rem] cursor-pointer transition-colors duration-200"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Notice Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="title" className="block text-md sm:text-lg font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter the title"
              value={formData.title}
              onChange={handleChange}
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-md sm:text-lg font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="category" className="block text-md sm:text-lg font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="link" className="block text-md sm:text-lg font-medium text-gray-700 mb-2">
              Link
            </label>
            <input
              type="text"
              id="link"
              placeholder="Enter link"
              value={formData.link}
              onChange={handleChange}
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="isLatest"
              checked={formData.isLatest}
              onChange={handleChange}
              className="h-5 w-5 text-themeblue1 border-gray-300 rounded focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
            <label htmlFor="isLatest" className="ml-2 text-md sm:text-lg font-medium text-gray-700">
              Mark as Latest
            </label>
          </div>
          <div className="mb-5">
            <label htmlFor="documentLink" className="block text-md sm:text-lg font-medium text-gray-700 mb-2">
              Document Link
            </label>
            <input
              type="text"
              id="documentLink"
              placeholder="Enter document link"
              value={formData.documentLink}
              onChange={handleChange}
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white font-medium text-md sm:text-lg px-4 py-3 rounded-lg w-full hover:bg-blue-700/80 transition-transform transform hover:scale-[1.02]"
            disabled={isSubmitting}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoticeModal;
