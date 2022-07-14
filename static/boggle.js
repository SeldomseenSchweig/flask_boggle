let score = 0;
let guesses = [];
let time = 1





async function sendWordToServer(input) {
    // Sends word to server to check if it's on the board and in the text

    const response = await axios.get("/check-word", { params: { word: input }});    
    wordLength = input.length;
    let data = response.data.result;
    if (alreadyGuessed(input) ) {
        $('#message').text(' has already been guessed.');
    } else {
        updateScore(data, wordLength,input);
    }

    }
async function sendScoreToServer(score){
    //Supposed to send the score to the backend 
    // to update high score and trigger a count of the number of games played

    const response = await axios.post ("/score", { points: score });
    let data = response.data.hi_score;
    $('#high-score').text(data);

}

// Respnds to click, sends word through ajax/axios to back end
// starts timer for the game. Timer doesn't sstop sometimes(Need to fix)
  $(document).on('click','#button', (e) => {
      e.preventDefault();
      
      input = $('#word').val();
      if (input.length === 0 ){
          alert("Enter a word please");
      }
      sendWordToServer(input);
      $('#word').val('')
  });
//   $(document).on('click','#restart', (e) => {
//       e.preventDefault();

   
// });
$(document).on('click','#begin', (e) => {
    e.preventDefault();
    $('#button').prop('disabled', false);
    myInterval = setInterval(timer, 1000); 
    $('#begin').attr('disabled', 'true');

});
  




//   updates score on front und and gives message to user about word being used
  function updateScore(data, wordLength, input) {
      if (data === "ok"){
        $('#score').text(score = score + wordLength)
        $('#correct').append(`<td> ${input}</td>`)
        $('#message').text('is valid and on the board.')

      }else if ( data === "not-on-board" ){
        $('#wrong').append(`<td> ${input}</td>`)
        $('#message').text(' is not on the board.')
      }else{
        $('#message').text(' is not even a word!')
        $('#wrong').append(`<td> ${input}</td>`)
      }
      }
    


    //   checks if the word has already been guessed
    function alreadyGuessed(input) {
        console.log(guesses)
        if (guesses.includes(input)){
            $('#message').text(' has already been guessed.')
            return true
        }
        guesses.push(input)
    return false

    }
    
    
// Timer function, something is wrong, it doesn't 
// stop nor does it send data about score to back end
    function timer() { 
        if (time <= 30){
            $('#timer').text(time++)
        }else{
            clearInterval(myInterval)
            $('#button').prop('disabled', true)
            sendScoreToServer(score)

        }
    }











