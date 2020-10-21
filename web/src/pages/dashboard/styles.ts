import styled from 'styled-components'

export const Container = styled.div`
  color: #000;
`

export const Contents = styled.div`
  padding-top: 64px;
  margin-left: 180px;
  margin-right: 64px;
`
export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: #4d6f80;
  }

  span {
    color: #8fa7b2;
  }
`

export const Separator = styled.hr`
  width: 100%;
  height: 1px;
  border: 0;
  background: #d3e2e6;
  margin: 24px 0 40px;
`
export const OrphanagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -32px;
`
export const Item = styled.div`
  width: max(500px, 25vw);
  background-color: #fff;
  height: 320px;
  border-radius: 20px;
  border: 1px solid #d3e2e5;

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
`

export const Button = styled.a`
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
`
