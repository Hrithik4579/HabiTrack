import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Suggestions = ({userId}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Usage
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {

        const response = await axios.get(
          `http://127.0.0.1:5000/generate-habit-suggestions?user_id=${userId}`
        );
        setSuggestions(response.data.recommendations);
      } catch (error) {
        console.error("Error fetching habit suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (suggestions.length === 0) {
    return <p>No suggestions available.</p>;
  }

  return (
    <div className="container mt-5">
    <div className="card shadow-lg border-0">
      <div className="card-header bg-gradient-primary text-black text-center py-3">
        <h3 className="card-title mb-0">🌟 Recommended Habits</h3>
      </div>
      <div className="card-body p-4">
        {suggestions.length > 0 ? (
          <ul className="list-group list-group-flush">
            {suggestions.map((habit, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center bg-light rounded mb-2"
              >
                <span className="fw-bold">{habit}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-muted">
            <p className="fs-5">No habits to display at the moment. 🌱</p>
            <p>Check back later for personalized suggestions!</p>
          </div>
        )}
      </div>
    </div>
  </div>
  
  
  );
};

export default Suggestions;
