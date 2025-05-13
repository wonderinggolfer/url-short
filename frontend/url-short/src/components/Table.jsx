import React from 'react'
import Row from './Row'

const Table = ({urls, editId, setEditId, editValue, setEditValue, onEdit, onDelete}) => {


    
  return (
    <div className='border rounded-lg overflow-hidden'>
      <div className='grid grid-cols-12 gap-4 p-2 bg-gray-200 font-bold'>
        <div className="col-span-6 ml-4">Original URL</div>
        <div className="col-span-2">Short URL</div>
        <div className="col-span-1">Clicks</div>
        <div className="col-span-1 ml-7">Actions</div>
      </div>

      {urls.map((url) => {
        return <Row 
          key={url._id}
          url={url}
          isEditing={editId === url._id}
          editValue={editValue}
          setEditValue={setEditValue}
          onStartEdit={() => {
            setEditId(url._id)
            setEditValue(url.full)
          }}
          onCancelEdit={() => setEditId(null)}
          onSaveEdit={(newfull) => onEdit(url._id, newfull)}
          onDelete={() => onDelete(url._id)}
        
        />
      })}

    </div>
  )
}

export default Table