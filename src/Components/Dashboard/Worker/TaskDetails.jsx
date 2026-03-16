import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router';
import Spinner from '../../Router/Spinner';
import { Image } from 'lucide-react'; // or use any icon
import { AuthContext } from '../../../Context/AuthContext';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';

const TaskDetails = () => {
   const axiosSecure = useAxiosSecure()
  const { id } = useParams();
  const [data, setData] = useState({});
  const [submissionText, setSubmissionText] = useState('');
  const [submissionImage, setSubmissionImage] = useState(null);
  const fileInputRef = useRef();
  const { user } = useContext(AuthContext);
const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
 const [loading, setLoading] = useState(true); 
  useEffect(() => {
    axiosSecure
      .get(`/tasks2?id=${id}`)
      .then((res) => {setData(res.data)
        setLoading(false);
      })
      .catch((err) => {console.log(err)
        setLoading(false);
      });
  }, [id]);

  const {
    name,
    payable_amount,
    completion_date,
    task_title,
    required_workers,
    _id,
    task_detail,
    task_image_url,
    submission_info,
    user_email,
    category,
  } = data;

  // Trigger hidden file input
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSubmissionImage(file);
  };

  // Submit Task
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageURL = '';

    // Step 1: Upload to Imgbb if image selected
    if (submissionImage) {
      const formData = new FormData();
      formData.append('image', submissionImage);

      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        imageURL = data.data.url;
      } catch (error) {
        console.log(error);
        toast('Image upload failed!', { type: 'error', theme: 'colored' });
        return;
      }
    }

    // Step 2: Submit form data to backend
    const submissionPayload = {
      submission_details: submissionText,
      task_id: _id,
      task_title,
      payable_amount,
      worker_email: user?.email,
      worker_name: user?.name,
      Buyer_name: name,
      Buyer_email: user_email,
      current_date: new Date().toISOString(),
      status: 'pending',
      submission_image_url: imageURL,
    };

    try {
      await axiosSecure.post('/submission', submissionPayload);
      toast('Submission sent successfully!', { type: 'success', theme: 'colored' });
      
      setSubmissionText('');
      setSubmissionImage(null);
    } catch (err) {
      console.log(err);
      toast('Submission failed!', { type: 'error', theme: 'colored' });
    }
  };
if(loading) return <Spinner/>
  return (
    <div className="px-10 py-10 space-y-10 mx-auto w-full">
      <div className="flex flex-col md:flex-row gap-10 text-sm justify-center">
        <div className="w-full md:w-1/2 max-w-lg">
          <img
            src={task_image_url}
            alt="Task"
            className="rounded shadow h-[450px] object-cover object-center w-full"
          />
        </div>
        <div className="space-y-3 w-full md:w-1/2 max-w-lg">
          <h1 className="text-3xl font-bold mb-5">{task_title}</h1>
          <p className="text-gray-700">Posted by:</p>
          <div className="flex flex-col md:flex-row">
            <p className="font-medium">{name}</p>
            <p>({user_email})</p>
          </div>
          <p className="font-semibold text-2xl my-5">
            <span className="text-sm border border-accent text-accent px-1 font-normal">
              Payable Amount
            </span>{' '}
            ${payable_amount}
          </p>
          <p className="text-gray-600">{task_detail}</p>
          <div className="space-y-2">
            <p>
              Required Workers: <span className="opacity-70">{required_workers}</span>
            </p>
            <p>
              Category: <span className="opacity-70">{category}</span>
            </p>
            <p>
              Completion Date: <span className="opacity-70">{completion_date}</span>
            </p>
          </div>

          {/* Task Submission Form */}
          <form onSubmit={handleSubmit}>
            <div className="relative w-full">
              <textarea
                className="w-full border p-3 pr-10 rounded resize-y min-h-[80px] focus:outline-accent"
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder={submission_info || "Enter your task submission here..."}
              ></textarea>

              {/* Upload Icon */}
              <button
                type="button"
                onClick={handleImageClick}
                className="absolute bottom-3 right-3 text-gray-500 hover:text-blue-600"
                title="Upload Image"
              >
                <Image size={20} />
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Preview */}
            {submissionImage && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected image:</p>
                <img
                  src={URL.createObjectURL(submissionImage)}
                  alt="Preview"
                  className="w-40 mt-2 rounded border"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-white px-5 py-2 rounded font-semibold w-full mt-2"
            >
              Submit Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
