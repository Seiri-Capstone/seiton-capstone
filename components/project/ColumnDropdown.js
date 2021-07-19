import React, { useState } from 'react'
import Image from 'next/image'
import dotsIcon from '../../public/assets/dotsIcon.svg'

export default function ColumnDropdown() {
  const [isActive, setIsActive] = useState(false)

  return (
    <>
      <div className="inline-block relative">
        <button
          onClick={() => {
            setIsShowing(true)
          }}
          className="flex flex-col justify-center"
        >
          <Image
            src={dotsIcon}
            alt="columnDropDown"
            className="self-center"
            width={20}
            height={20}
          />
        </button>
      </div>
    </>
  )
}
