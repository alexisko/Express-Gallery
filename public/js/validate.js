function validate() {
  var isFilled = true;
  $('input[type="text"]').each(function() {
    if($(this).val() === '') {
      isFilled = false;
    }
  });

  if(!isFilled) {
    alert('Error: All fields must be filled out!');
  }

  return isFilled;
}