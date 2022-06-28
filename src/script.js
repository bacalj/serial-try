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

let localBuffer = ''

function handleStreamObj(val){
  localBuffer+= val

  /* any number of digits followed by a carriage return and a newline */
  const pattern = /([0-9]+)[\r][\n]/g

  /* an array that includes [{the whole match}, {the captured string we want}] */
  const match = pattern.exec(localBuffer)

  if (match){
    /* remove our current match from the end of the buffer */
    localBuffer = localBuffer.substring(0, localBuffer.length - match[0].length)
    const nice = match[1]
    console.log(nice)
  }
}
