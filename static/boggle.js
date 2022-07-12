async function send_word_to_server(input) {
    let response = await axios.get(
      "/text.text");
  
  }

  $(document).on('click','#button', (e) => {
      e.preventDefault();
      input = $('#word').val();
      send_word_to_server(input);
  });
