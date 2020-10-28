import React, {
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
  useState
} from 'react'

import { useField } from '@unform/core'

interface Props {
  name: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props

const MultipleFileInput: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [previews, setPreviews] = useState<string[]>([])

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const selectedImages = Array.from(e.target.files)

    const selectedImagesPreview = selectedImages.map(image =>
      URL.createObjectURL(image)
    )
    setPreviews(selectedImagesPreview)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files',
      clearValue(ref: HTMLInputElement) {
        ref.value = ''
      }
    })
  }, [fieldName, registerField])

  return (
    <>
      {previews.map(preview => (
        <img src={preview} key={preview} width="100" />
      ))}

      <input
        multiple
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handlePreview}
        {...rest}
      />
    </>
  )
}

export default MultipleFileInput
