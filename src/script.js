let port;
let reader;
let inputDone;
let inputStream;

window.addEventListener('DOMContentLoaded', (event) => {
  var btn = document.getElementById('connect')
  btn.addEventListener('click', function(e){
    e.preventDefault()
    connect()
  })
});

function readOne(){
  reader.read().then(({ done, value }) => {
      console.log(Array.from(value))
      readOne()
  })
}

async function connect(){

    port = await navigator.serial.requestPort() 
    await port.open({ baudRate: 9600 }).catch((e) => console.log(e))
   
    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;
    reader = inputStream.getReader();

    readOne()
}

