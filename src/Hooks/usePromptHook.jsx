import React, { useEffect, useState } from 'react';

export function useBeforeUnload(isFormDirty) {
  const [showWarning, setShowWarning] = useState(false);
  console.log(isFormDirty)

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        console.log('from inside')
        event.preventDefault();
        event.returnValue = ''; // Chrome requires setting returnValue to a string to display the message
        setShowWarning(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormDirty]); // Pass isFormDirty as a dependency here

  const handleLeave = () => {
    setShowWarning(false);
  };

  const confirmationDialog = (
    showWarning && (
      <div>
        <p>Are you sure you want to leave? You have unsaved changes.</p>
        <button onClick={handleLeave}>Leave Anyway</button>
        <button onClick={() => setShowWarning(false)}>Stay on Page</button>
      </div>
    )
  );

  return { showWarning, handleLeave, confirmationDialog };
}
