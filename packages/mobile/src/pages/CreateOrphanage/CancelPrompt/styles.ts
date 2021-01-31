import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: #ff669d;
  align-items: center;
  justify-content: center;
`

export const CrossIconWrapper = styled.View`
  padding: 20px;
  background-color: #fff;
  border-radius: 16px;
`

const BaseText = styled.Text`
  font-family: 'nunitoTitle';
  color: #fff;
`

export const Title = styled(BaseText)`
  font-size: 32px;
  margin: 24px 0 12px;
`

export const Message = styled(BaseText)`
  font-family: 'nunitoRegular';
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  width: 240px;
`

export const ButtonText = styled.Text`
  font-size: 15px;
  color: #fff;
`

export const BaseButton = styled.TouchableOpacity`
  width: 128px;
  height: 56px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: #d6487b;
  background-color: #d6487b;
`

export const ButtonOutline = styled(BaseButton)`
  background-color: transparent;
`

export const ButtonGroup = styled.View`
  flex-direction: row;
  width: 260px;
  margin-top: 36px;
  justify-content: space-between;
`
