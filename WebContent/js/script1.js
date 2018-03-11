$(document).ready(function() {
var allBooks = $('#books')

function bookList() {
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
}

bookList();

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

var book = {
	/*
	isbn: $('#isbn').val(),
	title: $('#title').val(),
	author: $('#author').val(),
	publisher: $('#publisher').val(),
	type: $('#type').val()
	*/

// dodać pobieranie danych z formularza
	isbn: "0000",
	title: "title - hardcoded",
	author: "author - hardcoded",
	publisher: "publisher - hardcoded",
	type: "type - hardcoded"

};

addBook.on('click', function(event) {
  if (validateForm()) {
		console.log("form validated");
    $.ajax({
      url:'http://localhost:8282/books',
      type:'POST',
      dataType:'application/json',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(book),
      success: function(json) {
				console.log("POST completed");
				bookList();
      },
      error: function() {
        console.log("Details error");
      }
    });
  }
});

function validateForm() {
  if (!$.isNumeric($('#isbn').val())) {
		return false;
	}

	if (!/^([0-9]*[a-zA-Z\-\_\.\,\s]){3,}[0-9]*$/.test($('#title').val())) {
    return false;
	}

	if (!/^([0-9]*[a-zA-Z\-\_\.\,\s]){3,}[0-9]*$/.test($('#author').val())) {
    return false;
	}

	if (!/^([0-9]*[a-zA-Z\-\_\.\,\s]){3,}[0-9]*$/.test($('#publisher').val())) {
    return false;
	}

	if (!/^([0-9]*[a-zA-Z\-\_\.\,\s]){3,}[0-9]*$/.test($('#type').val())) {
    return false;
	}
	return true;
}



});
