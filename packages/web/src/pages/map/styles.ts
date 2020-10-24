import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

export const PageMap = styled.div`
  width: 100%;
  display: flex;
  position: relative;

  aside {
    width: 480px;
    height: 100%;
    background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
    padding: 80px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2 {
      font-size: 42px;
      font-weight: 800;
      line-height: 42px;
      margin-top: 64px;
    }

    p {
      line-height: 28px;
      margin-top: 24px;
    }

    footer {
      display: flex;
      flex-direction: column;

      line-height: 24px;

      strong {
        font-weight: 800;
      }
    }
  }

  .leaflet-container {
    z-index: 5;
  }

  .map-popup {
    .leaflet-popup-content-wrapper {
      font-family: Nunito, sans-serif;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 20px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }

    .leaflet-popup-tip-container {
      display: none;
    }

    .leaflet-popup-content {
      color: #0089a5;
      font-size: 20px;
      font-weight: bold;
      margin: 8px 12px 8px 16px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        width: 48px;
        height: 48px;
        background: #15c3d6;
        box-shadow: 17.28px 27.65px 41.48px rgba(23, 142, 166, 0.16);
        border-radius: 12px;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`

export const CreateOrphanageButton = styled.a`
  position: absolute;
  z-index: 10;

  right: 40px;
  bottom: 40px;

  width: 64px;
  height: 64px;

  background: #15c3d6;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  &:hover {
    background: #17d6eb;
  }
`
