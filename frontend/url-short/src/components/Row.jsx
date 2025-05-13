import React from 'react'

const Row = ({url, isEditing, editValue, setEditValue, onStartEdit, onCancelEdit, onSaveEdit, onDelete}) => {

  return (
    <div className='grid grid-cols-12 gap-4 p-3 border-t-2 items-center'>
        { isEditing ? (
             <input
             type='url'
             value={editValue}
             onChange={(e) => setEditValue(e.target.value)}
             className='col-span-6 p-1 border rounded'
            />
        ) : (
             <a
             href={url.full}
             target='_blank'
              rel='noreferrer'
              className='col-span-6 text-blue-700 hover:underline truncate'
              >
                {url.full}
                </a>
                )
        }

        <a 
        href={`http://localhost:5000/${url.shortUrl}`}
        target='_blank'
        rel='noreferrer'
        className='col-span-2 text-blue-800 hover:underline'
        >
            {url.shortUrl}
        </a>

        <div className='col-span-1 text-center'>{url.clicks}</div>
        <div className='col-span-2 flex gap-2'>
            {isEditing ? (
                <>
                    <button
                    onClick={() => onSaveEdit(editValue)}
                    className='bg-blue-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm'
                    >
                    Save
                    </button>
                    <button
                    onClick={onCancelEdit}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm"
                    >
                    Cancel
                    </button> 
                </>
            ) : (
                <>
                    <button
                    onClick={onStartEdit}
                    className='bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-sm'
                    >
                    Edit
                    </button>
                    <button
                    onClick={onDelete}
                    className='bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm'
                    >
                    Delete
                    </button>
                </>
            )
        }
        </div>



    </div>
  )
}

export default Row