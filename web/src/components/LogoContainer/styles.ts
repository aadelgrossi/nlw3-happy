import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    width: max(40%, 300px);
    height: max(15%, 120px);
  }
`
export const Location = styled.div`
  font-size: 24px;
  line-height: 34px;
  display: flex;
  flex-direction: column;
  text-align: center;

  strong {
    font-weight: 800;
  }
`
