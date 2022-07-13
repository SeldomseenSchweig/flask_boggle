let score = 0;
let guesses = [];
let time = 1





async function send_word_to_server(input) {

    const response = await axios.get ("/check-word", { params: { word: input }});    
    wordLength = input.length;
    let data = response.data.result;
    if (alreadyGuessed(input) ) {
        $('#message').text(' has already been guessed.');
    } else {
        updateScore(data, wordLength,input);
    }

    }


  $(document).on('click','#button', (e) => {
      e.preventDefault();
      setInterval(timer, 1000);
      input = $('#word').val();
      if (input.length === 0 ){
          alert("Enter a word please");
      }
      send_word_to_server(input);
      $('#word').val('')
  });

  function updateScore(data, wordLength, input) {
      if (data === "ok"){
        $('#score').text(score = score + wordLength)
        $('#correct').append(`<td> ${input}<td/>`)
        $('#message').text('is valid and on the board.')

      }else if ( data === "not-on-board" ){
        $('#wrong').append(`<td> ${input}<td/>`)
        $('#message').text(' is not on the board.')
      }else{
        $('#message').text(' is not even a word!')
      }
      }
    
    function alreadyGuessed(input) {
        console.log(guesses)
        if (guesses.includes(input)){
            $('#message').text(' has already been guessed.')
            return true
        }
        guesses.push(input)
    return false

    }
    
    

    function timer() { 
        if (time < 6){
            $('#timer').text(time++)
        }else{
            $('#button').prop('disabled', true)
            clearInterval(1)
        }
    }

    function send_game_stats_to_server(time) {
        if (time >= 60){

        }

    }







