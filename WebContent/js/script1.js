$(document).ready(function() {
var allBooks = $('#books')
$.ajax({
				url:'http://localhost:8282/books',
				type:'GET',
				dataType:'json',
				success: function(json) {
          for (var i = 0; i < json.length; i++) {
            var book = $('<div>');
            book.text(json[i].title);
            book.attr('id', json[i].id)

            var detailsDiv = $('<div>');
            detailsDiv.addClass('details');
            detailsDiv.css('display', 'none');
            book.append(detailsDiv)

            allBooks.append(book);

            book.on('click', function() {
              $(this).children().toggle();
            });


            getDetails(json[i].id, detailsDiv);

          }
        },
        error: function() {
          console.log("Main error");
        }
});

function getDetails(id, detailsDiv) {

    $.ajax({
      url:'http://localhost:8282/books/' + id,
      type:'GET',
      dataType:'json',
      success: function(json) {
        // zmienić widok na listę
        detailsDiv.append($('<p>').text(json.isbn));
        detailsDiv.append($('<p>').text(json.author));
        detailsDiv.append($('<p>').text(json.publisher));
        detailsDiv.append($('<p>').text(json.type));

      },
      error: function() {
        console.log("Details error");
      }
    });
}

var addBook = $('#addBook');

addBook.on('click', function(event) {
  event.preventDefault();
  if(validateForm()) {
    $.ajax({
      url:'http://localhost:8282/books/',
      type:'POST',
      dataType:'json',
      success: function(json) {

        // doda książkę

      },
      error: function() {
        console.log("Details error");
      }
    });
  }
});

function validateForm() {
  // sprawdzi, czy formularz jest poprawny
}



});
