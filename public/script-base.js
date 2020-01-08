var fetchEle = function(idee){
    return document.getElementById(idee);
}

function makeAjaxPost(url, data, callback){
    var datastring = "";
    for(var key in data){
        datastring = datastring + key + '=' + data[key] + '&';
    }
    datastring = datastring.substring(0, datastring.length-1);  
    var xreq = new XMLHttpRequest();
    xreq.open('POST', url, true);
    xreq.onreadystatechange = callback();
    xreq.send(datastring);
}