import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Container = styled.div`
  table{
    max-width:98%;
  }
`;

export const Table = styled.table`

  margin:auto;

  td {
      width:50px;
      height:50px;
      border: 1px solid black;
      font-size:15px;
      padding:5px;
      text-align:center;
      font-family:arial, helvetica, sans-serif;
  }

`;

export const PaymentCol = styled.div`
  display: flex;
  align-items: center;
  >img {
    margin-right: 10px;
  }
`;


export const LoginContainerStyled = styled.main`
	position: relative;
	height: 100%;
	min-height: 100vh;
	padding: 50px 15px;
	background-color: ${window.__RUNTIME_CONFIG__.REACT_APP_MAIN_COLOR};
	overflow-y: auto;

	> .main-content {
		height: auto;
	}
`;

export const LoginContentStyled = styled.div`
	position: relative;
	display: block;
	width: 100%;
	max-width: 600px;
	margin: auto;
	padding: 30px;
	border-radius: 3px;
	background-color: white;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);


  .spinner i{
    animation: rotate 2s linear infinite;
  }


	&::after {
		content: '';
		clear: both;
		display: block;
	}

	.wt-register-logo {
		display: block;
		max-width: 200px;
		margin-bottom: 20px;
		margin: 0 auto;		
	}

	.main-content {
		overflow: initial;
		padding: 0;
	}
`;

export const RoutesContainer = styled.div`
  flex: 1;
  margin-top: 25px;
`;

export const Card = styled.div`
  background: #FFFFFF;
  box-shadow: 4.5px 4.5px 3.6px rgba(0, 0, 0, 0.024),
  12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
  30.1px 30.1px 24.1px rgba(0, 0, 0, 0.046),
  100px 100px 80px rgba(0, 0, 0, 0.07)
;
  border-radius: 5px;
  padding: 20px 15px;
  margin: 10px 3px 30px;
  display: flex;
  flex-direction: column;
  >span {
    font-size: 10pt;
    font-weight: bold;
  }
`;