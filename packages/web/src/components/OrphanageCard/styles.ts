import styled from 'styled-components'

export const Container = styled.div`
  width: max(500px, 25vw);
  background-color: #fff;
  height: 309px;
  border-radius: 20px;
  box-shadow: inset 0px 0px 0px 1px #d3e2e5;

  margin-left: 32px;
  margin-bottom: 32px;
`

export const OrphanageDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 16px 32px;

  h2 {
    font-size: 24px;
    color: #4d6f80;
    font-weight: 700;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  margin-left: auto;

  a {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ebf2f5;

    transition: background-color 0.2s ease-in;

    & + & {
      margin-left: 8px;
    }

    &:hover {
      background-color: #15c3d6;

      svg {
        stroke: #fff;
      }
    }
  }
`
