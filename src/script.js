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


function readOne(reader){
  reader.read().then(({ done, value }) => {
      console.log(Array.from(value))
      readOne(reader)
  })
}

async function openPort(){
  port = await navigator.serial.requestPort() 
  await port.open({ baudRate: 9600 }).catch((e) => console.log(e))
}

async function connect(){

    openPort();
   
    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;
    reader = inputStream.getReader();

    readOne(reader)
}

