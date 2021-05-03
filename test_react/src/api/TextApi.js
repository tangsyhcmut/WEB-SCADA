import{ useEffect , useState } from 'react';
import productApi from './productApi';
import PostList from './PostList';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
function TextApi() {
  const [productList, setProductList] = useState([]);
//   const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 3,

        };
        const response = await productApi.getAll(params);
        console.log(response);
     
        setProductList(response);
      
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    }

    fetchProductList();
  }, []);
    return (
        <div>
            
           <PostList posts ={productList} /> 
        </div>
    )
}

export default TextApi
