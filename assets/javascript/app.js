var firebaseConfig = {
    apiKey: "AIzaSyAT_8_1mDZvzpYcLxL5-ERgK_oLXySwI3w",
    authDomain: "first-4c143.firebaseapp.com",
    databaseURL: "https://first-4c143.firebaseio.com",
    projectId: "first-4c143",
    storageBucket: "first-4c143.appspot.com",
    messagingSenderId: "691556534996",
    appId: "1:691556534996:web:580cb86fbf8b8cc0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var database = firebase.database();


var name = "";
var role = "";
var startDate = 0;
var monthsWorked = 0;
var monthlyRate = 0;
var totalBilled = 0;

$("#submit").on("click", function(event) {
    console.log("CLICK");

    event.preventDefault();

    // Get the input values
    name = $("#name").val().trim();
    role = $("#role").val().trim();
    startDate = moment($("#startDate").val()).format("MM/DD/YYYY");

    monthsWorked = $("#monthsWorked").val();
    monthlyRate = $("#monthlyRate").val();
    totalBilled = $("#totalBilled").val();


    // Save the new info in Firebase
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        // monthsWorked: monthsWorked,
        monthlyRate: monthlyRate,
        // totalBilled: totalBilled,
        dateAdedd: firebase.database.ServerValue.TIMESTAMP
    });


});


database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    console.log(snapshot.val());
    //  Change HTML
    $("#printName").append("<div>" + snapshot.val().name + "</div>");
    $("#printRole").append("<div>" + snapshot.val().role + "</div>");
    $("#printStartDate").append("<div>" + snapshot.val().startDate + "</div>");
    // $("#printMonthsWorked").append(snapshot.val().monthsWorked);
    $("#printMonthlyRate").append("<div>" + snapshot.val().monthlyRate + "</div>");
    // $("#printTotalBilled").append(snapshot.val().totalBilled);

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});