var myBook = {
    "project" : "Book",
    "owner" : "Ani Sahakyan",
    "fullname" : "",
    "title" : "",
    "author" : "",
    "color" : "",
    "covertype" : "",
    "otherCoverValue" : "",
    "numofpages" : "",
    "price" : "",
    "currency" : "",
    "language" : "",
    "otherLanguageValue" : "",
    "origLanguage" : "",
    "otherOrigLangauageValue" : "",
    "dimensions" : "",
    "publisher" : "",
    "publishingdate" : "",
    "origpublishingdate" : "",
    "genre" : "",
    "age" : "",
    "edition" : "",
    "elemId": "1"
}


function handleFullnameChange() {
    myBook.fullname = document.getElementById("fullname").value;
}


function handleTitleChange() {
    myBook.title = document.getElementById("title").value;
}

function handleAuthorChange() {
    myBook.author = document.getElementById("author").value;
}

function handleColorChange() {
    myBook.color = document.getElementById("color").value;
}

function handleCoverTypeChange(e){
    myBook.covertype=e.target.value;
    if (myBook.covertype != "other") {
        myBook.otherCoverValue = "";
        document.getElementById("otherCoverValue").style.display = "none";
    }
    else{
        document.getElementById("otherCoverValue").style.display = "block";
    }
}

function handleCoverMaterialchange() {
    if (myBook.covertype == "other") {
        document.getElementById("otherCoverValue").style.display="block";
        myBook.otherCoverValue = document.getElementById("otherCoverValue").value;
    }
}

function handleNumofPagesChange() {
    myBook.numofpages = document.getElementById("numofpages").value;
}

function handlePriceChange() {
    myBook.price = document.getElementById("price").value;
}

function handleCurrencyChange() {
    myBook.currency = document.getElementById("currency").value;
}

function handleLanguageChange(e) {
    myBook.language = e.target.value;
    if(myBook.language!="otherlang"){
        myBook.otherLanguageValue = "";
        document.getElementById("otherLanguageValue").style.display = "none";
    }
    else{
        document.getElementById("otherLanguageValue").style.display = "block";
    }
}

function handleOtherLanguageChange(){
    if(myBook.language == "otherlang"){
        document.getElementById("otherLanguageValue").style.display = "block";
        myBook.otherLanguageValue = document.getElementById("otherLanguageValue").value;

    }
}

function handleOrigLanguageChange(e) {
    myBook.origLanguage = e.target.value;
    if(myBook.origLanguage!="otheroriglang"){
        myBook.otherOrigLangauageValue = "";
        document.getElementById("otherOrigLanguageValue").style.display = "none";
    }
    else{
        document.getElementById("otherOrigLanguageValue").style.display = "block";
    }
}

function handleOtherOrigLanguageChange(){
    if(myBook.origLanguage == "otheroriglang"){
        document.getElementById("otherOrigLanguageValue").style.display = "block";
        myBook.otherOrigLangauageValue = document.getElementById("otherOrigLanguageValue").value;
    }
}

function handleDimensionsChange() {
    myBook.dimensions = document.getElementById("dimensions").value;
}

function handlePublisherChange() {
    myBook.publisher = document.getElementById("publisher").value;
}

function handlePublishingDateChange() {
    myBook.publishingdate = document.getElementById("date").value;
}

function handleOrigPublishingDateChange() {
    myBook.origpublishingdate = document.getElementById("origdate").value;
}

function handleGenreChange() {
    myBook.genre = document.getElementById("genre").value;
}

function handleAgeChange() {
    myBook.age = document.getElementById("age").value;
}

function handleEditionChnage() {
    myBook.edition = document.getElementById("edition").value;
}


function saveData(e) {
    e.preventDefault();

    console.log(myBook);

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021api-anisahak.herokuapp.com/data",
        data: myBook,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            window.location.href = '../home.html';
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");
        }
    });

}


function updateData(e) {
    e.preventDefault();
    myBook.id = document.getElementById("_idBook").value;
    console.log(myBook);

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021api-anisahak.herokuapp.com/data/update",
        data: myBook,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            window.location.href = '../home.html';
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");
        }
    });

}


function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == true) {

    } else {
        return;
    }

    var tmp = {
        "id": id
    }

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021api-anisahak.herokuapp.com/data/delete",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            document.getElementById("div" + id).style.display = "none";
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");
        }
    });
}

function loadBookEditItem() {
    localStorage = window.localStorage;
    var editItem = JSON.parse(localStorage.getItem("editItem"))[0];
    document.getElementById("_idBook").value = editItem._id
}






