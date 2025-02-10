import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div id="page">
        <div id="container">
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="h3">loading</div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Full-screen or container-specific centering */
  position: fixed;  /* You can use absolute or fixed based on where you want to position it */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);  /* Adds a transparent overlay */
  z-index: 9999;  /* Make sure it appears on top of other elements */
  
  #page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;  /* Ensures the loader is centered */
    width: 100%;
  }

  #container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  #h3 {
    color: rgb(82, 79, 79);
    margin-top: 20px;
  }

  #ring {
    width: 190px;
    height: 190px;
    border: 1px solid transparent;
    border-radius: 50%;
    position: absolute;
  }

  #ring:nth-child(1) {
    border-bottom: 8px solid rgb(240, 42, 230);
    animation: rotate1 2s linear infinite;
  }

  @keyframes rotate1 {
    from {
      transform: rotateX(50deg) rotateZ(110deg);
    }
    to {
      transform: rotateX(50deg) rotateZ(470deg);
    }
  }

  #ring:nth-child(2) {
    border-bottom: 8px solid rgb(240, 19, 67);
    animation: rotate2 2s linear infinite;
  }

  @keyframes rotate2 {
    from {
      transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
    }
    to {
      transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
    }
  }

  #ring:nth-child(3) {
    border-bottom: 8px solid rgb(3, 170, 170);
    animation: rotate3 2s linear infinite;
  }

  @keyframes rotate3 {
    from {
      transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
    }
    to {
      transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
    }
  }

  #ring:nth-child(4) {
    border-bottom: 8px solid rgb(207, 135, 1);
    animation: rotate4 2s linear infinite;
  }

  @keyframes rotate4 {
    from {
      transform: rotateX(70deg) rotateZ(270deg);
    }
    to {
      transform: rotateX(70deg) rotateZ(630deg);
    }
  }
`;

export default Loader;
