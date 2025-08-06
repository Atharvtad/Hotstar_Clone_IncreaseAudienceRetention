import React from 'react';

const StoryPlayer = ({ story, onClose, onNext, onPrevious, onWatchNow }) => {
  return (
    <div className="story-player">
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>

      <video
        className="story-video"
        src={story.video}
        controls
        autoPlay
        
      />

      {/* Navigation Buttons */}
      <button className="nav-btn prev-btn" onClick={onPrevious}>
        &#8249; {/* Left Arrow */}
      </button>
      <button className="nav-btn next-btn" onClick={onNext}>
        &#8250; {/* Right Arrow */}
      </button>

      {/* "Watch Now" Button */}
      <button className="watch-now-btn" onClick={onWatchNow}>
        Watch Now
      </button>
    </div>
  );
};

export default StoryPlayer;
