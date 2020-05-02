// Author: Harsh Arora

// setup controls
var controls = {};

// setup ThingSpeak Update API
var thingSpeakUpdate = 'https://api.thingspeak.com/update';

// check local storage for controls and display them
if (localStorage.getItem('controls')) {
  controls = JSON.parse(localStorage.getItem('controls'));
  displayControls();
}

//
// local functions
//

// display controls
function displayControls() {

  // clear controls
  $('#controls').empty();

  // setup Masonry
  var $grid = $('.grid').masonry({
    columnWidth: 200
  });

  // create a card for each control
  $.each(controls, function(i, control) {

    var control_new = $('<div class="card bg-light mb-3">' +
                          '<div class="card-header">' + control.name + '</div>' +
                          '<div class="card-body">' +
                            getControl(i, control) +
                          '</div>' +
                        '</div>');

    // add each control to the grid
    $grid.append(control_new).masonry('appended',control_new);

  });

}

function getControl(i, control) {

  var control_html = '';

  if (control.type == 'switch') {
    control_html = '<div class="control_toggle">' +
                   '  <button id="toggle_' + i + '" class="btn btn-success" onclick="buttonControl(' + control.source.field + ', \'' + control.source.writeKey + '\', 1)">On</button>' +
                   '  <button id="toggle_' + i + '" class="btn btn-error" onclick="buttonControl(' + control.source.field + ', \'' + control.source.writeKey + '\', 0)">Off</button>' +
                   '</div>';
  }
  else if (control.type == 'input') {
    control_html = '<div class="control_toggle">' +
                   '  <input id="input_' + i + '" type="text" class="form-control" onchange="inputControl(' + control.source.field + ', \'' + control.source.writeKey + '\',' + '\'input_' + i + '\')">' +
                   '</div>';
  }
  else if (control.type == 'iframe') {
    control_html = '<div class="control_iframe" style="width:' + control.source.width + 'px; height: ' + control.source.height + 'px">' +
                   '  <iframe width="' + control.source.width + '" height="' + control.source.height + '" src="' + control.source.url + '" frameborder="0"></iframe>' +
                   '</div>';
  }

  return control_html;
}

// send state to ThingSpeak using button
function buttonControl(field, key, state) {

  // contruct data to send
  var data = 'api_key=' + key + '&' +
             'field' + field + '=' + state;

  // get ThingSpeak data using AJAX
  $.ajax({url: thingSpeakUpdate, data: data, success: function(data){
      // check if there is a valid response
      if (data >> 0) {
        console.log(data);
      }
  }});

}

// send input to ThingSpeak using input box
function inputControl(field, key, input) {

  // get value of input box
  var inputValue = $('#' + input).val();

  // contruct data to send
  var data = 'api_key=' + key + '&' +
             'field' + field + '=' + inputValue;

  // get ThingSpeak data using AJAX
  $.ajax({url: thingSpeakUpdate, data: data, success: function(data){
      // check if there is a valid response
      if (data >> 0) {
        console.log(data);
      }
  }});

}

// save controls to localStorage and close modal
function saveControls() {
  // save controls
  localStorage.setItem('controls', $('#controlsJSON').val());
  controls = JSON.parse(localStorage.getItem('controls'));

  // update controls
  displayControls();

  // close modal
  $('#controlsModal').modal('hide')
  return;
}

// load controls when modal is shown
$('#controlsModal').on('shown.bs.modal', function (e) {
  // if there are controls, display them in textarea
  if (controls) {
    $('#controlsJSON').html(localStorage.getItem('controls'));
  }
});