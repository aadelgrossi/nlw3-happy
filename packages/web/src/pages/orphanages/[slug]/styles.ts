import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  min-height: 100vh;

  main {
    flex: 1;
  }
`
export const OrphanageDetails = styled.div`
  width: 700px;
  margin: 64px auto;

  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;

  overflow: hidden;

  > img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .carousel .control-dots {
    background-color: rgba(0, 0, 0, 0.5);
    width: fit-content;
    left: 45%;
    align-items: center;
    display: flex;
    padding: 0px 6px;
    justify-content: center;
    height: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .carousel .thumb {
    padding: 0;
    border-radius: 8px;
    border: 1px solid #d3e2e5;
    opacity: 0.5;
    cursor: pointer;

    &.selected {
      opacity: 1;
      border: 1px solid #8fa7b2;
    }
  }

  .carousel .slide {
    background-color: transparent;
  }
`

export const OrphanageContent = styled.div`
  padding: 80px;

  h1 {
    color: #4d6f80;
    font-size: 54px;
    line-height: 54px;
    margin-bottom: 8px;
  }

  p {
    line-height: 28px;
    color: #5c8599;
    margin-top: 24px;
  }

  hr {
    width: 100%;
    height: 1px;
    border: 0;
    background: #d3e2e6;
    margin: 64px 0;
  }

  h2 {
    font-size: 36px;
    line-height: 46px;
    color: #4d6f80;
  }

  > button {
    margin-top: 64px;

    width: 100%;
    height: 64px;
    border: 0;
    cursor: pointer;
    background: #3cdc8c;
    border-radius: 20px;
    color: #ffffff;
    font-weight: 800;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.2s;

    &:hover {
      background: #36cf82;
    }

    svg {
      margin-right: 16px;
    }
  }
`
export const MapContainer = styled.div`
  margin-top: 64px;
  background: #e6f7fb;
  border: 1px solid #b3dae2;
  border-radius: 20px;

  footer {
    padding: 20px 0;
    text-align: center;

    a {
      line-height: 24px;
      color: #0089a5;
      text-decoration: none;
    }
  }

  > div.leaflet-container {
    border-bottom: 1px solid #dde3f0;
    border-radius: 20px;
  }
`

export const OpenDetails = styled.div`
  margin-top: 24px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;

  div {
    padding: 32px 24px;
    border-radius: 20px;
    line-height: 28px;

    svg {
      display: block;
      margin-bottom: 20px;
    }
  }

  div.hour {
    background: linear-gradient(149.97deg, #e6f7fb 8.13%, #ffffff 92.67%);
    border: 1px solid #b3dae2;
    color: #5c8599;
  }

  div.open-on-weekends {
    background: linear-gradient(154.16deg, #edfff6 7.85%, #ffffff 91.03%);
    border: 1px solid #a1e9c5;
    color: #37c77f;
  }

  div.closed-on-weekends {
    background: linear-gradient(154.16deg, #fdf0f5 7.85%, #ffffff 91.03%);
    border: 1px solid #ffbcd4;
    color: #ff6690;
  }
`

export const SliderIndicator = styled.li<{ isSelected: boolean }>`
  background: ${props => (props.isSelected ? '#ffd152' : '#fff')};
  width: ${props => (props.isSelected ? 16 : 6)}px;
  height: 4px;
  border-radius: 4px;
  display: inline-block;
  margin: 0 6px;
`
