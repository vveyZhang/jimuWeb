export default function loadProject(url) {
    return new Promise((resolve, reject) => {
        const oReq = new XMLHttpRequest();
        oReq.open("GET", url);
        oReq.setRequestHeader('If-Modified-Since', '0');
        oReq.responseType = "arraybuffer";
        oReq.onload = function (res) {
            if (res.target.status >= 200 && res.target.status < 300) {
                const arrayBuffer = oReq.response;
                console.log(arrayBuffer)
                resolve(arrayBuffer)
            } else {
                reject({
                    msg: "加载失败"
                })
            }

        };
        oReq.send(null);
    })
}