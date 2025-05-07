import axios from 'axios';

const downloadInvoice = async (type, id, buttonRef) => {
  const token = localStorage.getItem('userAuthToken');

  if (buttonRef) {
    buttonRef.disabled = true;
    buttonRef.innerHTML = 'Downloading...';
    buttonRef.classList.add('disabled');
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:8080/api/invoice-${type}?${type}Id=${id}`,
      headers: {
        'x-access-token': token
      },
      responseType: 'blob' 
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const a = document.createElement('a');
    a.href = url;
    a.download = type === 'order' ? 'invoice.pdf' : 'donation_receipt.pdf';
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Erreur lors du téléchargement:', err);
    alert('Erreur lors du téléchargement du fichier.');
  } finally {
    if (buttonRef) {
      buttonRef.disabled = false;
      buttonRef.innerHTML = type === 'order' ? 'Download Invoice' : 'Download Receipt';
      buttonRef.classList.remove('disabled');
    }
  }
};

export default downloadInvoice;
