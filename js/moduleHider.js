//Don't worry too much about this file. It just hides each successive 'module' until we're ready to view it.
var modules = [].slice.call($('.testDiv'));
var curMod = 0;
/*Why the above? $('.testDiv') returns something called an "HTMLCollection",
which is LIKE an array, but NOT an array. Specifically, it does not have
specific array methods like 'forEach', which will be really helpful here. So, we convert it!
*/
if (!document.addEventListener) {
    //versions of IE prior to IE9 do not have the addeventlistener event. So we can easily use it as a 'check' to see if our user is not a dinosaur.
    //Also, [].slice.call(HTMLCollection) won't work in IE<9
    alert("...Why are you using such an old version of Internet Explorer? Honestly. Upgrades won't bite you.")
}
modules.forEach(function(mod) {
    //set up everything initially
    $(mod).hide();
})
$(modules[curMod]).show();
var chMod = function(dir) {
    //open the next mod
    // modules.forEach(function(mod) {
    //     $(mod).hide();
    // })
    $(modules[curMod]).hide(200);
    if (dir) {
        curMod++;
        if (curMod >= modules.length) curMod = 0;
    } else {
    	curMod--;
    	if (curMod<0) curMod = modules.length-1;
    }
    $(modules[curMod]).show(200);
    $('#modNum').html((curMod + 1) + '/5')
}
