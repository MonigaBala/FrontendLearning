// Reservation Form Validation
const reservationForm = document.getElementById('reservationForm');

reservationForm.addEventListener('submit', function(e){
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const dateTime = document.getElementById('dateTime').value;
  const guests = document.getElementById('guests').value;

  if(fullName === '' || email === '' || phone === '' || dateTime === '' || guests === ''){
    alert('Please fill all the fields!');
    return;
  }

  const phonePattern = /^[0-9]{10}$/;
  if(!phonePattern.test(phone)){
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  alert(`Thank you, ${fullName}! Your reservation for ${guests} guest(s) on ${new Date(dateTime).toLocaleString()} has been received.`);
  reservationForm.reset();
});
