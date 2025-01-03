jQuery.fn.rotate = function(degrees) {
    $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

$(function() {

  var elevator = new Elevator({
    mainAudio: '/sound/elevator.mp3',
    endAudio: '/sound/ding.mp3',
    duration: 7000
  });

  $('#elevator').click(function(e){
    elevator.elevate();
  });

  $('#arrow').click(function(e) {
    e.preventDefault();
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#info").offset().top
    }, 500);
  });

  $(window).scroll(function(e) {
    var rotation = $(this).scrollTop() / $("#info").offset().top * 135;
    $("#logo").rotate(rotation);
  });


  $("#joinform").submit(function(e) {
    e.preventDefault();

    var value = $("#email").val();
    if (value == '') {
      return;
    }

    $("#joinform > div").removeClass("error");
    $("#joinform #email").attr('disabled', true);
    $("#joinform #join").attr('disabled', true);
    $("#joinform #join").addClass('loading');

    var finished = function() {
      $("#joinform #email").attr('disabled', false);
      $("#joinform #join").attr('disabled', false);
      $("#joinform #join").removeClass('loading');
      $("#joinform #join").removeClass('blue');
      $("#joinform #join").removeClass('red');
    }

    var success = function() {
      finished();
      $("#joinform #join").addClass('green');
      $("#joinform #join").text('Joined!');
    }

    var fail = function() {
      finished();
      $("#joinform #join").addClass('red');
      $("#joinform > div").addClass("error");
      $("#joinform #join").text('Error');
    }

    $.ajax({
      dataType: 'jsonp',
      url: "https://getsimpleform.com/messages/ajax?form_api_token=cb27d55a6d9fbaad4231ee66c046135f",
      data: {
        email: value,
      },
      success: success,
      error: fail
    });
  })

});
