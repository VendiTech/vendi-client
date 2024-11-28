export const downloadFile = (data: string, fileName: string, contentType: string) => {
  const blob = new Blob([data], { type: contentType });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};