import styled, { keyframes } from 'styled-components';

const dotsFadeLoadingAnimation = keyframes`
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
`;

const DotsLoadingIndicatorStyle = styled.div`
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;

    div {
        position: absolute;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: ${window.__RUNTIME_CONFIG__.REACT_APP_MAIN_COLOR};
        animation: ${dotsFadeLoadingAnimation} 1.2s linear infinite;

        &:nth-child(1) {
            top: 6px;
            left: 6px;
            animation-delay: 0s;
        }

        &:nth-child(2) {
            top: 6px;
            left: 26px;
            animation-delay: -0.4s;
        }

        &:nth-child(3) {
            top: 6px;
            left: 45px;
            animation-delay: -0.8s;
        }

        &:nth-child(4) {
            top: 26px;
            left: 6px;
            animation-delay: -0.4s;
        }

        &:nth-child(5) {
            top: 26px;
            left: 26px;
            animation-delay: -0.8s;
        }

        &:nth-child(6) {
            top: 26px;
            left: 45px;
            animation-delay: -1.2s;
        }

        &:nth-child(7) {
            top: 45px;
            left: 6px;
            animation-delay: -0.8s;
        }

        &:nth-child(8) {
            top: 45px;
            left: 26px;
            animation-delay: -1.2s;
        }

        &:nth-child(9) {
            top: 45px;
            left: 45px;
            animation-delay: -1.6s;
        }
    }
`;

const circularRotateAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const CircularLoadingIndicatorStyle = styled.div`
    display: inline-block;
    position: relative;
    width: 32px;
    height: 32px;

    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 32px;
        height: 32px;
        border: 4px solid ${window.__RUNTIME_CONFIG__.REACT_APP_MAIN_COLOR};
        border-radius: 50%;
        animation: ${circularRotateAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${window.__RUNTIME_CONFIG__.REACT_APP_MAIN_COLOR} transparent transparent transparent;

        &:nth-child(1) {
            animation-delay: -0.45s;
        }
        &:nth-child(2) {
            animation-delay: -0.3s;
        }
        &:nth-child(3) {
            animation-delay: -0.15s;
        }
    }
`;

export {
	DotsLoadingIndicatorStyle,
	CircularLoadingIndicatorStyle
};