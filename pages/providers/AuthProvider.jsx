import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  FacebookAuthProvider,
} from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../firebase/Firebase.config";
import { createContext, useReducer } from "react";
import {
  initialState,
  productReducer,
} from "../states/productState/ProductReducer";
import { actionTypes } from "../states/productState/ActionTypes";
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data12, setData12] = useState([]);
  const [menuValue, setMenuValue] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [sub_category, setSub_Category] = useState([]);
  const [filterSub_Category, setFilterSub_Category] = useState("");
  const [reviewId, setReviewId] = useState();
  const [localStorageData , setLocalStorageData]  = useState()
  

  // function flattenArray(arr) {
  //   return arr.reduce((acc, item) => {
  //     if (Array.isArray(item)) {
  //       return [...acc, ...flattenArray(item)];
  //     } else {
  //       return [...acc, item];
  //     }
  //   }, []);
  // }
  // console.log(27, state);
  // useEffect(() => {
  //   const cartData = localStorage.getItem("cartData");
  //   // console.log(30, JSON.parse(cartData))
  //   if (cartData) {
  //     dispatch({ type: actionTypes.ADD_TO_CARD, payload: JSON.parse(cartData) });
  //    let  flattenedArray = flattenArray(JSON.parse(cartData));
  //     console.log(52, flattenedArray)
  //     setLocalStorageData(flattenedArray)
  //   }
  // }, [dispatch]);


  // Save the cart to local storage when it changes
  // useEffect(() => {
  //   localStorage.setItem("cartData", JSON.stringify(state.cart));
  // }, [state.cart]);

  useEffect(() => {
    const cartData = localStorage.getItem("cartData");
    if (cartData) {
      // If there is cart data in local storage, update both the state and local storage data
      const flattenedCartData = JSON.parse(cartData).flat(); // Flatten the array
      dispatch({ type: actionTypes.ADD_TO_CARD, payload: flattenedCartData });
      setLocalStorageData(flattenedCartData);
    }
  }, [dispatch]);
  
  // Save the cart to local storage when it changes
  useEffect(() => {
    // Flatten the cart data before saving it to local storage
    const flattenedCartData = state.cart.flat();
    localStorage.setItem("cartData", JSON.stringify(flattenedCartData));
    setLocalStorageData(flattenedCartData); // Update localStorageData with the latest cart data
  }, [state.cart]);


  useEffect(() => {
    dispatch({ type: actionTypes.FETCHING_START });
    fetch("/api/server")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data.data })
      )
      .catch(() => {
        dispatch({ type: actionTypes.FETCHING_ERROR });
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    let xyzProduct = state?.products.filter(
      (matchingProduct) => matchingProduct?.category === menuValue
    );

    const subCategoriesArray = xyzProduct.map(
      (product) => product.sub_category
    );
    const uniqueSubCategories = new Set(subCategoriesArray);
    const uniqueSubCategoriesArray = Array.from(uniqueSubCategories);

    // Set the state, but don't log it here
    setFilterProducts(xyzProduct);
    setSub_Category(uniqueSubCategoriesArray);
  }, [menuValue]);

  useEffect(() => {
    let product = state?.products.filter(
      (matchingProduct) => matchingProduct?.sub_category === filterSub_Category
    );
    setFilterProducts(product);
    console.log(67, product);
  }, [filterSub_Category]);

  let scrollToProductSection = () => {
    const productSection = document.getElementById("product-section");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };
  const facebookLogin = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("current user ", currentUser);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const value = {
    data12,
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleLogin,
    facebookLogin,
    dispatch,
    state,
    menuValue,
    setMenuValue,
    filterProducts,
    sub_category,
    setFilterSub_Category,
    scrollToProductSection,
    setReviewId,
    reviewId,
    localStorageData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;