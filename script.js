let port;
let reader;
let inputDone;
let inputStream;

  
async function connect(){

    let rect = document.getElementById('rect')
    port = await navigator.serial.requestPort()
    await port.open({ baudRate: 9600 }).catch((e) => console.log(e))

    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;
    reader = inputStream.getReader();

    while (true) {
        const { value, done } = await reader.read();
        rect.innerHTML = value.toString()
        // "smoothing...pot output is super crazy, looks like bytes, but not, like 50, 500, 43, 430, 42, 420..."
        if (value > 100 && value < 1000 ) {
          rect.style.width = value.toString() + 'px'
          
        }
        if (done) {
          reader.releaseLock();
          break;
        }
    }
}