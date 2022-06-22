let port;
let readableStream;
let decoder;
let rsClosed;
let readero;
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

  while (port.readable) {
    decoder = new TextDecoderStream()
    rsClosed = port.readable.pipeTo(decoder.writable)
    readero = decoder.readable.getReader()

    //const reader = port.readable.getReader();

    try {
      while (true) {

        // const { value, done } = await readero.read();
        // console.log(value)

        const stuff = await readero.read();
        console.log(stuff)
        // if (done) {
        //   break;
        // }
        // bar.innerHTML = value
        // bar.style.width = `${value * 1.5}px`
        // console.log(value)
      }
    } 
    
    catch (error) {
      console.log(error)
    } 
    
    finally {
      readero.releaseLock();
    }
  }
}

