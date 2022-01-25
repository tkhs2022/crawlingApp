const {exec} = require("child_process");
function execScript(exeName, pgName, resJsonFileName, port) {
    var cmd_str = exeName + " " + pgName + " " + resJsonFileName + " " + port
    var result = {flag:false, msg:"nothing"}
    process.on('unhandledRejection', console.dir);
    console.log(new Date().toLocaleString('ja-JP') + " <function>execScript python.exe launched. connect.py is Launched. crawl starting...");
    exec(cmd_str,(err, stdout, stderr) => {
        if(err) {
            console.error(new Date().toLocaleString('ja-JP') + " <function>execScript catched stderr: ");
            console.error(stderr);
            result["msg"] = stderr;
        } else {
            console.log(stdout);    //pythonプログラム実行中にコンソール出力している文字列を出力
            console.log(new Date().toLocaleString('ja-JP') + " crawling API Finished!!");
            result["flag"] = true;
        }
    });
    return result;
};
exports.execScript = execScript;