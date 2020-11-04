import styled from 'styled-components'

export const Container = styled.div``

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

export const DeleteOrphanageContainer = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  padding: 0 10vw;

  height: 100vh;
  background: #ff669d;

  > svg {
    width: min(350px, 50%);
  }
`

export const DeleteOrphanageContent = styled.div`
  width: 40%;
  display: flex;
  margin-right: 80px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 80px;
    font-weight: 800;
  }

  p {
    text-align: center;
    font-size: 24px;
    margin: 20px 0;
  }
`

export const DeleteButton = styled.a`
  width: 320px;
  height: 64px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #d31f1f;
  border-radius: 20px;
  transition: background-color 0.2s ease-in;
  color: #fff;
  font-size: 18px;

  svg {
    margin-right: 20px;
  }

  &:hover {
    background-color: #de4f4a;
  }
`

export const BackButton = styled.a`
  font-size: 16px;
  color: #fff;

  display: flex;
  align-items: center;
  margin-top: 25px;

  svg {
    margin-right: 12px;
  }
`
