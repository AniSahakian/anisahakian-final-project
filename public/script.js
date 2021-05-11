function handlePreferenceCheck() {
    if (document.getElementById("Other").checked) {
        document.getElementById("otherPreference").disabled = false
    } else {
        document.getElementById("otherPreference").disabled = true
    }
}
function handleCollectionCheck() {
    if (document.getElementById("Other1").checked) {
        document.getElementById("othercollection").disabled = false
    } else {
        document.getElementById("othercollection").disabled = true
    }
}


function savePerfumeData(e){
    e.preventDefault();
    console.log( document.querySelector('input[name="Preference"]:checked').value === 'Other' ? document.getElementById("otherPreference").value : null)
    var inputElements = document.getElementsByClassName('attribute1');
    var checkedValues = []
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            if (inputElements[i].value === 'Other') {
                checkedValues.push(document.getElementById("attribute5").value)
            } else {
                checkedValues.push(inputElements[i].value);
            }
        }
    }
    const hobby = {
        name : "Ani",
        lastname: "Sahakyan",
        duration: document.getElementById('duration').value ?? null,
        reason: document.getElementById('reason').value,
        favoriteFragrance: document.getElementById('Favfragrance').value,
        brand: document.getElementById('Brand').value,
        typeOfFragrance: document.querySelector('input[name="type"]:checked').value,
        attributes: checkedValues,
        Preference: document.querySelector('input[name="Preference"]:checked').value === 'Other' ? document.getElementById("otherPreference").value : document.querySelector('input[name="Preference"]:checked').value,
        collection: document.querySelector('input[name="collection"]:checked').value === 'Other' ? document.getElementById("othercollection").value : document.querySelector('input[name="collection"]:checked').value,
        favoritePerfumes: document.getElementById("FavoritePerfumes").value,
        toAddCollection: document.getElementById("Add").value,
        elemId: 2
    }
    $.ajax({
        type: 'POST',
        url:"https://cse120-2021api-anisahak.herokuapp.com/data",
        data: hobby,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");
        }
    });
}


function loadPerfumeEditItem() {
    localStorage = window.localStorage;
    var editItem = JSON.parse(localStorage.getItem("editItem"))[0];
    document.getElementById("itemId").value = editItem._id
    document.getElementById('duration').value = editItem.duration
    document.getElementById('reason').value = editItem.reason
    document.getElementById('Favfragrance').value = editItem.favoriteFragrance
    document.getElementById('Brand').value = editItem.brand
    document.getElementById(editItem.typeOfFragrance).checked = true
    document.getElementById("FavoritePerfumes").value = editItem.favoritePerfumes
    document.getElementById("Add").value = editItem.toAddCollection
}

function updatePerfumeData(e) {
    e.preventDefault();
    var inputElements = document.getElementsByClassName('attribute1');
    var checkedValues = []
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            if (inputElements[i].value === 'Other') {
                checkedValues.push(document.getElementById("attribute5").value)
            } else {
                checkedValues.push(inputElements[i].value);
            }
        }
    }
    const hobby = {
        id: document.getElementById("itemId").value,
        name : "Ani",
        lastname: "Sahakyan",
        duration: document.getElementById('duration').value ?? null,
        reason: document.getElementById('reason').value,
        favoriteFragrance: document.getElementById('Favfragrance').value,
        brand: document.getElementById('Brand').value,
        typeOfFragrance: document.querySelector('input[name="type"]:checked').value,
        attributes: checkedValues,
        Preference: document.querySelector('input[name="Preference"]:checked').value === 'Other' ? document.getElementById("otherPreference").value : document.querySelector('input[name="Preference"]:checked').value,
        collection: document.querySelector('input[name="collection"]:checked').value === 'Other' ? document.getElementById("othercollection").value : document.querySelector('input[name="collection"]:checked').value,
        favoritePerfumes: document.getElementById("FavoritePerfumes").value,
        toAddCollection: document.getElementById("Add").value,
        elemId: 2
    }
    $.ajax({
        type: 'POST',
        url:"https://cse120-2021api-anisahak.herokuapp.com/data/update",
        data: hobby,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");
        }
    });
}



function toggleBookData() {
    var bookData = document.getElementById("bookDataContainer");
    if (bookData.style.display == "block") {
        bookData.style.display = "none";
    } else {
        bookData.style.display = "block";
    }
}

