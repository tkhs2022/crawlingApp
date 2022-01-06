/////////////////////////////////////////////////////////////////
// MaterialTable表示
/////////////////////////////////////////////////////////////////
import React, { forwardRef } from "react";
import MaterialTable from "material-table";

// MaterialTableに使用するアイコンをインポート
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Save from '@material-ui/icons/Save';

// MaterialTableに使用するアイコンを定数化
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Save: forwardRef((props, ref) => <Save {...props} ref={ref} />)
  };

///////////////////////////////////////////////////////////////// 
// MaterialTableを生成する、ルートコンポーネント
///////////////////////////////////////////////////////////////// 
export default function CrawlSettingMaterialTable(props) {
  /////////////////////////////////////////////////////////////////
  // クローリングセット。MaterialTableのeditable属性
  const editableCrawlSetting = 
    <MaterialTable
      title="実行結果セット"
      columns={props.columns}
      data={props.data}
      options={{
        showTitle: true,
        search: true,
        tableLayout: "auto",
        overflowX: "scroll",
        paging: false,
        maxBodyHeight: 450,
        headerStyle: { position: 'sticky', top: 0,  fontSize:"9pt" },
        searchFieldStyle:{padding:"0.5em", fontSize:"8pt"},
      }}
      icons={tableIcons}
      actions={[
        {
          icon:Edit,
          tooltip:"Edt your's settings.",
          cellStyle:{fontSize: "0.8em", width: "10%", minWidth: "10%"},
          headerStyle:{fontWeight: "bold",},
          onClick:(e, rowData) => {
            props.modalWrapperFlag();
            props.setItem(rowData);
            props.setSelectedCrawling(rowData);
          }
        }
      ]}
    />

  /////////////////////////////////////////////////////////////////
  // MaterialTableの戻り値
  return(
    <div className="materialCrawlSetting" style={{ maxWidth:"80%", padding:"0.5em", fontSize:"10pt"}}>
      {editableCrawlSetting}
    </div>
  );
}
