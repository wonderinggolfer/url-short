import './index.css';
import { useEffect, useState } from "react";
import Form from "./components/Form";
import { createShortUrl, fetchAllUrl, updateEditedUrl, deleteUrl } from "./api/urlApi"
import Table from "./components/Table";

function App() {

  const [urls, setUrls] = useState([])
  const [editId, setEditId] = useState(null)
  const [editValue, setEditValue] = useState(null)

  useEffect(() => {
    fetchAllUrl().then((data) => {
      console.log(data)
      setUrls(data)
    }).catch((err) => {
      console.error('Eror fetching data', err)
    })
  }, [])
  
  const handleShrinkUrl = async (input) => {
    const newUrl = await createShortUrl(input);
    setUrls([newUrl, ...urls])
  }

  const handleEditUrl = async (id, full) => {
    const updatedUrl = await updateEditedUrl(id, full);
    setUrls(urls.map(url => (url._id === id ? updatedUrl : url)));
    setEditId(null)
    setEditValue('')
  }

  const handleDeleteUrl = async (id) => {
    await deleteUrl(id)
    setUrls(urls.filter(url => url._id !== id))
  }



  return (
    <div className="App max-w-3xl m-auto p-4">
      <h1 className='text-xl font-bold text-center m-3 text-black'>URL Shrinker</h1>
     <Form onSubmit={handleShrinkUrl} />
     <Table 
     urls={urls}
     editId={editId}
     editValue={editValue}
     setEditId={setEditId}
     setEditValue={setEditValue}
     onEdit={handleEditUrl}
     onDelete={handleDeleteUrl}
     />
    </div>
  );
}

export default App;
