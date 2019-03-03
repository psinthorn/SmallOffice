document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, {
        format: 'dd-mm-yyyy'
    });
  });

//   // Or with jQuery

//   $(document).ready(function(){
//     $('.datepicker').datepicker();
//   });