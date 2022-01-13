/////////////////////////////////////////////////////////////////
// MaterialTable表示
/////////////////////////////////////////////////////////////////
import React, { forwardRef, useState } from 'react';
import MaterialTable from 'material-table';
import { setEditKubunList, setDeleteKubunList } from '../actions/kubunList.js';
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
import DetailPanel from '@material-ui/icons/Details';

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
export default function KubunSettingMaterialTable(props) {
  // 区分リストのデータをセット
  const [data, setData] = useState(props.data);
  /////////////////////////////////////////////////////////////////
  // 区分セット。MaterialTableのeditable属性
  const editableKubunSetting =
    <MaterialTable
      title="区分セット"
      columns={props.columns}
       data={props.data}
       editable={{
        ///////////////////////////////////////////////////////////////// 
        // 区分リストの編集処理
        onRowUpdate:(newData, oldData) =>
        new Promise((resolve, reject) => {
          var dataSet = {"before":[], "after":[]};
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          // アクションに渡すデータ(更新前・更新後)を保存。
          dataSet.before.push(oldData);
          dataSet.after.push(newData);
          // マテリアルテーブルに配置するデータを更新。
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve(dataSet);
        })
        .then((response) => {
          setEditKubunList(response)
          .then(()=>{
            props.setStateKbns(); // 区分リスト最新化
          })
        })
        .catch((error) => {
          console.error(error);
        }),
        ///////////////////////////////////////////////////////////////// 
        // 区分リストの削除処理
        onRowDelete:(oldData) =>
        new Promise((resolve,reject) => {
          var dataSet = {"delete":[]};
          const dataDelete = [...data];
          const index = oldData.tableData.id;
          // バックエンドに渡す為の削除対象データ
          dataSet.delete.push(oldData);
          dataDelete.splice(index, 1);
          setData([...dataDelete]);
          resolve(dataSet)
        })
        .then((response) => {
          setDeleteKubunList(response)
          .then(()=>{
            props.setStateKbns(); // 区分リスト最新化
          })
        })
        .catch((error) => {
          console.error(error);
        }),
      }}
      options={{
        showTitle: true,
        search: true,
        tableLayout: "auto",
        overflowX: "scroll",
        paging: false,
        maxBodyHeight: 450,
        headerStyle: { position: 'sticky', top: 0, fontSize:"9pt" },
        searchFieldStyle:{padding:"0.5em", fontSize:"8pt"},
      }}
      localization={{
        header:{actions: ''},
        body:{editRow:{deleteText:"データは削除されます。よろしいですか？"},},        
      }}
      icons={tableIcons}
      actions={[
        // 詳細ボタン。現在登録されているクロールデータを表示する
        {
          icon:DetailPanel,
          tooltip:"Show details.",
          cellStyle:{fontSize: "0.8em", width: "10%", minWidth: "10%"},
          headerStyle:{fontWeight: "bold",  width: "10%", minWidth: "10%"},
          onClick:(e, rowData) => {
            props.setSelectedCrawling(rowData);
          }
        }        
      ]}
    />

  /////////////////////////////////////////////////////////////////
  // MaterialTableの戻り値
  return(
      <div className="materialKubunSetting" style={{ maxWidth:"45%", minWidth:"45%", marginLeft: "16.6rem", padding:"0.5em", fontSize:"10pt"}}>
        {editableKubunSetting}
      </div>
  );
}
