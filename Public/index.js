$(document).ready(function() {
    const myLibrary = [];

    // Book constructor function
    function Book(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    // Open the modal
    $('#button').click(function() {
        $('#modal').css('display', 'block');
    });

    // Close the modal when the 'X' is clicked
    $('.close').click(function() {
        $('#modal').css('display', 'none');
    });

    // Close the modal when clicking outside the modal content
    $(window).click(function(event) {
        if ($(event.target).is('#modal')) {
            $('#modal').css('display', 'none');
        }
    });

    // Handle form submission
    $('#bookForm').submit(function(event) {
        event.preventDefault(); // Prevent page reload
        
        // Capture input values
        const title = $('#title').val();
        const author = $('#author').val();
        const pages = $('#pages').val();

        // Create a new book instance and add to the library
        const newBook = new Book(title, author, pages);
        myLibrary.push(newBook);

        // Clear form fields
        $('#bookForm')[0].reset();

        // Close the modal
        $('#modal').css('display', 'none');

        // Update the displayed library
        displayBooks();
    });

    // Function to display books as cards
    function displayBooks() {
        const container = $("#library-container");
        container.empty();

        myLibrary.forEach((book, index) => {
            // Create card HTML with a button that shows the current read status
            const card = $(`
                <div class="book-card">
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <p>Pages: ${book.pages}</p>
                    <button class="read-toggle">${book.read ? "Read" : "Not Read"}</button>
                    <button class="remove-book">Remove</button>
                </div>
            `);

            // Toggle read status on click
            card.find(".read-toggle").click(function() {
                book.read = !book.read;
                $(this).text(book.read ? "Read" : "Not Read");
            });

            // Remove book on click
            card.find(".remove-book").click(function() {
                myLibrary.splice(index, 1);
                displayBooks(); // Refresh the book list
            });

            // Add the card to the container
            container.append(card);
        });
    }
});
