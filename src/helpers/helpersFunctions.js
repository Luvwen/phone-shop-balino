import Swal from 'sweetalert2';

export const isFormValid = (name, phone, email, confirmEmail) => {
  const regexName = /^[a-z ,.'-]+$/i;
  const regexPhone =
    /^((?:\(?\d{2}\)?[- .]?\d{4}|\(?\d{4}\)?[- .]?\d{3}|\(?\d{5}\)?[- .]?\d{2})[- .]?\d{4})$/;
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  if (!regexName.test(name) || name.length < 3) {
    Swal.fire({
      title: 'Error!',
      text: 'Invalid name',
      icon: 'error',
      confirmButtonText: 'Try again',
    });
    return false;
  } else if (!regexPhone.test(phone)) {
    Swal.fire({
      title: 'Error!',
      text: 'Invalid phone number',
      icon: 'error',
      confirmButtonText: 'Try again',
    });
    return false;
  } else if (!regexEmail.test(email) || email !== confirmEmail) {
    Swal.fire({
      title: 'Error!',
      text: 'Invalid email',
      icon: 'error',
      confirmButtonText: 'Try again',
    });
    return false;
  } else {
    return true;
  }
};
