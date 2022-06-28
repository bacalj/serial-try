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
let destiny = []

function handleStreamObj(val){

  localBuffer+= val
  const pattern = /[0-9]+[\r][\n]/g
  const completos = localBuffer.match(pattern)
  console.log(completos)
  const i = completos.length - 1
  
  //console.log(completos[i])
  //console.log("valArr: ", valArr)

  // for (i =0; i < valArr.length; i++){
  //   console.log(valArr[i].charCodeAt(0))
  // }
  // const arrOfChars = Array.from(val)
  // localBuffer = [localBuffer, ...arrOfChars]
  // console.log(localBuffer)


  


  // /* define the pattern we are looking for which is {n digits}\r\n */
  // const valueThenDelimiter = new RegExp('(\d+)\\r\\n', 'g')
  
  // localBuffer += val
  // //console.log(localBuffer)

  // const utterance = valueThenDelimiter.exec(localBuffer)
  //console.log(utterance)
  // console.log(utterance)
  /* append mostl-likely malformed chunk to local buffer */
  // localBuffer += val
  // console.log(localBuffer.split('\r'))

  //const match = valueThenDelimiter.exec("123\\r\\n")
  //console.log(match)
}
