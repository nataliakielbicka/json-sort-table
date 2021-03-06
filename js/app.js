(function() {
    "use strict";

    var sortByPropertyAz = function(prop) {
        return function(x, y) {
            return ((x[prop].toLowerCase() === y[prop].toLowerCase()) ? 0 : ((x[prop].toLowerCase() > y[prop].toLowerCase()) ? 1 : -1));
        };
    };

    var sortByPropertyZa = function(prop) {
        return function(x, y) {
            return ((x[prop].toLowerCase() === y[prop].toLowerCase()) ? 0 : ((x[prop].toLowerCase() < y[prop].toLowerCase()) ? 1 : -1));
        };
    };

    var sortByNumberAsc = function(prop) {
        return function(x, y) {
            return ((x[prop] === y[prop]) ? 0 : ((x[prop] > y[prop]) ? 1 : -1));
        };
    };

    var sortByNumberDsc = function(prop) {
        return function(x, y) {
            return ((x[prop] === y[prop]) ? 0 : ((x[prop] < y[prop]) ? 1 : -1));
        };
    };

    function addZeroBefore(v) {
        return +v < 10 ? "0" + (+v) : +v;
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText),
                tbody = document.getElementById("tbody"),
                name = document.getElementById("name"),
                surname = document.getElementById("surname"),
                birthdate = document.getElementById("birthday"),
                position = document.getElementById("position"),
                experience = document.getElementById("experience"),
                result = "",
                sort = false,
                today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth() + 1, //January is 0!
                yyyy = today.getFullYear(),
                hour = today.getHours(),
                minutes = today.getMinutes(),
                today2 = addZeroBefore(dd) + '.' + addZeroBefore(mm) + '.' + yyyy,
                t = addZeroBefore(hour) + ":" + addZeroBefore(minutes);
            //time = today2 + ' ' + t;
            //console.log(time)

            // var a = [data.table[0].birthdate.split(' ')[0], data.table[1].birthdate.split(' ')[0], today]
            // console.log(a.sort())

            var insertTableElem = function() {
                for (var x in data.table) {
                    if (data.table.hasOwnProperty(x)) {
                        result += "<tr>";
                        result += "<td>" + data.table[x].name + "</td>";
                        result += "<td>" + data.table[x].surname + "</td>";
                        result += "<td>" + data.table[x].birthdate + "</td>";
                        result += "<td>" + data.table[x].position + "</td>";
                        result += "<td>" + data.table[x].experience + "</td>";
                        result += "</tr>";
                        tbody.innerHTML = result;
                        //console.log(data.table[x].birthdate.split(' ')[0]);
                    }
                }
            };
            // var sortByDateAsc = function(a, b) {
            //     var dateA = new Date(a.date).getTime();
            //     var dateB = new Date(b.date).getTime();
            //     return dateA > dateB ? 1 : -1;
            // };
            // var sortByDateAsc = function(prop) {
            //     return function(x, y) {
            //         return ((x[prop].split(' ')[0] === y[prop].split(' ')[0]) ? 0 : ((x[prop].getTime() > y[prop].getTime()) ? 1 : -1));
            //     };
            // };

            //console.log(sortByDateAsc(birthdate));

            insertTableElem();

            name.addEventListener("click", function() {
                sortBy("name");
                name.classList.toggle("sort");
            }, false);

            surname.addEventListener("click", function() {
                sortBy("surname");
                surname.classList.toggle("sort");
            }, false);

            birthdate.addEventListener("click", function() {
                for (var x in data.table) {
                    if (data.table.hasOwnProperty(x)) {
                        //console.log(data.table[x].birthdate.split(' ')[0]);
                        sortByDateAsc(data.table[x].birthdate.split(' ')[0]);
                    }
                }

                birthdate.classList.toggle("sort");
            }, false);

            position.addEventListener("click", function() {
                sortBy("position");
                position.classList.toggle("sort");
            }, false);

            experience.addEventListener("click", function() {
                sortByNumberValue("experience");
                experience.classList.toggle("sort");
            }, false);

            var sortBy = function(value) {
                result = "";
                sort = !sort;

                if (sort === true) {
                    //sort from A to Z
                    data.table.sort(sortByPropertyAz(value));
                    insertTableElem();
                } else {
                    //sort from Z to A
                    data.table.sort(sortByPropertyZa(value));
                    insertTableElem();
                }
            };

            var sortByNumberValue = function(value) {
                result = "";
                sort = !sort;

                if (sort === true) {
                    //sort numbers ASC
                    data.table.sort(sortByNumberAsc(value));
                    insertTableElem();
                } else {
                    //sort numbers DSC
                    data.table.sort(sortByNumberDsc(value));
                    insertTableElem();
                }
            };
        }
    };
    //xmlhttp.open("GET", "https://api.myjson.com/bins/fvf9l", true);
    xmlhttp.open("GET", "https://api.myjson.com/bins/trx0h", true);
    xmlhttp.send();

})();