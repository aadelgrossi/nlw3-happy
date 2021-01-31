import { Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import MapView from 'react-native-maps'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  flex: 1;
`

export const ImagesContainer = styled.View`
  height: 240px;
`

export const Gallery = styled(SwiperFlatList).attrs({
  paginationStyle: {
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    height: 16,
    padding: 4
  },
  paginationStyleItemActive: {
    backgroundColor: '#FFD152',
    width: 16,
    height: 4,
    marginHorizontal: 6
  },
  paginationStyleItemInactive: {
    backgroundColor: '#fff',
    marginHorizontal: 6
  },
  paginationStyleItem: {
    width: 6,
    height: 4,
    backgroundColor: '#fff'
  }
})``

export const Image = styled.Image`
  width: ${Dimensions.get('window').width}px;
  height: 240px;
  resize-mode: cover;
`
export const DetailsContainer = styled.View`
  padding: 24px;
`

export const Title = styled.Text`
  color: #4d6f80;
  font-size: 30px;
  font-family: 'nunitoBold';
`

export const Description = styled.Text`
  font-family: 'nunitoRegular';
  color: #5c8599;
  line-height: 24px;
  margin-top: 16px;
`

export const MapContainer = styled.View`
  border-radius: 20px;
  overflow: hidden;
  border-width: 1.2px;
  border-color: #b3dae2;
  margin-top: 40px;
  background-color: #e6f7fb;
`

export const Map = styled(MapView)`
  width: 100%;
  height: 150px;
`

export const RoutesContainer = styled.TouchableOpacity`
  padding: 16px;
  align-items: center;
  justify-content: center;
`

export const RoutesText = styled.Text`
  font-family: 'nunitoBold';
  color: #0089a5;
`

export const Separator = styled.View`
  height: 0.8px;
  width: 100%;
  background-color: #d3e2e6;
  margin-vertical: 40px;
`

export const ScheduleContainer = styled.View`
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-between;
`

export const ContactButton = styled(RectButton)`
  background-color: #3cdc8c;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 56px;
  margin-top: 40px;
`

export const ContactButtonText = styled.Text`
  font-family: 'nunitoTitle';
  color: #fff;
  font-size: 16px;
  margin-left: 16px;
`
