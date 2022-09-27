$(document).ready(function() {
  // Google analytics, if accepted
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  // Register
  ga('create', 'UA-39887626-13', 'soartex.net');
  ga('require', 'linkid', 'linkid.js');
  ga('require', 'displayfeatures');
  // Send default pageview
  ga('send', 'pageview');

  // Outbound Link Tracking with Google Analytics
  $(function() {
    $("a").on('click',function(e){
      var url = $(this).attr("href"), newtab = false;
      // If not current domain send event
      if (url != undefined && e.currentTarget.host != window.location.host) {
        // Current target host
        var url_host=e.currentTarget.host.replace(':80','');
        // Send Event
        ga('send', 'event', 'outbound_link', url_host, url)
        // Set var if new tab
        if (e.metaKey || e.ctrlKey || e.which === 2) {
          newtab = true;
        }
        if ($(this).attr('target') == '_blank') {
          newtab = true;
        }
        // Send window to new location
        if (!newtab) {
          e.preventDefault();
          setTimeout('document.location = "' + url + '"', 100);
        }
      }
    });
  });
  
  // Display message if we have not yet
  if(readCookie("cc_accept")!="cc_accepted") {
    $("#cookie-policy").fadeIn("slow");
  }

  // On button click, remove the cookie message
  $("#cookie-policy-dismiss").click(function(){
    $("#cookie-policy").fadeOut("slow");
    createCookie("cc_accept", "cc_accepted", 30);
  });
});

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  } else {
    var expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i= 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}