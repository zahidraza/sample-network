import React from 'react';

import Node from './components/Node';

const drawLine = (x1, y1, x2, y2) => {
	const tangent = Math.atan((y2 - y1) / (x2 - x1));
	let angle = (tangent * 180) / Math.PI;
	if (x2 < x1) {
		angle += 180;
	}
	var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

	const lineNode = document.createElement('div');
	lineNode.id = 'line';
	lineNode.style.height = `1px`;
	lineNode.style.width = `${length}px`;
	lineNode.style.backgroundColor = `black`;
	lineNode.style.position = 'absolute';
	lineNode.style.left = `${x1}px`;
	lineNode.style.top = `${y1}px`;
	lineNode.style.transform = `rotate(${angle}deg)`;
	lineNode.style.transformOrigin = '0% 0%';
	lineNode.style.zIndex = 0;

	return lineNode;
};

const MyApp = () => {
	const rootEl = React.useRef();

	const nodeList = [
		{ id: 1, label: `Label 1`, ref: React.useRef() },
		{ id: 2, label: `Label 2`, ref: React.useRef() },
		{ id: 3, label: `Label 3`, ref: React.useRef() },
		{ id: 4, label: `Label 4`, ref: React.useRef() },
		{ id: 5, label: `Label 5`, ref: React.useRef() },
	];

	const edgeList = [
		{ from: 1, to: 2 },
		{ from: 1, to: 4 },
		{ from: 2, to: 3 },
		{ from: 3, to: 4 },
		{ from: 4, to: 5 },
	];

	/*eslint-disable  react-hooks/exhaustive-deps*/
	React.useEffect(() => {
		let node;
		let appendedChildList = [];
		if (rootEl.current) {
			node = rootEl.current;
			edgeList.forEach(({ from, to }) => {
				const fromNode = nodeList.find((node) => node.id === from);
				const toNode = nodeList.find((node) => node.id === to);

				if (fromNode?.ref?.current && toNode?.ref?.current) {
					var rect1 = fromNode.ref.current.getBoundingClientRect();
					var rect2 = toNode.ref.current.getBoundingClientRect();

					let x1 = rect1.left + (rect1.right - rect1.left) / 2;
					let y1 = rect1.top + (rect1.bottom - rect1.top) / 2;

					let x2 = rect2.left + (rect2.right - rect2.left) / 2;
					let y2 = rect2.top + (rect2.bottom - rect2.top) / 2;

					x1 = x1 + window.scrollX;
					y1 = y1 + window.scrollY;

					x2 = x2 + window.scrollX;
					y2 = y2 + window.scrollY;

					const lineNode = drawLine(x1, y1, x2, y2);
					const appendedChild = node.appendChild(lineNode);
					appendedChildList.push(appendedChild);
				}
			});
		}
		return () => {
			if (node) {
				appendedChildList.forEach((child) => node.removeChild(child));
			}
		};
	}, [nodeList?.length, edgeList?.length]);
	/*eslint-enable  react-hooks/exhaustive-deps*/

	return (
		<div>
			{/* <div style={{ height: '100vh', backgroundColor: 'blue' }}></div> */}
			<div
				ref={rootEl}
				id="container"
				style={{
					padding: '2em',
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
				}}
			>
				{nodeList.map((node, idx) => (
					<Node
						key={idx}
						id={node.id}
						ref={node.ref}
						label={node.label}
						style={{ margin: '1em', zIndex: 1 }}
					/>
				))}
			</div>
		</div>
	);
};

export default MyApp;
