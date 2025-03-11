import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TableNotices from "../components/Tables/TableNotices";
import { API } from "../utils/apiURl.js";
import toast from "react-hot-toast";
import { jwtDecode } from 'jwt-decode';

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
    isLatest: false,
    doc: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);



  useEffect(() => {
      if (!token) {
        return navigate('/signin');
      }
      const { Allow } = jwtDecode(token);
      if (!Allow?.[2]) {
        navigate('/printmedia');
      }
    }, []);

    
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${API}/notice`);
        alert("fetchNotices success");
        setNotices(response.data.Docs);
      } catch (error) {
        alert("Error in fetching notices");
        console.error("Error fetching notices:", error);
      }
    };
    
    useEffect(() => {
      fetchNotices();
    }, []);


  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    console.log(formDataObj);
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        formDataObj.append(key, formData[key]);
      }
    });
    console.log(formDataObj);

    try {
      if (isEditing) {
        await axios.put(`${API}/notice/${editId}`, formDataObj, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data" },
        });
        alert("Notice updated successfully");
      } else {
        await axios.post(`${API}/notice`, formDataObj, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data" },
        });
        alert("Notice added successfully");
      }
      fetchNotices();
      resetForm();
    } catch (error) {
      alert("Error in submitting notice");
      console.error("Error submitting form:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/notice/${id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Notice Deleted successfully!')
      alert("Notice deleted successfully");
      fetchNotices();
    } catch (error) {
      alert("Error deleting notice");
      if (error.response.status === 401) {
        return navigate('/signin');
      }
      console.error("Error deleting notice:", error);
    }
  };

  // Handle edit
  const handleEdit = (notice) => {
    setIsEditing(true);
    setEditId(notice._id);
    setFormData({
      title: notice.title,
      description: notice.description,
      category: notice.category,
      link: notice.link,
      isLatest: notice.isLatest,
      doc: null, // re-uploaded of file
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      link: "",
      isLatest: false,
      doc: null,
    });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notice" />
      <div className="p-4">
        {/* Form */}
        <form onSubmit={handleFormSubmit} className="mb-6 space-y-4">
          <div>
            <label className="mb-3 block text-black dark:text-white">Title:</label>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">Description:</label>
            <input
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">Category:</label>
            <input
              placeholder="Category"
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">Link:</label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white flex flex-row items-center gap-1">
              Is Latest:
              <input
                className="size-4"
                type="checkbox"
                checked={formData.isLatest}
                onChange={(e) => setFormData({ ...formData, isLatest: e.target.checked })}
              />
            </label>
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">Upload Document:</label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, doc: e.target.files[0] })}
              className="w-1/2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />
          </div>
          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
            {isEditing ? "Update Notice" : "Add Notice"}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Cancel
            </button>
          )}
        </form>

        {/* Notices Table */}
        <TableNotices
          data={notices}
          handleDelete={handleDelete}
          fetchData={fetchNotices}
        />
      </div>
    </DefaultLayout>
  );
};

export default NoticeManagement;
