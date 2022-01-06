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
import { makeStyles } from "@material-ui/core/styles";
import { Contents } from '../index.jsx';

// ルーティングに使用するライブラリ
import { Link } from 'react-router-dom';
import * as action from "../actions/action.js";
import store from "../store/store.js";

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

export default function ResponsiveDrawer(props) {
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
		"logout",
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
		if(selectedIconIndex == 0) {
			// ログアウト処理
			store.dispatch(action.logout());
			window.location.href = "/login";
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
		Contents.getContentsList(selectedFileName);
	}

	///////////////////////////////////////////////////////////////// 
	// 左側のメニューバー
	const drawer = (
	<div>
		<Toolbar/>
		<Divider/>
		<List>
			<Link to="/ShowCrawlSetting" style={{textDecoration: "none"}}>
				<ListItem button selected={selectedContentsIndex === 30} onClick={(e) => handleListItemClick(30, e)}>
					<ListItemText primary="実行結果セット" className="list-item-text" classes={{primary:styles.listItemText}}/>
				</ListItem>
	 		</Link>
			<Link to="/ShowKubunSetting" style={{textDecoration: "none"}}>
				<ListItem button selected={selectedContentsIndex === 20}onClick={(e) => handleListItemClick(20, e)}>
					<ListItemText primary="区分セット" className="list-item-text" classes={{primary:styles.listItemText}}/>
				</ListItem>
			</Link>
			<ListItem button>
				<ListItemText primary="コンテンツ" onClick={handleClick} className="list-item-text" classes={{primary:styles.listItemText}}/>
				{opencontents 
				? <ExpandLess onClick={handleClick} style={{color:"#FFF",marginRight: "1em"}}/>
				: <ExpandMore onClick={handleClick} style={{color:"#FFF", marginRight: "1em"}}/>
				}
			</ListItem>
			{/* コンテンツ選択部分 */}
			<Collapse in={opencontents} timeout="auto" unmountOnExit>
				{store.getState().componentReducer.fileNameList != undefined &&
					store.getState().componentReducer.fileNameList.map((fileName, index) => (
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
				<Typography className="toolbarTypography"variant="h6" noWrap component="div" style={{fontSize:"16pt!important"}}>Site Checker...</Typography>
				<IconButton
					color="inherit"
					aria-label="opencontents drawer"
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