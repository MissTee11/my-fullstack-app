
export const formatDateInput = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toISOString().slice(0, 10);
  };
  
  