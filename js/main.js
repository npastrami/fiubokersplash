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

  createFloatingCards();
  setInterval(createFloatingCards, 25000);

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

// Original function with minimal modifications
function createFloatingCards() {
  const container = document.getElementById('floatingCards');
  if (!container) return;
  
  // Create a hidden staging area outside the viewport
  let stagingArea = document.getElementById('cardStaging');
  if (!stagingArea) {
    stagingArea = document.createElement('div');
    stagingArea.id = 'cardStaging';
    stagingArea.style.position = 'fixed';
    stagingArea.style.left = '-9999px';
    stagingArea.style.top = '-9999px';
    stagingArea.style.visibility = 'hidden';
    document.body.appendChild(stagingArea);
  }
  
  // Clear existing cards
  container.innerHTML = '';
  
  // Create all cards in the staging area first
  const suits = ['\u2660', '\u2665', '\u2663', '\u2666'];
  const numberOfCards = 12;
  
  for (let i = 0; i < numberOfCards; i++) {
    const card = document.createElement('div');
    card.className = `card ${i % 2 === 0 ? 'blue' : 'gold'}`;
    card.textContent = suits[Math.floor(Math.random() * suits.length)];
    card.style.left = `${5 + Math.random() * 90}%`;
    card.style.opacity = '0';
    
    // Add to staging area first
    stagingArea.appendChild(card);
    
    // Set animation properties
    const duration = 15 + Math.random() * 10;
    const delay = 1;
    card.style.animation = `float ${duration}s linear ${delay}s forwards`;
  }
  
  // Now move all cards to the actual container (already positioned correctly)
  while (stagingArea.firstChild) {
    container.appendChild(stagingArea.firstChild);
  }
}

console.log("main.js loaded");
$(document).ready(function() {
    console.log("Document ready");
});