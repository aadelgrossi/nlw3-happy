import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);

  flex-direction: column;
  place-content: center;
  align-items: center;

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
