import React, { useEffect, useRef, useState } from 'react';

export function rotatePoint(point, degrees) {
	const radians = degrees * Math.PI / 180;
	const cos = Math.cos(radians);
	const sin = Math.sin(radians);
	let [x, y] = point;
	[x, y] = [cos * x - sin * y, cos * y + sin * x];
	return [x, y];
}

export function translatePoint(point, dx, dy) {
	const [x, y] = point;
	return [x + dx, y + dy];
}

function scaleEdges(edges, radius) {
	return edges.map((edge) => edge.map(([x, y]) => [x * radius, y * radius]));
}

function translateEdges(edges, dx, dy) {
	return edges.map(edge => edge.map(vertice => translatePoint(vertice, dx, dy)));
}

function createEdges(){
	const pointsCount = 5;
	const heights = [1, 0.9, 0.8, 0.1];
	const degreesPerPoint = 360 / pointsCount;
	const initialPoints = heights.map((height) => [0, -height]);
	const edges = [];
	edges.push(initialPoints);
	for (let i = 1; i < pointsCount; i += 1) {
		const vertices = [];
		for (const initialPoint of initialPoints) {
			vertices.push(rotatePoint(initialPoint, degreesPerPoint * i));
		}
		edges.push(vertices);
	}
	return edges;
}

function createOptions(edges) {
	const relativeLines = [
		[[0, 1], [1, 1]],
		[[0, 2], [1, 2]],
		[[0, 0], [1, 3], [2, 0]],
		[[0, 0], [1, 0]],
	];
	const lines = [];
	for (var i = 0; i < edges.length; i += 1) {
		const _lines = [];
		for (const relativeLine of relativeLines) {
			const line = [];
			for (const jump of relativeLine) {
				const [j, k] = jump;
				const otherEdge = edges[(i + j + edges.length) % edges.length];
				line.push(otherEdge[k]);
			}
			_lines.push(line);
		}
		lines.push(_lines);
	}
	return lines;
}

function renderOptionsLinks(context, options, colors) {
	const gray = '#dedede';
	if(colors === undefined || colors === null || colors?.length < 5){
		colors = [
			//1-2  1-2   1-3*  1-2*
			[gray, gray, gray, gray],
			//2-3  2-3   2-4*  2-3*
			[gray, gray, gray, gray],
			//3-4  3-4   3-5*  3-4*
			[gray, gray, gray, gray],
			//4-5  4-5   4-1*  4-5*
			[gray, gray, gray, gray],
			//5-1  5-1   5-2*  5-1*
			[gray, gray, gray, gray]
		];
	}
	const lineWidth = [2, 2, 4, 4];
	for (var i = 0; i < options[0].length; i += 1) {
		for (let j = 0; j < options.length; j += 1) {
			const link = options[j][i];
			context.beginPath();
			context.moveTo(...link[0]);
			for (var k = 1; k < link.length; k += 1) {
				context.lineTo(...link[k]);
			}
			context.lineWidth = lineWidth[i];
			context.shadowColor = colors[j][i];
			context.shadowBlur = 5;
			context.shadowOffsetX = 1;
			context.shadowOffsetY = 1;
			context.strokeStyle = colors[j][i];
			context.stroke();
		}
	}
}

function renderOptionsRoots(context, options) {
	for (const links of options) {
		const link = links[links.length - 1];
		context.beginPath();
		context.arc(...link[0], 10, 0, 2 * Math.PI);
		context.fillStyle = '#FFF';
		context.fill();
		context.strokeStyle = '#aaa';
		context.lineWidth = 3;
		context.shadowColor = '#aaa';
		context.stroke();
	}
}

const Pentagon = ({ colors }) => {

	const canvasRef = useRef(null);
	const [context, setContext] = useState();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas === null) return;
		setContext(canvas.getContext('2d'));
	}, [setContext, canvasRef]);

	useEffect(() => {
		if (context === undefined) return;
		// the magic starts here
		let edges = createEdges();
		edges = scaleEdges(edges, 200);
		edges = translateEdges(edges, 250, 250);
		const options = createOptions(edges);
		renderOptionsLinks(context, options, colors);
		renderOptionsRoots(context, options);
		// and ends here
	}, [context]);

	return (
		<canvas
			width={500}
			height={500}
			ref={canvasRef} />
	);
};

export default Pentagon;