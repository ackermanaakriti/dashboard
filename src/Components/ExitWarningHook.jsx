import { useEffect } from 'react';
import { useNavigate, useBlocker } from 'react-router-dom';

const useNavigationBlocker = (isFormDirty) => {
  const navigate = useNavigate();

  // Use useBlocker hook to block navigation based on isFormDirty
  useBlocker(
    (tx) => {
      if (isFormDirty) {
        tx.block('You have unsaved changes, do you really want to leave?');
      }
    },
    [isFormDirty]
  );

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes, do you really want to leave?';
      }
    };

    const beforeUnloadListener = (event) => {
      handleBeforeUnload(event);
    };

    window.addEventListener('beforeunload', beforeUnloadListener);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener);
    };
  }, [isFormDirty]);
};

export default useNavigationBlocker;
