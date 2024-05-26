import { useState, useEffect } from 'react';

export function useBeforeUnload(formDirty) {
  const [showWarning, setShowWarning] = useState(false);
  console.log('hello from usebefor unload')
  console.log(formDirty)

  useEffect(() => {
    const handleBeforeUnload = (event) => {
        console.log('k garne')
      if ( !formDirty) {
        event.preventDefault();
        event.returnValue = ''; // Chrome requires setting returnValue to a string to display the message
        setShowWarning(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formDirty]);

  const handleLeave = () => {
    // Handle confirmation (e.g., navigate anyway, stay on page)
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
