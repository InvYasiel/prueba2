
//Variables donde recogemos los elementos del formulario
let nombre = document.getElementById("incidenciasNombre");
let apellido = document.getElementById("incidenciasApellido");
let titulo = document.getElementById("incidenciasTitulo");
let descripcion = document.getElementById("incidenciasDescripcion").value;

// var KEY = "151bcd104f1742fdcf0b8c2f4a4c8764";
// var TOKEN = "ddc55434f6f11fbc1a3379adde4d5f66cd8be4be97d4d90eaca39322af045925";
// var CARD = "5aaf6422caeb39da694e7dc1";
$(function () {

    // Helper function to grab the key, token, and cardId input
    // by the user.
    const getKeyTokenCardId = function () {
        // You can provide defaults here so that you don't have to input new values every reload.
        const key = "151bcd104f1742fdcf0b8c2f4a4c8764" || ''; // the || is OR. If document.getElementById("key") is falsy it will fallback to ''
        const token = "ddc55434f6f11fbc1a3379adde4d5f66cd8be4be97d4d90eaca39322af045925" || '';
        const cardId = "5aaf6422caeb39da694e7dc1" || '';
        return [key, token, cardId];
    }
    // Helper function to build an XMLHttpRequest object that prints to console.log
    // when a response is received.
    const createRequest = function (cardId) {
        var request = new XMLHttpRequest();
        request.responseType = "json";
        request.onreadystatechange = function () {
            // When we have a response back from the server we want to share it!
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
            if (request.readyState === 4) {
                console.log(`Successfully uploaded at: ${request.response.date}`);
            }
        }
        request.open("POST", `https://api.trello.com/1/cards/${cardId}/attachments/`);
        return request;
    }

    const createAndSendForm = function (file) {
        let [key, token, cardId] = getKeyTokenCardId();
        var formData = new FormData();
        formData.append("key", key);
        formData.append("token", token);
        formData.append("file", file);
        formData.append("mimeType", "image/png");
        formData.append("name", "My Awesome File");
        // formData.append("mimeType", "image/png"); // Optionally, set mimeType if needed.
        var request = createRequest(cardId);
        request.send(formData);
    };
    $('form').submit(function (event) {
        event.preventDefault();
        const myFiles = document.getElementById("file").files;
        // If the user hasn't provided a file, we'll go get a default one.
        if (myFiles.length < 1) {
            console.log("You haven't added a file so we're using a default one.");
            var oReq = new XMLHttpRequest();
            oReq.open("GET", "https://invyasiel.github.io/montesano-app/", true);
            oReq.responseType = "blob";
            oReq.onload = function (oEvent) {
                // Once we've successfully received the default image, send it to Trello!
                createAndSendForm(new Blob([oReq.response], { type: "image/gif" }));
            };
            oReq.send();
        } else {
            createAndSendForm(myFiles[0]);
        }
    });

});