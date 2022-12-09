import React, { useState, useEffect } from 'react'
import Card from '../../components/Card/Card'
import Header from '../../components/header/Header';
import ImageSearch from '../../components/imageSearch/ImageSearch';

const Home = () => {
    const apiKey = process.env.REACT_APP_PIXABAY_API_KEY;
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [term, setTerm] = useState('');

    const apiCall = async () => {
        try {
            const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${term}&image_type=photo`);
            const data = await response.json();
            console.log(data.hits);
            setImages(data.hits);
            setIsLoading(false);

        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        apiCall()
    }, [term])

    return (
        <div className="conatainer mx-auto">
            <Header/>
            <ImageSearch searchText={(text)=>setTerm(text)}/>

           {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">loading...</h1>
            : <div className=' m-5'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                {images.map((image)=> (
                <Card key={image.id}  image={image}/>
                ))}
            </div>
            </div>}
        </div>

    )
}

export default Home