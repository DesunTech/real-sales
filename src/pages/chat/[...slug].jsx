import React, { useEffect } from "react";
import Chat from "../../container/Chat";
import { useRouter } from "next/router";
import RatingContainer from "../../container/Chat/Rating";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const useAuth = useSelector((state) => state.auth.auth);

  // useEffect(() => {
  //   if (useAuth?.auth) {
  //     null;
  //   } else {
  //     // router.push(`/`);
  //   }
  // }, [useAuth?.auth]);

  if (!slug) return null; // or a loading spinner

  return (
    <>
      <Chat slug={slug?.length ? slug[0] : null}>
        {slug?.length ? (
          slug[0] === "rating" ? (
            <RatingContainer />
          ) : null
        ) : null}
      </Chat>
    </>
  );
};

export default ChatPage;
