let score = 0;
guesses = []

async function send_word_to_server(input) {

    const response = await axios.get ("/check-word", { params: { word: input }});    
    wordLength = input.length
    let data = response.data.result
    if (alreadyGuessed(input) ) {
        $('#message').text(' has already been guessed.')
    } else {
        updateScore(data, wordLength,input)
    }

    }


  $(document).on('click','#button', (e) => {
      e.preventDefault();
      input = $('#word').val();
      if (input === null){
          alert("Enter a word please")
      }
      console.log(input)
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







