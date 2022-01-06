///////////////////////////////////////////////////////////////// 
// エラー発生時に描写するコンポーネント
///////////////////////////////////////////////////////////////// 
import * as React from 'react';

const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu'," +
 	"'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({error, errorInfo});
	}

	render() {
		if (this.state.hasError) {
			// エラー時の表示
			return(
				<div style={{marginLeft:"17rem", marginRight:"17rem"}}>
					<h1 style={{fontFamily:fontFamily}}>JavaScriptの致命的エラー</h1>
					<pre style={{fontFamily:fontFamily}}>{this.state.error?.message}</pre>
					<pre style={{fontFamily:fontFamily}}>{this.state.errorInfo?.componentStack}</pre>
				</div>
			);
		}
		return(
			this.props.children
		);
	}
}