//Initialize The Buttons
$('button.encode, button.decode').click(function(event) {
  event.preventDefault();
});

//Preview The Image of Decoded
function previewDecodeImage() {
  var file = document.querySelector('input[name=decodeFile]').files[0];
  previewImage(file, ".decode canvas", function() {});
}

//Preview The Image of Encoded
function previewEncodeImage() {
  var file = document.querySelector("input[name=baseFile]").files[0];

  $(".images .message").hide();

  previewImage(file, ".original canvas", function() {
    $(".images .original").fadeIn();
    $(".images").fadeIn();
  });
}

//Preview the Image Simply
function previewImage(file, canvasSelector, callback) {
  var reader = new FileReader();
  var image = new Image;
  var $canvas = $(canvasSelector);
  var context = $canvas[0].getContext('2d');

  if (file) {
    reader.readAsDataURL(file);
  }

  reader.onloadend = function () {
    image.src = URL.createObjectURL(file);
    image.onload = function() {
      $canvas.prop({
        'width': image.width,
        'height': image.height
      });
      context.drawImage(image, 0, 0);
      callback();
    }
  }
}

/**************** Encoded Code Start From Here ****************/
function encodeMessage() {

  $(".error").hide();
  $(".binary").hide();

  var finaltext =  $("input.password").val() + ' ' + $("textarea.message").val();
  var $originalCanvas = $('.original canvas');
  var $messageCanvas = $('.message canvas');

  var originalContext = $originalCanvas[0].getContext("2d");
  var messageContext = $messageCanvas[0].getContext("2d");

  var width = $originalCanvas[0].width;
  var height = $originalCanvas[0].height;
  var ln = (finaltext.length * 8)
  var sz = (width * height * 3);

  // Check if the image is big enough to hide the message
  if ((finaltext.length * 8) > (width * height * 3)) {
    $(".error")
    .text("Text too long for chosen image....")
    .fadeIn();
    return;
  }

  $messageCanvas.prop({
    'width': width,
    'height': height
  });

  // Normalize the original image and draw it
  var original = originalContext.getImageData(0, 0, width, height);
  var pixel = original.data;
  for (var i = 0, n = pixel.length; i < n; i += 4) {
    for (var offset =0; offset < 3; offset ++) {
      if(pixel[i + offset] %2 != 0) {
        pixel[i + offset]--;
      }
    }
  }
  originalContext.putImageData(original, 0, 0);

  // Convert the message to a binary string
  var binaryMessage = "";
  for (i = 0; i < finaltext.length; i++) {
    var binaryChar = finaltext[i].charCodeAt(0).toString(2);

    // Pad with 0 until the binaryChar has a lenght of 8 (1 Byte)
    while(binaryChar.length < 8) {
      binaryChar = "0" + binaryChar;
    }

    binaryMessage += binaryChar;
  }
  $('.binary textarea').text(binaryMessage);

  // Apply the binary string to the image and draw it
  var message = originalContext.getImageData(0, 0, width, height);
  pixel = message.data;
  counter = 0;
  for (var i = 0, n = pixel.length; i < n; i += 4) {
    for (var offset =0; offset < 3; offset ++) {
      if (counter < binaryMessage.length) {
        pixel[i + offset] += parseInt(binaryMessage[counter]);
        counter++;
      }
      else {
        break;
      }
    }
  }
  messageContext.putImageData(message, 0, 0);

  $(".binary").fadeIn();
  $(".images .nulled").fadeIn();
  $(".images .message").fadeIn();
};

/**************** Decoded Code Start From Here ****************/
function decodeMessage() {

  var $originalCanvas = $('.decode canvas');
  var originalContext = $originalCanvas[0].getContext("2d");
  var original = originalContext.getImageData(0, 0, $originalCanvas.width(), $originalCanvas.height());
  var binaryMessage = "";
  var pixel = original.data;
  for (var i = 0, n = pixel.length; i < n; i += 4) {
    for (var offset =0; offset < 3; offset ++) {
      var value = 0;
      if(pixel[i + offset] %2 != 0) {
        value = 1;
      }
      binaryMessage += value;
    }
  }

  var output = "";
  for (var i = 0; i < pixel.length; i += 8) {
    var c = 0;
    for (var j = 0; j < 8; j++) {
      c <<= 1;
      c |= parseInt(binaryMessage[i + j]);
    }
    output += String.fromCharCode(c);
  }

  //password checking Code
  result = output.replace(/[^A-Z0-9a-z\s\:",.&#,+()$~%.'":*?<>!`^_=|;{}]/ig,'');
  var print = result.match(/^(\S+)\s(.*)/).slice(1);
  pass = print[0];
  text = print[1];
  var checkPassword =  $("input.checkPassword").val();
  if(checkPassword == pass){
    console.log("password match");
    $('.binary-decode textarea').text(text);
    $('.binary-decode').fadeIn();
    $(".dimage").fadeIn();
  }
  else {
    console.log("password not match");
    $('.binary-decode textarea').text("Password Doesn't Match! Re-Eneter Again");
    $('.binary-decode').fadeIn();
    $(".dimage").fadeOut();
  }
};

//Download Image Code
  var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
  function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
  }

  document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'encoded.png');
  }, false);
