import axios from 'axios';

export const downloadFile = async (url: string, fileName: string) => {
  try {
    const response = await axios({
      url: url,
      method: 'GET',
      responseType: 'blob', // important
    });
    const href = URL.createObjectURL(response.data);
    downloadFileFromUrl(href, fileName, true);
  } catch (error) {
    console.log('error: ', error);
  }
};

export const downloadFileFromUrl = (href: string, fileName: string, objectUrl: boolean = false) => {
  const link = document.createElement('a');

  link.href = href;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);

  if (objectUrl) {
    URL.revokeObjectURL(href);
  }
};
