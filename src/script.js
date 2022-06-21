let port;
let readableStream;
let decoder;
let rsClosed;
let readero;

window.addEventListener('DOMContentLoaded', (event) => {
  var btn = document.getElementById('connect')
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
    //const reader = port.readable.getReader();
    decoder = new TextDecoderStream()
    rsClosed = port.readable.pipeTo(decoder.writable)
    readero = decoder.readable.getReader()

    try {
      while (true) {
        const stuff = await readero.read();
        if (stuff.done) {
          break;
        }
        console.log(stuff)
        /* this is really a Unit8Array 
           Uint8Array(4) [53, 48, 13, 10, buffer: ArrayBuffer(4), byteLength: 4, byteOffset: 0, length: 4, Symbol(Symbol.toStringTag): 'Uint8Array']
        */

      }
    } 
    
    catch (error) {
      console.log(error)
    } 
    
    finally {
      reader.releaseLock();
    }
  }
}




// function rXeadOne(){
//   reader.read().then(({ done, value }) => {
//       console.log(Array.from(value))
//       readOne()
//   })
// }

// async function cXonnect(){

    
//     await port.open({ baudRate: 9600 }).catch((e) => console.log(e))
   
//     let decoder = new TextDecoderStream();
//     inputDone = port.readable.pipeTo(decoder.writable);
//     inputStream = decoder.readable;
//     reader = inputStream.getReader();

//     readOne()
// }

