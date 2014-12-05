var DOM = React.DOM;

var Box = React.createClass({
	
	displayName: "Box",
	
	getInitialState: function() {
		return { symbol: undefined };
	},

	render: function() {
		var style = {
			outline: "1px solid black",
			height: this.props.side + "px",
			width: this.props.side + "px",
			textAlign: "center",
			fontSize: this.props.side + "px",
			fontFamily: "sans-serif",
			lineHeight: "1em",
			float: "left"
		};
		return DOM.div({ style: style, onClick: this.handleClick }, this.state.symbol );
	},

	handleClick: function(e) {
		if (_.isUndefined(this.state.symbol)) {
			this.setState({ symbol: this.props.clickCount % 2 == 0 ? "X" : "O" });
			this.props.increment();
		}
	}
});

var TicTacToe = React.createClass({
	
	displayName: "TicTacToe",
	
	getInitialState: function() {
		return { clickCount: 0 };
	},

	incrementClickCount: function() {
		var current = this.state.clickCount;
		this.setState({ clickCount: current + 1 });
	},

	render: function() {
		var side = 50;
		var clickCount = this.state.clickCount;
		var style = {
			width: side * 3
		};
		var increment = this.incrementClickCount;

		return DOM.div({},
			DOM.h1({}, "Tic Tac Toe"),
			DOM.div({ style: style }, 
				_.range(0, 9).map(function(i){ 
					return React.createFactory(Box)({ key: i, side: side, clickCount: clickCount, increment: increment }) 
				})
			)
		);
	}
});

var el = React.createElement(TicTacToe, null);

React.render(
 	el,
 	document.getElementById('content')
);
