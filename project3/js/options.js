var globalCache = [];
var OptionsContentCreator = function(){}

OptionsContentCreator.prototype.createButton = function(title, id, className, loadingTxt){
  var loadingText = '';
  if (typeof loadingTxt !== 'undefined'){
    loadingText += 'data-loading-text="' + loadingTxt + ' ..." '
  }

  return  '<button type="button" id="' + id + '" ' +
          loadingText +
          'class="btn ' + className + ' options-button"' +
          'autocomplete="off">' +
          title +
          '</button>';

}

OptionsContentCreator.prototype.createModalButton = function(title, id, className, target){
  var dataAttributes = 'data-toggle="modal" data-backdrop="static" data-target="#' + target + '" ';

  return  '<button type="button" id="' + id + '" ' +
          dataAttributes +
          'class="btn ' + className + ' options-button"' +
          'autocomplete="off">' +
          title +
          '</button>';
}

OptionsContentCreator.prototype.createPopoverButton = function(title, id, className, content){
  var dataAttributes = 'data-container="body" data-toggle="popover"' +
                       'data-placement="left" data-content="' + content + '" ';

  return  '<button type="button" id="' + id + '" ' +
          dataAttributes +
          'class="btn ' + className + ' options-button">' +
          title +
          '</button>';
}

OptionsContentCreator.prototype.createDiv = function (divId, className){
  var div = document.createElement('div');
  div.id = divId;
  if (typeof className !== 'undefined'){
    div.className = className;
  }
  return div;
}

function setUpOptionsContent(){
  var contentCreator = new OptionsContentCreator();
  var cache = {};
  function setUpButtons(){
    var optionsContainer = contentCreator.createDiv('options-container');
    var optionsDiv = document.getElementById('options');
    optionsDiv.appendChild(optionsContainer);

    //start button
    var startButton = contentCreator.createButton('Start Game', 'start-button',
    'btn-large btn-success', 'Playing');
    optionsContainer = document.getElementById('options-container');
    var innerHTML = optionsContainer.innerHTML;
    optionsContainer.innerHTML = innerHTML + startButton;

    //pause button
    var pauseButton = contentCreator.createButton('Pause Game', 'pause-button',
    'btn-large btn-danger', 'Paused');
    optionsContainer = document.getElementById('options-container');
    innerHTML = optionsContainer.innerHTML;
    optionsContainer.innerHTML = innerHTML + pauseButton;

    //change hero button
    var changeHeroButton = contentCreator.createModalButton('Change Hero Character', 'hero-button',
    'btn-large btn-warning', 'heroModal');
    innerHTML = optionsContainer.innerHTML;
    optionsContainer.innerHTML = innerHTML + changeHeroButton;
  }

  function handleButtonEvents(){
    function setUpVariables(){
      cache.$startButton = $('#start-button');
      cache.$pauseButton = $('#pause-button');
      cache.$heroButton  = $('#hero-button');
      cache.$enemyButton = $('#enemy-button');
      cache.$pauseButton.button('loading');

    }

    function handleClickEvents(){
      cache.$startButton.click(function(){
        if (cache.$startButton.text() === 'Start Game') {
          cache.$startButton.button('loading');
          paused = false;
          cache.$pauseButton.button('reset');
          if (!stopWatch.isRunning()){
            stopWatch.start();
          }
        }
      });

      cache.$pauseButton.click(function(){
        if (cache.$pauseButton.text() === 'Pause Game') {
          cache.$pauseButton.button('loading');
          paused = true;
          cache.$startButton.button('reset');
        }
      });

      cache.$heroButton.click(function(){
        cache.$pauseButton.click();
      })
    }

    setUpVariables();
    handleClickEvents();
  }


  function makeHeroOptions(){
    function makeOptionWithImage(imageUrl, altText, heading){
      return '<div class="media">' +
      '<a class="media-left" href="#">' +
      '<img src="' + imageUrl + '" alt="' + altText + '">' +
      '</a>' +
      '<div class="media-body">' +
      '<h4 class="media-heading">' + heading + '</h4>' +
      '</div>' +
      '</div>';
    }

    var imageUrls = [
      {url:'images/char-boy.png', heading:'Boy'},
      {url:'images/char-cat-girl.png', heading:'Boy'}
    ];

    function setupHeros(){
      var $heroDiv = $('#hero-selector');
      imageUrls.forEach(function(url){
        var innerhtml = $heroDiv.innerHTML;
        if (typeof innerHTML !== 'undefined')
          $heroDiv.innerHTML = innerhtml + makeOptionWithImage(url.url, 'Test', url.heading);
        else
          $heroDiv.innerHTML = makeOptionWithImage(url.url, 'Test', url.heading);
      });
    }

    $('#heroModal').on('shown.bs.modal', function (e) {
      globalCache.selectedHero = player.sprite;

      function highlightSelection(){
        $('td[id^=option]').removeClass('selector-indicator-selected').addClass('selection-indicator');
        $('tr[id^=row] h3').removeClass('selected-row-header');
        var option = '#' + globalCache.herosToOptionsMap[globalCache.selectedHero];
        var row = '#' + globalCache.herosToRowsMap[globalCache.selectedHero] + ' h3';
        $(option).removeClass('selection-indicator').addClass('selector-indicator-selected');
        $(row).addClass('selected-row-header');
      }


      $('.options-row').on('click', function(e){
        $('td[id^=option]').removeClass('selector-indicator-selected').addClass('selection-indicator');
        $('tr[id^=row] h3').removeClass('selected-row-header');
        var rowNumber = $(this).attr('id').replace('row', '');
        var optionString = '#option' + rowNumber;
        var rowString = '#row' + rowNumber + ' h3';
        $(optionString).removeClass('selection-indicator').addClass('selector-indicator-selected');
        $(rowString).addClass('selected-row-header');
        globalCache.selectedHero = globalCache.rowsToHerosMap[$(this).attr('id')];
      })

      $('#save-changes').on('click', function(){
        player.sprite = globalCache.selectedHero;
        $('#heroModal').modal('hide');
      })

      highlightSelection();
    })

    setupHeros();
  }

  function setupHerosLists(){
    globalCache.rowsToHerosMap = {
      'row1': 'images/char-boy.png',
      'row2': 'images/char-cat-girl.png',
      'row3': 'images/char-horn-girl.png',
      'row4': 'images/char-pink-girl.png',
      'row5': 'images/char-princess-girl.png'
    };

    globalCache.herosToRowsMap = {
      'images/char-boy.png': 'row1',
      'images/char-cat-girl.png':  'row2',
      'images/char-horn-girl.png': 'row3',
      'images/char-pink-girl.png': 'row4',
      'images/char-princess-girl.png': 'row5'
    };

    globalCache.herosToOptionsMap = {
      'images/char-boy.png': 'option1',
      'images/char-cat-girl.png':  'option2',
      'images/char-horn-girl.png': 'option3',
      'images/char-pink-girl.png': 'option4',
      'images/char-princess-girl.png': 'option5'
    };
  }


  setUpButtons();
  $(document).ready(function(){
    setupHerosLists();
    handleButtonEvents();
    makeHeroOptions();
  });

}
