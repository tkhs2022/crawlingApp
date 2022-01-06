import React from 'react';
import renderer from 'react-test-renderer';
import ContentsList from '../src/data/ContentsList.js';
import { ContentsBlockControl } from '../src/show/showContentsBlock.jsx';

const Contents = new ContentsList(ContentsList);
const thisContents = Contents.getContentsList("contents.json");

test('showContentsBlock.jsx', () => {
	const index = 2;
	const kbn = 2;
	const component = renderer.create(
		<ContentsBlockControl key={index} Kbn ={kbn} Contents={thisContents}/>,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});