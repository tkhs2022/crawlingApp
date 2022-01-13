///////////////////////////////////////////////////////////////// 
// マテリアルテーブルのカラムを生成する
/////////////////////////////////////////////////////////////////
// クローリング設定画面で使用
const columnsCrawlSetting =
    [
        {title:'区分', field:'kbn', cellStyle:{fontSize:"0.8em", width:"8%", minWidth:"8%", maxWidth:"8%", padding:"0.5em"}, headerStyle:{fontWeight:"bold",  width:"8%", minWidth:"8%", maxWidth:"8%"}},
        {title:'区分名称', field:'kbnname', cellStyle:{fontSize:"0.8em", width:"20%", minWidth:"20%", maxWidth:"20%", padding:"0.5em"}, headerStyle:{fontWeight:"bold", width:"20%", minWidth:"20%", maxWidth:"20%"}},
        {title:'サイトID', field:'jigyosyaid', cellStyle:{fontSize:"0.8em", width:"15%", minWidth:"15%", maxWidth:"15%", padding:"0.5em"}, headerStyle:{fontWeight:"bold", width:"15%", minWidth:"15%", maxWidth:"15%"}},
        {title:'サイト名称', field:'name', cellStyle:{fontSize:"0.8em", width:"15%", minWidth:"15%", maxWidth:"15%", padding:"0.5em"}, headerStyle:{fontWeight:"bold", width:"15%", minWidth:"15%", maxWidth:"15%"}},
        {title:'記事ID', field:'kiziid', cellStyle:{fontSize:"0.8em", width:"15%", minWidth:"15%", maxWidth:"15%", padding:"0.5em"}, headerStyle:{fontWeight:"bold", width:"15%", minWidth:"15%", maxWidth:"15%"}},
        {title:'画像', field:'imageFileRes', cellStyle:{fontSize:"0.8em", width:"8%", minWidth:"8%", maxWidth:"8%", padding:"0.5em"}, headerStyle:{fontWeight:"bold", width:"8%", minWidth:"8%", maxWidth:"8%"}},
        {title:'記事タイトル', field:'title', cellStyle:{fontSize:"0.8em", width:"20%", minWidth:"20%", maxWidth:"20%", padding:"0.5em"}, headerStyle:{fontWeight:"bold", width:"20%", minWidth:"20%", maxWidth:"20%"}},
    ]

// 区分設定画面。区分セット。(左側のマテリアルテーブル)
const columnsKubunSetting =
    [
        {title:'区分', field:'kbn', cellStyle:{fontSize:"0.8em", width:"15%", minWidth:"15%"}, headerStyle:{fontWeight:"bold",  width:"15%", minWidth:"15%"}},
        {title:'区分名称', field:'kbnname', cellStyle:{fontSize:"0.8em", width:"20%", minWidth:"15%"}, headerStyle:{fontWeight:"bold", width:"15%", minWidth:"15%"}},
        {title:'コメント', field:'comment', cellStyle:{fontSize:"0.8em", width:"50%", minWidth:"30%"}, headerStyle:{fontWeight:"bold", width:"30%", minWidth:"30%"}},
    ]

// 区分設定画面。対象データセット。(右側のマテリアルテーブル)
const columnsDetailCrawlSetting =
    [
        {title:'区分', field:'kbn', cellStyle:{fontSize:"0.8em", width:"15%", minWidth:"5%"}, headerStyle:{fontWeight:"bold",  width:"5%", minWidth:"5%"}},
        {title:'区分名称', field:'kbnname', cellStyle:{fontSize:"0.8em", width:"25%", minWidth:"15%"}, headerStyle:{fontWeight:"bold", width:"15%", minWidth:"15%"}},
        {title:'サイトID', field:'jigyosyaid', cellStyle:{fontSize:"0.8em", width:"25%", minWidth:"10%"}, headerStyle:{fontWeight:"bold", width:"10%", minWidth:"10%"}},
        {title:'サイト名称', field:'name', cellStyle:{fontSize:"0.8em", width:"25%", minWidth:"15%"}, headerStyle:{fontWeight:"bold", width:"15%", minWidth:"15%"}},
    ]

export const columnsData = (param) => {
    switch(param) {
        case 1:
            return columnsCrawlSetting;
        case 2:
            return columnsKubunSetting;
        case 3:
            return columnsDetailCrawlSetting;
        default:
            return columnsCrawlSetting;
    }
};


