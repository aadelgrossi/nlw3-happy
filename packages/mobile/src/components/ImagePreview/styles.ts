import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

export const ImagesContainer = styled.View``

export const SingleImageBase = styled(LinearGradient)`
  border-radius: 20px;
`

export const SingleImageOuterContainer = styled(SingleImageBase).attrs({
  colors: ['#A1E9C5', '#FFC2D8'],
  start: { x: 0.5, y: 0 },
  end: { x: 1, y: 0 }
})`
  height: 72px;
  width: ${Dimensions.get('screen').width - 50}px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`

export const SingleImageInnerContainer = styled(SingleImageBase).attrs({
  colors: ['#EDFFF6', '#FCF0F4'],
  start: { x: 0.5, y: 0 },
  end: { x: 1, y: 0 }
})`
  flex-direction: row;
  width: ${Dimensions.get('screen').width - 52}px;
  height: 70px;
  align-items: center;
`

export const ImageDetails = styled.View`
  justify-content: space-between;
`

export const FileName = styled.Text`
  font-size: 15px;
  max-width: 260px;
  font-family: 'nunitoRegular';
  color: #37c77f;
`

export const Size = styled.Text`
  font-size: 12px;
  font-family: 'nunitoRegular';
  color: #8fa7b2;
`

export const UploadedImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  margin: 0 16px 0 6px;
`
