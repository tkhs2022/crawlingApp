// メニューバー、ツールバーで使用するライブラリ
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import getContentsList from '../actions/contentsList.js';
import * as actions from "../actions/action.js"

const drawerWidth = 240;

// ツールバーのタイトルのフォントサイズ調整
const useStyles = makeStyles(theme => ({
	listItemText:{
		paddingLeft:"1em!important",
		fontSize:"10pt!important",
	},
	listItemTextContentsfile:{
		paddingLeft:"2em!important",
		fontSize:"10pt!important",
	},
	linkElementStyleonLogin:{
		textDecoration: "none",
	},
	linkElementStyleonLogout:{
		textDecoration: "none",
		pointerEvents:"none",
	}
}));

function ResponsiveDrawer(props) {
	///////////////////////////////////////////////////////////////// 
	// コンテンツメニューの開閉を制御する
	const [selectedContentsIndex, setSelectedContentsIndex] = React.useState(0);
	const [opencontents, setOpenContents] = React.useState(false);
	const styles = useStyles();

	const handleClick = () => {
		setOpenContents(!opencontents);
	}

	///////////////////////////////////////////////////////////////// 
	// アイコンボタン押下時のメニュー開閉を制御する
	const optionMenuIcon = [
		"ログアウト",
	];
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [selectedIconIndex, setSelectedIconIndex] = React.useState(0);
	// アイコンボタン押下処理
	const onClickIconButton = (event) => {
		setAnchorEl(event.currentTarget);
	}
	// アイコンボタン押下時に現れるメニューより選択したアイテムの押下処理
	const onClickSelectedIcon = (event, index) => {
		event.preventDefault();
		setSelectedIconIndex(index);
		setAnchorEl(null);
		if(selectedIconIndex === 0) {
			// ログアウト処理
			props.LOGOUT();
			window.location.href = "/";
		}
	};
	// メニューを閉じるイベント処理
	const handleClose = () => {
		setAnchorEl(null);
	};

	///////////////////////////////////////////////////////////////// 
	// 選択されたコンテンツファイル名にselectedを有効化する
	const handleListItemClick = (text) => {
		setSelectedContentsIndex(text);
	}

	///////////////////////////////////////////////////////////////// 
	// 選択されたコンテンツファイル名を返却
	const callApp = (selectedFileName) => {
		getContentsList(selectedFileName);
	}

	///////////////////////////////////////////////////////////////// 
	// 左側のメニューバー
	const drawer = (
	<div>
		<Toolbar id="toolBar-loginInfo" style={{fontSize:"0.8rem"}}>
			<p style={{marginTop: "0.5em", marginBottom: "0.5em"}}>ユーザー :  {props.user}</p>
			<p style={{marginTop: "0.5em", marginBottom: "0.5em"}}>更新時刻 :  {new Date().toLocaleString('ja-JP')}</p>
		</Toolbar>
		<Divider/>
		<List>
			{/* 区分セットページ */}
			<Link to="/ShowKubunSetting" style={{textDecoration: "none"}}>
				<ListItem button selected={selectedContentsIndex === 20}onClick={(e) => handleListItemClick(20, e)}>
					<ListItemText primary="区分セット" className="list-item-text" classes={{primary:styles.listItemText}}/>
				</ListItem>
			</Link>
			{/* 実行結果セットページ */}
			<ListItem button>
				<ListItemText primary="実行結果セット" className="list-item-text" classes={{primary:styles.listItemText}}/>
				{opencontents 
				? <ExpandLess onClick={handleClick} style={{color:"#FFF",marginRight: "1em"}}/>
				: <ExpandMore onClick={handleClick} style={{color:"#FFF", marginRight: "1em"}}/>
				}
			</ListItem>
			<Collapse in={opencontents} timeout="auto" unmountOnExit>
				{props.fileNameList !== undefined &&
					props.fileNameList.map((fileName, index) => (
						<Link to="/ShowCrawlSetting" key={fileName} style={{textDecoration: "none"}}>
							<ListItem button selected={selectedContentsIndex === fileName} onClick={(e) => {handleListItemClick(fileName, e); callApp(fileName, e)}}>
								<ListItemText primary={fileName} className="list-item-text-contentsfile" classes={{primary:styles.listItemTextContentsfile}}/>
							</ListItem>
						</Link>
				))}
			</Collapse>
			{/* コンテンツ表示ページ */}
			<ListItem button>
				<ListItemText primary="コンテンツ" onClick={handleClick} className="list-item-text" classes={{primary:styles.listItemText}}/>
				{opencontents 
				? <ExpandLess onClick={handleClick} style={{color:"#FFF",marginRight: "1em"}}/>
				: <ExpandMore onClick={handleClick} style={{color:"#FFF", marginRight: "1em"}}/>
				}
			</ListItem>
			<Collapse in={opencontents} timeout="auto" unmountOnExit>
				{props.fileNameList !== undefined &&
					props.fileNameList.map((fileName, index) => (
						<Link to="/ShowContentsArea" key={fileName} style={{textDecoration: "none"}}>
							<ListItem button selected={selectedContentsIndex === fileName} onClick={(e) => {handleListItemClick(fileName, e); callApp(fileName, e)}}>
								<ListItemText primary={fileName} className="list-item-text-contentsfile" classes={{primary:styles.listItemTextContentsfile}}/>
							</ListItem>
						</Link>
				))}
			</Collapse>
		</List>
	</div>
	);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			{/* 上部のツールバー */}
			<AppBar	position="fixed" sx={{width: { sm: `calc(100% - ${drawerWidth}px)` },ml: { sm: `${drawerWidth}px` },}}>
			<Toolbar style={{justifyContent:"space-between"}}>
				{/* タイトル */}	
				<Typography className="toolbarTypography" variant="h6" noWrap component="div">Site Checker...</Typography>
				<IconButton
					color="inherit"
					aria-label="opencontentsDrawer"
					onClick={onClickIconButton}
					edge="start"
					// sx={{marginRight: '36px', ...(opencontents && { display: 'none' })}}
					sx={{marginRight: '36px', }}
				>
					<MenuIcon />
				{/* メニューアイコン(ログアウト処理) */}
				</IconButton>
				<Menu
					id="lock-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'lock-button',
						role: 'listbox',
					}}
				>
					{optionMenuIcon.map((option, index) => (
						<MenuItem
							key={option}
							size="small"
							// disabled={index === 0}
							// selected={index === selectedIconIndex}
							// onClick={(e) => onClickSelectedIcon(e, index)}
							onClick={(e) => onClickSelectedIcon(e)}
						>
							{option}
						</MenuItem>
					))}
				</Menu>
			</Toolbar>
			</AppBar>
			{/* 左側のメニューバー表示 */}
			<Box component="nav" sx={{width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
				{/* 左側のメニューバー表示(中身) */}			
				<Drawer	variant="permanent"	sx={{display: {xs: 'none', sm: 'block' },	'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },}} opencontents>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
}

///////////////////////////////////////////////////////////////// 
// ReactコンポーネントとReduxストアをコネクト
const mapStateToProps = (state) => ({
	fileNameList: state.componentReducer.fileNameList,
	user: state.loginReducer.user
  });

const mapDispatchToProps = (dispatch) => ({
	LOGOUT: () => dispatch(actions.LOGOUT())
});

const ContainerResponsiveDrawer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ResponsiveDrawer);

export default ContainerResponsiveDrawer;