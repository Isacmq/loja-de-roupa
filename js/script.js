$("document").ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_meunu').toggleclass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });
});