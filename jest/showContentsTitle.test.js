import React from 'react';
import renderer from 'react-test-renderer';
import ContentsList from '../src/data/ContentsList.js';
import { ContentsTitleButtonWithBorder } from '../src/show/showContentsTitle.jsx';

const index = 2;
const Contents = new ContentsList(ContentsList);
const thisContents = Contents.getContentsList("contents.json");
// 記事ブロックに格納するデータ
const articleMap = thisContents.article.map((contents, index) =>{
        var list = [];
        contents.kbn == 2 && list.push(contents);
        return list;
    });

///////////////////////////////////////////////////////////////// 
// オンクリックイベント
test('ContentsTitleButtonWithBorder.jsx onClickEvent', () => {
	const component = renderer.create(
        <ContentsTitleButtonWithBorder key={index} Content={articleMap}/>
	);

    // 1.デフォルトの状態
	let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // 2.ボタン押下後の状態(1回目)
    tree.props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // 3.ボタン押下後の状態(2回目)
    tree.props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});