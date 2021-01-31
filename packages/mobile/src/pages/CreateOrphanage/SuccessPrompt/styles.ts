import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: #39cc83;
  align-items: center;
  justify-content: center;
`

export const Illustration = styled.Image``

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
  width: 320px;
`

export const ButtonText = styled.Text`
  font-size: 15px;
  color: #fff;
`

export const Button = styled.TouchableOpacity`
  width: 120px;
  height: 56px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: #19c06d;
  margin-top: 32px;
`
