import React from 'react'

import filesize from 'filesize'

import {
  SingleImageOuterContainer,
  UploadedImage,
  ImageDetails,
  FileName,
  SingleImageInnerContainer,
  Size
} from './styles'

interface ImagePreviewProps {
  uri: string
  base64?: string
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  children,
  uri,
  base64
}) => {
  return (
    <SingleImageOuterContainer>
      <SingleImageInnerContainer>
        <UploadedImage source={{ uri }} />
        <ImageDetails>
          <FileName numberOfLines={1}>{uri.replace(/^.*[\\/]/, '')}</FileName>
          <Size>{filesize(base64.length)}</Size>
        </ImageDetails>
        {children}
      </SingleImageInnerContainer>
    </SingleImageOuterContainer>
  )
}
