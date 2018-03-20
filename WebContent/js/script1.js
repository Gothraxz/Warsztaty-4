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
            book.html(json[i].title + " - <a class='delete' href='http://localhost:8282/books/remove/" + json[i].id + "'>delete</a>");
            book.attr('id', json[i].id);

						$('.delete').on('click', function(event) {
								event.preventDefault();
						})

            var detailsDiv = $('<ul>');
            detailsDiv.addClass('details');
            detailsDiv.css('display', 'none');
            book.append(detailsDiv);

            allBooks.append(book);

/*
						var deleteBook = $('<button>');
						deleteBook.attr('id', "del_" + json[i].id);
						deleteBook.attr('value', "delete");
						allBooks.append(deleteBook);
*/

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

// podpiąć event do wszystkich DIV
// sprawdzić url
$('.delete').on('click', function() {
	$.ajax({
		url: $(this).attr('href'),
		type:'DELETE',
		dataType:'json',
		success: function(json) {
			console.log("Delete completed");
			bookList();
		},
		error: function() {
			console.log("Delete error");
		}
	});
})

function getDetails(id, detailsDiv) {

    $.ajax({
      url:'http://localhost:8282/books/' + id,
      type:'GET',
      dataType:'json',
      success: function(json) {

        detailsDiv.append($('<li>').text(json.isbn));
        detailsDiv.append($('<li>').text(json.author));
        detailsDiv.append($('<li>').text(json.publisher));
        detailsDiv.append($('<li>').text(json.type));

      },
      error: function() {
        console.log("Details error");
      }
    });
}

var addBook = $('#addBook');

var formIsbn = $('#isbn');
var formTitle = $('#title');
var formAuthor = $('#author');
var formPublisher = $('#publisher');
var formType = $('#type');

var bookObj = {

	isbn: "",
	title: "",
	author: "",
	publisher: "",
	type: ""

};

formIsbn.on('keyup', function() {
	var val = $(this).val();
	$('#isbn').attr('value', val);
	bookObj.isbn = val;
});

formTitle.on('keyup', function() {
	var val = $(this).val();
	$('#title').attr('value', val);
	bookObj.title = val;
});

formAuthor.on('keyup', function() {
	var val = $(this).val();
	$('#author').attr('value', val);
	bookObj.author = val;
});

formPublisher.on('keyup', function() {
	var val = $(this).val();
	$('#publisher').attr('value', val);
	bookObj.publisher = val;
});

formType.on('keyup', function() {
	var val = $(this).val();
	$('#type').attr('value', val);
	bookObj.type = val;
});

addBook.on('click', function(event) {
	console.log("Sumbit clicked");
  if (validateForm()) {
		console.log("form validated");
    $.ajax({
      url:'http://localhost:8282/books/add',
      type:'POST',
      dataType:'application/json',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(bookObj),
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
