

//var QUERY = '139298';
//var TH = '2';


var saltGenerator = {

 // searchOnSALT_: 'http://vm-salt.mimas.ac.uk/getSuggestions.api?' +
 //     'workID=' + QUERY + '&' +
 //     'threshold=' + TH,


  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestSALT: function(QUERY) {
	
	var TH = '4';
 	var searchOnSALT =  'http://vm-salt.mimas.ac.uk/getSuggestions.api?' +
      'workID=' + QUERY + '&' +
      'threshold=' + TH;	
      
      
    var req = new XMLHttpRequest();
   // req.open("GET", this.searchOnSALT_, true);
   //console.log(req);
    req.open("GET", searchOnSALT, true);
    req.onload = this.showRecomendations_.bind(this);
    req.send(null);
  },
  
    /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showRecomendations_: function (e) {
    var recom = e.target.responseXML.querySelectorAll('Item');
    var ulis = document.createElement('ul');
    ulis.setAttribute('id', 'mylist');
    document.body.appendChild(ulis);

    for (var i = 0; i < recom.length; i++) {
    //var lolo = recom[i];
    //console.log(recom[i].childNodes[5].textContent);
    
      var lis = document.createElement('li');
      var link = document.createElement('a');
      link.textContent = recom[i].childNodes[3].textContent;
      
      link.href = this.constructSaltURL_(recom[i].childNodes[5].textContent); 
      link.target= "_blank";
      document.body.children.mylist.appendChild(lis).appendChild(link);
    }
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlKittenl
   *
   * @param {DOMElement} A kitten.
   * @return {string} The kitten's URL.
   * @private
   */
  constructSaltURL_: function (recom) {
    return "http://catalogue.library.manchester.ac.uk/items/"+recom;
  } 
  
  
  
  
};  
  

  
 // Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {

chrome.tabs.getSelected(null, function(tab) {

	var splitter = tab.url.split("/");
	var splitter2 = splitter[4].split("?");
	
    saltGenerator.requestSALT(splitter2[0]);
});
  
}); 
  
