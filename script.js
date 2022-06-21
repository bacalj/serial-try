let port;
let reader;
let inputDone;
let inputStream;

function readOne(reader){
  reader.read().then(({ done, value }) => {
    if (done){
      console.log('done')
    } else {
      console.log(value)
      readOne(reader)
    }
  })
}

async function connect(){

    let rect = document.getElementById('rect')
    console.log(navigator.serial)
    port = await navigator.serial.requestPort() 
    await port.open({ baudRate: 9600 }).catch((e) => console.log(e))

    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;
    reader = inputStream.getReader();

    readOne(reader)

    // while (true) {
        
    //     const { value, done } = await reader.read();
    //     console.log(value)
    //     rect.innerHTML = value
        
    //     if (value) {
    //       rect.style.width = value.toString() + 'px'
    //     }

    //     if (done) {
    //       console.log('done')
    //       reader.releaseLock();
    //       break;
    //     }
    // }
}