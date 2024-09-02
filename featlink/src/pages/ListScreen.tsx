import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { createProduct, getAllProducts } from "@/utils/products.utils";
import { fetchUserId } from "@/utils/user.utils";
import { useState } from "react";
import { useQuery } from 'react-query'
import { useNavigate } from "react-router-dom";


export const ListScreen = ({ isFounder = false } : { isFounder: boolean }) => {

  const navigate = useNavigate();

  const fetchProduct = async () => {
    const data = await getAllProducts();
    console.log('Products:', data);
    return data;
  }
  
  const [ name, setName ] = useState<string>('');

  const handleSubmit = async () => {
    try {
      const userId = await fetchUserId();
      if (userId == null) return;
      const newProduct = await createProduct({ name, founder: userId }); // Replace with appropriate founder ID
      console.log('Product created:', newProduct);
      refetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }

  const { data: products, isLoading: productLoading, refetch: refetchProducts } = useQuery('events', fetchProduct);

  return (
    <div className="h-screen flex-col flex items-center bg-gray-50">
      <div className="h-14 w-full">
        <AppBar/>
      </div>

      <div className="w-full px-4 sm:px-10 lg:px-10 lg:w-[900px] mt-12 mb-5 flex flex-col gap-3">
        <div className="flex justify-between items-end pr-4">
          <h2 className=" flex text-3xl font-bold">Products</h2>
          {isFounder &&  <Sheet>
              <SheetTrigger>
                <Button className='bg-primaryGreen hover:bg-primaryGreen/80 rounded-full px-6'>Add New</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create a New Product Listing</SheetTitle>
                  <SheetDescription>
                    Please fill in the details below to create a new product.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 p-4">
                  <Input 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />

                  <Button 
                    className='bg-primaryGreen hover:bg-primaryGreen/80 rounded-full w-full mt-4' 
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </SheetContent>
            </Sheet>}
        </div>
        {isFounder && <p className="text-[14px] px-1 mt-2">This is what the Founders/company managers see.</p>}
        {isFounder 
        ? <p className="text-md px-1 mt-2">In the future, only your products will be listed here. For now, you can browse responses to all products to check how FeatLink works.</p>
        : <p className="text-[14px] px-1 mt-2">In the future, each company using FeatLink will have its own subdomain. For now, users can select the product they want to contribute to in this section.</p>}
      </div>
      <div className="grid sm:grid-cols-2 w-full px-4 sm:px-10 lg:px-10 lg:w-[900px] gap-10 mb-10">
        {
          productLoading || products == undefined || products == null ? 
          [1,2].map(() => (<GlowingStarsBackgroundCard 
            key={Math.random()}
            className="bg-green-500"
              children={
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-2xl text-white">...</h2>
                  <p className="text-base text-white">By ..</p>
                </div>
              }
          />))
          :
          products.map((product) => (
            <GlowingStarsBackgroundCard 
                key={Math.random()}
                onClick={() => navigate(`${product._id}`)}
                className="hover:cursor-pointer"
                children={
                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-2xl text-white">{product.name}</h2>
                    <p className="text-base text-white">By {product.founder}</p>
                  </div>
                }
            />
          ))
        }
        <div></div>
      </div>
    </div>
  );
}


// const ProductTestComponent: React.FC = () => {
//   const handleCreateProduct = async () => {
//     try {
//       const newProduct = await createProduct({ name: 'Test Product', founder: '60d1e86fc8cf315e7001f855' }); // Replace with appropriate founder ID
//       console.log('Product created:', newProduct);
//     } catch (error) {
//       console.error('Error creating product:', error);
//     }
//   };

//   const handleGetAllProducts = async () => {
//     try {
//       const products = await getAllProducts();
//       console.log('All products:', products);
//     } catch (error) {
//       console.error('Error fetching all products:', error);
//     }
//   };

//   const handleGetProductById = async () => {
//     try {
//       const productId = "66d1ee8b20ee8d00da2da511";
//       const product = await getProductById(productId);
//       console.log('Product by ID:', product);
//     } catch (error) {
//       console.error('Error fetching product by ID:', error);
//     }
//   };

//   const handleGetProductByName = async () => {
//     try {
//       const productName = 'Test Product';
//       const product = await getProductByName(productName);
//       console.log('Product by Name:', product);
//     } catch (error) {
//       console.error('Error fetching product by name:', error);
//     }
//   };

//   const handleUpdateProduct = async () => {
//     try {
//       const productId = '66d1ee8b20ee8d00da2da511'; // Replace with an actual product ID
//       const updateData = { name: 'Updated Product Name' };
//       const updatedProduct = await updateProduct(productId, updateData);
//       console.log('Product updated:', updatedProduct);
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   const handleDeleteProduct = async () => {
//     try {
//       const productId = '66d1ee8b20ee8d00da2da511'; // Replace with an actual product ID
//       const deletedProduct = await deleteProduct(productId);
//       console.log('Product deleted:', deletedProduct);
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   return (
//     <div>
//       <button className="border m-2" onClick={handleCreateProduct}>Create Product</button>
//       <button className="border m-2" onClick={handleGetAllProducts}>Get All Products</button>
//       <button className="border m-2" onClick={handleGetProductById}>Get Product By ID</button>
//       <button className="border m-2" onClick={handleGetProductByName}>Get Product By Name</button>
//       <button className="border m-2" onClick={handleUpdateProduct}>Update Product</button>
//       <button className="border m-2" onClick={handleDeleteProduct}>Delete Product</button>
//     </div>
//   );
// };

// export default ProductTestComponent;

// const FeatureTestButtons: React.FC = () => {
//   const [featureId, setFeatureId] = useState<string>('');
//   const [publisher, setPublisher] = useState<string>('');
//   const [status, setStatus] = useState<string>('');
//   const [feedback, setFeedback] = useState<'yes' | 'no' | 'maybe'>('yes');

//   const handleCreateFeature = async () => {
//     try {
//       const newFeature = await createFeature({
//         publisher: '64ddf5e22c69246d42b9efb6', // Replace with a valid user ID
//         title: 'Test Feature',
//         description: 'Description of the test feature',
//         type: 'Feature', // Replace with a valid feature type
//         imageUrl: '',
//         implementationStatus: 'Not Reviewed', // Replace with a valid implementation status
//         upvotes: { count: 0, list: [] },
//         downvotes: { count: 0, list: [] },
//         usefulness: {
//           yes: { count: 0, list: [] },
//           no: { count: 0, list: [] },
//           maybe: { count: 0, list: [] }
//         },
//         productId: '64ddf5e22c69246d42b9efb6' // Replace with a valid product ID
//       });
//       console.log('Feature Created:', newFeature);
//     } catch (error) {
//       console.error('Error creating feature:', error);
//     }
//   };

//   const handleGetAllFeatures = async () => {
//     try {
//       const features = await getAllFeatures();
//       console.log('All Features:', features);
//     } catch (error) {
//       console.error('Error fetching all features:', error);
//     }
//   };

//   const handleGetFeatureById = async () => {
//       const feature = await getFeatureById('66d020cb1e112eaea990cf2c');
//       console.log('Feature by ID:', feature);
//   };

//   const handleGetFeaturesByPublisher = async () => {
//     try {
//       const features = await getFeaturesByPublisher('66d1e86fc8cf315e7001f855');
//       console.log('Features by Publisher:', features);
//     } catch (error) {
//       console.error('Error fetching features by publisher:', error);
//     }
//   };

//   const handleUpdateFeatureStatus = async () => {
//     if (!featureId || !status) {
//       console.error('Feature ID and status are required');
//       return;
//     }
//     try {
//       const updatedFeature = await updateFeatureStatus(featureId, status as any); // Adjust cast as needed
//       console.log('Feature Status Updated:', updatedFeature);
//     } catch (error) {
//       console.error('Error updating feature status:', error);
//     }
//   };

//   const handleAddVoteToFeature = async (isUpvote: boolean) => {
//     if (!featureId) {
//       console.error('Feature ID is required');
//       return;
//     }
//     try {
//       const updatedFeature = await addVoteToFeature(featureId, isUpvote);
//       console.log('Vote Added:', updatedFeature);
//     } catch (error) {
//       console.error('Error adding vote to feature:', error);
//     }
//   };

//   const handleUpdateUsefulnessMetric = async () => {
//     if (!featureId || !feedback) {
//       console.error('Feature ID and feedback are required');
//       return;
//     }
//     try {
//       const updatedFeature = await updateUsefulnessMetric(featureId, feedback);
//       console.log('Usefulness Metric Updated:', updatedFeature);
//     } catch (error) {
//       console.error('Error updating usefulness metric:', error);
//     }
//   };

//   const handleDeleteFeature = async () => {
//     if (!featureId) {
//       console.error('Feature ID is required');
//       return;
//     }
//     try {
//       await deleteFeature(featureId);
//       console.log('Feature Deleted');
//     } catch (error) {
//       console.error('Error deleting feature:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Feature API Test Buttons</h2>
//       <button className="border m-2" onClick={handleCreateFeature}>Create Feature</button>
//       <button className="border m-2" onClick={handleGetAllFeatures}>Get All Features</button>
//       <button className="border m-2" onClick={handleGetFeatureById}>Get Feature by ID</button>
//       <button className="border m-2" onClick={handleGetFeaturesByPublisher}>Get Features by Publisher</button>
//       <button className="border m-2" onClick={handleUpdateFeatureStatus}>Update Feature Status</button>
//       <button className="border m-2" onClick={() => handleAddVoteToFeature(true)}>Upvote Feature</button>
//       <button className="border m-2" onClick={() => handleAddVoteToFeature(false)}>Downvote Feature</button>
//       <button className="border m-2" onClick={handleUpdateUsefulnessMetric}>Update Usefulness Metric</button>
//       <button className="border m-2" onClick={handleDeleteFeature}>Delete Feature</button>
//       <input
//         type="text"
//         placeholder="Feature ID"
//         value={featureId}
//         onChange={(e) => setFeatureId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Publisher"
//         value={publisher}
//         onChange={(e) => setPublisher(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Status"
//         value={status}
//         onChange={(e) => setStatus(e.target.value)}
//       />
//       <select value={feedback} onChange={(e) => setFeedback(e.target.value as 'yes' | 'no' | 'maybe')}>
//         <option value="yes">Yes</option>
//         <option value="no">No</option>
//         <option value="maybe">Maybe</option>
//       </select>
//     </div>
//   );
// };
