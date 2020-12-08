import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  pageOneTitle: {
    fontFamily: 'nunitoTitle',
    fontSize: 48,
    lineHeight: 40,
    color: '#0089A5',
    maxWidth: 300,
    textAlign: 'left',
    marginLeft: -80,
    paddingTop: 80
  },
  pageOneSubTitle: {
    fontFamily: 'nunitoRegular',
    fontSize: 20,
    color: '#5C8599',
    maxWidth: 250,
    marginLeft: -120,
    textAlign: 'left'
  },
  pageTwoTitle: {
    fontFamily: 'nunitoTitle',
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'right',
    color: '#0089A5',
    maxWidth: 280,
    marginRight: -70
  },
  pageOneImageStyles: {
    marginTop: -40,
    resizeMode: 'contain'
  },
  pageTwoImageStyles: {
    resizeMode: 'contain',
    width: 380,
    height: 520,
    marginLeft: -20
  }
})
