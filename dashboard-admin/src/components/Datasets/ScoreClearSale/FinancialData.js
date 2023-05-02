import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import PentagonDetails from 'components/Datasets/ScoreClearSale/PentagonDetails';
import ReactSpeedometer from 'react-d3-speedometer';
import Pentagon from 'components/Datasets/ScoreClearSale/Pentagon';
import { ReactComponent as CpfIcon } from 'assets/svg/cpf.svg';
import { ReactComponent as CepIcon } from 'assets/svg/cep.svg';
import { ReactComponent as PhoneIcon } from 'assets/svg/phone.svg';
import { ReactComponent as DeviceIcon } from 'assets/svg/device.svg';
import { ReactComponent as EmailIcon } from 'assets/svg/email.svg';

function FinancialData({ data, addDataset, value, disabled, loading }) {
	const gray = '#dedede';

	const scoreText = () => {
		if (score) {
			var text = "Muito alto";
			var color = "#b13030";
			if (score < 10) {
				text = "Muito baixo";
				color = "#68c22e";
			} else if (score < 46) {
				text = "Baixo";
				color = "#4ea3ff";
			} else if (score < 80) {
				text = "Médio";
				color = "#f0cd36";
			} else if (score < 90) {
				text = "Alto";
				color = "#F83";
			}
			return (
				<div className="uk-text-center">
					<span style={{ background: color, color: 'white', padding: 10, borderRadius: 20 }}>{text}</span>
				</div>
			);
		}
	};

	function linksColor(list) {

		const colors = [
			//1-2  1-2   1-3*  1-2*
			[gray, gray, gray, gray],
			//2-3  2-3   2-4*  2-3*
			[gray, gray, gray, gray],
			//3-4  3-4   3-5*  3-4*
			[gray, gray, gray, gray],
			//4-5  4-5   4-1*  4-5*
			[gray, gray, gray, gray],
			//5-1  5-1   5-2*  5-1*
			[gray, gray, gray, gray],
		];

		if (!list) { return colors; }
		colors[0][3] = colorFromWeight(list.documentVsPhone);
		colors[0][2] = colorFromWeight(list.documentVsDevice);
		colors[1][3] = colorFromWeight(list.phoneVsDevice);
		colors[1][2] = colorFromWeight(list.phoneVsZipCode);
		colors[2][3] = colorFromWeight(list.zipCodeVsDevice);
		colors[2][2] = colorFromWeight(list.emailVsDevice);
		colors[3][3] = colorFromWeight(list.emailVsZipCode);
		colors[3][2] = colorFromWeight(list.documentVsZipCode);
		colors[4][3] = colorFromWeight(list.documentVsEmail);
		colors[4][2] = colorFromWeight(list.emailVsPhone);

		return colors;

	}

	function colorFromWeight(weight) {
		switch (weight) {
			case 1:
				return '#dc3545';
			case 2:
				return '#ff9f00';
			case 3:
				return '#1b692c';
			default:
				return gray;
		}
	}


	const score = data?.score;

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<div style={{ display: 'flex', justifyContent: 'space-around' }}>

				{score &&
					<div>
						<label className="uk-form-label">Score de risco</label>
						<ReactSpeedometer
							width={200}
							height={150}
							maxSegmentLabels={0}
							segments={555}
							ringWidth={10}
							minValue={0}
							maxValue={100}
							currentValueText={`${Math.round(score)}/100`}
							value={Math.round(score)}
							needleHeightRatio={0.5}
							startColor={'#35c756'}
							endColor={'#DC3545'}
							needleColor="#D8DEE9"
							textColor={'#666666'} />
						{scoreText()}
					</div>
				}
				<div className="uk-margin-large-top uk-text-center">
					<PentagonDetails
						innerRadius={150}
						outerRadius={160}
						details={[
							<div className="pentagon-detail">
								<div style={{ fontWeight: 600, fontSize: 14, textTransform: 'uppercase' }}>CPF</div>
								<div style={{ width: 50 }}>
									<CpfIcon />
								</div>
							</div>,
							<div className="pentagon-detail">
								<div style={{ fontWeight: 600, fontSize: 14, textTransform: 'uppercase' }}>Celular</div>
								<div style={{ width: 50 }}>
									<PhoneIcon />
								</div>
							</div>,
							<div className="pentagon-detail">
								<div style={{ fontWeight: 600, fontSize: 14, textTransform: 'uppercase' }}>Device</div>
								<div style={{ width: 50 }}>
									<DeviceIcon />
								</div>
							</div>,
							<div className="pentagon-detail">
								<div style={{ fontWeight: 600, fontSize: 14, textTransform: 'uppercase' }}>CEP</div>
								<div style={{ width: 50 }}>
									<CepIcon />
								</div>
							</div>,
							<div className="pentagon-detail">
								<div style={{ fontWeight: 600, fontSize: 14, textTransform: 'uppercase' }}>E-mail</div>
								<div style={{ width: 50 }}>
									<EmailIcon />
								</div>
							</div>
						]}>
						<Pentagon
							colors={linksColor(data?.result?.scoresByAttributes)}
						/>
					</PentagonDetails>
				</div>
			</div>

		</DataSetMasterContainer>
	);
}

export default FinancialData;