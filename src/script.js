let port;
let readableStream;
let textDecoder;
let promiseToBeClosed;
let streamReader;
let bar;
let btn;

window.addEventListener('DOMContentLoaded', (event) => {
  btn = document.getElementById('connect')
  bar = document.getElementById('rect')
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

  parseDataFromPort(port)
}

async function parseDataFromPort(port){
  while (port.readable) {
    textDecoder = new TextDecoderStream()
    promiseToBeClosed = port.readable.pipeTo(textDecoder.writable)
    streamReader = textDecoder.readable.getReader()
    
    try {
      while (true) {
        const serialDataObj = await streamReader.read();
        handleStreamObj(serialDataObj)
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


function handleStreamObj(obj){
  console.log(obj)
}
