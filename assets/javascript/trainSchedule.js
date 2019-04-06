var config = {
  apiKey: "AIzaSyDlGNI21DAL0OGGgpVtNH16MPHL9kqDnS0",
  authDomain: "trainschedule-5a4a0.firebaseapp.com",
  databaseURL: "https://trainschedule-5a4a0.firebaseio.com",
  projectId: "trainschedule-5a4a0",
  storageBucket: "trainschedule-5a4a0.appspot.com",
  messagingSenderId: "272646873661"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on("click", function(){
  event.preventDefault();
  var tableRows = $("<tr>").addClass("train-schedule-rows");
  var trainName = $("#train-name").val();

  tableRows.append($("<td>").text(trainName));

  var trainDestination = $("#destination").val();
  tableRows.append($("<td>").text(trainDestination));

  var firstTrainTime = $("#first-train-time").val();
  var trainFrequency = $("#frequency-min").val();
  tableRows.append($("<td>").text(trainFrequency));

  var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

  var currentTime = moment();

  var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");

  var tRemainder = diffTime % trainFrequency;

  var tMinutesTillTrain = trainFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  tableRows.append($("<td>").text(moment(nextTrain).format("LT")));


  tableRows.append($("<td>").text(tMinutesTillTrain));
  tableRows.append($("<button>").addClass("btn btn-danger delete-button"));



  $("#train-table").append(tableRows);

  database.ref().set({
    trainSchedule: $("#train-table").html()
  });

  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train-time").val("");
  $("#frequency-min").val("");

});

database.ref().on("value", function(snapshot){
  $("#train-table").html(snapshot.val().trainSchedule);
});

$(document).on("click", ".train-schedule-rows", function(){
  $(this).remove();

  database.ref().set({
    trainSchedule: $("#train-table").html()
  })
});
