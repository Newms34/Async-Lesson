var lis = [].slice.call($('ol li'));
lis.push($('.confooz'))
lis.forEach(function(el) {
    $(el).hide()
    $(el).css({
        'background': '#000',
        'transition-duration': '1s'
    })
})
$(lis[0]).show();
$(lis[0]).css('background', 'none')
var numShown = 1;
window.onmouseup = function(e) {
    if (lis[numShown]) {
        $(lis[numShown]).show(200);
        $(lis[numShown]).css('background','none')
        numShown++;
        $(window).scrollTop($(window).height());
    } else {

    }
}
