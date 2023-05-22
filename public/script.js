$(document).ready(function () {

    $('#messageForm').submit(function (event) {
        event.preventDefault();


        var username = $('#username').val();
        var country = $('#country').val();
        var message = $('#message').val();

        if (username === '' || country === '' || message === '') {
            alert('Please fill in all fields');
            return;
        }


        var formData = {
            username: username,
            country: country,
            message: message
        };

        $.ajax({
            url: '/submit',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                alert('Message submitted successfully');

                $('#username').val('');
                $('#country').val('');
                $('#message').val('');

                fetchMessages();
            },
            error: function (error) {
                alert('Failed to submit message');
                console.error('Error:', error);
            }
        });
    });


    function fetchMessages() {
        $.ajax({
            url: '/data',
            type: 'GET',
            success: function (response) {
                displayMessages(response);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }


    function displayMessages(messages) {
        var tableBody = $('#guestbookTable');
        tableBody.empty();

        messages.forEach(function (entry) {
            var row = $('<tr>');
            row.append($('<td>').text(entry.username));
            row.append($('<td>').text(entry.country));
            row.append($('<td>').text(entry.message));
            tableBody.append(row);
        });
    }


    fetchMessages();
});
