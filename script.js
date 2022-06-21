let port;
let reader;
let inputDone;
let inputStream;

function niceIt(Uint8Arr) {
  const len = Uint8Arr.length
  const val = Uint8Arr
  return { length: len, apparent_value: val }
  // const length = Uint8Arr.length;
  // return length;
}

function readOne(reader){
  reader.read().then(({ done, value }) => {
    if (done){
      /* there is a proper way to close the stream but this is just poc */
      console.log('done')
    } 
    
    else {
      const nice = niceIt(value)
      console.log(nice)
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
}

