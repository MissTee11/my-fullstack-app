//format dates for consistency in backend and frontend
//Postgresql stores dates with time in UTC 
//React inputs of type date expect YYYY-MM-DD no time
export const formatDateInput = (date) => {
  if (!date) return "";
  const d = new Date(date);//converts to local time
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  