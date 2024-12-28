import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./bar.css";
const Progress = ({ completed, total }) => {
  const progress = (completed / total) * 100;

  return (
    <div className="progress-wrapper" style={{ width: '100%', marginTop: '20px' }}>
    <div className="progress" style={{ height: '30px' }}>
      <div
        className="progress-bar custom-progress-bar"
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {Math.round(progress)}% Completed
      </div>
    </div>
    <div className="text-center mt-2">
        <span className="text-muted">
          {completed} out of {total} habits completed
        </span>
      </div>
    </div>
  );
};

const Progresstrack = ({ userId }) => {
  const [progress, setProgress] = useState({ totalHabits: 0, completedHabits: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(userId);
    const fetchProgress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/notes/gethabitsprogress/${userId}`
        );
        setProgress(response.data);
      } catch (error) {
        setError("Error fetching habit progress");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h2>Habit Tracker</h2>
      <h4>Track your habit progress</h4>

      {/* Display Progress Bar */}
      <Progress completed={progress.completedHabits} total={progress.totalHabits} />
    </div>
  );
};

export default Progresstrack;
