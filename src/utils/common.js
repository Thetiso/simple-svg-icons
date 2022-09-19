const getBlobFileWithResponseType = ({
    url, responseType = 'html/text'
}) => {
    return new Promise((resolve)=> {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = responseType;
        xhr.onload = function() {
          if (this.status == 200) {//请求成功
            resolve(this.response);
          } else {
            resolve()
          }
        };
        xhr.send();
    })
}

const appendConsoleText = (content)=> {
    let time = document.createTextNode(`${new Date().toLocaleTimeString()}:`)
    let time_span = document.createElement("span")
    time_span.style.fontWeight = '600'
    time_span.style.color = '#1989fa'
    time_span.appendChild(time)
    let text = document.createTextNode(`  ${content}`);
    let p = document.createElement("p");
    p.style.fontSize = '16px'
    p.style.color = '#999'
    p.style.margin = 0
    p.style.lineHeight = '20px'
    p.appendChild(time_span)
    p.appendChild(text);
    // document.getElementById("console").appendChild(p);
    let console = document.getElementById("console")
    console.insertBefore(p, console.childNodes?.[0])
  }
const CommonUtils = {
    getBlobFileWithResponseType,
    appendConsoleText,
}

export {
    CommonUtils
}