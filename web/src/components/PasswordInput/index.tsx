import React, { InputHTMLAttributes, useEffect, useState } from 'react'

import Input from '@/components/Input'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  containerStyle?: Record<string, unknown>
}

const PasswordInput: React.FC<InputProps> = ({ ...rest }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  useEffect(() => {
    console.log(isPasswordHidden)
  }, [])

  return (
    <Input type={isPasswordHidden ? 'password' : 'text'} {...rest}>
      <div
        onMouseUp={() => setIsPasswordHidden(!isPasswordHidden)}
        onMouseDown={() => setIsPasswordHidden(!isPasswordHidden)}
      >
        {isPasswordHidden ? (
          <FiEye size={24} color="#8FA7B3"></FiEye>
        ) : (
          <FiEyeOff size={24} color="#15C3D6"></FiEyeOff>
        )}
      </div>
    </Input>
  )
}

export default PasswordInput
