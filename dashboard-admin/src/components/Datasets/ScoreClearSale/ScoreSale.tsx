import React, { useState, useEffect } from 'react';
import { Toast } from 'components';
import * as datasetService from '../../../services/dataset';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

const ScoreSale = ({ discriminator, id }: { discriminator: string, id: string }) => {

	const [score, setScore] = useState<any>(null);

	useEffect(() => {
		setScore(null);
		if (!id) return;
		if (discriminator === "NaturalPerson") {
			datasetService.getDataSetReport("NaturalPerson", id, "ConsumerRiskScore").then(response => {
				var scor = response?.data.map((x: any) => x).find((y: any) => y?.score)?.score;
				setScore(scor ?? false);
			});
		} else {
			setScore(false);
		}
	}, [id]);

	const handleClearSale = () => {
		setScore(null);
		Toast.showSuccessMessage("Solicitação de Score de Risco enviado com sucesso");
		datasetService.fetchDataSetReport("NaturalPerson", id, "ConsumerRiskScore").then(response => {
			if (response?.data[0]?.status === 'OK') {
				setScore(response?.data.map((x: any) => x).find((y: any) => y?.score)?.score);
				Toast.showSuccessMessage("Score de Risco gerado com sucesso");
			} else setScore(false);
		}).catch(() => setScore(false));
	};

	const scoreText = (score: number) => {
		if (score) {
			var text = "Muito alto";
			var color = "#FF0000";
			if (score < 10) {
				text = "Muito baixo";
				color = "#28a745";
			} else if (score < 46) {
				text = "Baixo";
				color = "#28a745";
			} else if (score < 80) {
				text = "Médio";
				color = "#ffaf1d";
			} else if (score < 90) {
				text = "Alto";
				color = "#FF0000";
			}
			return (
				<div>
					<span style={{ background: color, color: 'white', padding: 6, borderRadius: 18, fontSize: 14, minWidth: 100, display: 'inline-block', textAlign: 'center' }}><b>{text}</b></span>
				</div>
			);
		}
	};

	const naturalPerson = discriminator === 'NaturalPerson';
	const legalPerson = discriminator === 'LegalPerson';

	return (
		<>
			{/*@ts-ignore */}
			{naturalPerson && score == null && <div className="spinner" style={{ fontSize: 14, minWidth: 100, display: 'inline-block', textAlign: 'center' }}><i className="fa fa-spinner" color="#FFF" size={10} /></div>}
			{naturalPerson && score == false && <PlaylistPlayIcon style={{ color: 'blue', cursor: 'pointer', minWidth: 100, display: 'inline-block', textAlign: 'center' }} onClick={() => handleClearSale()} />}
			{score != null && score != false && scoreText(score)}
			{legalPerson && <span style={{ fontSize: 14, minWidth: 100, display: 'inline-block', textAlign: 'center' }}>N/D</span>}
		</>
	);

};

export default ScoreSale;