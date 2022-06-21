let port;
let reader;
let inputDone;
let inputStream;

async function connect(){

    let rect = document.getElementById('rect')
    console.log(navigator)
    port = await navigator.serial.requestPort()
    await port.open({ baudRate: 9600 }).catch((e) => console.log(e))

    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;
    reader = inputStream.getReader();

    console.log(decoder)

    while (true) {
        
        const { value, done } = await reader.read();
        console.log(value)
        rect.innerHTML = value
        
        if (value) {
          rect.style.width = value.toString() + 'px'
        }

        if (done) {
          reader.releaseLock();
          break;
        }
    }
}