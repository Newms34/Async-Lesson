var uriFront = 'https://query.yahooapis.com/v1/public/yql?q=';
var uriBack = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
var multiCities = ['Philadelphia,PA', 'Phoenix, AZ', 'Norilsk', 'New Delhi', 'London,UK'];
var oneCity = 'philadelphia, PA';

var weathSync = function() {
  $('#reportStat').html('Working!');
    //attempting to run http request synchronously
    var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + oneCity + '")';
    var fullUri = uriFront + encodeURIComponent(query) + uriBack;
    var weather;
    $.get(fullUri, function(res) {
        weather = res.query.results.channel.location.city + ': ' + res.query.results.channel.item.forecast[0].high + 'F ' + res.query.results.channel.item.forecast[0].text;
    });
    $('#reportBlok').html(weather ? weather : 'undefined');
    $('#reportType').html('Single Synchronous Request');
    $('#reportBlok').css('background', $('#reportBlok').html() == 'undefined' ? '#fcc' : '#cfc');
    $('#reportStat').html('Done');
}

var weathMultiSync = function() {
  $('#reportStat').html('Working!');
    //attempting to run multiple http requests synchronously
    var weathers = []; //here's where our weathers will go.
    for (var i = 0; i < multiCities.length; i++) {
        var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + multiCities[i] + '")';
        var fullUri = uriFront + encodeURIComponent(query) + uriBack;
        $.get(fullUri, function(res) {
            weathers.push(res.query.results.channel.location.city + ': ' + res.query.results.channel.item.forecast[0].high + 'F ' + res.query.results.channel.item.forecast[0].text);
        });
    }
    console.log(weathers)
    var theTable = '<table><thead><tr><th>City Num</th><th>City Info</th></tr></thead><tbody>';
    for (var n = 0; n < weathers.length; n++) {
        theTable += '<tr><td>'+n+'</td><td>' + weathers[n] + '</td></tr>';
    }
    theTable += '</tbody></table>'
    $('#reportBlok').html(weathers.length ? theTable : 'undefined')
    $('#reportType').html('Multiple Synchronous Requests')
    $('#reportBlok').css('background', $('#reportBlok').html() == 'undefined' ? '#fcc' : '#cfc');
    $('#reportStat').html('Done');
}

var weathAsync = function() {
  $('#reportStat').html('Working!');
    //attempting to run http request asynchronously
    var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + oneCity + '")';
    var fullUri = uriFront + encodeURIComponent(query) + uriBack;
    var weather;
    $.get(fullUri, function(res) {
        weather = res.query.results.channel.location.city + ': ' + res.query.results.channel.item.forecast[0].high + 'F ' + res.query.results.channel.item.forecast[0].text;
        $('#reportBlok').html(weather ? weather : 'undefined');
        $('#reportType').html('Single Asynchronous Request');
        $('#reportBlok').css('background', $('#reportBlok').html() == 'undefined' ? '#fcc' : '#cfc');
        $('#reportStat').html('Done');
    });
}
var weathMultiAsyncCb = function() {
    $('#reportStat').html('Working!');
    //attempting to run multiple http request asynchronously, with Callbacks
    var weathers = []; //here's where our weathers will go.
    $.get(uriFront + encodeURIComponent('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + multiCities[0] + '")') + uriBack, function(res) {
        weathers.push(res.query.results.channel.location.city + ': ' + res.query.results.channel.item.forecast[0].high + 'F ' + res.query.results.channel.item.forecast[0].text);
        $.get(uriFront + encodeURIComponent('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + multiCities[1] + '")') + uriBack, function(res) {
            weathers.push(res.query.results.channel.location.city + ': ' + res.query.results.channel.item.forecast[0].high + 'F ' + res.query.results.channel.item.forecast[0].text);
            $.get(uriFront + encodeURIComponent('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + multiCities[2] + '")') + uriBack, function(res) {
                weathers.push(res.query.results.channel.location.city + ': ' + res.query.results.channel.item.forecast[0].high + 'F ' + res.query.results.channel.item.forecast[0].text);
                $.get(uriFront + encodeURIComponent('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + multiCities[3] + '")') + uriBack, function(res) {
                    weathers.push(res.query.results.channel.location.city + ': ' + res.query.results.channel.item.forecast[0].high + 'F ' + res.query.results.channel.item.forecast[0].text);
                    $.get(uriFront + encodeURIComponent('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + multiCities[4] + '")') + uriBack, function(res) {
                        weathers.push(res.query.results.channel.location.city + ': ' + res.query.results.channel.item.forecast[0].high + 'F ' + res.query.results.channel.item.forecast[0].text);
                        var theTable = '<table><thead><tr><th>City Num</th><th>City Info</th></tr></thead><tbody>';
                        for (var n = 0; n < weathers.length; n++) {
                            theTable += '<tr><td>'+n+'</td><td>' + weathers[n] + '</td></tr>';
                        }
                        theTable += '</tbody></table>'
                        $('#reportBlok').html(weathers.length ? theTable : 'undefined');
                        if (weathers.length) {
                            $('#reportBlok').append('<br/>This works, but man is it ugly! And what if we had an UNKNOWN number of requests?')
                        }
                        $('#reportType').html('Multiple Asynchronous Requests, with Callbacks')
                        $('#reportBlok').css('background', $('#reportBlok').html() == 'undefined' ? '#fcc' : '#cfc');
                        $('#reportStat').html('Done');
                    })
                })
            })
        })
    })
}

var weathMultiAsyncPromQ = function() {
  $('#reportStat').html('Working!');
    var theCities = ['Philadelphia,PA', 'Phoenix, AZ', 'Norilsk', 'New Delhi', 'London,UK'];
    var cityToAdd ='blank'; 

    while(cityToAdd && cityToAdd!='' && cityToAdd!=null){
      cityToAdd = prompt('Feel like adding another city? Type it here! Or press Cancel to finish!');
      if(cityToAdd && cityToAdd!='' && cityToAdd!=null) theCities.push(cityToAdd);
    }
    var weathers = [];
    var weatherProms = [];
    for (var i = 0; i < theCities.length; i++) {
        var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + theCities[i] + '")';
        var fullUri = uriFront + encodeURIComponent(query) + uriBack;
        weatherProms.push($.get(fullUri));
    }
    weatherProms.push($.get('http://jsonplaceholder.typicode.com/err'));//let's stick in an invalid request too (one that 404's).
    Q.allSettled(weatherProms).then(function(res) {
        for (var m = 0; m < res.length; m++) {
          if (res[m].state=='fulfilled'){
            weathers.push(res[m].value.query.results.channel.location.city + ': ' + res[m].value.query.results.channel.item.forecast[0].high + 'F ' + res[m].value.query.results.channel.item.forecast[0].text);
          }else{
            console.log(res[m],'rej')
            weathers.push('One of the cities couldn\'t be loaded! This is could be an issue with the API.');
          }
        }
        var theTable = '<table><thead><tr><th>City Num</th><th>City Info</th></tr></thead><tbody>';
        for (var n = 0; n < weathers.length; n++) {
            theTable += '<tr><td>'+n+'</td><td>' + weathers[n] + '</td></tr>';
        }
        theTable += '</tbody></table>'
        $('#reportBlok').html(weathers.length ? theTable : 'undefined');
        if (weathers.length) {
            $('#reportBlok').append('<br/>Nice and compact!')
        }
        $('#reportType').html('Multiple Asynchronous Requests, with Callbacks')
        $('#reportBlok').css('background', $('#reportBlok').html() == 'undefined' ? '#fcc' : '#cfc');
        $('#reportStat').html('Done');
    })
}
