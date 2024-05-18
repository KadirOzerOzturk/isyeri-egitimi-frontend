import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UploadFile() {
        const [postUrl, setPostUrl] = useState("");
        const [images,setImages]=useState([])

        useEffect(() => {
            
              axios.get(`/file`)
                .then(res => {
                  
                  console.log(res.data);
                  setImages(res.data);
                })
                .catch(error => {
                  console.error("Error fetching announcements:", error);
           
                });
            
          }, []);
      const createPost = async (post) => {
        try {
            const res = await axios.post('/file/save', {
              name: "denemeee",
              url: postUrl,
            });
            if (res.status === 200) {
              console.log("res" + res)
   
            }
          } catch (error) {
            
          }


      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
      };
    
      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
      const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostUrl(  base64 );
      };
    
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              label="Image"
              name="myFile"
              accept=".jpeg, .png, .jpg"
              size={1024}
              onChange={(e) => handleFileUpload(e)}
            />
    
            <button>Submit</button>

            {images.map((image) => ( 

                <div  className='flex  '>
                    <img  className=' h-48 w-48 ' src={image.url} alt="" />
            
                </div>
            ))}
          </form>
        </div>
    );
}

export default UploadFile;
