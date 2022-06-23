let port;
let readableStream;
let textDecoder;
let promiseToBeClosed;
let streamReader;
let bar;
let btn;
let listo;
let cleaned = []

window.addEventListener('DOMContentLoaded', (event) => {
  btn = document.getElementById('connect')
  bar = document.getElementById('rect')
  listo = document.getElementById('listo')
  btn.addEventListener('click', function(e){
    e.preventDefault()
    connect()
  })
});

async function connect(){
  port = await navigator.serial.requestPort() 
  await port.open({ baudRate: 9600 }).catch((e) => console.log(e))

  portInfo = port.getInfo()
  console.log(portInfo)

  handleReadableStream(port)
}

async function handleReadableStream(port){
  while (port.readable) {
    textDecoder = new TextDecoderStream()
    promiseToBeClosed = port.readable.pipeTo(textDecoder.writable)
    streamReader = textDecoder.readable.getReader()
    
    try {
      while (true) {
        const { value, done } = await streamReader.read();
        if (done){
          break
        }
        handleStreamObj(value)
      }
    } 
    
    catch (error) {
      console.log(error)
    } 
    
    finally {
      streamReader.releaseLock();
    }
  }
}


function handleStreamObj(val){
  /* 
    innerHTML side effect cleans out invisible or misinterpretable chars 
    (those reflected in value.length, yet not printable via value.charAt[x]) 
    also visible as "random" line breaks in console 

    There must be a more pragmatic, not-a-side-effect way to clean it, but
    this works for the moment

  */
  listo.innerHTML += val
  cleaned = listo.innerHTML.split('\n')
    .map( x => parseInt(x))
    .filter( n => !isNaN(n))

  console.log(cleaned)
}