function togglePerfumeData() {
    var bookData = document.getElementById("perfumeDataContainer");
    if (bookData.style.display == "block") {
        bookData.style.display = "none";
    } else {
        bookData.style.display = "block";
    }
}

function loadExistingData() {
    var existingData = [];
    $.ajax({
        type : "GET",
        url : "https://cse120-2021api-anisahak.herokuapp.com/data",
        dataType : "json",
        success : function(data) {
            console.log("success", data);
            existingData = data;
            perfumeData = [];
            bookData = [];
            existingData.data.forEach(el => {
                if(el['elemId'] === "1"){
                    bookData.push(el);
                }else if(el['elemId'] === "2"){
                    perfumeData.push(el);
                }
            });
            displayDataPerfume(perfumeData);
            displayDataBook(bookData);
        },
        error : function(data) {
            console.log("Error")
        }
    })
}
function displayDataPerfume(data) {
    document.getElementById("perfumeDataContainer").innerHTML = "";
    data.forEach(elem => {
        var item = document.createElement("div");
        item.id = "div" + elem["_id"];
        item.className = "item";
        if (Object.keys(elem).length == 1) {
            var span = document.createElement("span");
            span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
            item.appendChild(span);
        }
        Object.keys(elem).forEach(key => {
            if (key != "_id") {
                var span = document.createElement("span");
                var b = document.createElement("b");
                b.innerHTML = key + ": ";
                span.appendChild(b);
                span.className = "item";
                if (elem[key]) {
                    span.innerHTML += elem[key];
                } else {
                    var span1 = document.createElement("span");
                    span1.className = "undefined";
                    span1.innerHTML = "N/A";
                    span.appendChild(span1)
                }
                item.appendChild(span);
                var br = document.createElement("br");
                item.appendChild(br);
            }
        })
        var buttonDelete = document.createElement("button");
        buttonDelete.innerHTML = "Delete";
        buttonDelete.id = elem["_id"];
        buttonDelete.addEventListener("click", function(e){
            deleteData(e.target.id);
        }, false);
        var buttonEdit = document.createElement("button");
        buttonEdit.innerHTML = "Edit";
        buttonEdit.id = elem["_id"];
        buttonEdit.addEventListener("click", function(e){
            editPerfumeData(e.target.id);
        }, false);
        item.appendChild(buttonEdit);
        item.appendChild(buttonDelete);
        document.getElementById("perfumeDataContainer").appendChild(item);
    })
}
function displayDataBook(data) {
    document.getElementById("bookDataContainer").innerHTML = "";
    data.forEach(elem => {
        var item = document.createElement("div");
        item.id = "div" + elem["_id"];
        item.className = "item";
        if (Object.keys(elem).length == 1) {
            var span = document.createElement("span");
            span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
            item.appendChild(span);
        }
        Object.keys(elem).forEach(key => {
            if (key != "_id") {
                var span = document.createElement("span");
                var b = document.createElement("b");
                b.innerHTML = key + ": ";
                span.appendChild(b);
                span.className = "item";
                if (elem[key]) {
                    span.innerHTML += elem[key];
                } else {
                    var span1 = document.createElement("span");
                    span1.className = "undefined";
                    span1.innerHTML = "N/A";
                    span.appendChild(span1)
                }
                item.appendChild(span);
                var br = document.createElement("br");
                item.appendChild(br);
            }
        })
        var buttonDelete = document.createElement("button");
        buttonDelete.innerHTML = "Delete";
        buttonDelete.id = elem["_id"];
        buttonDelete.addEventListener("click", function(e){
            deleteData(e.target.id);
        }, false);
        var buttonEdit = document.createElement("button");
        buttonEdit.innerHTML = "Edit";
        buttonEdit.id = elem["_id"];
        buttonEdit.addEventListener("click", function(e){
            editBookData(e.target.id);
        }, false);
        item.appendChild(buttonEdit);
        item.appendChild(buttonDelete);
        document.getElementById("bookDataContainer").appendChild(item);
    })
}

function editPerfumeData(id) {
    var item = perfumeData.filter(obj => {
        return obj._id === id
    })
    localStorage.setItem('editItem', JSON.stringify(item))
    window.location.href = 'edit_perfume.html'
}

function editBookData(id) {
    var item = bookData.filter(obj => {
        return obj._id === id
    })
    localStorage.setItem('editItem', JSON.stringify(item))
    window.location.href = 'edit_book.html'
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
