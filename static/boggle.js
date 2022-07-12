async function send_word_to_server(input) {
    const response = await axios.get
    ("/check-word", { params: { word: input }});
    }


  $(document).on('click','#button', (e) => {
      e.preventDefault();
      input = $('#word').val();
      console.log(input)
      send_word_to_server(input);
      $('#word').val('')
  });


