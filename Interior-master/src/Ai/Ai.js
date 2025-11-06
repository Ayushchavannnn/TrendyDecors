import React, { useEffect } from 'react';

const Ai = () => {
  // Your logic to determine whether to switch the URL or not
  const shouldSwitchURL = true;  // Set this based on your condition

  useEffect(() => {
    if (shouldSwitchURL) {
      const absoluteURL = 'http://localhost:3005';
      window.location.href = absoluteURL;
    }
  }, [shouldSwitchURL]);

  // Your component JSX if you don't want to switch the URL

  return (
    <div>
      {/* Your component content */}
    </div>
  );
};

export default Ai;
