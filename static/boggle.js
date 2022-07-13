async function send_word_to_server(input) {
    const response = await axios.get
    ("/check-word", { params: { word: input }});
    console.log(JSON.stringify(response.data))
    let data = JSON.stringify(response.data)
    console.log(data.keys())

    }


  $(document).on('click','#button', (e) => {
      e.preventDefault();
      input = $('#word').val();
      console.log(input)
      send_word_to_server(input);
      $('#word').val('')
  });






