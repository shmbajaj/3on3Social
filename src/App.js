import "react-toastify/dist/ReactToastify.css";
import { Header, Footer, Navigation, Sidebar, PostModal } from "components";
import {
  checkIsNavigationAndSidebarRequired,
  RouteSwitch,
  Toast,
  getDate,
  showToastOnFailedAndSuccessStatus,
} from "utils";
import { loggedIn, updateProfileState } from "features";
import { auth,db } from "firebaseLocal";
import { doc,onSnapshot, } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const { uid, isLoggedIn } = useSelector((state) => state.auth);
  const { show } = useSelector((state) => state.postModal);
  const { status: postStatus, message: postMessage } = useSelector(
    (state) => state.post
  );
  const { status: commentStatus, message: commentMessage } = useSelector(
    (state) => state.comment
  );
  const { status: profileStatus, message: profileMessage } = useSelector(
    (state) => state.profile
  );
  const location = useLocation();
  const dispatch = useDispatch();

  const isNavigationAndSidebarRequired = checkIsNavigationAndSidebarRequired(
    location.pathname
  );

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loggedIn({ uid: user.uid }));
        Toast.success("Successful Authenticated");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribe = null;
    if (isLoggedIn) {
      dispatch(
        updateProfileState({
          status: "loading",
        })
      );
      unsubscribe = onSnapshot(
        doc(db, "users", uid),
        (snapshot) => {
          dispatch(
            updateProfileState({
              status: "success",
              userInfo: {
                ...snapshot.data(),
                createdAt: getDate(snapshot.data()),
                uid,
              },
            })
          );
        },
        (error) => {
          Toast.error(error.message);
          dispatch(
            updateProfileState({
              status: "failed",
            })
          );
        }
      );
    }
    return () => unsubscribe && unsubscribe();
  }, [isLoggedIn]);

  useEffect(() => {
    showToastOnFailedAndSuccessStatus(postStatus, postMessage);
  }, [postMessage, postStatus]);

  useEffect(() => {
    showToastOnFailedAndSuccessStatus(profileStatus, profileMessage);
  }, [profileMessage, profileStatus]);

  useEffect(() => {
    showToastOnFailedAndSuccessStatus(commentStatus, commentMessage);
  }, [commentMessage, commentStatus]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      className={`app bg-primary-background lg:grid-rows-[max-content_4fr_max-content] ${
        !isNavigationAndSidebarRequired
          ? "lg:grid-cols-[auto_4fr_auto]"
          : "lg:grid-cols-[1fr_4fr_1fr]"
      }`}
    >
      <Header />
      {isNavigationAndSidebarRequired && <Navigation />}
      <RouteSwitch />
      {isNavigationAndSidebarRequired && <Sidebar />}
      <Footer />
      <ToastContainer />
      {show && <PostModal />}
    </div>
  );
}

export { App };
