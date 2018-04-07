
function college(param){
    event.preventDefault()
    var corsProxy = "https://cors-anywhere.herokuapp.com/";
    var apiUrl = "https://api.yelp.com/v3/businesses/search?term="+"university"+"&location=" + "Los Angeles"
    var url = corsProxy + apiUrl;
$.ajax({
    url: url,
    type: 'GET',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'bearer F1OM2kFNZkqs4niwnlVnOH-yiiR8oIiy4zv5uj9qW5PesB9PQTCt4RSSh9g3TyS7CzHMGrnz-1p7WCqPowHlkawoFr29PRlN4ZyYZ_8kMedEZmf4xXintU_T5TC1WnYx')    
    }
      }).then(function(data) {
         var yelpContainer = $('#yelpContainer')
         var results = data.businesses;
         var p = $("<p>");
         p.text("Colleges & Universities");
         yelpContainer.append(p);
         console.log(results)
        //for(var i=0; i < 5; i++) {
            //var list = $("<img>");
            //list.addClass("img-fluid");
            //list.addClass("rounded");
            //var info = $("<p>");
            //var address = $("<p>");
            //var add = results[i].location.address1+", "+results[i].location.city+", "+results[i].location.state+", "+results[i].location.zip_code;   
            //list.attr("src", results[i].image_url)
            //var name = results[i].name;
            //info.text(name);
            //address.text(add);
            //yelpContainer.append(list)
            //yelpContainer.append(info)
            //yelpContainer.append(address)
        //}       
    })

    

}