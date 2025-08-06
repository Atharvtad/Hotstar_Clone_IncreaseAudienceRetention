import React, { useState, useEffect } from 'react';
import StoryPlayer from './StoryPlayer';

const Stories = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [visitedStories, setVisitedStories] = useState([]);
  const [watchedStories, setWatchedStories] = useState([]);
  const [ratings, setRatings] = useState({});
  const [sortedStories, setSortedStories] = useState([]);
  const [countdown, setCountdown] = useState(7); // Starting the countdown at 7 days

  // Updated stories array with local assets
  const stories = [
  {
    id: 1,
    username: 'Ranveer',
    thumbnail: './src/assets/videos/Ranveer.jpg',
    video: ' ./src/assets/videos/Ranveer.mp4',
    
  },
  {
    id: 2,
    username: 'Akshay kumar',
    thumbnail: './src/assets/videos/Akshay.jpg',
    video: './src/assets/videos/Akshay.mp4',
  },
  {
    id: 3,
    username: 'Hulk',
    thumbnail: './src/assets/videos/Hulk.jpg',
    video: ' ./src/assets/videos/Hulk.mp4',
  },
  {
    id: 4,
    username: 'Solo leveling',
    thumbnail: './src/assets/videos/Solo.jpg',
    video: './src/assets/videos/Solo.mp4',
    
  },
  {
    id: 5,
    username: 'Rajkummar Rao',
    thumbnail: './src/assets/videos/Rajkumaar.jpg',
    video: './src/assets/videos/rajkummar.mp4',
  },
  {
    id: 6,
    username: 'Sport ',
    thumbnail: './src/assets/videos/Race.jpg',
    video: './src/assets/videos/Race.mp4',
  },
  {
    id: 7,
    username: 'Superman',
    thumbnail: './src/assets/videos/Superman.jpg',
    video: './src/assets/videos/Superman.mp4',
  },
];
  useEffect(() => {
    // Initialize sortedStories
    setSortedStories(stories);
  }, []);

  // Countdown logic for the first story (7 days countdown)
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1) {
          return prevCountdown - 1;
        }
        clearInterval(interval); // Stop the countdown once it reaches 1
        return 1;
      });
    }, 1000 * 60 * 60 * 24); // Update every 24 hours

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  // Sort stories based on priority: unvisited > visited > watched
  const sortStories = () => {
    const unvisited = stories.filter(
      (story) =>
        !visitedStories.includes(story.id) && !watchedStories.includes(story.id)
    );
    const visited = stories.filter(
      (story) =>
        visitedStories.includes(story.id) && !watchedStories.includes(story.id)
    );
    const watched = stories.filter((story) =>
      watchedStories.includes(story.id)
    );

    setSortedStories([...unvisited, ...visited, ...watched]);
  };

  const markStoryAsVisited = (id) => {
    if (!visitedStories.includes(id)) {
      setVisitedStories((prev) => [...prev, id]);
    }
  };

  const markStoryAsWatched = (id) => {
    if (!watchedStories.includes(id)) {
      setWatchedStories((prev) => [...prev, id]);
    }
  };

  const openStory = (index) => {
    const currentStories = sortedStories.length > 0 ? sortedStories : stories;
    setActiveStoryIndex(index);
    markStoryAsVisited(currentStories[index].id);
  };

  const closeStory = () => {
    setActiveStoryIndex(null);
  };

  const goToNextStory = () => {
    setActiveStoryIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % sortedStories.length;
      markStoryAsVisited(sortedStories[nextIndex].id);
      return nextIndex;
    });
  };

  const goToPreviousStory = () => {
    setActiveStoryIndex((prevIndex) => {
      const previousIndex =
        prevIndex === 0 ? sortedStories.length - 1 : prevIndex - 1;
      markStoryAsVisited(sortedStories[previousIndex].id);
      return previousIndex;
    });
  };

  const generateRandomRating = () => {
    return (Math.random() * 3 + 7).toFixed(1);
  };

  const handleRandomRating = () => {
    const newRatings = {};
    stories.forEach((story) => {
      newRatings[story.id] = generateRandomRating();
    });
    setRatings(newRatings);
  };

  const handleRearrange = () => {
    sortStories(); // Call sorting
  };

  return (
    <div>
      <div className="stories-bar">
        {sortedStories.map((story, index) => (
          <div
            className={`story ${
              watchedStories.includes(story.id)
                ? 'watched'
                : visitedStories.includes(story.id)
                ? 'visited'
                : ''
            }`}
            key={story.id}
            onClick={() => openStory(index)}
          >
            {index === 0 && countdown > 0 && (
              <div className="countdown-timer">
                {countdown} Day{countdown > 1 ? 's' : ''} Left
              </div>
            )}

            <div className="story-circle">
            <img src={story.thumbnail} alt={story.username}  className="story-thumbnail" />

            </div>
            <p>{story.username}</p>

            {/* Add buttons to the last story */}
            {index === stories.length - 1 && (
              <div className="story-buttons-container">
                <button
                  className="corner-btn top-left-btn"
                  onClick={handleRearrange}
                >
                  *
                </button>
                <button
                  className="corner-btn top-right-btn"
                  onClick={handleRandomRating}
                >
                  R
                </button>
              </div>
            )}

            {ratings[story.id] && (
              <div className="story-rating">{ratings[story.id]}</div>
            )}
          </div>
        ))}
      </div>

      {activeStoryIndex !== null && (
        <StoryPlayer
          story={sortedStories[activeStoryIndex]}
          onClose={closeStory}
          onNext={goToNextStory}
          onPrevious={goToPreviousStory}
          onWatchNow={() => {
            markStoryAsWatched(sortedStories[activeStoryIndex].id);
          }}
        />
      )}
    </div>
  );
};

export default Stories;
