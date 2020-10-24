import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
`

export const Contents = styled.div`
  height: 100%;
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
  height: 80%;
`

export const NoOrphanages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  color: #8fa7b2;

  svg {
    margin-bottom: 16px;
  }
`
