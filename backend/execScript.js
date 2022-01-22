const {exec} = require("child_process");
// test
// const crawlingListJS = require("../src/actions/crawlingList.js");

function execScript(exeName, pgName, resJsonFileName) {
    var cmd_str = exeName + " " + pgName + " " + resJsonFileName + " " + port
    var result = {flag:false, msg:"nothing"}
    process.on('unhandledRejection', console.dir);

    // return new Promise(function(resolve, reject) {
        console.log(new Date().toLocaleString('ja-JP') + " <function>execScript python.exe launched. connect.py is Launched. crawl starting...");
        exec(cmd_str,(err, stdout, stderr) => {
            if(err) {
                console.error(new Date().toLocaleString('ja-JP') + " <function>execScript catched stderr: ");
                console.error(stderr);
                result["msg"] = stderr;
                // reject(result);
            } else {
                console.log(stdout);    //pythonプログラム実行中にコンソール出力している文字列を出力
                console.log(new Date().toLocaleString('ja-JP') + " crawling API Finished!!");
                result["flag"] = true;
                // resolve(result);
            }
        });
    // });
    return result;
};

// function test() {
//     console.log("execScript.js <function>test")
//     var result = {flag:false, msg:"nothing"}
//     setTimeout(() => {
//         console.log('非同期処理です');
//         result["flag"] = true;
//         crawlingListJS.test(result);
//     }, 5000);
//     return result;
// }
exports.execScript = execScript;
// exports.test = test;