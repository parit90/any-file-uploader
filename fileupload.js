var http=require('http');
var querystring=require('querystring');

//necessary condition, server always running on some specific port 
//var server = http.createServer(app);



var func1 = function(request,response){    
      request.setEncoding('binary'); 
      
var body = ''
request.on('data', function(data) { 
    body += data
});

request.on('end', function() {      


    var note = querystring.parse(body, '\r\n', ':')  
    var fetchContentType = note['Content-Type'].split('/')
     
   if(note['Content-Type'].indexOf(fetchContentType[0])!=-1)
    {   
        
        var fileInfo = note['Content-Disposition'].split('; '); 
        for (value in fileInfo){
        	
            if (fileInfo[value].indexOf("filename=") != -1){
                fileName = fileInfo[value].substring(10, fileInfo[value].length-1); 
            }   
    }

                    
        var fullData = body.toString();          
        
        contentType = note['Content-Type'].trim(); 

        var upperBoundary = fullData.indexOf(contentType) + contentType.length; 
       
        var modifiedData = fullData.substring(upperBoundary); 
             
        var lastBinaryData = modifiedData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
             
 	//specify the path to folder where we want to save our file.       
        fs.writeFile('./images/' + fileName  , lastBinaryData, 'binary', function(err)
        {
             response.end();
        });
    }
    else
        respond(404, "Please input an image", response); 
})

    
}


//insert the funtion name as middleware
