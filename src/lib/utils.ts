export const formater = (date: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta',
    };
  
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
  };
  