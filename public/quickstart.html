<html>
<head>
  <meta charset="utf-8">
</head>
<body>
<script type="text/javascript">
    var CLIENT_ID = '60993246658.apps.googleusercontent.com';
    var SCOPES = 'https://www.googleapis.com/auth/drive';

    /**
     * Called when the client library is loaded to start the auth flow.
     */
    function handleClientLoad() {
        window.setTimeout(checkAuth, 1);
    }

    /**
     * Check if the current user has authorized the application.
     */
    function checkAuth() {
        gapi.auth.authorize({
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': true
        },
        handleAuthResult);
    }

    /**
     * Called when authorization server replies.
     *
     * @param {Object} authResult Authorization result.
     */
    function handleAuthResult(authResult) {
        var authButton = document.getElementById('authorizeButton');
        var main = document.getElementById('main');
        authButton.style.display = 'none';
        main.style.display = 'none';
        if(authResult && !authResult.error) {
            // Access token has been successfully retrieved, requests can be sent to the API.
            main.style.display = 'block';
            var btn = document.getElementById('saveBtn');
            btn.onclick = writeFile;
            //main.onchange = uploadFile;
        } else {
            // No access token could be retrieved, show the button to start the authorization flow.
            authButton.style.display = 'block';
            authButton.onclick = function () {
                gapi.auth.authorize({
                    'client_id': CLIENT_ID,
                    'scope': SCOPES,
                    'immediate': false
                },
                handleAuthResult);
            };
        }
    }

    /**
     * Start the file upload.
     *
     * @param {Object} evt Arguments from the file selector.
     */
    function writeFile(evt) {
        gapi.client.load('drive', 'v2', function () {
            //var file = evt.target.files[0];
            var fileName = document.getElementById("fileName").value;
            var content = document.getElementById("content").value;
            console.log("fileName = "+fileName);
            console.log("content = "+content);
            insertFile(fileName,content);
        });
    }

    /**
     * Insert new file.
     *
     * @param {fileName} 保存するファイル名
     * @param {content} 保存するファイルの内容
     * @param {Function} callback Function to call when the request is complete.
     */
    function insertFile(fileName,content, callback) {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var contentType = 'text/plain';
        var metadata = {
                'title': fileName,
                'mimeType': contentType
        };

        var base64Data = utf8_to_b64(content);
        var multipartRequestBody = delimiter +
                'Content-Type: application/json\r\n\r\n' + JSON.stringify(metadata) + delimiter +
                'Content-Type: ' + contentType + '\r\n' +
                'Content-Transfer-Encoding: base64\r\n' +
                '\r\n' + base64Data + close_delim;

        var request = gapi.client.request({
                'path': '/upload/drive/v2/files',
                'method': 'POST',
                'params': {
                    'uploadType': 'multipart'
                 },
                'headers': {
                    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
                },
                'body': multipartRequestBody
        });
        if(!callback) {
          callback = function (file) {
              alert("保存しました。");
              console.log(file)
          };
        }
        request.execute(callback);

    }

    // from http://ecmanaut.blogspot.jp/2006/07/encoding-decoding-utf8-in-javascript.html
    function utf8_to_b64(str) {
  return window.btoa( unescape(encodeURIComponent( str )) );
}

</script>
<script type="text/javascript" src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>
<!--Add a file picker for the user to start the upload process -->
<div id="main" style="display: none">
<p>
<label>ファイル名</label>
<input type="text" id="fileName">
</p>
<p>
<label>内容</label>
<textarea id="content" cols="50" rows="5"></textarea>
</p>
<p>
    <button id="saveBtn">
        保存
    </button>
</p>
<input type="button" id="authorizeButton" style="display: none" value="Authorize" />
</div>
</body>
</html>