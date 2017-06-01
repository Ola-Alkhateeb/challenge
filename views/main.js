
    function uploadFile(file, signedReq, url){
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', signedReq);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            document.getElementById('preview').src = url;
            document.getElementById('pic-url').value = url;
          }
          else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    }
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    function uploadRequest(file){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      console.log(xhr)
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            var res = JSON.parse(xhr.responseText);
            uploadFile(file, res.signedRequest, res.url);
          }
          else{
            alert('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    }

 
     // start upload procedure by asking for a signed request from the app.
    
    function initUpload(){
      var files = document.getElementById('file-input').files;
      var file = files[0];
      if(file == null){
        return alert('No file selected.');
      }
      uploadRequest(file);
    }
