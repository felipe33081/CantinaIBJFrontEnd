import PropTypes from 'prop-types';
import { translatePoint, rotatePoint } from 'components/Datasets/ScoreClearSale/Pentagon';

const PentagonDetails = (props) => {
	const { details, innerRadius, outerRadius, children } = props;
	const size = outerRadius * 2;
	const detailsSize = (outerRadius - innerRadius) * 5;

	const centerVector = [0, -innerRadius-25];
	let points = [];
	const degreesPerPoint = 360 / details.length;
	for (var i = 0; i < details.length; i += 1) {
		points.push(rotatePoint(centerVector, degreesPerPoint * i));
	}
	points = points.map(point => translatePoint(point, outerRadius, outerRadius));

	return (
		<div style={{ position: 'relative', width: size, height: size }}>
			{details.map((details, index) => {
				let [x, y] = points[index];
				x -= detailsSize / 2;
				y -= detailsSize / 2;
				return (
					<div
						key={index}
						style={{
							position: 'absolute',
							left: x,
							top: y,
							width: detailsSize,
							height: detailsSize,
						}} >
						{details}
					</div>
				);
			})}
			{children}
		</div>
	);
};

export default PentagonDetails;

PentagonDetails.propTypes = {
	children: PropTypes.node,
	details: PropTypes.arrayOf(PropTypes.node),
	innerRadius: PropTypes.number, 
	outerRadius: PropTypes.number 
};