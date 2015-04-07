var StatsContentManager = function(){}

StatsContentManager.prototype.addStats = function(){
  var $statsContainer = document.getElementById('stats');
  function createElem(type, id, className){
    var elem = document.createElement(type);
    elem.id = id;
    elem.className = className;
    return elem;
  }

  function displayStat(id, text, val){
    if (typeof val === 'undefined')
      val = '0';
    var header = createElem('h2', id + '-header', 'stat-header');
    $statsContainer.appendChild(header);
    $('#' + id + '-header').text(text);
    var value = createElem('p', id + '-value', 'stat-value');
    $statsContainer.appendChild(value);
    $('#' + id + '-value').text(val);

    var innerHTML = $statsContainer.innerHTML;
    $statsContainer.innerHTML = innerHTML + '<hr>';
  }

  innerHTML = $statsContainer.innerHTML;
  $statsContainer.innerHTML = innerHTML + '<hr>';

  // number of tries
  displayStat('score', 'Score');

  // number of tries
  displayStat('tries', 'Attempts');

  //number of sucess
  displayStat('success', 'Success');

  //play time
  displayStat('time', 'Play Time', '00:00:00');
}

StatsContentManager.prototype.updateScore = function(){
  $('#score-value').text(player.score);
}

StatsContentManager.prototype.updateNumberOfAttempts = function(){
  $('#tries-value').text(player.numberOfAttempts);
}

StatsContentManager.prototype.updateSuccess = function(){
  $('#success-value').text(player.numberOfSuccess);
}

StatsContentManager.prototype.updateElapsedTime = function(){
  $('#time-value').text(player.elapsedTime);
}

var ScoreCalculator = function(){}

ScoreCalculator.prototype.getPoints = function(position){
  var possibleScores = {};
  var score = 100;
  $.each(playerPositions, function(key, val){
    possibleScores[key] = score;
    score -= 25;
  });
  return possibleScores[position];
}


var statsContentManager = new StatsContentManager();

function setupStatsContent(){
  statsContentManager.addStats();
}

$(document).ready(function(){
  setupStatsContent();
});
