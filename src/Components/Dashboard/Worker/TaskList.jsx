import React, { useEffect, useState } from 'react';
import Spinner from '../../Router/Spinner';
import TaskCard from './TaskCard';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';

const TaskList = () => {
  const [loading, setLoading] = useState(true); 
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState(""); 
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get('/tasks2')
      .then(res => {
        setData(res.data);
        setSortedData(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch tasks:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure]);

  // Handle sorting
  useEffect(() => {
    let sorted = [...data];

    switch (sortOption) {
      case "pay_high":
        sorted.sort((a, b) => b.payable_amount - a.payable_amount);
        break;
      case "pay_low":
        sorted.sort((a, b) => a.payable_amount - b.payable_amount);
        break;
      case "workers":
        sorted.sort((a, b) => b.required_workers - a.required_workers);
        break;
      case "date":
        sorted.sort((a, b) => new Date(a.completion_date) - new Date(b.completion_date));
        break;
      default:
        sorted = [...data]; // reset
    }

    setSortedData(sorted);
  }, [sortOption, data]);

  if (loading) return <Spinner />;

  return (
    <div className="bg-secondary py-20 w-full">
      <h1 className="text-3xl font-semibold text-center">Available Tasks</h1>
      <p className="text-center py-5 font-semibold opacity-70">
        Browse and apply for tasks that match your skills
      </p>

      {/* Sorting Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          className="px-4 py-2 border rounded-lg shadow-sm"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by...</option>
          <option value="pay_high"> Pay (High → Low)</option>
          <option value="pay_low"> Pay (Low → High)</option>
          <option value="workers"> Required Workers</option>
          <option value="date"> Earliest Deadline</option>
        </select>
      </div>

      {/* Task Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 px-10 py-5">
        {sortedData.map(task => (
          <TaskCard key={task._id} da={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
