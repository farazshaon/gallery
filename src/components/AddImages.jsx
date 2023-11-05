import React from 'react'
import { FaRegImage } from 'react-icons/fa6';



const AddImages = ({onSelectFile}) => {
  return (
    <>
        <div className='add-images'>
            <label>
              <FaRegImage/>
                Add Images
                <br />
                <input type="file"
                name='images'
                onChange={onSelectFile}
                multiple
                accept='image/png, image/jpeg, image/webp'
                />
            </label>
        </div> 
    </>
  )
}

export default AddImages
